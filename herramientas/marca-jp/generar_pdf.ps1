# Genera el PDF del manual de marca a partir de manual.html (necesita Edge y la tipografía Poppins instalada).
$aqui = Split-Path -Parent $MyInvocation.MyCommand.Path
$pdf = Join-Path $aqui "JP - Manual de marca.pdf"
$url = "file:///" + ((Join-Path $aqui "manual.html") -replace '\\', '/' -replace ' ', '%20')
$perfil = Join-Path $env:TEMP "edge-manual-jp"
Start-Process -Wait -FilePath "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList @(
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=15000",
  "--user-data-dir=`"$perfil`"", "--print-to-pdf=`"$pdf`"", "`"$url`""
)
Get-Item $pdf | Select-Object Name, Length
