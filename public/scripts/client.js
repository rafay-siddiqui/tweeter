/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const textData = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: textData
    })
  });

  const createTweetElement = (tweetObj) => {
    const timePassed = timeago.format(tweetObj.created_at);
    const $tweet = $(`
  <article class="tweet">
  
    <header>
      <img src=${tweetObj.user.avatars}>
      <p>${tweetObj.user.name}</p>
      <span>${tweetObj.user.handle}</span>
    </header>

    <p>${tweetObj.content.text}</p>
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

  const renderTweets = (tweetsArray) => {
    for (let obj of tweetsArray) {
      $('#tweets-container').append(createTweetElement(obj));
    }
  }

  const loadTweets = () => {
    $.ajax('/tweets', { method: "GET" })
      .then(function(tweetData) {
        renderTweets(tweetData);
      });
  };

  loadTweets(data);

})