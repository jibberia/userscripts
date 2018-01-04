// ==UserScript==
// @name         Reddit Comment Collapsing
// @namespace    https://github.com/jibberia/userscripts
// @version      1.0
// @description  Remember collapsed comments on reddit
// @author       jibberia
// @match        http*://*.reddit.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jibberia/userscripts/master/reddit-comment-collapsing.js
// @downloadURL  https://raw.githubusercontent.com/jibberia/userscripts/master/reddit-comment-collapsing.js
// ==/UserScript==

(function() {
    "use strict";

    // use reddit's "thing id" to make our storage key
    // seems like the short URL is the best way to make sure we're on a comments page
    const shortUrlEl = document.querySelector("link[rel=shorturl]");
    if (!shortUrlEl) return;

    const urlComponents = shortUrlEl.href.split("/");
    if (!urlComponents || urlComponents.length == 0) return;

    const thingId = urlComponents[urlComponents.length - 1];

    const storageKey = "collapsed_ids" + thingId;

    // store collapsed comment IDs when leaving the page
    window.addEventListener("beforeunload", (e) => {
        const ids = [...document.body.querySelectorAll(".comment.collapsed")].map(x => x.id);
        sessionStorage.setItem(storageKey, JSON.stringify(ids));
    });

    // collapse comments after rendering page
    const collapsedIds = JSON.parse(sessionStorage.getItem(storageKey)) || [];
    for (const id of collapsedIds) {
        const el = document.getElementById(id);
        el.classList.remove("noncollapsed");
        el.classList.add("collapsed");
    }
})();
