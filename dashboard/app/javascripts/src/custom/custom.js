/* ================================================================================= *\
 Custom Scripts that apply globally but aren't necessarily application logic.
 \* ================================================================================= */
(function($, win, doc, sr, undefined) {

    // Switching no-js html class to js and alerting if user has JS turned off
    document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
    if (!document.documentElement.classList.contains('js')) {
        alert("Sorry, you're browser doesn't have JavaScript enabled, some features of this site may not work correctly. To enable these features, please enable JavaScript in your browser. To find out how to enable JavaScript, please visit http://enable-javascript.com/.");
    }

    // Making Windows Phones respect viewport sizing
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
        document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
    }

    // Debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };
    // smartresize plugin utilizing the debounce method above
    $.fn[sr] = function(fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };


    // Loading Up FastClick to remove the 300ms delay on mobile devices
    $(function() {
        FastClick.attach(document.body);
    });

    // Since it's Angular, and there's not really a page load every time you navigate to a view,
    // We trigger the collapse event on the navigation so that it closes when an anchor is clicked
    $('#primary_navigation').on('click', 'a', function() {
        var $this = $(this),
                $win = $(window);

        if ($win.width() <= 768) {
            $this.closest('.collapse').collapse('toggle');
        }
    });

    // Adding browser information to body element
    // Utilizes both the classie.js and the detect.js libraries included in the Gruntfile.js
    var ua = detect.parse(navigator.userAgent);
    var browserBodyClass = ' ' + ua.browser.family.toLowerCase() + ' ' + ua.device.type.toLowerCase();
    document.body.className += browserBodyClass;


}(jQuery, window, document, 'smartresize'));


/* ================================================================================= *\
 Using the smartresize function listed in the IIFE above
 Use this instead of the traditional window.resize event
 \* ================================================================================= */
$(window).smartresize(function() {
    // The Chosen Directive doesn't add a resize event for the inputs, we add it here and trigger it below on window.load
    $('.chosen-container').css({'width': 100 + '%'});

    // Since it's Angular, and there's not really a page load every time you navigate to a view,
    // We trigger the collapse event on the navigation so that it closes when an anchor is clicked
    $('#primary_navigation').on('click', 'a', function() {
        var $this = $(this),
                $win = $(window);

        if ($win.width() <= 768) {
            $this.closest('.collapse').collapse('toggle');
        }
    });
});


/* ================================================================================= *\
 Window.load Event
 \* ================================================================================= */
$(window).on('load', function() {
    // So the Chosen Directive respects the width: 100% denoted in the smart resize method above
    $(window).trigger('resize');
});
