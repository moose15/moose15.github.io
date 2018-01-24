//Katie Pustolski
// last updated: Dec. 2016

  "use strict";
// javaScript (jquery) for logo
//logo fades out as user scrolls down page and 
// fades in when user scrolls up page
  // $(window).scroll(function() {

  //   // var SCROLL_NUM = 50;
  //   //   var height = $(window).scrollTop();

  //   //   if(height  > SCROLL_NUM) {
  //   //     // logo.fadeOut("slow");
  //   //    document.getElementById("navScroll").style.backgroundColor="rgba(8, 83, 107, .95)";
  //   //     // console.log(100);
  //   //       // do something
  //   //   }
  //   //   if(height < SCROLL_NUM){
  //   //     // logo.fadeIn("slow");
  //   //   document.getElementById("navScroll").style.backgroundColor="rgba(8, 83, 107, 0)";

  //   //   }
  // });
// show the loader while the page is loading. Once loaded, fade out
 // $(window).load(function () {
$(window).on('load', function(){
      $("#loadScreen").fadeOut( "slow" );
});
// });
 // Clicking a link in the nva bar will scroll down the page using this code...
  // Add smooth scrolling to all links
  // http://stackoverflow.com/questions/4198041/jquery-smooth-scroll-to-an-anchor
  var hashTagActive = "";
    $(".scrollLink").click(function (event) {
        if(hashTagActive != this.hash) { //this will prevent if the user click several times the same link to freeze the scroll.
            event.preventDefault();
            //calculate destination place
            var dest = 0;
            if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
                dest = $(document).height() - $(window).height();
            } else {
                dest = $(this.hash).offset().top;
            }
            //go to destination
            $('html,body').animate({
                scrollTop: dest
            }, 500, 'swing');
            hashTagActive = this.hash;
        }
    });

//hidden text to show up

$(".st0").mouseenter(function(){

  $(".hidden").fadeIn(50);

}).mouseleave(function(){
  $(".hidden").fadeOut(50);
});

// For Stepstone Island Page. Birds fly as you scroll
//http://jsfiddle.net/MMZ2h/4/
var lastScrollTop = 0;
$(window).scroll(function (event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
      // console.log("scrolling");
        $('img.bird').animate({left: '-=5'}, 10);
    } else {
            console.log("scrolling");

        $('img.bird').animate({left: '+=5'}, 10);
    }
    lastScrollTop = st;
});