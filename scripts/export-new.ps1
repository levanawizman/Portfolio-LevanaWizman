$ErrorActionPreference = 'Stop'
$Source = "C:\Users\levan\portfolio-react\public\2C-Demarches (10).pptx"
$Destination = "C:\Users\levan\portfolio-react\public\presentation"

if (-not (Test-Path -LiteralPath $Destination)) {
  New-Item -ItemType Directory -Path $Destination | Out-Null
}

$pp = New-Object -ComObject PowerPoint.Application
$pres = $pp.Presentations.Open($Source, $false, $true, $false)
$pres.Export($Destination, 'PNG', 1920, 1080)
$pres.Close()
$pp.Quit()
[System.GC]::Collect()
[System.GC]::WaitForPendingFinalizers()
Write-Host "Export done"
