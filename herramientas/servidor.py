"""Sirve el sitio para verlo mientras se edita, en la PC y en el celular.

Escucha en todas las interfaces, así cualquier dispositivo conectado a la
misma red wifi puede abrirlo con la dirección "En la red" que se muestra al
arrancar. Le pide al navegador que no guarde nada en caché, así los cambios se
ven con un F5 normal. Uso: python servidor.py [puerto]
"""
import socket
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent


class SinCache(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def ip_local():
    """IP de esta PC en la red local (la que usa para salir a internet)."""
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        try:
            s.connect(("10.255.255.255", 1))  # no envía nada, solo elige la interfaz
            return s.getsockname()[0]
        except OSError:
            return "127.0.0.1"


if __name__ == "__main__":
    puerto = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f"En esta PC: http://127.0.0.1:{puerto}/", flush=True)
    print(f"En la red:  http://{ip_local()}:{puerto}/  (celular en la misma wifi)", flush=True)
    print("Ctrl+C para detenerlo.", flush=True)
    ThreadingHTTPServer(("0.0.0.0", puerto), partial(SinCache, directory=str(RAIZ))).serve_forever()
