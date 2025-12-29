Param(
  [string]$Source = "C:\Users\levan\test-portfolio\portfolio-react\public\2C-Demarches (10).pptx",
  [string]$Destination = "C:\Users\levan\test-portfolio\portfolio-react\public\presentation",
  [int]$Width = 1920,
  [int]$Height = 1080
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $Destination)) {
  New-Item -ItemType Directory -Path $Destination | Out-Null
}

$pp = $null
$pres = $null

try {
  $pp = New-Object -ComObject PowerPoint.Application
  $pres = $pp.Presentations.Open($Source, $false, $true, $false)
  # Export every slide as PNG images
  $pres.Export($Destination, 'PNG', $Width, $Height)
}
finally {
  if ($pres -ne $null) { $pres.Close() | Out-Null }
  if ($pp -ne $null) { $pp.Quit() | Out-Null }
  [System.GC]::Collect()
  [System.GC]::WaitForPendingFinalizers()
}

# L’export brut ne renomme plus; le renommage + manifest sont gérés par rename-slides.ps1
