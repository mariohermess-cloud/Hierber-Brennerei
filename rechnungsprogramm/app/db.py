"""Datenbankzugriff. Eine Verbindung je Anfrage, alles in Transaktionen."""
from __future__ import annotations

import os
from contextlib import contextmanager
from typing import Any, Iterator

import psycopg
from psycopg.rows import dict_row

VERBINDUNG = os.environ.get(
    "BRENNEREI_DB",
    "postgresql://postgres@localhost:5432/brennerei",
)


SUCHPFAD = "-c search_path=brennerei,public"


@contextmanager
def verbindung() -> Iterator[psycopg.Connection]:
    """Offene Verbindung mit Schema brennerei und Dictionary-Zeilen.

    Der Suchpfad kommt aus den Verbindungsoptionen, nicht aus einem SET.
    Ein SET innerhalb einer Transaktion ginge bei einem Rollback verloren.
    """
    with psycopg.connect(VERBINDUNG, row_factory=dict_row, options=SUCHPFAD) as con:
        yield con


def alle(con: psycopg.Connection, sql: str, *args: Any) -> list[dict]:
    with con.cursor() as cur:
        cur.execute(sql, args or None)
        return cur.fetchall()


def eine(con: psycopg.Connection, sql: str, *args: Any) -> dict | None:
    with con.cursor() as cur:
        cur.execute(sql, args or None)
        return cur.fetchone()


def ausfuehren(con: psycopg.Connection, sql: str, *args: Any) -> None:
    with con.cursor() as cur:
        cur.execute(sql, args or None)
