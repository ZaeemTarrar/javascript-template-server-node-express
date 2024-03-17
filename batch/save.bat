@echo off

ls -lahs ;
git status ;
git add . ;
git status ;
git commit -m "%1" ;
git status ;
git push ;