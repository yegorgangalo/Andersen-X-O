(()=>{var t={927:()=>{var t={name:"Player1",suit:""},e={name:"Player2",suit:""},n={formModalRef:document.querySelector("[data-form-modal]"),backdropRef:document.querySelector("[data-backdrop]"),spanPlayerNameRef:document.querySelector("[player-name]"),spanPlayWithRef:document.querySelector("[play-with-xo]")},r=n.formModalRef,o=n.backdropRef,a=n.spanPlayerNameRef,i=n.spanPlayWithRef;r&&r.addEventListener("submit",(function(n){n.preventDefault();var r=n.target,o=new FormData(r),c={};o.forEach((function(t,e){c[e]=t})),c.namePlayer1&&(t.name=c.namePlayer1),c.namePlayer1&&(e.name=c.namePlayer2),t.suit=c.choosePlayWith,e.suit="X"===t.suit?"O":"X",a.textContent=t.name,i.textContent=t.suit})),r&&r.addEventListener("submit",(function(){o.classList.toggle("is-hidden")}));var c=document.querySelectorAll(".play-field td");function s(n){var r=n.target;""===r.textContent&&(r.textContent=a.textContent===t.name?t.suit:e.suit,function(t){var e=t.textContent;switch(t.id){case"1":if(c[1].textContent===e&&c[2].textContent===e||c[3].textContent===e&&c[6].textContent===e||c[4].textContent===e&&c[8].textContent===e)return!0;break;case"2":if(c[0].textContent===e&&c[2].textContent===e||c[4].textContent===e&&c[7].textContent===e)return!0;break;case"3":if(c[0].textContent===e&&c[1].textContent===e||c[5].textContent===e&&c[8].textContent===e||c[4].textContent===e&&c[6].textContent===e)return!0;break;case"4":if(c[0].textContent===e&&c[6].textContent===e||c[4].textContent===e&&c[5].textContent===e)return!0;break;case"5":if(c[0].textContent===e&&c[8].textContent===e||c[1].textContent===e&&c[7].textContent===e||c[2].textContent===e&&c[6].textContent===e||c[3].textContent===e&&c[5].textContent===e)return!0;break;case"6":if(c[2].textContent===e&&c[8].textContent===e||c[3].textContent===e&&c[4].textContent===e)return!0;break;case"7":if(c[0].textContent===e&&c[3].textContent===e||c[2].textContent===e&&c[4].textContent===e||c[7].textContent===e&&c[8].textContent===e)return!0;break;case"8":if(c[1].textContent===e&&c[4].textContent===e||c[6].textContent===e&&c[8].textContent===e)return!0;break;case"9":if(c[0].textContent===e&&c[4].textContent===e||c[2].textContent===e&&c[5].textContent===e||c[6].textContent===e&&c[7].textContent===e)return!0}}(r)&&alert("Winner"),a.textContent===t.name?(a.textContent=e.name,i.textContent=e.suit):(a.textContent=t.name,i.textContent=t.suit))}c.forEach((function(t){return t.addEventListener("click",s)}))},379:(t,e,n)=>{"use strict";var r,o=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),a=[];function i(t){for(var e=-1,n=0;n<a.length;n++)if(a[n].identifier===t){e=n;break}return e}function c(t,e){for(var n={},r=[],o=0;o<t.length;o++){var c=t[o],s=e.base?c[0]+e.base:c[0],u=n[s]||0,l="".concat(s," ").concat(u);n[s]=u+1;var d=i(l),f={css:c[1],media:c[2],sourceMap:c[3]};-1!==d?(a[d].references++,a[d].updater(f)):a.push({identifier:l,updater:m(f,e),references:1}),r.push(l)}return r}function s(t){var e=document.createElement("style"),r=t.attributes||{};if(void 0===r.nonce){var a=n.nc;a&&(r.nonce=a)}if(Object.keys(r).forEach((function(t){e.setAttribute(t,r[t])})),"function"==typeof t.insert)t.insert(e);else{var i=o(t.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(e)}return e}var u,l=(u=[],function(t,e){return u[t]=e,u.filter(Boolean).join("\n")});function d(t,e,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(t.styleSheet)t.styleSheet.cssText=l(e,o);else{var a=document.createTextNode(o),i=t.childNodes;i[e]&&t.removeChild(i[e]),i.length?t.insertBefore(a,i[e]):t.appendChild(a)}}function f(t,e,n){var r=n.css,o=n.media,a=n.sourceMap;if(o?t.setAttribute("media",o):t.removeAttribute("media"),a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var x=null,C=0;function m(t,e){var n,r,o;if(e.singleton){var a=C++;n=x||(x=s(e)),r=d.bind(null,n,a,!1),o=d.bind(null,n,a,!0)}else n=s(e),r=f.bind(null,n,e),o=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var n=c(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var r=0;r<n.length;r++){var o=i(n[r]);a[o].references--}for(var s=c(t,e),u=0;u<n.length;u++){var l=i(n[u]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}n=s}}}},399:t=>{function e(t){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}e.keys=()=>[],e.resolve=e,e.id=399,t.exports=e}},e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{"use strict";var t={};n.r(t),n(927);var e=n(379);n.n(e)()(t.default,{insert:"head",singleton:!1}),t.default.locals,n(399)})()})();