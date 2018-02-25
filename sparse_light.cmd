@rem Первый аргумент это полный путь к файлу
@rem Второй аргумент часть которую мы стираем

@setlocal

@rem Предупреждаем перед тем как затирать части файла
@echo This script will erase some of the data (%2 bytes) from the file: %1
@set /P AREYOUSURE=Are you sure (Y/[N])?
@if /I "%AREYOUSURE%" NEQ "Y" goto END

@rem Устанавливаем флаг разрежённого файла
fsutil sparse setflag %1

@rem Циклом читаем позицию и размер участка которые нам вернёт sparse_light.js и прореживаем эту часть файла
for /f "tokens=1,2" %%i in ('cscript //nologo "%~dp0sparse_light.js" %~z1 %2') do (
 fsutil sparse setrange %1 %%i %%j
)

:END
@endlocal