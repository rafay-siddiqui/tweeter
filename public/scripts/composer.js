$(document).ready(() => {


  //Hides top-of-page scroller
  $('.scroll-top').hide();

  //Checks if window has been scrolled down enough and shows top-of-page button
  $(window).on('scroll', (event) => {
    if ($(window).scrollTop() > 100) {
      $('.scroll-top').show(200);
    } else {
      $('.scroll-top').hide(200);
    }
  });

  //Top of page animation
  $('.scroll-top').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 700);
    $('#tweet-text').focus();
    return false;
  });

  //Toggles between scrolling new tweet and existing tweets into view
  $("#tweet-text").on("formView:toggle", function(event) {
    var formView = $(this);
    const newTweet = document.getElementById('tweet-text');
    //Needed different view toggles based on window size due to overlay formatting
    //Checks for desktop window width
    if ($(window).width() > 1049) {
      if (formView.is(".on")) {
        newTweet.scrollIntoView(true);
        window.scrollBy(0, -200);
        formView.removeClass("on").addClass("off");
      } else {
        newTweet.scrollIntoView(true);
        window.scrollBy(0, 15);
        formView.removeClass("off").addClass("on");
      }
      //Checks for mobile window width
    } else {
      if (formView.is(".on")) {
        newTweet.scrollIntoView(true);
        formView.removeClass("on").addClass("off");
        window.scrollBy(0, -48);
      } else {
        document.getElementById('tweets-container').scrollIntoView(true);
        window.scrollBy(0, -20);
        formView.removeClass("off").addClass("on");
      }
    }
  });

  //Triggers form toggle
  $('.tweet-banner').on('click', (event) => {
    $("#tweet-text").trigger("formView:toggle");
  });

});