 var searchbar = document.getElementById("searchbar")
 var searchbutton = document.getElementById("searchbtn")


 







function searchvalue(){

    //get searched value
    var search = searchbar.value

    search = search.trim()

    //send request for current date 
    var apiUrl1 ="https://api.openweathermap.org/data/2.5/weather?q="+ search + "&units=imperial"+ "&appid=" + "43ef190af294b1e96143aa8fe5347765"

    // show request and convert, or log errors        
    fetch(apiUrl1).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
            console.log(data);

            //get lon, lat 
            var lon = data.coord.lon
            var lat = data.coord.lat
            
            //convert temp  and wind speed to whole number
            var tempnow = Math.floor(data.main.temp);
            var windnow = Math.floor(data.wind.speed);

            //write data to page 
            document.getElementById("cityname").textContent = data.name
            document.getElementById("temp").textContent = tempnow
            document.getElementById("wet").textContent = data.main.humidity   
            document.getElementById("speed").textContent = windnow

            //display ui icon
            var icon=data.weather[0]
            var iconnow =icon.icon  
            var iconlink = ("http://openweathermap.org/img/wn/" + iconnow +"@2x.png")
            document.getElementById("icon").style.display ="block"
           document.getElementById("icon").style.backgroundImage = "url(" + iconlink +")"
            
            


            //request UV index Data 
            var apiUrl2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat +"&lon="+lon+"&appid=43ef190af294b1e96143aa8fe5347765"

            fetch(apiUrl2).then(function(response){
                if (response.ok) {
                    console.log(response);
                    response.json().then(function(data) {
                        console.log(data);

                    //pull value from uv fetch
                   var uv = data.value

                   uv= Math.floor(data.value)

                    //write uv to page 
                    document.getElementById("uvindex").style.display ="block"
                    document.getElementById("uvindex").textContent =uv;

                    // color code UV index 
                    if(uv <= 2){
                        document.getElementById("uvindex").style.background = "green"
                        document.getElementById("uvindex").style.color = "white"
                    }    
                    if(uv >= 3 && uv <= 5){
                        document.getElementById("uvindex").style.background = "yellow"
                        document.getElementById("uvindex").style.color = "black"
                    } 
                    if(uv >= 6 && uv <= 7){
                        document.getElementById("uvindex").style.background = "orange"
                        document.getElementById("uvindex").style.color = "black"
                    } 
                    if(uv >= 8 && uv <= 10){
                        document.getElementById("uvindex").style.background = "red"
                        document.getElementById("uvindex").style.color = "white"
                    } 

                 })   
                }


                
            })

            //fetch 5 day forecast 
            var apiUrl3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + search +"&units=imperial" + "&appid=43ef190af294b1e96143aa8fe5347765"

            fetch(apiUrl3).then(function(response){ 
                if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);

                //data extraction
                var date1 = data.list[0].dt_txt
                var date1temp = data.list[0].main.temp
                var date1hum = data.list[0].main.humidity
                var date1icon =data.list[0].weather[0].icon
                

                    //day2
                var date2 = data.list[11].dt_txt
                var date2temp = data.list[11].main.temp
                var date2hum = data.list[11].main.humidity
                var date2icon =data.list[11].weather[0].icon

                    //day3
                var date3 = data.list[19].dt_txt
                var date3temp = data.list[19].main.temp
                var date3hum = data.list[19].main.humidity  
                var date3icon =data.list[19].weather[0].icon
                    
                    //day4
                var date4 = data.list[27].dt_txt
                var date4temp = data.list[27].main.temp
                var date4hum = data.list[27].main.humidity
                var date4icon =data.list[27].weather[0].icon
                    
                    //day5
                var date5 = data.list[35].dt_txt
                var date5temp = data.list[35].main.temp
                var date5hum = data.list[35].main.humidity
                var date5icon =data.list[35].weather[0].icon

                //convert temps to whole numbers
                date1temp = Math.floor(date1temp)
                date2temp = Math.floor(date2temp)
                date3temp = Math.floor(date3temp)
                date4temp = Math.floor(date4temp)
                date5temp = Math.floor(date5temp)

                var day1iconlink = ("http://openweathermap.org/img/wn/" + date1icon +"@2x.png")
                var day2iconlink = ("http://openweathermap.org/img/wn/" + date2icon +"@2x.png")
                var day3iconlink = ("http://openweathermap.org/img/wn/" + date3icon +"@2x.png")
                var day4iconlink = ("http://openweathermap.org/img/wn/" + date4icon +"@2x.png")
                var day5iconlink = ("http://openweathermap.org/img/wn/" + date5icon +"@2x.png")
                //write data 
                //day1
                document.getElementById("day1").textContent = date1
                document.getElementById("day1temp").textContent = date1temp
                document.getElementById("day1hum").textContent =date1hum
                document.getElementById("day1icon").style.display ="flex"
                document.getElementById("day1icon").style.backgroundImage = "url(" + day1iconlink +")"

                //day2
                document.getElementById("day2").textContent = date2
                document.getElementById("day2temp").textContent = date2temp
                document.getElementById("day2hum").textContent =date2hum
                document.getElementById("day2icon").style.display ="flex"
                document.getElementById("day2icon").style.backgroundImage = "url(" + day2iconlink +")"

                //day3
                document.getElementById("day3").textContent = date3
                document.getElementById("day3temp").textContent = date3temp
                document.getElementById("day3hum").textContent =date3hum
                document.getElementById("day3icon").style.display ="flex"
                document.getElementById("day3icon").style.backgroundImage = "url(" + day3iconlink +")"

                //day4
                document.getElementById("day4").textContent = date4
                document.getElementById("day4temp").textContent = date4temp
                document.getElementById("day4hum").textContent =date4hum
                document.getElementById("day4icon").style.display ="flex"
                document.getElementById("day4icon").style.backgroundImage = "url(" + day4iconlink +")"

                //day5
                document.getElementById("day5").textContent = date5
                document.getElementById("day5temp").textContent = date5temp
                document.getElementById("day5hum").textContent =date5hum
                document.getElementById("day5icon").style.display ="flex"
                document.getElementById("day5icon").style.backgroundImage = "url(" + day5iconlink +")"


                })   
            }


                
        })


        });

        } else {
        alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect");
    });

     

};
    

     
    
  






searchbutton.addEventListener("click",function(){

searchvalue();

});