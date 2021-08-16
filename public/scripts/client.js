/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetObj) => {
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
      <small>${tweetObj.created_at}</small>
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

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const $tweet = createTweetElement(tweetData);

$(document).ready(() => {
  console.log($tweet);
  $('#tweets-container').append($tweet);
})