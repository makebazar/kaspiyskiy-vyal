Add-Type -AssemblyName System.Drawing
$pngPath = Join-Path (Get-Location) "public\images\og-image.png"
$jpgPath = Join-Path (Get-Location) "public\images\og-image.jpg"
$appOgPath = Join-Path (Get-Location) "src\app\opengraph-image.png"
$appTwitterPath = Join-Path (Get-Location) "src\app\twitter-image.png"

$img = [System.Drawing.Image]::FromFile($pngPath)

# Save as optimized JPEG
$codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
$jpegCodec = $null
foreach ($c in $codecs) {
    if ($c.MimeType -eq "image/jpeg") {
        $jpegCodec = $c
        break
    }
}

$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)

$img.Save($jpgPath, $jpegCodec, $encoderParams)

# Copy to app directory for Next.js convention
Copy-Item $pngPath $appOgPath -Force
Copy-Item $pngPath $appTwitterPath -Force

$img.Dispose()

Write-Host "Success! Created JPG:"
Get-Item $jpgPath | Select-Object Length, Name
Get-Item $appOgPath | Select-Object Length, Name
