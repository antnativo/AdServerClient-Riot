riot.tag2('viewability', '', '', '', function(opts) {
      var scope = this;
      console.log(this.parent)
      window.addEventListener("scroll",logViewability, false)
      function logViewability(evt){
        var viewability = getElementViewability(evt),
        viewable = (viewability.visibleArea / viewability.totalArea) >= 0.5;
        console.log(viewable, " : ",  viewability)
      }
      function getElementViewability(evt) {
        var el = scope.parent.root;
        try {
          rect = el.getBoundingClientRect();
        } catch (e) {
          return { visible: false, totalArea: 0, visibleArea: 0 };
        }

        if (!rect.width)
          rect.width = el.offsetWidth;
        if (!rect.height)
          rect.height = el.offsetHeight
        var win = window,
          winHeight = win.innerHeight,
          winWidth = win.innerWidth,
          visibleHeight = 0,
          visibleWidth = 0;
        if (rect.top >= 0) {
          if (rect.bottom > winHeight)
            visibleHeight = rect.height - (rect.bottom - winHeight);
          else
            visibleHeight = rect.height;
        } else
          visibleHeight = rect.height + rect.top;
        if (rect.left >= 0) {
          if (rect.right > winWidth)
            visibleWidth = rect.width - (rect.right - winWidth);
          else
            visibleWidth = rect.width;
        } else {
          if (rect.right > winWidth)
            visibleWidth = rect.width - (rect.right - winWidth);
          visibleWidth += (rect.width + rect.left);
        }
        var visibleArea = 0;
        if (visibleWidth > 0 && visibleHeight > 0)
          visibleArea = visibleWidth * visibleHeight;
        var visible = visibleArea > 0 ||
          (((rect.top >= 0 && rect.top <= winHeight) || (rect.bottom >= 0 && rect.bottom <= winHeight))
            &&
            ((rect.left >= 0 && rect.left <= winWidth) || (rect.right >= 0 && rect.right <= winWidth))) ||
          ((typeof evt != "undefined" && typeof evt.target != "undefined" && typeof evt.target.scrollingElement != "undefined")
            &&
            (evt.target.scrollingElement.scrollTop + window.innerHeight >= rect.top
              && evt.target.scrollingElement.scrollTop + window.innerHeight <= rect.top + window.innerHeight
              && evt.target.scrollingElement.scrollTop - window.innerHeight < rect.top)
            &&
            (evt.target.scrollingElement.scrollLeft + window.innerWidth >= rect.left
              && evt.target.scrollingElement.scrollLeft + window.innerWidth <= rect.left + window.innerWidth
              && evt.target.scrollingElement.scrollLeft - window.innerWidth < rect.left)
            && el.offsetHeight == 0);
        return {
          visible: visible,
          totalArea: rect.width * rect.height,
          visibleArea: visibleArea
        };
      }
});