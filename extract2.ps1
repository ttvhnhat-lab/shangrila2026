mkdir temp_docx -ErrorAction SilentlyContinue
tar -xf 6.docx -C temp_docx
[xml]$xml = Get-Content temp_docx\word\document.xml -Encoding UTF8
$text = $xml.SelectNodes("//*[local-name()='t']") | ForEach-Object { $_."#text" }
[System.IO.File]::WriteAllLines((Join-Path (Get-Location) "extracted.txt"), $text, [System.Text.Encoding]::UTF8)
Remove-Item -Recurse -Force temp_docx
