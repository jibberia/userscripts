// ==UserScript==
// @name         No Highlighting (reddit gold)
// @namespace    https://github.com/jibberia/userscripts
// @version      1.0
// @description  Disable reddit gold's "new comment highlighting" by default
// @author       jibberia
// @match        https://*.reddit.com/*comments*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jibberia/userscripts/master/reddit-no-highlighting.user.js
// @downloadURL  https://raw.githubusercontent.com/jibberia/userscripts/master/reddit-no-highlighting.user.js
// ==/UserScript==

(function() {
    "use strict";

    var el = document.getElementById("comment-visits");
    el.selectedIndex = el.length - 1;

    // reddit uses jQuery
    $(el).change();
})();
