(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{167:function(n,r,t){"use strict";var o="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),e=new Uint8Array(16);function u(){if(!o)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return o(e)}for(var a=[],p=0;p<256;++p)a[p]=(p+256).toString(16).substr(1);var i=function(n,r){var t=r||0,o=a;return[o[n[t++]],o[n[t++]],o[n[t++]],o[n[t++]],"-",o[n[t++]],o[n[t++]],"-",o[n[t++]],o[n[t++]],"-",o[n[t++]],o[n[t++]],"-",o[n[t++]],o[n[t++]],o[n[t++]],o[n[t++]],o[n[t++]],o[n[t++]]].join("")};r.a=function(n,r,t){var o=r&&t||0;"string"==typeof n&&(r="binary"===n?new Array(16):null,n=null);var e=(n=n||{}).random||(n.rng||u)();if(e[6]=15&e[6]|64,e[8]=63&e[8]|128,r)for(var a=0;a<16;++a)r[o+a]=e[a];return r||i(e)}}}]);