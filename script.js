var recent = [];

function search(){

    $(".currentWeather").empty();
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $("#day5").empty();


    var apiKey = "7bce0f5a2da2e53bff63a13df31335ad";
    var keyword = $("#citySearch").val(); 
    var queryCurrentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + keyword + "&appid=" + apiKey;
    var queryFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + keyword + "&appid=" + apiKey;



    //ajax to pull api info for current weather
    $.ajax({
      url: queryCurrentDay,
      method: "GET"
    }).then(function(response) {  

      //Formula to change temp from Kelvin to Farenheit
      var F = (response.main.temp - 273.15) * 1.80 + 32 ;

      //An array of month names for current date
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];

      //function to grab current date
      var d = new Date();
      var currentDate = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

      //grabbing info from api and posting it to the current weather box
      var weatherDiv = $("<div>");
      var cityName = $(`<h3>${response.name} - ${currentDate}</h3>`)
      var temp = $(`<p>Temperature: ${Math.floor(F)} °F</p>`);
      var humidity = $(`<p>Humidity: ${response.main.humidity}%</p>`);
      var windSpeed = $(`<p>Wind Speed: ${response.wind.speed} MPH</p>`);
      weatherDiv.append(cityName, temp, humidity, windSpeed);
      $(".currentWeather").append(weatherDiv);
      console.log(response);
      
      });

      //ajax to pull 5 day forecast weather
      $.ajax({
        url: queryFiveDay,
        method: "GET"
      }).then(function(response) {
        
      //grabbing information for the 5 day forecast
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];

      var day1 = new Date();
      var day2 = new Date();
      var day3 = new Date();
      var day4 = new Date();
      var day5 = new Date();
      day1.setDate(new Date().getDate()+1);
      day2.setDate(new Date().getDate()+2);
      day3.setDate(new Date().getDate()+3);
      day4.setDate(new Date().getDate()+4);
      day5.setDate(new Date().getDate()+5);
      var F1 = (response.list[0].main.temp - 273.15) * 1.80 + 32 ;
      var F2 = (response.list[1].main.temp - 273.15) * 1.80 + 32 ;
      var F3 = (response.list[2].main.temp - 273.15) * 1.80 + 32 ;
      var F4 = (response.list[3].main.temp - 273.15) * 1.80 + 32 ;
      var F5 = (response.list[4].main.temp - 273.15) * 1.80 + 32 ;

      var day1Cast = $("<div>");
      var fiveDayDate = $(`<h3>${monthNames[day1.getMonth()] + " " + day1.getDate()}</h3>`)
      var temp = $(`<p>Temperature: ${Math.floor(F1)}°F</p>`);
      var humidity = $(`<p>Humidity: ${response.list[0].main.humidity}%</p>`);
      day1Cast.append(fiveDayDate, temp, humidity);
      $("#day1").append(day1Cast);

      var day2Cast = $("<div>");
      var fiveDayDate = $(`<h3>${monthNames[day2.getMonth()] + " " + day2.getDate()}</h3>`)
      var temp = $(`<p>Temperature: ${Math.floor(F2)}°F</p>`);
      var humidity = $(`<p>Humidity: ${response.list[1].main.humidity}%</p>`);
      day2Cast.append(fiveDayDate, temp, humidity);
      $("#day2").append(day2Cast);

      var day3Cast = $("<div>");
      var fiveDayDate = $(`<h3>${monthNames[day3.getMonth()] + " " + day3.getDate()}</h3>`)
      var temp = $(`<p>Temperature: ${Math.floor(F3)}°F</p>`);
      var humidity = $(`<p>Humidity: ${response.list[2].main.humidity}%</p>`);
      day3Cast.append(fiveDayDate, temp, humidity);
      $("#day3").append(day3Cast);

      var day4Cast = $("<div>");
      var fiveDayDate = $(`<h3>${monthNames[day4.getMonth()] + " " + day4.getDate()}</h3>`)
      var temp = $(`<p>Temperature: ${Math.floor(F4)}°F</p>`);
      var humidity = $(`<p>Humidity: ${response.list[3].main.humidity}%</p>`);
      day4Cast.append(fiveDayDate, temp, humidity);
      $("#day4").append(day4Cast);

      var day5Cast = $("<div>");
      var fiveDayDate = $(`<h3>${monthNames[day5.getMonth()] + " " + day5.getDate()}</h3>`)
      var temp = $(`<p>Temperature: ${Math.floor(F5)}°F</p>`);
      var humidity = $(`<p>Humidity: ${response.list[4].main.humidity}%</p>`);
      day5Cast.append(fiveDayDate, temp, humidity);
      $("#day5").append(day5Cast);

      

      })

      //action to save recent searches      
      if (!recent.includes(keyword)){
        var index = recent.length;
        var recentSearch = $(`<button id="${index}" onclick=searchHistory(${index})>${keyword}</button>`);
        $("#recentList").append(recentSearch);
        recent.push(keyword);
      }
      localStorage.setItem("searchResults", recent);

};

//adding function to pressing enter for search bar
$(document).ready(function() {
  recent = localStorage.getItem("searchResults").split(",");
  console.log(recent);
  for (i = 0; i < recent.length; i++){
    var recentSearch = $(`<button id="${i}" onclick=searchHistory(${i})>${recent[i]}</button>`);
    $("#recentList").append(recentSearch);
  }
  var input = document.getElementById("citySearch");
  input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submitBtn").click();
  }
});
});


//searching a recently viewed city
function searchHistory(keyword){
  var recentBtn = document.getElementById(keyword).textContent;
  $("#citySearch").val(recentBtn); 
  search();
}


