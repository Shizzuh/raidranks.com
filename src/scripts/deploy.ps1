function Header($message) {
  Write-Host ""
  Write-Host "==========================================" -ForegroundColor Blue
  Write-Host "$message" -ForegroundColor Blue
  Write-Host "==========================================" -ForegroundColor Blue
  Write-Host ""
}

function Deploy($environment) {
  Write-Host "Deployment sequence initiated for '$environment'." -ForegroundColor Blue
  Header("Building Project...")
  $currentDir = Get-Location
  Set-Location -Path ../../ -PassThru
  ng build --prod
  Header("Creating Progressive Web App Assets...")
  mkdir public\.well-known
  cp -r assetlinks.json public\.well-known
  Header("Updating ads.txt...")
  cp -r ads.txt public
  Header("Deploying to Firebase...")
  firebase deploy --only hosting:$environment
  Set-Location "$currentDir"
  Header("You have finished deploying to '$environment'.")
}

function DrawMenu {
    param ($menuItems, $menuPosition, $menuTitel)
    $fcolor = $host.UI.RawUI.ForegroundColor
    $bcolor = $host.UI.RawUI.BackgroundColor
    $l = $menuItems.length
    cls
    $menuwidth = $menuTitel.length - 3
    Write-Host ""
    Write-Host "$menuTitel" -fore $fcolor -back $bcolor
    Write-Host ("=" * $menuwidth) -fore $fcolor -back $bcolor
    Write-Host ""
    Write-debug "L: $l MenuItems: $menuItems MenuPosition: $menuposition"
    for ($i = 0; $i -le $l;$i++) {
        if ($i -eq $menuPosition) {
            Write-Host "$($menuItems[$i]) <-" -ForegroundColor Blue -back $bcolor
        } else {
            Write-Host "$($menuItems[$i])" -fore $fcolor -back $bcolor
        }
    }
}

function Menu {
    param ([array]$menuItems, $menuTitel = "MENU")
    $vkeycode = 0
    $pos = 0
    DrawMenu $menuItems $pos $menuTitel
    While ($vkeycode -ne 13) {
        $press = $host.ui.rawui.readkey("NoEcho,IncludeKeyDown")
        $vkeycode = $press.virtualkeycode
        Write-host "$($press.character)" -NoNewLine
        If ($vkeycode -eq 38) {$pos--}
        If ($vkeycode -eq 40) {$pos++}
        if ($pos -lt 0) {$pos = 0}
        if ($pos -ge $menuItems.length) {$pos = $menuItems.length -1}
        DrawMenu $menuItems $pos $menuTitel
    }
    Write-Output $($menuItems[$pos])
}

$bad = "dev", "qa", "prod"
$selection = Menu $bad "What environment do you want to deploy?"
Deploy($selection)
