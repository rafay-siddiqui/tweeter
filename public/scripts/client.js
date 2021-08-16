/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Waits for all static elements to load before executing
$(document).ready(() => {

  //Webpage opens with no validation error
  $('.validation').hide();

  //Uses AJAX to to post to /tweets endpoint to avoid redirection
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    //Resets the validation message
    $('.validation p').remove();
    $('.validation').slideUp(200);
    //Validates if tweet is over the limit/empty and hides/shows validation message as appropriate
    const textData = $(this).serialize();
    if ($(this).children('textarea').val().length > 140) {
      setTimeout(() => {
        $('.validation').append("<p>Tweet is over 140 character limit</p>")
        $('.validation').slideDown(200)
      }, 200);
    } else if ($(this).children('textarea').val().length < 1) {
      setTimeout(() => {
        $('.validation').append("<p>Tweet is empty</p>")
        $('.validation').slideDown(200)
      }, 200);
    } else {
      $('.validation').slideUp(100);
      $('.validation p').remove();
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: textData
      })
        .then(() => {
          //Refetches tweets database, fills tweets container with updated content, clears form.
          loadTweets();
          $("#tweets-container").load("/ #tweets-container");
          this.reset();

        })
    }
  });


  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //'Creates new tweet element' for appending to index.html
  const createTweetElement = (tweetObj) => {
    const timePassed = timeago.format(tweetObj.created_at);
    const safeUserInput = escape(tweetObj.content.text);
    const $tweet = $(`
  <article class="tweet">
  
    <header>
      <img src=${tweetObj.user.avatars}>
      <p>${tweetObj.user.name}</p>
      <span>${tweetObj.user.handle}</span>
    </header>

    <p>${safeUserInput}</p>
    <hr>

    <footer>
      <small>${timePassed}</small>
      <div>
        <i class="fas fa-heart tweet-icon"></i>
        <i class="fas fa-retweet tweet-icon"></i>
        <i class="fas fa-flag tweet-icon"></i>
      </div>
    </footer>

  </article>
  `);
    return $tweet;
  };

  //Iterates through each tweet object in an array of tweets and appends them to index.html
  const renderTweets = (tweetsArray) => {
    for (let obj of tweetsArray) {
      $('#tweets-container').append(createTweetElement(obj));
    }
  }

  //Fetches tweet data from /tweets using AJAX
  const loadTweets = () => {
    $.ajax('/tweets', { method: "GET" })
      .then(function(tweetData) {
        renderTweets(tweetData);
      });
  };

  loadTweets();

})