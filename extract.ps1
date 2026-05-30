mkdir temp_docx -ErrorAction SilentlyContinue
tar -xf 6.docx -C temp_docx
[xml]$xml = Get-Content temp_docx\word\document.xml
$xml.SelectNodes("//*[local-name()='t']") | ForEach-Object { $_."#text" } > extracted.txt
Remove-Item -Recurse -Force temp_docx
Get-Content extracted.txt
