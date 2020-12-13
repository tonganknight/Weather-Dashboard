 var searchbar = document.getElementById("searchbar")
 var searchbutton = document.getElementById("searchbtn")
 var callbackarray = []

 







function searchvalue(){

    //get searched value
    var search = searchbar.value

    search = search.trim()

    //send request for current date 
    var apiUrl1 ="https://api.openweathermap.org/data/2.5/weather?q="+ search + "&units=imperial"+ "&appid=" + "43ef190af294b1e96143aa8fe5347765"

    // show request and convert, or log errors        
    fetch(apiUrl1).then(function(response) {
        if (response.ok) {
           
            response.json().then(function(data) {
            

            //create element to history list 
            var entryLi = document.createElement("li")
            entryLi.textContent = search;
            entryLi.setAttribute("class", "list-group-item");
            entryLi.setAttribute("data",search);
            document.getElementById("history").appendChild(entryLi);

            //write history to storage 
           
            callbackarray.push(search);

            window.localStorage.setItem("items",JSON.stringify(callbackarray))
            
            console.log()



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

            //write values to Storage 
            window.localStorage.setItem("Cityname",data.name);
            window.localStorage.setItem("tempnow", tempnow);
            window.localStorage.setItem("wet", data.main.humidity);
            window.localStorage.setItem("wet", windnow);


            //display ui icon
            var icon=data.weather[0]
            var iconnow =icon.icon  
            var iconlink = ("https://openweathermap.org/img/wn/" + iconnow +"@2x.png")
            document.getElementById("icon").style.display ="block"
            document.getElementById("icon").style.backgroundImage = "url(" + iconlink +")"
            
            //write to storage
            window.localStorage.setItem("iconlink",iconlink);



            //request UV index Data 
            var apiUrl2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat +"&lon="+lon+"&appid=43ef190af294b1e96143aa8fe5347765"

            fetch(apiUrl2).then(function(response){
                if (response.ok) {
                   
                    response.json().then(function(data) {
                      

                    //pull value from uv fetch
                   var uv = data.value

                   uv= Math.floor(data.value)

                    //write uv to page 
                    document.getElementById("uvindex").style.display ="block"
                    document.getElementById("uvindex").textContent =uv;

                    //write to storage
                    window.localStorage.setItem("uv",uv);


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
            var apiUrl3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + search +"&units=imperial" + "&appid=43ef190af294b1e96143aa8fe5347765"

            fetch(apiUrl3).then(function(response){ 
                if (response.ok) {
              
                response.json().then(function(data) {
                    

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

                var day1iconlink = ("https://openweathermap.org/img/wn/" + date1icon +"@2x.png")
                var day2iconlink = ("https://openweathermap.org/img/wn/" + date2icon +"@2x.png")
                var day3iconlink = ("https://openweathermap.org/img/wn/" + date3icon +"@2x.png")
                var day4iconlink = ("https://openweathermap.org/img/wn/" + date4icon +"@2x.png")
                var day5iconlink = ("https://openweathermap.org/img/wn/" + date5icon +"@2x.png")
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

                
                //write values to Storage 
                //date1
                window.localStorage.setItem("date1",date1);
                window.localStorage.setItem("date1temp",date1temp);
                window.localStorage.setItem("date1hum",date1hum);
                window.localStorage.setItem("date1icon", date1icon);

                //date2
                window.localStorage.setItem("date2",date2);
                window.localStorage.setItem("date2temp",date2temp);
                window.localStorage.setItem("date2hum",date2hum);
                window.localStorage.setItem("date2icon", date2icon);

                //date3
                window.localStorage.setItem("date3",date3);
                window.localStorage.setItem("date3temp",date3temp);
                window.localStorage.setItem("date3hum",date3hum);
                window.localStorage.setItem("date3icon", date3icon);
                
                //date4
                window.localStorage.setItem("date4",date4);
                window.localStorage.setItem("date4temp",date4temp);
                window.localStorage.setItem("date4hum",date4hum);
                window.localStorage.setItem("date4icon", date4icon);
                
                //date5
                window.localStorage.setItem("date5",date5);
                window.localStorage.setItem("date5temp",date5temp);
                window.localStorage.setItem("date5hum",date5hum);
                window.localStorage.setItem("date5icon", date5icon);

                
        
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
    

 var historyClickHandler =function(event){
     //search for <Li> name 
     var history = event.target.getAttribute("data")
    if(history){
        var search = history.trim()

        //send request for current date 
    var apiUrl1 ="https://api.openweathermap.org/data/2.5/weather?q="+ search + "&units=imperial"+ "&appid=" + "43ef190af294b1e96143aa8fe5347765"

    // show request and convert, or log errors        
    fetch(apiUrl1).then(function(response) {
        if (response.ok) {
            
            response.json().then(function(data) {
         

            
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
            var iconlink = ("https://openweathermap.org/img/wn/" + iconnow +"@2x.png")
            document.getElementById("icon").style.display ="block"
           document.getElementById("icon").style.backgroundImage = "url(" + iconlink +")"
            
            


            //request UV index Data 
            var apiUrl2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat +"&lon="+lon+"&appid=" +"43ef190af294b1e96143aa8fe5347765"

            fetch(apiUrl2).then(function(response){
                if (response.ok) {
                   
                    response.json().then(function(data) {
                      

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
            var apiUrl3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + search +"&units=imperial" + "&appid=" +"43ef190af294b1e96143aa8fe5347765"

            fetch(apiUrl3).then(function(response){ 
                if (response.ok) {
               
                response.json().then(function(data) {
                  

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

                var day1iconlink = ("https://openweathermap.org/img/wn/" + date1icon +"@2x.png")
                var day2iconlink = ("https://openweathermap.org/img/wn/" + date2icon +"@2x.png")
                var day3iconlink = ("https://openweathermap.org/img/wn/" + date3icon +"@2x.png")
                var day4iconlink = ("https://openweathermap.org/img/wn/" + date4icon +"@2x.png")
                var day5iconlink = ("https://openweathermap.org/img/wn/" + date5icon +"@2x.png")
                //write data 
                //day1
                document.getElementById("day1").textContent = date1
                document.getElementById("day1temp").textContent = date1temp
                document.getElementById("day1hum").textContent = date1hum
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


 }

 function loaddata(){
    //today

    //get data
    var date = window.localStorage.getItem("Cityname");
    var tempnow = window.localStorage.getItem("tempnow");
    var humidity = window.localStorage.getItem("wet");
    var windnow = window.localStorage.getItem("wet");
    var iconlink = window.localStorage.getItem("iconlink");
    var uv = window.localStorage.getItem("uv");

    

    //write data 
    document.getElementById("cityname").textContent = date
    document.getElementById("temp").textContent = tempnow
    document.getElementById("wet").textContent = humidity 
    document.getElementById("speed").textContent = windnow

    document.getElementById("icon").style.display = "block"
    document.getElementById("icon").style.backgroundImage = "url(" + iconlink +")"
    document.getElementById("uvindex").style.display = "block"
    document.getElementById("uvindex").textContent = uv;

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

    //get 5 day forecast 
     //date1
     var date1 = window.localStorage.getItem("date1");
     var date1temp = window.localStorage.getItem("date1temp");
     var date1hum = window.localStorage.getItem("date1hum");
     var date1icon = window.localStorage.getItem("date1icon");

     //date2
     var date2 = window.localStorage.getItem("date2");
     var date2temp = window.localStorage.getItem("date2temp");
     var date2hum = window.localStorage.getItem("date2hum");
     var date2icon = window.localStorage.getItem("date2icon");

     //date3
     var date3 = window.localStorage.getItem("date3");
     var date3temp = window.localStorage.getItem("date3temp");
     var date3hum = window.localStorage.getItem("date3hum");
     var date3icon = window.localStorage.getItem("date3icon");
     
     //date4
     var date4 = window.localStorage.getItem("date4");
     var date4temp = window.localStorage.getItem("date4temp");
     var date4hum = window.localStorage.getItem("date4hum");
     var date4icon = window.localStorage.getItem("date4icon");
     
     //date5
     var date5 = window.localStorage.getItem("date5");
     var date5temp = window.localStorage.getItem("date5temp");
     var date5hum = window.localStorage.getItem("date5hum");
     var date5icon = window.localStorage.getItem("date5icon");

     //iconlinks
     var day1iconlink = ("https://openweathermap.org/img/wn/" + date1icon +"@2x.png")
     var day2iconlink = ("https://openweathermap.org/img/wn/" + date2icon +"@2x.png")
     var day3iconlink = ("https://openweathermap.org/img/wn/" + date3icon +"@2x.png")
     var day4iconlink = ("https://openweathermap.org/img/wn/" + date4icon +"@2x.png")
     var day5iconlink = ("https://openweathermap.org/img/wn/" + date5icon +"@2x.png")

     document.getElementById("day1").textContent = date1
     document.getElementById("day1temp").textContent = date1temp
     document.getElementById("day1hum").textContent = date1hum
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

     //write items from list
     var callback = JSON.parse(localStorage.getItem("items"));
     
     
     //loop to construct list items 
    for(i=0; i < callback.length; i++ ){
       
         var entryLi = document.createElement("li")
         entryLi.textContent = callback[i];
         entryLi.setAttribute("class", "list-group-item");
         entryLi.setAttribute("data", callback[i]);
         document.getElementById("history").appendChild(entryLi);


    }



 }    
 
    
  
//Event Listeners
searchbutton.addEventListener("click",function(){

searchvalue();

});

document.getElementById("history").addEventListener("click", historyClickHandler);

//data load 
loaddata()