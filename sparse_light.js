// Нам нужны два аргумента
if (WScript.Arguments.Length == 2)
{
	// Первый аргумент размер файла
	var file_size = parseInt( WScript.Arguments.Item(0) );
	
	// Второй аргумент размер части файла которую стираем
	var sparse_size = parseInt( WScript.Arguments.Item(1) ); 
	
	if ( file_size > 0 && sparse_size > 0 && sparse_size < file_size )
	{
		// Если стираемая часть меньше половины файла то
		if ( file_size / 2 > sparse_size )
			// Вычисляем позицию с которой будем стирать файл и возврашаем размер стираемой части без изменений
			WScript.Echo( Math.round( ( file_size - sparse_size ) * Math.random() ), sparse_size );
		else 
		{
			// Здесть мы стираем большую часть файла поэтому вычисляем позицию для оставшегося кусочка данных
			var data_size = file_size - sparse_size;
			var data_pos = Math.round( ( file_size - data_size ) * Math.random() );
			
			// Возвращаем стираемый отрезок до данных
			if ( data_pos > 0 )
				WScript.Echo( 0, data_pos );
			
			
			var sparse_pos = data_pos + data_size;
			// Возвращаем стираемый отрезок после данных
			if ( sparse_pos < file_size )
				WScript.Echo( sparse_pos, file_size - sparse_pos );
		}
	}
}