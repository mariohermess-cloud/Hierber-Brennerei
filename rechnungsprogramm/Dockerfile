FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 TZ=Europe/Luxembourg
WORKDIR /programm

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./rechnungsprogramm/app
COPY vorlagen ./rechnungsprogramm/vorlagen
RUN touch ./rechnungsprogramm/__init__.py

# Nicht als root laufen
RUN useradd --create-home --uid 1000 brennerei && chown -R brennerei /programm
USER brennerei

EXPOSE 8000
HEALTHCHECK --interval=60s --timeout=5s --start-period=20s \
  CMD python -c "import urllib.request;urllib.request.urlopen('http://127.0.0.1:8000/gesund')"

CMD ["uvicorn", "rechnungsprogramm.app.web:app", "--host", "0.0.0.0", "--port", "8000"]
