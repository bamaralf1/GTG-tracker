$content = Get-Content "C:\Users\PICHAU\Desktop\GTG GM\index.html" -Raw
$idx = $content.IndexOf('chart-toggles')
Write-Host "Index: $idx"
if ($idx -ge 0) {
    Write-Host "Context:"
    Write-Host $content.Substring($idx, 350)
}