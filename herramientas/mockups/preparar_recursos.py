"""Reúne en recursos/ los logos y capturas que usan los mockups."""
import shutil
from collections import Counter
from pathlib import Path

from PIL import Image

AQUI = Path(__file__).parent
RAIZ = AQUI.parent.parent
REC = AQUI / "recursos"
DOC = Path.home() / "Documents"
ESC = Path.home() / "Desktop"
REC.mkdir(exist_ok=True)


def copiar(origen, nombre):
    shutil.copyfile(origen, REC / nombre)


def recortar(img, margen=0):
    caja = img.getchannel("A").getbbox()
    caja = (max(caja[0] - margen, 0), max(caja[1] - margen, 0), min(caja[2] + margen, img.width), min(caja[3] + margen, img.height))
    return img.crop(caja)


# Kakeibo
for origen, nombre in ((DOC / "Kakeibo" / "Logo-Kakeibo.png", "kakeibo-iso-ambar.png"), (DOC / "Kakeibo" / "Logo-Kakeibo-claro.png", "kakeibo-iso-azul.png")):
    img = recortar(Image.open(origen).convert("RGBA"))
    img.thumbnail((900, 900), Image.LANCZOS)
    img.save(REC / nombre)
    px = [p[:3] for p in img.getdata() if p[3] > 250]
    print(nombre, img.size, "color", "#%02x%02x%02x" % Counter(px).most_common(1)[0][0])
blanco = Image.open(REC / "kakeibo-iso-azul.png")
Image.merge("RGBA", (*Image.new("RGB", blanco.size, (255, 255, 255)).split(), blanco.getchannel("A"))).save(REC / "kakeibo-iso-blanco.png")
copiar(DOC / "Kakeibo" / "assets" / "icon.png", "kakeibo-icono.png")
print("kakeibo icono", Image.open(REC / "kakeibo-icono.png").size)
for n in ("02", "04", "20"):
    copiar(RAIZ / "assets/img/software/kakeibo" / f"{n}.png", f"kakeibo-app-{n}.png")
for n in ("oscuro-resumen", "oscuro-tarjetas", "claro-resumen"):  # mockups de la sección Software
    copiar(RAIZ / "assets/img/software/kakeibo" / f"{n}.png", f"kakeibo-app-{n}.png")

# PhotoSorter
for n in ("positivo", "negativo", "icono", "mono-blanco"):
    copiar(RAIZ / "herramientas/manual-photosorter/logos" / f"{n}.png", f"photosorter-{n}.png")
copiar(RAIZ / "assets/img/software/photosorter/app.png", "photosorter-app.png")

# Fotique (la carpeta de origen conserva el nombre anterior): logo desde el PSD, en negro y en blanco, con transparencia
psd = recortar(Image.open(ESC / "Fotia" / "Logo Fotia.psd").convert("RGBA"))
psd.save(REC / "fotique-negro.png")
claro = psd.copy()
px = claro.load()
for y in range(claro.height):
    for x in range(claro.width):
        r, g, b, a = px[x, y]
        if a and max(r, g, b) < 90:
            px[x, y] = (255, 255, 255, a)
claro.save(REC / "fotique-blanco.png")
rosa = Counter(p[:3] for p in psd.getdata() if p[3] > 250 and max(p[:3]) > 150).most_common(1)[0][0]
print("fotique", psd.size, "rosa", "#%02x%02x%02x" % rosa)

# Munay
for n in ("principal", "blanco-transparente", "positivo-transparente"):
    copiar(RAIZ / "herramientas/manual-munay/logos" / f"{n}.png", f"munay-{n}.png")
copiar(RAIZ / "herramientas/manual-munay/capturas/app-claro.png", "munay-app.png")
for i, n in enumerate(("_DSC0021.jpg", "_DSC0024.jpg", "_DSC0027.jpg"), 1):
    img = Image.open(ESC / "Munay" / "Topper" / n).convert("RGB")
    img.thumbnail((1000, 1000), Image.LANCZOS)
    img.save(REC / f"munay-producto-{i}.jpg", quality=86)

# Convertidor a Markdown
for n in ("04", "05"):
    copiar(RAIZ / "assets/img/software/markdown" / f"{n}.png", f"markdown-app-{n}.png")

# Capturas para los mockups de la sección Software
for proyecto, nombres in (("fotique", ("oscuro-resumen", "claro-resumen", "oscuro-proyectos")),
                          ("photosorter", ("02-procesando", "03-finalizado", "04-vertical")),
                          ("munay", ("claro-cotizar", "oscuro-cotizar", "claro-ventas"))):
    for n in nombres:
        copiar(RAIZ / "assets/img/software" / proyecto / f"{n}.png", f"{proyecto}-app-{n}.png")

# Marca personal
for n in ("jp-azul", "jp-blanco", "jp-ambar", "jp-negro", "jp-negro-punto-blanco", "jp-azul-punto-blanco", "jp-icono-azul", "jp-icono-ambar", "jp-icono-negro"):
    copiar(RAIZ / "herramientas/marca-jp/logos" / f"{n}.svg", f"{n}.svg")

# Fotos propias para ambientar
for i, n in enumerate(("007", "012", "003", "020"), 1):
    copiar(RAIZ / "assets/img/fotografia/naturaleza/mini" / f"{n}.jpg", f"foto-{i}.jpg")
copiar(RAIZ / "assets/img/fotografia/naturaleza/007.jpg", "foto-grande.jpg")
copiar(RAIZ / "assets/img/fotografia/eventos/street-car-meet-3/mini/008.jpg", "foto-5.jpg")
print(len(list(REC.iterdir())), "recursos")

# Apps nuevas (CatalogoYa, Transcriptor, Recibapp, AutoControl, Flashed)
PROY = RAIZ.parent  # carpeta que contiene este proyecto y los demás
SW = RAIZ / "assets/img/software"
for proyecto, nombres in (("catalogoya", ("01-inicio", "02-pedidos", "03-pedido", "04-productos", "06-calendario")),
                          ("transcriptor", ("01-inicio", "02-transcripcion", "03-motor")),
                          ("autocontrol", ("01-resumen", "02-service", "03-combustible", "04-papeles", "logo"))):
    for n in nombres:
        copiar(SW / proyecto / f"{n}.png", f"{proyecto}-{n}.png")
# Recibapp: capturas largas de escritorio y de teléfono, recortadas a una pantalla
cap = PROY / "Recibapp/build/screenshots"
for n in ("1-resumen", "2-recibos", "3-comparar"):
    Image.open(cap / f"desktop-{n}.png").convert("RGB").crop((0, 0, 1280, 800)).save(REC / f"recibapp-escritorio-{n}.png")
    Image.open(cap / f"phone-{n}.png").convert("RGB").crop((0, 0, 400, 866)).save(REC / f"recibapp-telefono-{n}.png")
# Flashed: capturas del juego y figuras de la portada de itch.io
ITCH = PROY / "Flashed-itchio"
for n in ("1-objetivo", "3-quince", "4-discoteca", "5-jefe"):
    copiar(ITCH / f"captura-{n}.png", f"flashed-{n}.png")
for n in ("fotografo", "dj", "flash", "fondo"):
    copiar(ITCH / "partes" / f"{n}.png", f"flashed-{n}.png")
print(len(list(REC.iterdir())), "recursos")
