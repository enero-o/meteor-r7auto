Template.serviceItem.onCreated(function() {
    this.subscribe("services.all");
  });
  
  Template.serviceItem.helpers({
    data: () => {
        console.log(Services.findOne({_id: Router.current().params.id} ));
        return Services.findOne({_id: Router.current().params.id} );
    }
  });
  
  Template.serviceItem.onRendered(function() {
    var tabs = function() {
      $(".wprt-tabs").each(function() {
        var list = "",
          title = $(this).find(".item-title"),
          titleWrap = $(this).children(".tab-title");
  
        title
          .each(function() {
            list = list + "<li>" + $(this).html() + "</li>";
          })
          .appendTo(titleWrap);
  
        $(this)
          .find(".tab-title li")
          .filter(":first")
          .addClass("active");
        $(this)
          .find(".tab-content-wrap")
          .children()
          .hide()
          .filter(":first")
          .show();
  
        $(this)
          .find(".tab-title li")
          .on("click", function(e) {
            var idx = $(this).index(),
              content = $(this)
                .closest(".wprt-tabs")
                .find(".tab-content-wrap")
                .children()
                .eq(idx);
  
            $(this)
              .addClass("active")
              .siblings()
              .removeClass("active");
            content
              .fadeIn("slow")
              .siblings()
              .hide();
  
            e.preventDefault();
          });
      });
    };
  
    var parallax = function() {
      var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
      /*
        * Please note that background attachment fixed doesn't work on iOS
      */
      if (!iOS) {
        $(".parallax").css({ backgroundAttachment: "fixed" });
      } else {
        $(".parallax").css({ backgroundAttachment: "scroll" });
      }
  
      if (
        $().parallax &&
        matchMedia("only screen and (min-width: 992px)").matches
      ) {
        $(".row-certified-1").parallax("50%", 0.45);
        $(".row-trusted-1").parallax("50%", 0.4);
        $(".row-facts-1").parallax("50%", 0.5);
      }
    };
  
    var animation = function() {
      $(".wprt-animation-block").each(function() {
        var el = $(this),
          animate = el.data("animate"),
          duration = el.data("duration"),
          delay = el.data("delay"),
          position = el.data("position");
  
        el.css({
          "-webkit-animation-delay": delay,
          "animation-delay": delay,
          "-webkit-animation-duration": duration,
          "animation-duration": duration
        });
  
        el.waypoint(
          function() {
            el.addClass("animated").addClass(animate);
          },
          {
            triggerOnce: true,
            offset: position
          }
        );
      });
    };
    var counter = function() {
      if ($().countTo) {
        $(".wprt-counter").on("on-appear", function() {
          $(this)
            .find(".number")
            .each(function() {
              var to = $(this).data("to"),
                speed = $(this).data("speed");
  
              $(this).countTo({
                to: to,
                speed: speed
              });
            });
        });
      }
    };
  
    var accordions = function() {
      var args = { easing: "easeOutExpo", duration: 300 };
  
      $(".accordion-item.active")
        .find(".accordion-content")
        .show();
      $(".accordion-heading").on("click", function() {
        if (
          !$(this)
            .parent()
            .is(".active")
        ) {
          $(this)
            .parent()
            .toggleClass("active")
            .children(".accordion-content")
            .slideToggle(args)
            .parent()
            .siblings(".active")
            .removeClass("active")
            .children(".accordion-content")
            .slideToggle(args);
        } else {
          $(this)
            .parent()
            .toggleClass("active");
          $(this)
            .next()
            .slideToggle(args);
        }
      });
    };
  
    var spacer = function() {
      var mode = "desktop";
  
      if (matchMedia("only screen and (max-width: 991px)").matches)
        mode = "mobile";
  
      if (matchMedia("only screen and (max-width: 767px)").matches)
        mode = "smobile";
  
      $(".wprt-spacer").each(function() {
        if (mode == "desktop") {
          $(this).attr("style", "height:" + $(this).data("desktop") + "px");
        } else if (mode == "mobile") {
          $(this).attr("style", "height:" + $(this).data("mobi") + "px");
        } else {
          $(this).attr("style", "height:" + $(this).data("smobi") + "px");
        }
      });
    };

    var thumbSlider = function() {
      $(".wprt-thumb-slider").each(function() {
        var itemW = $(this).data("width"),
          itemM = $(this).data("margin");
  
        $(this)
          .children("#wprt-carousel")
          .flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: itemW,
            itemMargin: itemM,
            asNavFor: $(this).children("#wprt-slider"),
            prevText: '<i class="rt-icon-left-arrow12"></i>',
            nextText: '<i class="rt-icon-right-arrow12"></i>'
          });
        $(this)
          .children("#wprt-slider")
          .flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: $(this).children("#wprt-carousel"),
            prevText: '<i class="rt-icon-left-arrow12"></i>',
            nextText: '<i class="rt-icon-right-arrow12"></i>'
          });
      });
    };
  
  
    $(".owl-carousel").owlCarousel();
    animation();
    parallax();
    counter();
    accordions();
    spacer();
    tabs();
    thumbSlider();
  });