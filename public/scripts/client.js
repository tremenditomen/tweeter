/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const renderTweets = function (tweets) {
    // loops through tweets

    const $tweets = tweets
      .sort((a, b) => {
        return b.created_at - a.created_at;
      })
      .map((tweet) => {
        const $tweet = createTweetElement(tweet);

        return $tweet;
      });
    $("#tweets-container").empty();
    $("#tweets-container").append($tweets);
  };

  const createTweetElement = function (data) {
    const $tweet = $(`
<article class = "fresh-tweet">
<header class = "user-ids">
<div class="img-person">
<img src="${data.user.avatars}">

<p class = tweet-name>${
      data.user.name
    } </p>         </div>  <p class = "user-handle">${
      data.user.handle
    }    </p> </header> 
  <p class = "user-post">${safe(data.content.text)}</p>
  <footer>
 <div class = "days"> ${timeago.format(data.created_at)}  </div>
 <section class =  "all-icons">
 <div class="icons"><i class="fas fa-flag"></i></div>   
 <div class = "icons"><i class="fas fa-retweet"></i></div>
 <div class = "icons"><i class="fas fa-heart"></i></div>
 </section>
 </footer>
 
</article>`);

    return $tweet;
  };

  const safe = (string) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  };
  $("form").on("submit", function (event) {
    //stop default acations
    event.preventDefault();
    const number = parseInt($(".counter").val());
    if ($("#tweet-text").val() === "" || number < 0) {
      $("#error").slideDown();
      return;
    }
    const formData = $(this).serialize();
    const maxChar = 140;
    $.post("/tweets", formData, (res) => {
      $("#tweet-text").val("");
      $(".counter").text(maxChar);
      $("#error").slideUp();
      getAllTweets();
    });
  });
  const getAllTweets = function () {
    $.get("/tweets", (res) => {
      renderTweets(res);
    });
  };
  getAllTweets();
});
