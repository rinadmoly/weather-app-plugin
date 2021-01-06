(function( $ ){
    const link = "http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q="
    const coordLink = 'http://api.openweathermap.org/data/2.5/onecall?'
    const dailyOptions = '&exclude=current,minutely,hourly&units=metric&lang=ru'
    const key = '&appid=d231238d181a714f04ca0c17e7c53b17'
 
    $(document).ready(function(){
        $.ajax({
            url: link + "bishkek" + key,
            dataType: 'json',
            success: function(data){
                var icon = data.weather[0].icon
                $('#city').append(data.name);
                $('#temp').text(data.main.temp + "℃")
                $('#weather').text(data.weather[0].description)
                $('#header-img').attr('src', 'http://openweathermap.org/img/wn/'+icon+'@2x.png')
                var lat = data.coord.lat
                var lon = data.coord.lon
                var coord = 'lat='+lat+'&'+'lon='+lon
                daily(coord)
            }
        })
    })

    $('#search').click(function(){
        var valu = document.querySelector('#input').value
        $.ajax({
            url: link + valu + key,
            dataType: 'json',
            success: function(data){
                var icon = data.weather[0].icon
                $('#city').text(data.name);
                $('#temp').text((data.main.temp) + "℃")
                $('#weather').text(data.weather[0].description)
                $('#header-img').attr('src', 'http://openweathermap.org/img/wn/'+icon+'@2x.png')
                var lat = data.coord.lat
                var lon = data.coord.lon
                var coord = 'lat='+lat+'&'+'lon='+lon
                daily(coord)
            }
        })
    })
        
    function daily(coord){
        $.ajax({
            url: coordLink+coord+dailyOptions+key,
            dataType: 'json',
            success: function(data){
            var arr = data.daily
            var table = $('<table></table>').attr('id', 'table')
            $('#table').text('')
            for(i=1; i<arr.length; i++){
                var tr = $('<tr></tr>').attr('class', 'row')
                for(j=0; j<4; j++){
                    var td =$('<td></td>').attr('class', `table${+[j]}`)
                    switch(j){
                        case 0:
                            td.append(day(arr[i].dt))
                            tr.append(td)
                        break; 
                        case 1:
                            var icon = arr[i].weather[0].icon
                            var image = $('<img/>').attr('src', 'http://openweathermap.org/img/wn/'+icon+'@2x.png')
                            td.append(image)
                            tr.append(td)
                        break; 
                        case 2:
                            td.append(arr[i].temp.day+"℃")
                            tr.append(td)
                        break; 
                        case 3:
                            td.append(arr[i].temp.night+"℃")
                            tr.append(td)
                        break;         
                    }
                    tr.append(td)
                }    
                $('#table').append(tr)       
                }
            }      
        })
    };

    function day(date){
        var d = new Date(date*1000)
        var days = ["Воскресение", "Понеделник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",];
        var day = days[d.getDay()]
        return day
    }
})( jQuery );