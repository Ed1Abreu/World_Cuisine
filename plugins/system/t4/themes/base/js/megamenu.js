jQuery(document).ready(function ($) {
  window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };
  window.isTouchDevice = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

  // process dropdown hover event
  var navitem_selector = ".t4-megamenu .nav-item",
    navitem_selector_dropdown = ".t4-megamenu .nav-item.dropdown",
    $activeitem = null,
    timeout = 0;

  var hideDropdowns = function () {
    var $opens = $(navitem_selector_dropdown + ".show");
    $opens.each(function () {
      var $item = $(this);
      if ($activeitem && $activeitem.closest($item).length) return;
      $item.removeClass("show").find(".dropdown-menu").removeClass("show");
      endAnimating($item);
    });
  };

  var pos = function () {
    var $dropdown = $activeitem
      .addClass("show")
      .children(".dropdown-menu")
      .addClass("show");
    //$activeitem.addClass('show').find('.dropdown-menu').addClass('show');
    var rtl = $("html").attr("dir") == "rtl",
      dw = $dropdown.outerWidth(),
      ww = $(window).width(),
      dl = $dropdown.offset().left,
      iw = $activeitem.width(),
      il = $activeitem.offset().left,
      ml = null,
      align = $activeitem.data("align");
    ml =
      align == "center"
        ? (iw - dw) / 2
        : align == "right"
          ? dw - iw
          : align == "justify"
            ? (iw - dw) / 2
            : 0;
    if (dw < ww) {
      if (il + ml < 20) ml = 20 - il;
      if (il + ml + dw > ww - 20) ml = ww - 20 - il - dw;
    } else {
      ml = (ww - dw) / 2 - il;
    }

    $dropdown.css("margin-left", ml);
  };

  var posrtl = function () {
    var $dropdown = $activeitem
      .addClass("show")
      .children(".dropdown-menu")
      .addClass("show");
    //$activeitem.addClass('show').find('.dropdown-menu').addClass('show');
    var rtl = $("html").attr("dir") == "rtl",
      dw = $dropdown.width(),
      ww = $(window).width(),
      dl = $dropdown.offset().left,
      iw = $activeitem.width(),
      il = $activeitem.offset().left,
      ml = null,
      align = $activeitem.data("align");

    ml =
      align == "center"
        ? (dw - iw) / 2
        : align == "right"
          ? dw - iw
          : align == "justify"
            ? ww / 2
            : 0;
    if (dw < ww) {
      if (il + iw + ml > ww - 20) ml = ww - 20 - il - iw;
      if (il + iw + ml < dw + 20) ml = dw + 20 - il - iw;
    } else {
      ml = ww - il - iw + (dw - ww) / 2;
    }
    $dropdown.css("margin-right", -ml);
  };

  var showDropdown = function () {
    if ($activeitem.is(".dropdown")) {
      var $dropdown = $activeitem
        .addClass("show")
        .children(".dropdown-menu")
        .addClass("show");

      // with animation, start animating after some ms
      startAnimating($activeitem);

      if ($("html").attr("dir") == "rtl") {
        posrtl();
      } else {
        pos();
      }
    }
    // hide other dropdown
    hideDropdowns();
  };

  var startAnimating = function ($item) {
    // get duration
    var $menu = $item.closest(".t4-megamenu");

    if (!$menu.hasClass("animate")) return;

    clearTimeout($item.data("animating-timer"));
    $item.data(
      "animating-timer",
      setTimeout(function () {
        $item.addClass("animating");
      }, 10)
    );
  };

  var endAnimating = function ($item) {
    // remove animating class to make sure the dropdown is totally hidden
    // get duration
    var $menu = $item.closest(".t4-megamenu");
    if (!$menu.hasClass("animate")) return;
    var duration = parseInt($menu.data("duration")) || 400;
    clearTimeout($item.data("animating-timer"));
    $item.data(
      "animating-timer",
      setTimeout(function () {
        $item.removeClass("animating");
      }, duration + 10)
    );
  };
  // $(document).find('t4')
  $("body")
    .on("mouseenter", navitem_selector, function (e) {
      if (window.isTouchDevice) {
        return;
      }
      var $this = $(this);
      // prevent flict showing menu;
      if (
        $activeitem &&
        $(e.currentTarget).is("div") &&
        !$(e.currentTarget).closest($activeitem).length &&
        $this.closest(navitem_selector_dropdown).length
      ) {
        clearTimeout(timeout);
        return;
      }
      var $menu = $this.closest(".t4-megamenu"),
        id = $menu.attr("id"),
        $toggle = $('.navbar-toggler[data-target="#' + id + '"]');
      // fix dropdown menu offset right to let
      var rt =
        $(window).width() - ($(this).offset().left + $(this).outerWidth());
      if (
        $(window).width() > 991 &&
        rt < 150 &&
        ($(this).hasClass("dropright") || $(this).hasClass("dropend"))
      ) {
        $(this).removeClass("dropright dropend").addClass("dropleft dropstart");
      }
      if ($toggle.length && $toggle.is(":visible")) {
        // mobile, then remove animation and ignore
        if ($menu.hasClass("animate"))
          $menu.removeClass("animate").addClass("animate-mobile");
        return;
      } else {
        if ($menu.hasClass("animate-mobile"))
          $menu.removeClass("animate-mobile").addClass("animate");
      }
      if ($this.closest(navitem_selector_dropdown).length) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = 0;
        }

        var $_activeitem = $this.closest(navitem_selector_dropdown);

        if (
          !$_activeitem.hasClass("show") &&
          !$(e.currentTarget).is($_activeitem) &&
          !$(e.currentTarget).parent().is($_activeitem) &&
          !$(e.currentTarget).is(".item-caret")
        ) {
          return;
        }

        $activeitem = $_activeitem;
        showDropdown();
      } else {
        //timeout = setTimeout(function() {
        $activeitem = null;
        hideDropdowns();
        //}, 200)
      }
    })
    .on("mouseleave", navitem_selector, function (e) {
      if (window.isTouchDevice) {
        return;
      }
      var $this = $(this);
      timeout = setTimeout(function () {
        if ($activeitem && $activeitem.is($this)) {
          $activeitem = $this.parent().closest(navitem_selector);
          hideDropdowns();
        }
      }, 200);
    });

  // if menu open, just open the link
  var lastClickItem = null;
  let touchstart = window.isTouchDevice ? 'touchstart' : 'click';
  if (window.isTouchDevice) {
    $(".t4-megamenu").removeClass("animate").addClass("animate-mobile");
  }
  $(".nav-item.dropdown > a.dropdown-toggle").on(touchstart, function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this);
    var arr1, arr2;
    // // check click on desktop
    if (
      ($this.closest(".t4-megamenu").length &&
        !$this.closest(".t4-megamenu").hasClass("animate-mobile") &&
        $this.hasClass("dropdown-toggle") && $this.next(".dropdown-menu")) ||
      $this.closest(".t4-off-canvas-body").length
    ) {
      if (this.target.toLowerCase() == "_blank") {
        window.open(this.href, "_blank");
      } else {
        location.href = this.href;
      }
    }

    var parentDrpEl = $(this).closest(".nav-item.dropdown");
    var dropdownEL = parentDrpEl.find(".dropdown-menu");
    if ($this.is(lastClickItem)) {
      if ($this.hasClass('anchoring')) {
        $('body').css('overflow-anchor', 'auto');
      }
      arr1 = this.href.split("#");
      arr2 = location.href.split("#");
      if (arr1[0] == arr2[0]) {
        if (arr1.length > 1 && arr1[1]) location.hash = "#" + arr1[1];
      } else {
        if (this.target.toLowerCase() == "_blank") {
          window.open(this.href, "_blank");
        } else {
          location.href = this.href;
        }
      }
    } else {
      if ($this.hasClass('anchoring')) {
        $('body').css('overflow-anchor', 'none');
      }
      // location.hash = "";
      arr1 = this.href.split("#");
      arr2 = location.href.split("#");
      if (arr1[0] == arr2[0]) {
        if (arr1.length > 1 && arr1[1]) location.hash = "#" + arr1[1];
      }
      lastClickItem = $this;
      if (location.hash && !$this.is(".separator")) {
        $(".js-offcanvas-close").trigger("click");
      }

      if (dropdownEL.length) {
        dropdownEL.toggleClass("show");
      }
    }
  });
  $(".nav-item.dropdown > span.nav-link").on(touchstart, function (e) {
    lastClickItem = $(this);
  });
  // show toggler
  $(".t4-megamenu").each(function () {
    $toggle = $('.navbar-toggler[data-target="#' + this.id + '"]');
    if ($toggle.length == 1) $toggle.removeAttr("style");
  });
});