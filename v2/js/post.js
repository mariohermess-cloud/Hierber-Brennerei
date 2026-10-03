// Nachbearbeitung: HDR-Render (MSAA) -> Bloom -> Schärfentiefe + Vignette + Filmkorn + ACES-Tonemapping in einem Durchgang.
// Stufe „niedrig“/Handy: kein Composer, direktes Rendern mit ACES (Vignette/Korn dann per CSS).
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const GradeShader = {
  name: 'GradeShader',
  uniforms: {
    tDiffuse: { value: null }, tDepth: { value: null },
    uNear: { value: 0.05 }, uFar: { value: 80 }, uFocus: { value: 5 }, uAperture: { value: 0 }, uMaxBlur: { value: 6 },
    uRes: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 }, uGrain: { value: 0.035 }, uVig: { value: 0.85 }, uAspect: { value: 1 },
    uFocusUV2: { value: new THREE.Vector2(-9, -9) }, uFocusR2: { value: new THREE.Vector2(0.1, 0.25) }, uFocusUV: { value: new THREE.Vector2(0.5, 0.5) }, uFocusR: { value: new THREE.Vector2(0.2, 0.5) }, uDof: { value: 0 }, uCA: { value: 0.0009 }, toneMappingExposure: { value: 1 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform sampler2D tDepth;
    uniform float uNear, uFar, uFocus, uAperture, uMaxBlur, uTime, uGrain, uVig, uAspect, uDof, uCA;
    uniform vec2 uRes; uniform vec2 uFocusUV; uniform vec2 uFocusR; uniform vec2 uFocusUV2; uniform vec2 uFocusR2;
    float fmask(vec2 uv){ vec2 a = uv - uFocusUV; a.x *= uAspect; vec2 b = uv - uFocusUV2; b.x *= uAspect;
      return min(smoothstep(uFocusR.x, uFocusR.y, length(a)), smoothstep(uFocusR2.x, uFocusR2.y, length(b))); }
    #include <packing>
    #include <tonemapping_pars_fragment>
    varying vec2 vUv;
    float linDepth(vec2 uv){ return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, uNear, uFar); }
    float coc(float d){ return clamp(abs(d - uFocus) / max(d, 0.15) * uAperture, 0.0, 1.0); }
    void main(){
      vec2 q0 = vUv - 0.5;
      vec3 col = texture2D(tDiffuse, vUv).rgb;
      if (uCA > 0.0) { // leichte chromatische Aberration zum Rand hin
        vec2 o = q0 * uCA * dot(q0, q0) * 6.0;
        col.r = texture2D(tDiffuse, vUv + o).r; col.b = texture2D(tDiffuse, vUv - o).b;
      }
      if (uDof > 0.5) {
        float mask = fmask(vUv);
        float d = linDepth(vUv), c = coc(d) * mask, rad = c * uMaxBlur;
        if (rad > 0.7) {
          vec3 acc = col; float ws = 1.0;
          for (int i = 0; i < 14; i++) {
            float fi = float(i) + 1.0, a = fi * 2.39996, r = sqrt(fi / 14.0) * rad;
            vec2 uv = vUv + vec2(cos(a), sin(a)) * r / uRes;
            float sd = linDepth(uv), sc = coc(sd) * fmask(uv);
            vec3 s = texture2D(tDiffuse, uv).rgb;
            float w = (0.25 + 0.75 * smoothstep(0.0, c, sc)) * (1.0 + dot(s, vec3(0.333)) * 0.6);
            acc += s * w; ws += w;
          }
          col = acc / ws;
        }
      }
      col = ACESFilmicToneMapping(col);
      vec2 q = q0; q.x *= uAspect;
      col *= mix(1.0, smoothstep(0.95, 0.28, length(q)), uVig);
      gl_FragColor = sRGBTransferOETF(vec4(col, 1.0));
      float n = fract(sin(dot(vUv * uRes + fract(uTime) * 91.7, vec2(12.9898, 78.233))) * 43758.5453);
      gl_FragColor.rgb += (n - 0.5) * uGrain;
    }`,
};

class GradePass extends ShaderPass {
  render(renderer, writeBuffer, readBuffer, dt, maskActive) {
    this.uniforms.tDepth.value = readBuffer.depthTexture;
    super.render(renderer, writeBuffer, readBuffer, dt, maskActive);
  }
}

export function createPost(renderer, scene, camera) {
  const size = renderer.getSize(new THREE.Vector2()), dpr = renderer.getPixelRatio();
  const rt = new THREE.WebGLRenderTarget(size.x * dpr, size.y * dpr, { type: THREE.HalfFloatType, samples: 4 });
  rt.depthTexture = new THREE.DepthTexture(size.x * dpr, size.y * dpr, THREE.UnsignedIntType);
  const composer = new EffectComposer(renderer, rt);
  const renderPass = new RenderPass(scene, camera);
  const bloom = new UnrealBloomPass(new THREE.Vector2(size.x * dpr, size.y * dpr), 0.22, 0.5, 1.05);
  const grade = new GradePass(GradeShader); grade.material.toneMapped = false;
  composer.addPass(renderPass); composer.addPass(bloom); composer.addPass(grade);
  grade.uniforms.uNear.value = camera.near; grade.uniforms.uFar.value = camera.far;

  const P = {
    composer, bloom, grade, active: false, tier: null,
    setSamples(n) { for (const t of [composer.renderTarget1, composer.renderTarget2]) { if (t.samples !== n) { t.samples = n; t.dispose(); } } },
    /** Stufe: { post: bool, msaa, bloom, dof } */
    setTier(t) {
      this.tier = t; this.active = !!t.post;
      if (!this.active) return;
      this.setSamples(t.msaa);
      bloom.enabled = !!t.bloom; bloom.strength = t.bloomStrength ?? 0.22;
      grade.uniforms.uDof.value = t.dof ? 1 : 0;
      grade.uniforms.uCA.value = t.ca ?? 0.0009;
    },
    setSize(w, h, dpr) {
      composer.setPixelRatio(dpr); composer.setSize(w, h);
      grade.uniforms.uRes.value.set(w * dpr, h * dpr); grade.uniforms.uAspect.value = w / h;
      grade.uniforms.uMaxBlur.value = 7 * dpr;
    },
    /** Fokusentfernung (m) und Stärke der Unschärfe (0 = aus). */
    setFocus(dist, aperture, uv, r0, r1, uv2) { if (uv2) grade.uniforms.uFocusUV2.value.copy(uv2); else grade.uniforms.uFocusUV2.value.set(-9, -9); grade.uniforms.uFocus.value = dist; grade.uniforms.uAperture.value = aperture; if (uv) grade.uniforms.uFocusUV.value.copy(uv); if (r0 != null) grade.uniforms.uFocusR.value.set(r0, r1); },
    render(dt, t, exposure) {
      grade.uniforms.uTime.value = t; grade.uniforms.toneMappingExposure.value = exposure;
      grade.uniforms.uNear.value = camera.near; grade.uniforms.uFar.value = camera.far;
      composer.render(dt);
    },
  };
  return P;
}
