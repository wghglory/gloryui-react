"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("react"));function n(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===n&&o.firstChild?o.insertBefore(a,o.firstChild):o.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}n("button {\n  font-size: 60px;\n}");n(".dr-aspect-ratio {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n}");exports.DrAspectRatio=({ratio:e,containerClass:n="",children:o})=>{let a="0";return"4:3"===e?a="75%":"16:9"===e?a="56.25%":"1:1"===e?a="100%":console.warn("aspect ratio not supported"),t.default.createElement("div",{className:`${n} dr-aspect-ratio`,style:{paddingBottom:a}},t.default.cloneElement(o,{className:o.props.className,style:{position:"absolute",width:"100%",height:"100%"}}))},exports.DrButton=e=>t.default.createElement("button",null,e.label);
//# sourceMappingURL=index.js.map
