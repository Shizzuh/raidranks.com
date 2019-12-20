$currentDir = Get-Location

Set-Location -Path ../../ -PassThru

ng build --prod
mkdir dist\rsl\.well-known
cp -r assetlinks.json dist\rsl\.well-known
cp -r ads.txt dist\rsl
firebase deploy --only hosting:raid-ranks-dev

Set-Location "$currentDir"
