$(document).ready(function() {
  
  //Used multiple event triggers to account for mouse drag pasting text into textarea
  $('#tweet-text').on('keyup input', function(event) {
    const tweetLength = $(this).val().length;
    $(this).parent().find('output').html(140 - tweetLength);

    //Toggles 'charLimit' class in counter output to toggle colour change using CSS
    if (tweetLength > 140) {
      $(this).parent().find('output').addClass('charLimit');
    } else {
      $(this).parent().find('output').removeClass('charLimit');
    }
  });

});