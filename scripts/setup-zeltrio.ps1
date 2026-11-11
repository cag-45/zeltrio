$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$imagesTargetDir = Join-Path $projectRoot "public\images"

if (-not (Test-Path $imagesTargetDir)) {
    New-Item -ItemType Directory -Path $imagesTargetDir -Force | Out-Null
}

$assetMap = @(
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\.user_uploaded\media_1794409134557_e063fe15.jpg"
        Target = Join-Path $imagesTargetDir "zeltrio-logo.jpg"
    },
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\digital_agency_team_hero_1794409872699.jpg"
        Target = Join-Path $imagesTargetDir "hero-team-working.jpg"
    },
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\agency_team_modern_studio_1794409880156.jpg"
        Target = Join-Path $imagesTargetDir "studio-collaboration-bg.jpg"
    },
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\website_development_collaboration_1794409874624.jpg"
        Target = Join-Path $imagesTargetDir "service-website-development.jpg"
    },
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\seo_services_specialist_1794409875060.jpg"
        Target = Join-Path $imagesTargetDir "service-seo-services.jpg"
    },
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\digital_marketing_creator_studio_1794409926853.jpg"
        Target = Join-Path $imagesTargetDir "service-digital-marketing.jpg"
    },
    @{
        Source = "C:\Users\SIRI TECH_HYD\.gemini\antigravity\brain\f7ce2117-9aef-4872-bfa2-14f34ef39a75\business_automation_specialist_1794409928904.jpg"
        Target = Join-Path $imagesTargetDir "service-business-automation.jpg"
    }
)

Write-Host "Copying Zeltrio brand logo and studio photography..."
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
