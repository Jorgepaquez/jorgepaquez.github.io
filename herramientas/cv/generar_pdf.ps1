# Genera el PDF del curriculum a partir de cv.html, que toma los datos de assets/js/data.js (necesita Edge).
# Sin argumentos lo deja en el escritorio; se le puede pasar otra ruta de destino.
# El que descarga el sitio es assets/documentos/jorge-paquez-cv.pdf: una vez validado, copiarlo ahi.
param([string]$pdf)
$aqui = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $pdf) { $pdf = Join-Path ([Environment]::GetFolderPath('Desktop')) ("CV - Jorge Paqu" + [char]0xE9 + "z.pdf") }
$url = "file:///" + ((Join-Path $aqui "cv.html") -replace '\\', '/' -replace ' ', '%20')
$perfil = Join-Path $env:TEMP "edge-cv-jp"
Start-Process -Wait -FilePath "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList @(
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=15000",
  "--user-data-dir=`"$perfil`"", "--print-to-pdf=`"$pdf`"", "`"$url`""
)
Get-Item $pdf | Select-Object Name, Length
