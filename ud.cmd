@echo off
set cdir=ja
echo updating
"C:\Program Files\Git\usr\bin\bash" --login ./update.sh %cdir%/%1
@powershell markdown-toc --json md/%cdir%/%1.md >> page/%cdir%/%1.html
echo '^>^</md-toc^> >> page/%cdir%/%1.html
marked md/%cdir%/%1.md >> page/%cdir%/%1.html