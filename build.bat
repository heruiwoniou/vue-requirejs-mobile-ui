@echo off
echo.
set "dist="&set "out="
setlocal
set /p dist=请输入要打包的目录(留空为默认值dist):
echo.
set /p out=请输入输出目录名(留空为默认值pack):
echo.
echo 正在对指定目录进行处理...
echo.
node build/node2build.js %dist% %out%
echo.
echo 打包已经完成,请按任意键退出
endlocal
@Pause>nul