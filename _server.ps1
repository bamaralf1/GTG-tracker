Get-Process python -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1
$dir = 'C:\Users\PICHAU\Desktop\GTG GM'
$py = 'C:\Python314\python.exe'
$script = Join-Path $dir '_serve.py'
# Use cmd-style command to avoid PS argument splitting issues
cmd /c "start /B `"$py`" `"$script`" `"$dir`" > `"$dir\server.log`" 2> `"$dir\server.err.log`""
Start-Sleep -Seconds 3
Get-Process python -ErrorAction SilentlyContinue | Select-Object Id, ProcessName
Get-Content "$dir\server.log" -ErrorAction SilentlyContinue
Get-Content "$dir\server.err.log" -ErrorAction SilentlyContinue