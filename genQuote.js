$(document).ready(function() {
  getQuote();

  $('#new-quote').click(function() {
    getQuote();
  });
});

var currentQuote = "";
var currentAuthor = "";

var getQuote = function() {
// send an HTTP request to quote API
  var http = new XMLHttpRequest();
  http.open("GET", "https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous", false);
  http.setRequestHeader("X-Mashape-Key", "GUFdw15R66mshMgfv5thbBVWYBhrp1kSfKujsnDvWwf360hhI4");
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.setRequestHeader("Accept", "application/json");
  //error handling for connection to the server
  http.onerror = function(err) {
    alert(err);
  };
  http.send();

  // fetch result as JSON, extract quote & author & display them
  if (http.status >= 200 && http.status < 400) {
    var r = JSON.parse(http.responseText);

    currentQuote = r.quote;
    currentAuthor = r.author;

    changeColor();
  } else {
    alert("We connected to the server, but it returned an error");
  }

}

function changeColor() {
  var color = randomColor();

  while(color === "rgb(255, 255, 255)") {
    color = randomColor();
  }

  $('.quote-text').animate({opacity: 0}, 500, function() {
    $(this).animate({opacity: 1}, 500);
    $('#text').text(currentQuote);
  });

  $('.quote-author').animate({opacity: 0}, 500, function() {
    $(this).animate({opacity: 1}, 500);
    $('#author').text(currentAuthor);
  });

  $('body').css({
      "background": color,
      "color": color
    }
  );

  $('.buttons .button').css("background", color);
}

function randomColor() {
  //pick a "red" from 0 - 255
  var r = Math.floor(Math.random() * 256);
  //pick a "green" from  0 -255
  var g = Math.floor(Math.random() * 256);
  //pick a "blue" from  0 -255
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}
