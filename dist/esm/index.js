import e from"react";function t(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===n&&o.firstChild?o.insertBefore(a,o.firstChild):o.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}t(".dr-button {\n  font-size: 24px;\n}");const n=t=>e.createElement("button",{className:"dr-button"},t.label);t(".dr-aspect-ratio {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n}\n\n.dr-aspect-ratio-child {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}");const o=({ratio:t,containerClass:n="",children:o})=>{let a="0";return"4:3"===t?a="75%":"16:9"===t?a="56.25%":"1:1"===t?a="100%":console.warn("aspect ratio not supported"),e.createElement("div",{className:`${n} dr-aspect-ratio`,style:{paddingBottom:a}},e.Children.map(o,(t=>e.cloneElement(t,{className:`${t.props.className} dr-aspect-ratio-child`}))))};export{o as DrAspectRatio,n as DrButton};
//# sourceMappingURL=index.js.map
