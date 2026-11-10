$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$imagesTargetDir = Join-Path $projectRoot "public\images"

if (-not (Test-Path $imagesTargetDir)) {
    New-Item -ItemType Directory -Path $imagesTargetDir -Force | Out-Null
}

$assetMap = @(
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\.user_uploaded\media_1794323676354_9c052013.jpg"
        Target = Join-Path $imagesTargetDir "zeltrio-logo.jpg"
    },
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\service_website_development_1794324192909.jpg"
        Target = Join-Path $imagesTargetDir "service-website-development.jpg"
    },
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\service_seo_services_1794324198347.jpg"
        Target = Join-Path $imagesTargetDir "service-seo-services.jpg"
    },
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\service_digital_marketing_1794324206082.jpg"
        Target = Join-Path $imagesTargetDir "service-digital-marketing.jpg"
    },
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\service_business_automation_1794324223514.jpg"
        Target = Join-Path $imagesTargetDir "service-business-automation.jpg"
    }
)

Write-Host "Copying Zeltrio brand logo and service photographs..."
foreach ($item in $assetMap) {
    if (Test-Path $item.Source) {
        Copy-Item -Path $item.Source -Destination $item.Target -Force
        Write-Host "  Copied $(Split-Path -Leaf $item.Target)"
    } else {
        Write-Warning "  Missing source file: $($item.Source)"
    }
}

Write-Host "Installing npm dependencies..."
Set-Location $projectRoot
npm install

Write-Host "Setup complete. Run 'npm run dev' to preview locally or 'npm run build' to verify production output."

