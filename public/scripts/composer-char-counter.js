$(document).ready(function() {
  console.log("waiting...");

  //Used multiple event triggers to account for mouse drag pasting text into textarea
  $('#tweet-text').on('keyup input', function(event) {
    const tweetLength = $(this).val().length;
    $(this).parent().find('output').html(140 - tweetLength);
    //Couldn't figure out how to do this using only CSS
    if (tweetLength > 140) {
      $(this).parent().find('output').css('color', '#FF0000');
    } else {
      $(this).parent().find('output').css('color', 'inherit');
    }
  });

});