/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = classie;
} else {
  // browser global
  window.classie = classie;
}

})( window );
/**
 * Detect.js: User-Agent Parser
 * https://github.com/darcyclarke/Detect.js
 * Dual licensed under the MIT and GPL licenses.
 *
 * @version 2.2.1
 * @author Darcy Clarke
 * @url http://darcyclarke.me
 * @createdat Thu Feb 13 2014 11:36:42 GMT+0000 (WET)
 *
 * Based on UA-Parser (https://github.com/tobie/ua-parser) by Tobie Langel
 *
 * Example Usage:
 * var agentInfo = detect.parse(navigator.userAgent);
 * console.log(agentInfo.browser.family); // Chrome
 *
 */
(function(root, undefined) {
    // Shim Array.prototype.map if necessary
    // Production steps of ECMA-262, Edition 5, 15.4.4.19
    // Reference: http://es5.github.com/#x15.4.4.19
    if (!Array.prototype.map) {
        Array.prototype.map = function(callback, thisArg) {
            var T, A, k;
            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }
            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            var O = Object(this);
            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;
            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }
            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (thisArg) {
                T = thisArg;
            }
            // 6. Let A be a new array created as if by the expression new Array(len) where Array is
            // the standard built-in constructor with that name and len is the value of len.
            A = new Array(len);
            // 7. Let k be 0
            k = 0;
            // 8. Repeat, while k < len
            while (k < len) {
                var kValue, mappedValue;
                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {
                    // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                    kValue = O[k];
                    // ii. Let mappedValue be the result of calling the Call internal method of callback
                    // with T as the this value and argument list containing kValue, k, and O.
                    mappedValue = callback.call(T, kValue, k, O);
                    // iii. Call the DefineOwnProperty internal method of A with arguments
                    // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
                    // and false.
                    // In browsers that support Object.defineProperty, use the following:
                    // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });
                    // For best browser support, use the following:
                    A[k] = mappedValue;
                }
                // d. Increase k by 1.
                k++;
            }
            // 9. return A
            return A;
        };
    }
    // Detect
    var detect = root.detect = function() {
        // Context
        var _this = function() {};
        // Regexes
        var regexes = {
            browser_parsers: [ {
                regex: "^(Opera)/(\\d+)\\.(\\d+) \\(Nintendo Wii",
                family_replacement: "Wii",
                manufacturer: "Nintendo"
            }, {
                regex: "(SeaMonkey|Camino)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
                family_replacement: "Camino",
                other: true
            }, {
                regex: "(Pale[Mm]oon)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
                family_replacement: "Pale Moon (Firefox Variant)",
                other: true
            }, {
                regex: "(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
                family_replacement: "Firefox Mobile"
            }, {
                regex: "(Fennec)/(\\d+)\\.(\\d+)(pre)",
                family_replacment: "Firefox Mobile"
            }, {
                regex: "(Fennec)/(\\d+)\\.(\\d+)",
                family_replacement: "Firefox Mobile"
            }, {
                regex: "Mobile.*(Firefox)/(\\d+)\\.(\\d+)",
                family_replacement: "Firefox Mobile"
            }, {
                regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?)",
                family_replacement: "Firefox ($1)"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
                family_replacement: "Firefox Alpha"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
                family_replacement: "Firefox Beta"
            }, {
                regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
                family_replacement: "Firefox Alpha"
            }, {
                regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
                family_replacement: "Firefox Beta"
            }, {
                regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?",
                family_replacement: "Firefox ($1)"
            }, {
                regex: "(Firefox).*Tablet browser (\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "MicroB",
                tablet: true
            }, {
                regex: "(MozillaDeveloperPreview)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?"
            }, {
                regex: "(Flock)/(\\d+)\\.(\\d+)(b\\d+?)",
                family_replacement: "Flock",
                other: true
            }, {
                regex: "(RockMelt)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Rockmelt",
                other: true
            }, {
                regex: "(Navigator)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Netscape"
            }, {
                regex: "(Navigator)/(\\d+)\\.(\\d+)([ab]\\d+)",
                family_replacement: "Netscape"
            }, {
                regex: "(Netscape6)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Netscape"
            }, {
                regex: "(MyIBrow)/(\\d+)\\.(\\d+)",
                family_replacement: "My Internet Browser",
                other: true
            }, {
                regex: "(Opera Tablet).*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                family_replacement: "Opera Tablet",
                tablet: true
            }, {
                regex: "(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mobile"
            }, {
                regex: "Opera Mobi",
                family_replacement: "Opera Mobile"
            }, {
                regex: "(Opera Mini)/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mini"
            }, {
                regex: "(Opera Mini)/att/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mini"
            }, {
                regex: "(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                family_replacement: "Opera"
            }, {
                regex: "(webOSBrowser)/(\\d+)\\.(\\d+)",
                family_replacement: "webOS"
            }, {
                regex: "(webOS)/(\\d+)\\.(\\d+)",
                family_replacement: "webOS"
            }, {
                regex: "(wOSBrowser).+TouchPad/(\\d+)\\.(\\d+)",
                family_replacement: "webOS TouchPad"
            }, {
                regex: "(luakit)",
                family_replacement: "LuaKit",
                other: true
            }, {
                regex: "(Lightning)/(\\d+)\\.(\\d+)([ab]?\\d+[a-z]*)",
                family_replacement: "Lightning",
                other: true
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?) \\(Swiftfox\\)",
                family_replacement: "Swiftfox",
                other: true
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)? \\(Swiftfox\\)",
                family_replacement: "Swiftfox",
                other: true
            }, {
                regex: "rekonq",
                family_replacement: "Rekonq",
                other: true
            }, {
                regex: "(conkeror|Conkeror)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
                family_replacement: "Conkeror",
                other: true
            }, {
                regex: "(konqueror)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Konqueror",
                other: true
            }, {
                regex: "(WeTab)-Browser",
                family_replacement: "WeTab",
                other: true
            }, {
                regex: "(Comodo_Dragon)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Comodo Dragon",
                other: true
            }, {
                regex: "(YottaaMonitor)",
                family_replacement: "Yottaa Monitor",
                other: true
            }, {
                regex: "(Kindle)/(\\d+)\\.(\\d+)",
                family_replacement: "Kindle"
            }, {
                regex: "(Symphony) (\\d+).(\\d+)",
                family_replacement: "Symphony",
                other: true
            }, {
                regex: "Minimo",
                family_replacement: "Minimo",
                other: true
            }, {
                regex: "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Mobile"
            }, {
                regex: "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Mobile iOS"
            }, {
                regex: "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile",
                family_replacement: "Chrome Mobile"
            }, {
                regex: "(chromeframe)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Frame"
            }, {
                regex: "(UC Browser)(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "UC Browser",
                other: true
            }, {
                regex: "(SLP Browser)/(\\d+)\\.(\\d+)",
                family_replacement: "Tizen Browser",
                other: true
            }, {
                regex: "(Epiphany)/(\\d+)\\.(\\d+).(\\d+)",
                family_replacement: "Epiphany",
                other: true
            }, {
                regex: "(SE 2\\.X) MetaSr (\\d+)\\.(\\d+)",
                family_replacement: "Sogou Explorer",
                other: true
            }, {
                regex: "(Pingdom.com_bot_version_)(\\d+)\\.(\\d+)",
                family_replacement: "PingdomBot",
                other: true
            }, {
                regex: "(facebookexternalhit)/(\\d+)\\.(\\d+)",
                family_replacement: "FacebookBot"
            }, {
                regex: "Facebot",
                family_replacement: "FacebookBot"
            }, {
                regex: "(Twitterbot)/(\\d+)\\.(\\d+)",
                family_replacement: "TwitterBot"
            }, {
                regex: "(AdobeAIR|Chromium|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Shiira|Sunrise|Chrome|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iron|Iris|UP\\.Browser|Bunjaloo|Google Earth|Raven for Mac)/(\\d+)\\.(\\d+)\\.(\\d+)"
            }, {
                regex: "(Bolt|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|NetNewsWire|Iron|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris)/(\\d+)\\.(\\d+)"
            }, {
                regex: "(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)"
            }, {
                regex: "(iCab|Lunascape|Opera|Android|Jasmine|Polaris|BREW) (\\d+)\\.(\\d+)\\.?(\\d+)?"
            }, {
                regex: "(Android) Donut",
                v2_replacement: "2",
                v1_replacement: "1"
            }, {
                regex: "(Android) Eclair",
                v2_replacement: "1",
                v1_replacement: "2"
            }, {
                regex: "(Android) Froyo",
                v2_replacement: "2",
                v1_replacement: "2"
            }, {
                regex: "(Android) Gingerbread",
                v2_replacement: "3",
                v1_replacement: "2"
            }, {
                regex: "(Android) Honeycomb",
                v1_replacement: "3"
            }, {
                regex: "(IEMobile)[ /](\\d+)\\.(\\d+)",
                family_replacement: "IE Mobile"
            }, {
                regex: "(MSIE) (\\d+)\\.(\\d+).*XBLWP7",
                family_replacement: "IE Large Screen"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?"
            }, {
                regex: "(Obigo)InternetBrowser",
                other: true
            }, {
                regex: "(Obigo)\\-Browser",
                other: true
            }, {
                regex: "(Obigo|OBIGO)[^\\d]*(\\d+)(?:.(\\d+))?",
                other: true
            }, {
                regex: "(MAXTHON|Maxthon) (\\d+)\\.(\\d+)",
                family_replacement: "Maxthon",
                other: true
            }, {
                regex: "(Maxthon|MyIE2|Uzbl|Shiira)",
                v1_replacement: "0",
                other: true
            }, {
                regex: "(PLAYSTATION) (\\d+)",
                family_replacement: "PlayStation",
                manufacturer: "Sony"
            }, {
                regex: "(PlayStation Portable)[^\\d]+(\\d+).(\\d+)",
                manufacturer: "Sony"
            }, {
                regex: "(BrowseX) \\((\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(POLARIS)/(\\d+)\\.(\\d+)",
                family_replacement: "Polaris",
                other: true
            }, {
                regex: "(Embider)/(\\d+)\\.(\\d+)",
                family_replacement: "Polaris",
                other: true
            }, {
                regex: "(BonEcho)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Bon Echo",
                other: true
            }, {
                regex: "(iPod).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPod).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPod)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPad).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(iPad).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(iPad)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(AvantGo) (\\d+).(\\d+)",
                other: true
            }, {
                regex: "(Avant)",
                v1_replacement: "1",
                other: true
            }, {
                regex: "^(Nokia)",
                family_replacement: "Nokia Services (WAP) Browser",
                manufacturer: "Nokia"
            }, {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)\\.(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(BrowserNG)/(\\d+)\\.(\\d+).(\\d+)",
                family_replacement: "NokiaBrowser",
                manufacturer: "Nokia"
            }, {
                regex: "(Series60)/5\\.0",
                v2_replacement: "0",
                v1_replacement: "7",
                family_replacement: "NokiaBrowser",
                manufacturer: "Nokia"
            }, {
                regex: "(Series60)/(\\d+)\\.(\\d+)",
                family_replacement: "Nokia OSS Browser",
                manufacturer: "Nokia"
            }, {
                regex: "(S40OviBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Nokia Series 40 Ovi Browser",
                manufacturer: "Nokia"
            }, {
                regex: "(Nokia)[EN]?(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(PlayBook).+RIM Tablet OS (\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Blackberry WebKit",
                tablet: true,
                manufacturer: "Nokia"
            }, {
                regex: "(Black[bB]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Blackberry WebKit",
                manufacturer: "RIM"
            }, {
                regex: "(Black[bB]erry)\\s?(\\d+)",
                family_replacement: "Blackberry",
                manufacturer: "RIM"
            }, {
                regex: "(OmniWeb)/v(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Blazer)/(\\d+)\\.(\\d+)",
                family_replacement: "Palm Blazer",
                manufacturer: "Palm"
            }, {
                regex: "(Pre)/(\\d+)\\.(\\d+)",
                family_replacement: "Palm Pre",
                manufacturer: "Palm"
            }, {
                regex: "(Links) \\((\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(QtWeb) Internet Browser/(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
                other: true,
                tablet: true
            }, {
                regex: "(AppleWebKit)/(\\d+)\\.?(\\d+)?\\+ .* Version/\\d+\\.\\d+.\\d+ Safari/",
                family_replacement: "WebKit Nightly"
            }, {
                regex: "(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/",
                family_replacement: "Safari"
            }, {
                regex: "(Safari)/\\d+"
            }, {
                regex: "(OLPC)/Update(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(OLPC)/Update()\\.(\\d+)",
                v1_replacement: "0",
                other: true
            }, {
                regex: "(SEMC\\-Browser)/(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Teleca)",
                family_replacement: "Teleca Browser",
                other: true
            }, {
                regex: "Trident(.*)rv.(\\d+)\\.(\\d+)",
                family_replacement: "IE"
            }, {
                regex: "(MSIE) (\\d+)\\.(\\d+)",
                family_replacement: "IE"
            } ],
            os_parsers: [ {
                regex: "(Android) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
            }, {
                regex: "(Android)\\-(\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
            }, {
                regex: "(Android) Donut",
                os_v2_replacement: "2",
                os_v1_replacement: "1"
            }, {
                regex: "(Android) Eclair",
                os_v2_replacement: "1",
                os_v1_replacement: "2"
            }, {
                regex: "(Android) Froyo",
                os_v2_replacement: "2",
                os_v1_replacement: "2"
            }, {
                regex: "(Android) Gingerbread",
                os_v2_replacement: "3",
                os_v1_replacement: "2"
            }, {
                regex: "(Android) Honeycomb",
                os_v1_replacement: "3"
            }, {
                regex: "(Silk-Accelerated=[a-z]{4,5})",
                os_replacement: "Android"
            }, {
                regex: "(Windows Phone 6\\.5)"
            }, {
                regex: "(Windows (?:NT 5\\.2|NT 5\\.1))",
                os_replacement: "Windows XP"
            }, {
                regex: "(XBLWP7)",
                os_replacement: "Windows Phone OS"
            }, {
                regex: "(Windows NT 6\\.1)",
                os_replacement: "Windows 7"
            }, {
                regex: "(Windows NT 6\\.0)",
                os_replacement: "Windows Vista"
            }, {
                regex: "(Windows 98|Windows XP|Windows ME|Windows 95|Windows CE|Windows 7|Windows NT 4\\.0|Windows Vista|Windows 2000)"
            }, {
                regex: "(Windows NT 6\\.2)",
                os_replacement: "Windows 8"
            }, {
                regex: "(Windows Phone 8)",
                os_replacement: "Windows Phone 8"
            }, {
                regex: "(Windows NT 5\\.0)",
                os_replacement: "Windows 2000"
            }, {
                regex: "(Windows Phone OS) (\\d+)\\.(\\d+)"
            }, {
                regex: "(Windows ?Mobile)",
                os_replacement: "Windows Mobile"
            }, {
                regex: "(WinNT4.0)",
                os_replacement: "Windows NT 4.0"
            }, {
                regex: "(Win98)",
                os_replacement: "Windows 98"
            }, {
                regex: "(Tizen)/(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Mac OS X) (\\d+)[_.](\\d+)(?:[_.](\\d+))?",
                manufacturer: "Apple"
            }, {
                regex: "(?:PPC|Intel) (Mac OS X)",
                manufacturer: "Apple"
            }, {
                regex: "(CPU OS|iPhone OS) (\\d+)_(\\d+)(?:_(\\d+))?",
                os_replacement: "iOS",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone|iPad|iPod); Opera",
                os_replacement: "iOS",
                manufacturer: "Apple"
            }, {
                regex: "(iPad); Opera",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)",
                os_replacement: "iOS",
                manufacturer: "Apple"
            }, {
                regex: "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "Chrome OS"
            }, {
                regex: "(Debian)-(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                other: true
            }, {
                regex: "(Linux Mint)(?:/(\\d+))?",
                other: true
            }, {
                regex: "(Mandriva)(?: Linux)?/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                other: true
            }, {
                regex: "(Symbian[Oo][Ss])/(\\d+)\\.(\\d+)",
                os_replacement: "Symbian OS"
            }, {
                regex: "(Symbian/3).+NokiaBrowser/7\\.3",
                os_replacement: "Symbian^3 Anna"
            }, {
                regex: "(Symbian/3).+NokiaBrowser/7\\.4",
                os_replacement: "Symbian^3 Belle"
            }, {
                regex: "(Symbian/3)",
                os_replacement: "Symbian^3"
            }, {
                regex: "(Series 60|SymbOS|S60)",
                os_replacement: "Symbian OS"
            }, {
                regex: "(MeeGo)",
                other: true
            }, {
                regex: "Symbian [Oo][Ss]",
                os_replacement: "Symbian OS"
            }, {
                regex: "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "BlackBerry OS",
                manufacturer: "RIM"
            }, {
                regex: "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "BlackBerry OS",
                manufacturer: "RIM"
            }, {
                regex: "(RIM Tablet OS) (\\d+)\\.(\\d+)\\.(\\d+)",
                os_replacement: "BlackBerry Tablet OS",
                tablet: true,
                manufacturer: "RIM"
            }, {
                regex: "(Play[Bb]ook)",
                os_replacement: "BlackBerry Tablet OS",
                tablet: true,
                manufacturer: "RIM"
            }, {
                regex: "(Black[Bb]erry)",
                os_replacement: "Blackberry OS",
                manufacturer: "RIM"
            }, {
                regex: "(webOS|hpwOS)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "webOS"
            }, {
                regex: "(SUSE|Fedora|Red Hat|PCLinuxOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(SUSE|Fedora|Red Hat|Puppy|PCLinuxOS|CentOS)/(\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Ubuntu|Kindle|Bada|Lubuntu|BackTrack|Red Hat|Slackware)/(\\d+)\\.(\\d+)"
            }, {
                regex: "(Windows|OpenBSD|FreeBSD|NetBSD|Ubuntu|Kubuntu|Android|Arch Linux|CentOS|WeTab|Slackware)"
            }, {
                regex: "(Linux|BSD)",
                other: true
            } ],
            mobile_os_families: [ "Windows Phone 6.5", "Windows CE", "Symbian OS" ],
            device_parsers: [ {
                regex: "HTC ([A-Z][a-z0-9]+) Build",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC ([A-Z][a-z0-9 ]+) \\d+\\.\\d+\\.\\d+\\.\\d+",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC_Touch_([A-Za-z0-9]+)",
                device_replacement: "HTC Touch ($1)",
                manufacturer: "HTC"
            }, {
                regex: "USCCHTC(\\d+)",
                device_replacement: "HTC $1 (US Cellular)",
                manufacturer: "HTC"
            }, {
                regex: "Sprint APA(9292)",
                device_replacement: "HTC $1 (Sprint)",
                manufacturer: "HTC"
            }, {
                regex: "HTC ([A-Za-z0-9]+ [A-Z])",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC-([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC_([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC ([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "(ADR[A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "(HTC)",
                manufacturer: "HTC"
            }, {
                regex: "SonyEricsson([A-Za-z0-9]+)/",
                device_replacement: "Ericsson $1",
                other: true,
                manufacturer: "Sony"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; WOWMobile (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\-update1\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; (.+) Build"
            }, {
                regex: "NokiaN([0-9]+)",
                device_replacement: "Nokia N$1",
                manufacturer: "Nokia"
            }, {
                regex: "Nokia([A-Za-z0-9\\v-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            }, {
                regex: "NOKIA ([A-Za-z0-9\\-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            }, {
                regex: "Nokia ([A-Za-z0-9\\-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            }, {
                regex: "Lumia ([A-Za-z0-9\\-]+)",
                device_replacement: "Lumia $1",
                manufacturer: "Nokia"
            }, {
                regex: "Symbian",
                device_replacement: "Nokia",
                manufacturer: "Nokia"
            }, {
                regex: "(PlayBook).+RIM Tablet OS",
                device_replacement: "Blackberry Playbook",
                tablet: true,
                manufacturer: "RIM"
            }, {
                regex: "(Black[Bb]erry [0-9]+);",
                manufacturer: "RIM"
            }, {
                regex: "Black[Bb]erry([0-9]+)",
                device_replacement: "BlackBerry $1",
                manufacturer: "RIM"
            }, {
                regex: "(Pre)/(\\d+)\\.(\\d+)",
                device_replacement: "Palm Pre",
                manufacturer: "Palm"
            }, {
                regex: "(Pixi)/(\\d+)\\.(\\d+)",
                device_replacement: "Palm Pixi",
                manufacturer: "Palm"
            }, {
                regex: "(Touchpad)/(\\d+)\\.(\\d+)",
                device_replacement: "HP Touchpad",
                manufacturer: "HP"
            }, {
                regex: "HPiPAQ([A-Za-z0-9]+)/(\\d+).(\\d+)",
                device_replacement: "HP iPAQ $1",
                manufacturer: "HP"
            }, {
                regex: "Palm([A-Za-z0-9]+)",
                device_replacement: "Palm $1",
                manufacturer: "Palm"
            }, {
                regex: "Treo([A-Za-z0-9]+)",
                device_replacement: "Palm Treo $1",
                manufacturer: "Palm"
            }, {
                regex: "webOS.*(P160UNA)/(\\d+).(\\d+)",
                device_replacement: "HP Veer",
                manufacturer: "HP"
            }, {
                regex: "(Kindle Fire)",
                manufacturer: "Amazon"
            }, {
                regex: "(Kindle)",
                manufacturer: "Amazon"
            }, {
                regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
                device_replacement: "Kindle Fire",
                tablet: true,
                manufacturer: "Amazon"
            }, {
                regex: "(iPad) Simulator;",
                manufacturer: "Apple"
            }, {
                regex: "(iPad);",
                manufacturer: "Apple"
            }, {
                regex: "(iPod);",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone) Simulator;",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone);",
                manufacturer: "Apple"
            }, {
                regex: "Nexus\\ ([A-Za-z0-9\\-]+)",
                device_replacement: "Nexus $1"
            }, {
                regex: "acer_([A-Za-z0-9]+)_",
                device_replacement: "Acer $1",
                manufacturer: "Acer"
            }, {
                regex: "acer_([A-Za-z0-9]+)_",
                device_replacement: "Acer $1",
                manufacturer: "Acer"
            }, {
                regex: "Amoi\\-([A-Za-z0-9]+)",
                device_replacement: "Amoi $1",
                other: true,
                manufacturer: "Amoi"
            }, {
                regex: "AMOI\\-([A-Za-z0-9]+)",
                device_replacement: "Amoi $1",
                other: true,
                manufacturer: "Amoi"
            }, {
                regex: "Asus\\-([A-Za-z0-9]+)",
                device_replacement: "Asus $1",
                manufacturer: "Asus"
            }, {
                regex: "ASUS\\-([A-Za-z0-9]+)",
                device_replacement: "Asus $1",
                manufacturer: "Asus"
            }, {
                regex: "BIRD\\-([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            }, {
                regex: "BIRD\\.([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            }, {
                regex: "BIRD ([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            }, {
                regex: "Dell ([A-Za-z0-9]+)",
                device_replacement: "Dell $1",
                manufacturer: "Dell"
            }, {
                regex: "DoCoMo/2\\.0 ([A-Za-z0-9]+)",
                device_replacement: "DoCoMo $1",
                other: true
            }, {
                regex: "([A-Za-z0-9]+)\\_W\\;FOMA",
                device_replacement: "DoCoMo $1",
                other: true
            }, {
                regex: "([A-Za-z0-9]+)\\;FOMA",
                device_replacement: "DoCoMo $1",
                other: true
            }, {
                regex: "vodafone([A-Za-z0-9]+)",
                device_replacement: "Huawei Vodafone $1",
                other: true
            }, {
                regex: "i\\-mate ([A-Za-z0-9]+)",
                device_replacement: "i-mate $1",
                other: true
            }, {
                regex: "Kyocera\\-([A-Za-z0-9]+)",
                device_replacement: "Kyocera $1",
                other: true
            }, {
                regex: "KWC\\-([A-Za-z0-9]+)",
                device_replacement: "Kyocera $1",
                other: true
            }, {
                regex: "Lenovo\\-([A-Za-z0-9]+)",
                device_replacement: "Lenovo $1",
                manufacturer: "Lenovo"
            }, {
                regex: "Lenovo\\_([A-Za-z0-9]+)",
                device_replacement: "Lenovo $1",
                manufacturer: "Levovo"
            }, {
                regex: "LG/([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG-LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE-LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE VX([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG ([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE LG\\-AX([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG\\-([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE\\-([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "(KIN)\\.One (\\d+)\\.(\\d+)",
                device_replacement: "Microsoft $1"
            }, {
                regex: "(KIN)\\.Two (\\d+)\\.(\\d+)",
                device_replacement: "Microsoft $1"
            }, {
                regex: "(Motorola)\\-([A-Za-z0-9]+)",
                manufacturer: "Motorola"
            }, {
                regex: "MOTO\\-([A-Za-z0-9]+)",
                device_replacement: "Motorola $1",
                manufacturer: "Motorola"
            }, {
                regex: "MOT\\-([A-Za-z0-9]+)",
                device_replacement: "Motorola $1",
                manufacturer: "Motorola"
            }, {
                regex: "Philips([A-Za-z0-9]+)",
                device_replacement: "Philips $1",
                manufacturer: "Philips"
            }, {
                regex: "Philips ([A-Za-z0-9]+)",
                device_replacement: "Philips $1",
                manufacturer: "Philips"
            }, {
                regex: "SAMSUNG-([A-Za-z0-9\\-]+)",
                device_replacement: "Samsung $1",
                manufacturer: "Samsung"
            }, {
                regex: "SAMSUNG\\; ([A-Za-z0-9\\-]+)",
                device_replacement: "Samsung $1",
                manufacturer: "Samsung"
            }, {
                regex: "Softbank/1\\.0/([A-Za-z0-9]+)",
                device_replacement: "Softbank $1",
                other: true
            }, {
                regex: "Softbank/2\\.0/([A-Za-z0-9]+)",
                device_replacement: "Softbank $1",
                other: true
            }, {
                regex: "(hiptop|avantgo|plucker|xiino|blazer|elaine|up.browser|up.link|mmp|smartphone|midp|wap|vodafone|o2|pocket|mobile|pda)",
                device_replacement: "Generic Smartphone"
            }, {
                regex: "^(1207|3gso|4thp|501i|502i|503i|504i|505i|506i|6310|6590|770s|802s|a wa|acer|acs\\-|airn|alav|asus|attw|au\\-m|aur |aus |abac|acoo|aiko|alco|alca|amoi|anex|anny|anyw|aptu|arch|argo|bell|bird|bw\\-n|bw\\-u|beck|benq|bilb|blac|c55/|cdm\\-|chtm|capi|comp|cond|craw|dall|dbte|dc\\-s|dica|ds\\-d|ds12|dait|devi|dmob|doco|dopo|el49|erk0|esl8|ez40|ez60|ez70|ezos|ezze|elai|emul|eric|ezwa|fake|fly\\-|fly\\_|g\\-mo|g1 u|g560|gf\\-5|grun|gene|go.w|good|grad|hcit|hd\\-m|hd\\-p|hd\\-t|hei\\-|hp i|hpip|hs\\-c|htc |htc\\-|htca|htcg)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "^(htcp|htcs|htct|htc\\_|haie|hita|huaw|hutc|i\\-20|i\\-go|i\\-ma|i230|iac|iac\\-|iac/|ig01|im1k|inno|iris|jata|java|kddi|kgt|kgt/|kpt |kwc\\-|klon|lexi|lg g|lg\\-a|lg\\-b|lg\\-c|lg\\-d|lg\\-f|lg\\-g|lg\\-k|lg\\-l|lg\\-m|lg\\-o|lg\\-p|lg\\-s|lg\\-t|lg\\-u|lg\\-w|lg/k|lg/l|lg/u|lg50|lg54|lge\\-|lge/|lynx|leno|m1\\-w|m3ga|m50/|maui|mc01|mc21|mcca|medi|meri|mio8|mioa|mo01|mo02|mode|modo|mot |mot\\-|mt50|mtp1|mtv |mate|maxo|merc|mits|mobi|motv|mozz|n100|n101|n102|n202|n203|n300|n302|n500|n502|n505|n700|n701|n710|nec\\-|nem\\-|newg|neon)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "^(netf|noki|nzph|o2 x|o2\\-x|opwv|owg1|opti|oran|ot\\-s|p800|pand|pg\\-1|pg\\-2|pg\\-3|pg\\-6|pg\\-8|pg\\-c|pg13|phil|pn\\-2|pt\\-g|palm|pana|pire|pock|pose|psio|qa\\-a|qc\\-2|qc\\-3|qc\\-5|qc\\-7|qc07|qc12|qc21|qc32|qc60|qci\\-|qwap|qtek|r380|r600|raks|rim9|rove|s55/|sage|sams|sc01|sch\\-|scp\\-|sdk/|se47|sec\\-|sec0|sec1|semc|sgh\\-|shar|sie\\-|sk\\-0|sl45|slid|smb3|smt5|sp01|sph\\-|spv |spv\\-|sy01|samm|sany|sava|scoo|send|siem|smar|smit|soft|sony|t\\-mo|t218|t250|t600|t610|t618|tcl\\-|tdg\\-|telm|tim\\-|ts70|tsm\\-|tsm3|tsm5|tx\\-9|tagt)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "^(talk|teli|topl|tosh|up.b|upg1|utst|v400|v750|veri|vk\\-v|vk40|vk50|vk52|vk53|vm40|vx98|virg|vite|voda|vulc|w3c |w3c\\-|wapj|wapp|wapu|wapm|wig |wapi|wapr|wapv|wapy|wapa|waps|wapt|winc|winw|wonu|x700|xda2|xdag|yas\\-|your|zte\\-|zeto|aste|audi|avan|blaz|brew|brvw|bumb|ccwa|cell|cldc|cmd\\-|dang|eml2|fetc|hipt|http|ibro|idea|ikom|ipaq|jbro|jemu|jigs|keji|kyoc|kyok|libw|m\\-cr|midp|mmef|moto|mwbp|mywa|newt|nok6|o2im|pant|pdxg|play|pluc|port|prox|rozo|sama|seri|smal|symb|treo|upsi|vx52|vx53|vx60|vx61|vx70|vx80|vx81|vx83|vx85|wap\\-|webc|whit|wmlb|xda\\-|xda\\_)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "(bot|borg|google(^tv)|yahoo|slurp|msnbot|msrbot|openbot|archiver|netresearch|lycos|scooter|altavista|teoma|gigabot|baiduspider|blitzbot|oegp|charlotte|furlbot|http%20client|polybot|htdig|ichiro|mogimogi|larbin|pompos|scrubby|searchsight|seekbot|semanticdiscovery|silk|snappy|speedy|spider|voila|vortex|voyager|zao|zeal|fast\\-webcrawler|converacrawler|dataparksearch|findlinks)",
                device_replacement: "Spider"
            } ],
            mobile_browser_families: [ "Firefox Mobile", "Opera Mobile", "Opera Mini", "Mobile Safari", "webOS", "IE Mobile", "Playstation Portable", "Nokia", "Blackberry", "Palm", "Silk", "Android", "Maemo", "Obigo", "Netfront", "AvantGo", "Teleca", "SEMC-Browser", "Bolt", "Iris", "UP.Browser", "Symphony", "Minimo", "Bunjaloo", "Jasmine", "Dolfin", "Polaris", "BREW", "Chrome Mobile", "Chrome Mobile iOS", "UC Browser", "Tizen Browser" ]
        };
        // Parsers
        _this.parsers = [ "device_parsers", "browser_parsers", "os_parsers", "mobile_os_families", "mobile_browser_families" ];
        // Types
        _this.types = [ "browser", "os", "device" ];
        // Regular Expressions
        _this.regexes = regexes || function() {
                var results = {};
                _this.parsers.map(function(parser) {
                    results[parser] = [];
                });
                return results;
            }();
        // Families
        _this.families = function() {
            var results = {};
            _this.types.map(function(type) {
                results[type] = [];
            });
            return results;
        }();
        // Utility Variables
        var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype, nativeForEach = ArrayProto.forEach, nativeIndexOf = ArrayProto.indexOf;
        // Find Utility
        var find = function(ua, obj) {
            var ret = {};
            for (var i = 0; i < obj.length; i++) {
                ret = obj[i](ua);
                if (ret) {
                    break;
                }
            }
            return ret;
        };
        // Remove Utility
        var remove = function(arr, props) {
            each(arr, function(obj) {
                each(props, function(prop) {
                    delete obj[prop];
                });
            });
        };
        // Contains Utility
        var contains = function(obj, target) {
            var found = false;
            if (obj == null) return found;
            if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
            found = any(obj, function(value) {
                return value === target;
            });
            return found;
        };
        // Each Utility
        var each = forEach = function(obj, iterator, context) {
            if (obj == null) return;
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    iterator.call(context, obj[i], i, obj);
                }
            } else {
                for (var key in obj) {
                    if (_.has(obj, key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
        };
        // Extend Utiltiy
        var extend = function(obj) {
            each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            });
            return obj;
        };
        // Check String Utility
        var check = function(str) {
            return !!(str && typeof str != "undefined" && str != null);
        };
        // To Version String Utility
        var toVersionString = function(obj) {
            var output = "";
            obj = obj || {};
            if (check(obj)) {
                if (check(obj.major)) {
                    output += obj.major;
                    if (check(obj.minor)) {
                        output += "." + obj.minor;
                        if (check(obj.patch)) {
                            output += "." + obj.patch;
                        }
                    }
                }
            }
            return output;
        };
        // To String Utility
        var toString = function(obj) {
            obj = obj || {};
            var suffix = toVersionString(obj);
            if (suffix) suffix = " " + suffix;
            return obj && check(obj.family) ? obj.family + suffix : "";
        };
        // Parse User-Agent String
        _this.parse = function(ua) {
            // Parsers Utility
            var parsers = function(type) {
                return _this.regexes[type + "_parsers"].map(function(obj) {
                    var regexp = new RegExp(obj.regex), rep = obj[(type === "browser" ? "family" : type) + "_replacement"], major_rep = obj.major_version_replacement;
                    function parser(ua) {
                        var m = ua.match(regexp);
                        if (!m) return null;
                        var ret = {};
                        ret.family = (rep ? rep.replace("$1", m[1]) : m[1]) || "other";
                        ret.major = parseInt(major_rep ? major_rep : m[2]) || null;
                        ret.minor = m[3] ? parseInt(m[3]) : null;
                        ret.patch = m[4] ? parseInt(m[4]) : null;
                        ret.tablet = obj.tablet;
                        ret.man = obj.manufacturer || null;
                        return ret;
                    }
                    return parser;
                });
            };
            // User Agent
            var UserAgent = function() {};
            // Browsers Parsed
            var browser_parsers = parsers("browser");
            // Operating Systems Parsed
            var os_parsers = parsers("os");
            // Devices Parsed
            var device_parsers = parsers("device");
            // Set Agent
            var a = new UserAgent();
            // Remember the original user agent string
            a.source = ua;
            // Set Browser
            a.browser = find(ua, browser_parsers);
            if (check(a.browser)) {
                a.browser.name = toString(a.browser);
                a.browser.version = toVersionString(a.browser);
            } else {
                a.browser = {};
            }
            // Set OS
            a.os = find(ua, os_parsers);
            if (check(a.os)) {
                a.os.name = toString(a.os);
                a.os.version = toVersionString(a.os);
            } else {
                a.os = {};
            }
            // Set Device
            a.device = find(ua, device_parsers);
            if (check(a.device)) {
                a.device.name = toString(a.device);
                a.device.version = toVersionString(a.device);
            } else {
                a.device = {
                    tablet: false,
                    family: "Other"
                };
            }
            // Determine Device Type
            var mobile_agents = {};
            var mobile_browser_families = _this.regexes.mobile_browser_families.map(function(str) {
                mobile_agents[str] = true;
            });
            var mobile_os_families = _this.regexes.mobile_os_families.map(function(str) {
                mobile_agents[str] = true;
            });
            // Is Spider
            if (a.browser.family === "Spider") {
                a.device.type = "Spider";
            } else if (a.browser.tablet || a.os.tablet || a.device.tablet) {
                a.device.type = "Tablet";
            } else if (mobile_agents.hasOwnProperty(a.browser.family)) {
                a.device.type = "Mobile";
            } else {
                a.device.type = "Desktop";
            }
            // Determine Device Manufacturer
            a.device.manufacturer = a.browser.man || a.os.man || a.device.man || null;
            // Cleanup Objects
            remove([ a.browser, a.os, a.device ], [ "tablet", "man" ]);
            // Return Agent
            return a;
        };
        // Return context
        return _this;
    }();
    // Export the Underscore object for **Node.js** and **"CommonJS"**,
    // backwards-compatibility for the old `require()` API. If we're not
    // CommonJS, add `_` to the global object via a string identifier
    // the Closure Compiler "advanced" mode. Registration as an AMD
    // via define() happens at the end of this file
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = detect;
        }
        exports.detect = detect;
    } else {
        root["detect"] = detect;
    }
    // AMD define happens at the end for compatibility with AMD
    // that don't enforce next-turn semantics on modules
    if (typeof define === "function" && define.amd) {
        define(function(require) {
            return detect;
        });
    }
})(window);

/*!
Chosen, a Select Box Enhancer for jQuery and Prototype
by Patrick Filler for Harvest, http://getharvest.com

Version 1.4.2
Full source at https://github.com/harvesthq/chosen
Copyright (c) 2011-2015 Harvest http://getharvest.com

MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
This file is generated by `grunt build`, do not edit it by hand.
*/

(function() {
  var $, AbstractChosen, Chosen, SelectParser, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SelectParser = (function() {
    function SelectParser() {
      this.options_index = 0;
      this.parsed = [];
    }

    SelectParser.prototype.add_node = function(child) {
      if (child.nodeName.toUpperCase() === "OPTGROUP") {
        return this.add_group(child);
      } else {
        return this.add_option(child);
      }
    };

    SelectParser.prototype.add_group = function(group) {
      var group_position, option, _i, _len, _ref, _results;
      group_position = this.parsed.length;
      this.parsed.push({
        array_index: group_position,
        group: true,
        label: this.escapeExpression(group.label),
        title: group.title ? group.title : void 0,
        children: 0,
        disabled: group.disabled,
        classes: group.className
      });
      _ref = group.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        _results.push(this.add_option(option, group_position, group.disabled));
      }
      return _results;
    };

    SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
      if (option.nodeName.toUpperCase() === "OPTION") {
        if (option.text !== "") {
          if (group_position != null) {
            this.parsed[group_position].children += 1;
          }
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            value: option.value,
            text: option.text,
            html: option.innerHTML,
            title: option.title ? option.title : void 0,
            selected: option.selected,
            disabled: group_disabled === true ? group_disabled : option.disabled,
            group_array_index: group_position,
            group_label: group_position != null ? this.parsed[group_position].label : null,
            classes: option.className,
            style: option.style.cssText
          });
        } else {
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            empty: true
          });
        }
        return this.options_index += 1;
      }
    };

    SelectParser.prototype.escapeExpression = function(text) {
      var map, unsafe_chars;
      if ((text == null) || text === false) {
        return "";
      }
      if (!/[\&\<\>\"\'\`]/.test(text)) {
        return text;
      }
      map = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      };
      unsafe_chars = /&(?!\w+;)|[\<\>\"\'\`]/g;
      return text.replace(unsafe_chars, function(chr) {
        return map[chr] || "&amp;";
      });
    };

    return SelectParser;

  })();

  SelectParser.select_to_array = function(select) {
    var child, parser, _i, _len, _ref;
    parser = new SelectParser();
    _ref = select.childNodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      parser.add_node(child);
    }
    return parser.parsed;
  };

  AbstractChosen = (function() {
    function AbstractChosen(form_field, options) {
      this.form_field = form_field;
      this.options = options != null ? options : {};
      if (!AbstractChosen.browser_is_supported()) {
        return;
      }
      this.is_multiple = this.form_field.multiple;
      this.set_default_text();
      this.set_default_values();
      this.setup();
      this.set_up_html();
      this.register_observers();
      this.on_ready();
    }

    AbstractChosen.prototype.set_default_values = function() {
      var _this = this;
      this.click_test_action = function(evt) {
        return _this.test_active_click(evt);
      };
      this.activate_action = function(evt) {
        return _this.activate_field(evt);
      };
      this.active_field = false;
      this.mouse_on_container = false;
      this.results_showing = false;
      this.result_highlighted = null;
      this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
      this.disable_search_threshold = this.options.disable_search_threshold || 0;
      this.disable_search = this.options.disable_search || false;
      this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : true;
      this.group_search = this.options.group_search != null ? this.options.group_search : true;
      this.search_contains = this.options.search_contains || false;
      this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : true;
      this.max_selected_options = this.options.max_selected_options || Infinity;
      this.inherit_select_classes = this.options.inherit_select_classes || false;
      this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : true;
      this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : true;
      return this.include_group_label_in_selected = this.options.include_group_label_in_selected || false;
    };

    AbstractChosen.prototype.set_default_text = function() {
      if (this.form_field.getAttribute("data-placeholder")) {
        this.default_text = this.form_field.getAttribute("data-placeholder");
      } else if (this.is_multiple) {
        this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text;
      } else {
        this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text;
      }
      return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text;
    };

    AbstractChosen.prototype.choice_label = function(item) {
      if (this.include_group_label_in_selected && (item.group_label != null)) {
        return "<b class='group-name'>" + item.group_label + "</b>" + item.html;
      } else {
        return item.html;
      }
    };

    AbstractChosen.prototype.mouse_enter = function() {
      return this.mouse_on_container = true;
    };

    AbstractChosen.prototype.mouse_leave = function() {
      return this.mouse_on_container = false;
    };

    AbstractChosen.prototype.input_focus = function(evt) {
      var _this = this;
      if (this.is_multiple) {
        if (!this.active_field) {
          return setTimeout((function() {
            return _this.container_mousedown();
          }), 50);
        }
      } else {
        if (!this.active_field) {
          return this.activate_field();
        }
      }
    };

    AbstractChosen.prototype.input_blur = function(evt) {
      var _this = this;
      if (!this.mouse_on_container) {
        this.active_field = false;
        return setTimeout((function() {
          return _this.blur_test();
        }), 100);
      }
    };

    AbstractChosen.prototype.results_option_build = function(options) {
      var content, data, _i, _len, _ref;
      content = '';
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        if (data.group) {
          content += this.result_add_group(data);
        } else {
          content += this.result_add_option(data);
        }
        if (options != null ? options.first : void 0) {
          if (data.selected && this.is_multiple) {
            this.choice_build(data);
          } else if (data.selected && !this.is_multiple) {
            this.single_set_selected_text(this.choice_label(data));
          }
        }
      }
      return content;
    };

    AbstractChosen.prototype.result_add_option = function(option) {
      var classes, option_el;
      if (!option.search_match) {
        return '';
      }
      if (!this.include_option_in_results(option)) {
        return '';
      }
      classes = [];
      if (!option.disabled && !(option.selected && this.is_multiple)) {
        classes.push("active-result");
      }
      if (option.disabled && !(option.selected && this.is_multiple)) {
        classes.push("disabled-result");
      }
      if (option.selected) {
        classes.push("result-selected");
      }
      if (option.group_array_index != null) {
        classes.push("group-option");
      }
      if (option.classes !== "") {
        classes.push(option.classes);
      }
      option_el = document.createElement("li");
      option_el.className = classes.join(" ");
      option_el.style.cssText = option.style;
      option_el.setAttribute("data-option-array-index", option.array_index);
      option_el.innerHTML = option.search_text;
      if (option.title) {
        option_el.title = option.title;
      }
      return this.outerHTML(option_el);
    };

    AbstractChosen.prototype.result_add_group = function(group) {
      var classes, group_el;
      if (!(group.search_match || group.group_match)) {
        return '';
      }
      if (!(group.active_options > 0)) {
        return '';
      }
      classes = [];
      classes.push("group-result");
      if (group.classes) {
        classes.push(group.classes);
      }
      group_el = document.createElement("li");
      group_el.className = classes.join(" ");
      group_el.innerHTML = group.search_text;
      if (group.title) {
        group_el.title = group.title;
      }
      return this.outerHTML(group_el);
    };

    AbstractChosen.prototype.results_update_field = function() {
      this.set_default_text();
      if (!this.is_multiple) {
        this.results_reset_cleanup();
      }
      this.result_clear_highlight();
      this.results_build();
      if (this.results_showing) {
        return this.winnow_results();
      }
    };

    AbstractChosen.prototype.reset_single_select_options = function() {
      var result, _i, _len, _ref, _results;
      _ref = this.results_data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        result = _ref[_i];
        if (result.selected) {
          _results.push(result.selected = false);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    AbstractChosen.prototype.results_toggle = function() {
      if (this.results_showing) {
        return this.results_hide();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.results_search = function(evt) {
      if (this.results_showing) {
        return this.winnow_results();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.winnow_results = function() {
      var escapedSearchText, option, regex, results, results_group, searchText, startpos, text, zregex, _i, _len, _ref;
      this.no_results_clear();
      results = 0;
      searchText = this.get_search_text();
      escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      zregex = new RegExp(escapedSearchText, 'i');
      regex = this.get_search_regex(escapedSearchText);
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        option.search_match = false;
        results_group = null;
        if (this.include_option_in_results(option)) {
          if (option.group) {
            option.group_match = false;
            option.active_options = 0;
          }
          if ((option.group_array_index != null) && this.results_data[option.group_array_index]) {
            results_group = this.results_data[option.group_array_index];
            if (results_group.active_options === 0 && results_group.search_match) {
              results += 1;
            }
            results_group.active_options += 1;
          }
          option.search_text = option.group ? option.label : option.html;
          if (!(option.group && !this.group_search)) {
            option.search_match = this.search_string_match(option.search_text, regex);
            if (option.search_match && !option.group) {
              results += 1;
            }
            if (option.search_match) {
              if (searchText.length) {
                startpos = option.search_text.search(zregex);
                text = option.search_text.substr(0, startpos + searchText.length) + '</em>' + option.search_text.substr(startpos + searchText.length);
                option.search_text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
              }
              if (results_group != null) {
                results_group.group_match = true;
              }
            } else if ((option.group_array_index != null) && this.results_data[option.group_array_index].search_match) {
              option.search_match = true;
            }
          }
        }
      }
      this.result_clear_highlight();
      if (results < 1 && searchText.length) {
        this.update_results_content("");
        return this.no_results(searchText);
      } else {
        this.update_results_content(this.results_option_build());
        return this.winnow_results_set_highlight();
      }
    };

    AbstractChosen.prototype.get_search_regex = function(escaped_search_string) {
      var regex_anchor;
      regex_anchor = this.search_contains ? "" : "^";
      return new RegExp(regex_anchor + escaped_search_string, 'i');
    };

    AbstractChosen.prototype.search_string_match = function(search_string, regex) {
      var part, parts, _i, _len;
      if (regex.test(search_string)) {
        return true;
      } else if (this.enable_split_word_search && (search_string.indexOf(" ") >= 0 || search_string.indexOf("[") === 0)) {
        parts = search_string.replace(/\[|\]/g, "").split(" ");
        if (parts.length) {
          for (_i = 0, _len = parts.length; _i < _len; _i++) {
            part = parts[_i];
            if (regex.test(part)) {
              return true;
            }
          }
        }
      }
    };

    AbstractChosen.prototype.choices_count = function() {
      var option, _i, _len, _ref;
      if (this.selected_option_count != null) {
        return this.selected_option_count;
      }
      this.selected_option_count = 0;
      _ref = this.form_field.options;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        if (option.selected) {
          this.selected_option_count += 1;
        }
      }
      return this.selected_option_count;
    };

    AbstractChosen.prototype.choices_click = function(evt) {
      evt.preventDefault();
      if (!(this.results_showing || this.is_disabled)) {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.keyup_checker = function(evt) {
      var stroke, _ref;
      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
      this.search_field_scale();
      switch (stroke) {
        case 8:
          if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
            return this.keydown_backstroke();
          } else if (!this.pending_backstroke) {
            this.result_clear_highlight();
            return this.results_search();
          }
          break;
        case 13:
          evt.preventDefault();
          if (this.results_showing) {
            return this.result_select(evt);
          }
          break;
        case 27:
          if (this.results_showing) {
            this.results_hide();
          }
          return true;
        case 9:
        case 38:
        case 40:
        case 16:
        case 91:
        case 17:
          break;
        default:
          return this.results_search();
      }
    };

    AbstractChosen.prototype.clipboard_event_checker = function(evt) {
      var _this = this;
      return setTimeout((function() {
        return _this.results_search();
      }), 50);
    };

    AbstractChosen.prototype.container_width = function() {
      if (this.options.width != null) {
        return this.options.width;
      } else {
        return "" + this.form_field.offsetWidth + "px";
      }
    };

    AbstractChosen.prototype.include_option_in_results = function(option) {
      if (this.is_multiple && (!this.display_selected_options && option.selected)) {
        return false;
      }
      if (!this.display_disabled_options && option.disabled) {
        return false;
      }
      if (option.empty) {
        return false;
      }
      return true;
    };

    AbstractChosen.prototype.search_results_touchstart = function(evt) {
      this.touch_started = true;
      return this.search_results_mouseover(evt);
    };

    AbstractChosen.prototype.search_results_touchmove = function(evt) {
      this.touch_started = false;
      return this.search_results_mouseout(evt);
    };

    AbstractChosen.prototype.search_results_touchend = function(evt) {
      if (this.touch_started) {
        return this.search_results_mouseup(evt);
      }
    };

    AbstractChosen.prototype.outerHTML = function(element) {
      var tmp;
      if (element.outerHTML) {
        return element.outerHTML;
      }
      tmp = document.createElement("div");
      tmp.appendChild(element);
      return tmp.innerHTML;
    };

    AbstractChosen.browser_is_supported = function() {
      if (window.navigator.appName === "Microsoft Internet Explorer") {
        return document.documentMode >= 8;
      }
      if (/iP(od|hone)/i.test(window.navigator.userAgent)) {
        return false;
      }
      if (/Android/i.test(window.navigator.userAgent)) {
        if (/Mobile/i.test(window.navigator.userAgent)) {
          return false;
        }
      }
      return true;
    };

    AbstractChosen.default_multiple_text = "Select Some Options";

    AbstractChosen.default_single_text = "Select an Option";

    AbstractChosen.default_no_result_text = "No results match";

    return AbstractChosen;

  })();

  $ = jQuery;

  $.fn.extend({
    chosen: function(options) {
      if (!AbstractChosen.browser_is_supported()) {
        return this;
      }
      return this.each(function(input_field) {
        var $this, chosen;
        $this = $(this);
        chosen = $this.data('chosen');
        if (options === 'destroy' && chosen instanceof Chosen) {
          chosen.destroy();
        } else if (!(chosen instanceof Chosen)) {
          $this.data('chosen', new Chosen(this, options));
        }
      });
    }
  });

  Chosen = (function(_super) {
    __extends(Chosen, _super);

    function Chosen() {
      _ref = Chosen.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Chosen.prototype.setup = function() {
      this.form_field_jq = $(this.form_field);
      this.current_selectedIndex = this.form_field.selectedIndex;
      return this.is_rtl = this.form_field_jq.hasClass("chosen-rtl");
    };

    Chosen.prototype.set_up_html = function() {
      var container_classes, container_props;
      container_classes = ["chosen-container"];
      container_classes.push("chosen-container-" + (this.is_multiple ? "multi" : "single"));
      if (this.inherit_select_classes && this.form_field.className) {
        container_classes.push(this.form_field.className);
      }
      if (this.is_rtl) {
        container_classes.push("chosen-rtl");
      }
      container_props = {
        'class': container_classes.join(' '),
        'style': "width: " + (this.container_width()) + ";",
        'title': this.form_field.title
      };
      if (this.form_field.id.length) {
        container_props.id = this.form_field.id.replace(/[^\w]/g, '_') + "_chosen";
      }
      this.container = $("<div />", container_props);
      if (this.is_multiple) {
        this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>');
      } else {
        this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>');
      }
      this.form_field_jq.hide().after(this.container);
      this.dropdown = this.container.find('div.chosen-drop').first();
      this.search_field = this.container.find('input').first();
      this.search_results = this.container.find('ul.chosen-results').first();
      this.search_field_scale();
      this.search_no_results = this.container.find('li.no-results').first();
      if (this.is_multiple) {
        this.search_choices = this.container.find('ul.chosen-choices').first();
        this.search_container = this.container.find('li.search-field').first();
      } else {
        this.search_container = this.container.find('div.chosen-search').first();
        this.selected_item = this.container.find('.chosen-single').first();
      }
      this.results_build();
      this.set_tab_index();
      return this.set_label_behavior();
    };

    Chosen.prototype.on_ready = function() {
      return this.form_field_jq.trigger("chosen:ready", {
        chosen: this
      });
    };

    Chosen.prototype.register_observers = function() {
      var _this = this;
      this.container.bind('touchstart.chosen', function(evt) {
        _this.container_mousedown(evt);
        return evt.preventDefault();
      });
      this.container.bind('touchend.chosen', function(evt) {
        _this.container_mouseup(evt);
        return evt.preventDefault();
      });
      this.container.bind('mousedown.chosen', function(evt) {
        _this.container_mousedown(evt);
      });
      this.container.bind('mouseup.chosen', function(evt) {
        _this.container_mouseup(evt);
      });
      this.container.bind('mouseenter.chosen', function(evt) {
        _this.mouse_enter(evt);
      });
      this.container.bind('mouseleave.chosen', function(evt) {
        _this.mouse_leave(evt);
      });
      this.search_results.bind('mouseup.chosen', function(evt) {
        _this.search_results_mouseup(evt);
      });
      this.search_results.bind('mouseover.chosen', function(evt) {
        _this.search_results_mouseover(evt);
      });
      this.search_results.bind('mouseout.chosen', function(evt) {
        _this.search_results_mouseout(evt);
      });
      this.search_results.bind('mousewheel.chosen DOMMouseScroll.chosen', function(evt) {
        _this.search_results_mousewheel(evt);
      });
      this.search_results.bind('touchstart.chosen', function(evt) {
        _this.search_results_touchstart(evt);
      });
      this.search_results.bind('touchmove.chosen', function(evt) {
        _this.search_results_touchmove(evt);
      });
      this.search_results.bind('touchend.chosen', function(evt) {
        _this.search_results_touchend(evt);
      });
      this.form_field_jq.bind("chosen:updated.chosen", function(evt) {
        _this.results_update_field(evt);
      });
      this.form_field_jq.bind("chosen:activate.chosen", function(evt) {
        _this.activate_field(evt);
      });
      this.form_field_jq.bind("chosen:open.chosen", function(evt) {
        _this.container_mousedown(evt);
      });
      this.form_field_jq.bind("chosen:close.chosen", function(evt) {
        _this.input_blur(evt);
      });
      this.search_field.bind('blur.chosen', function(evt) {
        _this.input_blur(evt);
      });
      this.search_field.bind('keyup.chosen', function(evt) {
        _this.keyup_checker(evt);
      });
      this.search_field.bind('keydown.chosen', function(evt) {
        _this.keydown_checker(evt);
      });
      this.search_field.bind('focus.chosen', function(evt) {
        _this.input_focus(evt);
      });
      this.search_field.bind('cut.chosen', function(evt) {
        _this.clipboard_event_checker(evt);
      });
      this.search_field.bind('paste.chosen', function(evt) {
        _this.clipboard_event_checker(evt);
      });
      if (this.is_multiple) {
        return this.search_choices.bind('click.chosen', function(evt) {
          _this.choices_click(evt);
        });
      } else {
        return this.container.bind('click.chosen', function(evt) {
          evt.preventDefault();
        });
      }
    };

    Chosen.prototype.destroy = function() {
      $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
      if (this.search_field[0].tabIndex) {
        this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex;
      }
      this.container.remove();
      this.form_field_jq.removeData('chosen');
      return this.form_field_jq.show();
    };

    Chosen.prototype.search_field_disabled = function() {
      this.is_disabled = this.form_field_jq[0].disabled;
      if (this.is_disabled) {
        this.container.addClass('chosen-disabled');
        this.search_field[0].disabled = true;
        if (!this.is_multiple) {
          this.selected_item.unbind("focus.chosen", this.activate_action);
        }
        return this.close_field();
      } else {
        this.container.removeClass('chosen-disabled');
        this.search_field[0].disabled = false;
        if (!this.is_multiple) {
          return this.selected_item.bind("focus.chosen", this.activate_action);
        }
      }
    };

    Chosen.prototype.container_mousedown = function(evt) {
      if (!this.is_disabled) {
        if (evt && evt.type === "mousedown" && !this.results_showing) {
          evt.preventDefault();
        }
        if (!((evt != null) && ($(evt.target)).hasClass("search-choice-close"))) {
          if (!this.active_field) {
            if (this.is_multiple) {
              this.search_field.val("");
            }
            $(this.container[0].ownerDocument).bind('click.chosen', this.click_test_action);
            this.results_show();
          } else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chosen-single").length)) {
            evt.preventDefault();
            this.results_toggle();
          }
          return this.activate_field();
        }
      }
    };

    Chosen.prototype.container_mouseup = function(evt) {
      if (evt.target.nodeName === "ABBR" && !this.is_disabled) {
        return this.results_reset(evt);
      }
    };

    Chosen.prototype.search_results_mousewheel = function(evt) {
      var delta;
      if (evt.originalEvent) {
        delta = evt.originalEvent.deltaY || -evt.originalEvent.wheelDelta || evt.originalEvent.detail;
      }
      if (delta != null) {
        evt.preventDefault();
        if (evt.type === 'DOMMouseScroll') {
          delta = delta * 40;
        }
        return this.search_results.scrollTop(delta + this.search_results.scrollTop());
      }
    };

    Chosen.prototype.blur_test = function(evt) {
      if (!this.active_field && this.container.hasClass("chosen-container-active")) {
        return this.close_field();
      }
    };

    Chosen.prototype.close_field = function() {
      $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
      this.active_field = false;
      this.results_hide();
      this.container.removeClass("chosen-container-active");
      this.clear_backstroke();
      this.show_search_field_default();
      return this.search_field_scale();
    };

    Chosen.prototype.activate_field = function() {
      this.container.addClass("chosen-container-active");
      this.active_field = true;
      this.search_field.val(this.search_field.val());
      return this.search_field.focus();
    };

    Chosen.prototype.test_active_click = function(evt) {
      var active_container;
      active_container = $(evt.target).closest('.chosen-container');
      if (active_container.length && this.container[0] === active_container[0]) {
        return this.active_field = true;
      } else {
        return this.close_field();
      }
    };

    Chosen.prototype.results_build = function() {
      this.parsing = true;
      this.selected_option_count = null;
      this.results_data = SelectParser.select_to_array(this.form_field);
      if (this.is_multiple) {
        this.search_choices.find("li.search-choice").remove();
      } else if (!this.is_multiple) {
        this.single_set_selected_text();
        if (this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {
          this.search_field[0].readOnly = true;
          this.container.addClass("chosen-container-single-nosearch");
        } else {
          this.search_field[0].readOnly = false;
          this.container.removeClass("chosen-container-single-nosearch");
        }
      }
      this.update_results_content(this.results_option_build({
        first: true
      }));
      this.search_field_disabled();
      this.show_search_field_default();
      this.search_field_scale();
      return this.parsing = false;
    };

    Chosen.prototype.result_do_highlight = function(el) {
      var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
      if (el.length) {
        this.result_clear_highlight();
        this.result_highlight = el;
        this.result_highlight.addClass("highlighted");
        maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
        visible_top = this.search_results.scrollTop();
        visible_bottom = maxHeight + visible_top;
        high_top = this.result_highlight.position().top + this.search_results.scrollTop();
        high_bottom = high_top + this.result_highlight.outerHeight();
        if (high_bottom >= visible_bottom) {
          return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
        } else if (high_top < visible_top) {
          return this.search_results.scrollTop(high_top);
        }
      }
    };

    Chosen.prototype.result_clear_highlight = function() {
      if (this.result_highlight) {
        this.result_highlight.removeClass("highlighted");
      }
      return this.result_highlight = null;
    };

    Chosen.prototype.results_show = function() {
      if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
        this.form_field_jq.trigger("chosen:maxselected", {
          chosen: this
        });
        return false;
      }
      this.container.addClass("chosen-with-drop");
      this.results_showing = true;
      this.search_field.focus();
      this.search_field.val(this.search_field.val());
      this.winnow_results();
      return this.form_field_jq.trigger("chosen:showing_dropdown", {
        chosen: this
      });
    };

    Chosen.prototype.update_results_content = function(content) {
      return this.search_results.html(content);
    };

    Chosen.prototype.results_hide = function() {
      if (this.results_showing) {
        this.result_clear_highlight();
        this.container.removeClass("chosen-with-drop");
        this.form_field_jq.trigger("chosen:hiding_dropdown", {
          chosen: this
        });
      }
      return this.results_showing = false;
    };

    Chosen.prototype.set_tab_index = function(el) {
      var ti;
      if (this.form_field.tabIndex) {
        ti = this.form_field.tabIndex;
        this.form_field.tabIndex = -1;
        return this.search_field[0].tabIndex = ti;
      }
    };

    Chosen.prototype.set_label_behavior = function() {
      var _this = this;
      this.form_field_label = this.form_field_jq.parents("label");
      if (!this.form_field_label.length && this.form_field.id.length) {
        this.form_field_label = $("label[for='" + this.form_field.id + "']");
      }
      if (this.form_field_label.length > 0) {
        return this.form_field_label.bind('click.chosen', function(evt) {
          if (_this.is_multiple) {
            return _this.container_mousedown(evt);
          } else {
            return _this.activate_field();
          }
        });
      }
    };

    Chosen.prototype.show_search_field_default = function() {
      if (this.is_multiple && this.choices_count() < 1 && !this.active_field) {
        this.search_field.val(this.default_text);
        return this.search_field.addClass("default");
      } else {
        this.search_field.val("");
        return this.search_field.removeClass("default");
      }
    };

    Chosen.prototype.search_results_mouseup = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target.length) {
        this.result_highlight = target;
        this.result_select(evt);
        return this.search_field.focus();
      }
    };

    Chosen.prototype.search_results_mouseover = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target) {
        return this.result_do_highlight(target);
      }
    };

    Chosen.prototype.search_results_mouseout = function(evt) {
      if ($(evt.target).hasClass("active-result" || $(evt.target).parents('.active-result').first())) {
        return this.result_clear_highlight();
      }
    };

    Chosen.prototype.choice_build = function(item) {
      var choice, close_link,
        _this = this;
      choice = $('<li />', {
        "class": "search-choice"
      }).html("<span>" + (this.choice_label(item)) + "</span>");
      if (item.disabled) {
        choice.addClass('search-choice-disabled');
      } else {
        close_link = $('<a />', {
          "class": 'search-choice-close',
          'data-option-array-index': item.array_index
        });
        close_link.bind('click.chosen', function(evt) {
          return _this.choice_destroy_link_click(evt);
        });
        choice.append(close_link);
      }
      return this.search_container.before(choice);
    };

    Chosen.prototype.choice_destroy_link_click = function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (!this.is_disabled) {
        return this.choice_destroy($(evt.target));
      }
    };

    Chosen.prototype.choice_destroy = function(link) {
      if (this.result_deselect(link[0].getAttribute("data-option-array-index"))) {
        this.show_search_field_default();
        if (this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1) {
          this.results_hide();
        }
        link.parents('li').first().remove();
        return this.search_field_scale();
      }
    };

    Chosen.prototype.results_reset = function() {
      this.reset_single_select_options();
      this.form_field.options[0].selected = true;
      this.single_set_selected_text();
      this.show_search_field_default();
      this.results_reset_cleanup();
      this.form_field_jq.trigger("change");
      if (this.active_field) {
        return this.results_hide();
      }
    };

    Chosen.prototype.results_reset_cleanup = function() {
      this.current_selectedIndex = this.form_field.selectedIndex;
      return this.selected_item.find("abbr").remove();
    };

    Chosen.prototype.result_select = function(evt) {
      var high, item;
      if (this.result_highlight) {
        high = this.result_highlight;
        this.result_clear_highlight();
        if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
          this.form_field_jq.trigger("chosen:maxselected", {
            chosen: this
          });
          return false;
        }
        if (this.is_multiple) {
          high.removeClass("active-result");
        } else {
          this.reset_single_select_options();
        }
        high.addClass("result-selected");
        item = this.results_data[high[0].getAttribute("data-option-array-index")];
        item.selected = true;
        this.form_field.options[item.options_index].selected = true;
        this.selected_option_count = null;
        if (this.is_multiple) {
          this.choice_build(item);
        } else {
          this.single_set_selected_text(this.choice_label(item));
        }
        if (!((evt.metaKey || evt.ctrlKey) && this.is_multiple)) {
          this.results_hide();
        }
        this.search_field.val("");
        if (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) {
          this.form_field_jq.trigger("change", {
            'selected': this.form_field.options[item.options_index].value
          });
        }
        this.current_selectedIndex = this.form_field.selectedIndex;
        evt.preventDefault();
        return this.search_field_scale();
      }
    };

    Chosen.prototype.single_set_selected_text = function(text) {
      if (text == null) {
        text = this.default_text;
      }
      if (text === this.default_text) {
        this.selected_item.addClass("chosen-default");
      } else {
        this.single_deselect_control_build();
        this.selected_item.removeClass("chosen-default");
      }
      return this.selected_item.find("span").html(text);
    };

    Chosen.prototype.result_deselect = function(pos) {
      var result_data;
      result_data = this.results_data[pos];
      if (!this.form_field.options[result_data.options_index].disabled) {
        result_data.selected = false;
        this.form_field.options[result_data.options_index].selected = false;
        this.selected_option_count = null;
        this.result_clear_highlight();
        if (this.results_showing) {
          this.winnow_results();
        }
        this.form_field_jq.trigger("change", {
          deselected: this.form_field.options[result_data.options_index].value
        });
        this.search_field_scale();
        return true;
      } else {
        return false;
      }
    };

    Chosen.prototype.single_deselect_control_build = function() {
      if (!this.allow_single_deselect) {
        return;
      }
      if (!this.selected_item.find("abbr").length) {
        this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
      }
      return this.selected_item.addClass("chosen-single-with-deselect");
    };

    Chosen.prototype.get_search_text = function() {
      return $('<div/>').text($.trim(this.search_field.val())).html();
    };

    Chosen.prototype.winnow_results_set_highlight = function() {
      var do_high, selected_results;
      selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
      do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
      if (do_high != null) {
        return this.result_do_highlight(do_high);
      }
    };

    Chosen.prototype.no_results = function(terms) {
      var no_results_html;
      no_results_html = $('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>');
      no_results_html.find("span").first().html(terms);
      this.search_results.append(no_results_html);
      return this.form_field_jq.trigger("chosen:no_results", {
        chosen: this
      });
    };

    Chosen.prototype.no_results_clear = function() {
      return this.search_results.find(".no-results").remove();
    };

    Chosen.prototype.keydown_arrow = function() {
      var next_sib;
      if (this.results_showing && this.result_highlight) {
        next_sib = this.result_highlight.nextAll("li.active-result").first();
        if (next_sib) {
          return this.result_do_highlight(next_sib);
        }
      } else {
        return this.results_show();
      }
    };

    Chosen.prototype.keyup_arrow = function() {
      var prev_sibs;
      if (!this.results_showing && !this.is_multiple) {
        return this.results_show();
      } else if (this.result_highlight) {
        prev_sibs = this.result_highlight.prevAll("li.active-result");
        if (prev_sibs.length) {
          return this.result_do_highlight(prev_sibs.first());
        } else {
          if (this.choices_count() > 0) {
            this.results_hide();
          }
          return this.result_clear_highlight();
        }
      }
    };

    Chosen.prototype.keydown_backstroke = function() {
      var next_available_destroy;
      if (this.pending_backstroke) {
        this.choice_destroy(this.pending_backstroke.find("a").first());
        return this.clear_backstroke();
      } else {
        next_available_destroy = this.search_container.siblings("li.search-choice").last();
        if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {
          this.pending_backstroke = next_available_destroy;
          if (this.single_backstroke_delete) {
            return this.keydown_backstroke();
          } else {
            return this.pending_backstroke.addClass("search-choice-focus");
          }
        }
      }
    };

    Chosen.prototype.clear_backstroke = function() {
      if (this.pending_backstroke) {
        this.pending_backstroke.removeClass("search-choice-focus");
      }
      return this.pending_backstroke = null;
    };

    Chosen.prototype.keydown_checker = function(evt) {
      var stroke, _ref1;
      stroke = (_ref1 = evt.which) != null ? _ref1 : evt.keyCode;
      this.search_field_scale();
      if (stroke !== 8 && this.pending_backstroke) {
        this.clear_backstroke();
      }
      switch (stroke) {
        case 8:
          this.backstroke_length = this.search_field.val().length;
          break;
        case 9:
          if (this.results_showing && !this.is_multiple) {
            this.result_select(evt);
          }
          this.mouse_on_container = false;
          break;
        case 13:
          if (this.results_showing) {
            evt.preventDefault();
          }
          break;
        case 32:
          if (this.disable_search) {
            evt.preventDefault();
          }
          break;
        case 38:
          evt.preventDefault();
          this.keyup_arrow();
          break;
        case 40:
          evt.preventDefault();
          this.keydown_arrow();
          break;
      }
    };

    Chosen.prototype.search_field_scale = function() {
      var div, f_width, h, style, style_block, styles, w, _i, _len;
      if (this.is_multiple) {
        h = 0;
        w = 0;
        style_block = "position:absolute; left: -1000px; top: -1000px; display:none;";
        styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
        for (_i = 0, _len = styles.length; _i < _len; _i++) {
          style = styles[_i];
          style_block += style + ":" + this.search_field.css(style) + ";";
        }
        div = $('<div />', {
          'style': style_block
        });
        div.text(this.search_field.val());
        $('body').append(div);
        w = div.width() + 25;
        div.remove();
        f_width = this.container.outerWidth();
        if (w > f_width - 10) {
          w = f_width - 10;
        }
        return this.search_field.css({
          'width': w + 'px'
        });
      }
    };

    return Chosen;

  })(AbstractChosen);

}).call(this);

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
