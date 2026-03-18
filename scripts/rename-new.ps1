$Destination = "C:\Users\levan\portfolio-react\public\presentation"
$ErrorActionPreference = 'Stop'

$rawFiles = Get-ChildItem -LiteralPath $Destination -Filter '*.PNG' | Where-Object { $_.BaseName -match '^Diapositive' }
$sortedRaw = $rawFiles | Sort-Object { [int]($_.BaseName -replace '^[^0-9]*','') }

$i = 1
foreach ($f in $sortedRaw) {
  $numStr = $i.ToString("D2")
  $newName = "slide-$numStr.png"
  $target = Join-Path $Destination $newName
  if (Test-Path -LiteralPath $target) { Remove-Item -LiteralPath $target -Force }
  Rename-Item -LiteralPath $f.FullName -NewName $newName -Force
  $i++
}

$slides = @()
Get-ChildItem -LiteralPath $Destination -Filter 'slide-*.png' | Sort-Object {
  [int]($_.BaseName -replace '^[^0-9]*','')
} | ForEach-Object {
  $slides += ('/presentation/' + $_.Name)
}

$manifest = @{ slides = $slides } | ConvertTo-Json -Depth 2
Set-Content -LiteralPath (Join-Path $Destination 'manifest.json') -Value $manifest -Encoding utf8
Write-Host "Renamed $($slides.Count) slides"
