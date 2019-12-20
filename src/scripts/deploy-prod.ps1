$currentDir = Get-Location

Set-Location -Path ../../ -PassThru

ng build --prod
mkdir public\.well-known
cp -r assetlinks.json public\.well-known
cp -r ads.txt public
firebase deploy --only hosting:prod

Set-Location "$currentDir"
