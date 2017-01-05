@echo off
echo "正在对指定内容进行打包处理。。。"
set /p var=请输入要打包的目录:
cd ..
echo.
@node build/node2build.js

echo 打包已经完成
@Pause>nul