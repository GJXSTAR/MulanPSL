$(function () {

  function throttle (func, wait, options) {
    var _now = Date.now || function () {
      return new Date().getTime();
    };
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
      previous = options.leading === false ? 0 : _now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
      var now = _now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  // 返回顶部按钮 (.back-to-top) -- 仅控制显示隐藏
  var backToTopEl = $('.back-to-top');
  var scrollHandler = function () {
    var scrollTop = $(window).scrollTop();
    // 滚动距离顶部 200px 及 PC端才显示
    if (scrollTop > 200 && window.innerWidth >= 768) {
      backToTopEl.fadeIn(100);
    } else {
      backToTopEl.fadeOut(100);
    }
  };
  scrollHandler();
  window.addEventListener('scroll', throttle(scrollHandler, 300), false);
  // 返回顶部触发器 (.back-to-top-toggle)
  $(document).on('click', '.back-to-top-toggle', function () {
    $('html, body').stop().animate({ scrollTop: 0 }, 500, 'swing');
  });

});
