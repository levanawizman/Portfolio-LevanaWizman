$Destination = "C:\Users\levan\test-portfolio\portfolio-react\public\presentation"
$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $Destination)) {
  Write-Host "Destination introuvable: $Destination"
  exit 1
}

# 1) Sélectionne d'abord les exports bruts (ex: Diapositive1.PNG / Slide1.PNG), évite de retoucher les slide-*.png existants
$rawFiles = Get-ChildItem -LiteralPath $Destination -Filter '*.PNG' | Where-Object { $_.BaseName -notmatch '^slide-\d{1,3}$' }
# 2) Trie numériquement selon le nombre extrait du nom (au lieu d'un tri lexical)
$sortedRaw = $rawFiles | Sort-Object { 
  $n = [int]($_.BaseName -replace '^[^0-9]*','')
  if ($n -lt 0) { 999999 } else { $n }
}

# 3) Renomme en slide-XX.png avec padding dynamique (au moins 2 chiffres)
$count = $sortedRaw.Count
if ($count -lt 1) { $count = 1 }
$padWidth = [Math]::Max(2, [int][Math]::Ceiling([Math]::Log10([double]($count + 1))))
$i = 1
foreach ($f in $sortedRaw) {
  $numStr = $i.ToString(("D{0}" -f $padWidth))
  $newName = "slide-$numStr.png"
  $target = Join-Path $Destination $newName
  if (-not (Test-Path -LiteralPath $target)) {
    Rename-Item -LiteralPath $f.FullName -NewName $newName -Force
  }
  $i++
}

# 4) Construit le manifest uniquement depuis les nouveaux fichiers normalisés (slide-XX.png)
$slides = @()
#    Filtre: slide-XX.png (au moins 2 chiffres) pour éviter slide-1.png tout en acceptant slide-100.png
Get-ChildItem -LiteralPath $Destination -Filter 'slide-*.png' | Where-Object {
  $_.Name -match '^slide-\d{2,}\.png$'
} | Sort-Object {
  [int]($_.BaseName -replace '^[^0-9]*','')
} | ForEach-Object {
  $slides += ('/presentation/' + $_.Name)
}

$manifest = @{ slides = $slides } | ConvertTo-Json -Depth 2
Set-Content -LiteralPath (Join-Path $Destination 'manifest.json') -Value $manifest -Encoding utf8


