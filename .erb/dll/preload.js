(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron"
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
(module) {

module.exports = require("electron");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/main/preload.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable camelcase */
// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */

const electronHandler = {
    ipcRenderer: {
        sendMessage(channel, ...args) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(channel, args);
        },
        on: (channel, func) => {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channel, func);
        },
        off: (channel, func) => {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.off(channel, func);
        },
        removeAllListeners: (channel) => {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeAllListeners(channel);
        },
        listenerCount: (channel) => {
            return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.listenerCount(channel);
        },
        once: (channel, func) => {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.once(channel, func);
        },
        invoke: async (channel, ...args) => {
            return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke(channel, ...args);
        },
    },
};
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electron', electronHandler);
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('env', { GEMINI_API_KEY: process.env.GEMINI_API_KEY });
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('write_to_file', { saveFile: (file_name, content, overwrite) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('write-to-file', { file_name, content, overwrite }) });
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('run_test', { RunPythonCode: (file_name, file) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('run-test', { file_name, file }) });

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZBLHFDOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ05BLDhCQUE4QjtBQUM5QixpREFBaUQ7QUFDakQsZ0NBQWdDO0FBQ3dDO0FBK0N4RSxNQUFNLGVBQWUsR0FBb0I7SUFDdkMsV0FBVyxFQUFFO1FBQ1gsV0FBVyxDQUFDLE9BQWlCLEVBQUUsR0FBRyxJQUFlO1lBQy9DLGlEQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQsRUFBRSxFQUFFLENBQ0YsT0FBVSxFQUNWLElBR1MsRUFDVCxFQUFFO1lBQ0YsaURBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxHQUFHLEVBQUUsQ0FDSCxPQUFVLEVBQ1YsSUFHUyxFQUNULEVBQUU7WUFDRixpREFBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELGtCQUFrQixFQUFFLENBQXVDLE9BQVUsRUFBRSxFQUFFO1lBQ3ZFLGlEQUFXLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELGFBQWEsRUFBRSxDQUNiLE9BQVUsRUFDRixFQUFFO1lBQ1YsT0FBTyxpREFBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRUQsSUFBSSxFQUFFLENBQ0osT0FBVSxFQUNWLElBR1MsRUFDVCxFQUFFO1lBQ0YsaURBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFO1lBQ2pDLE9BQU8saURBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQztLQUNGO0NBQ0YsQ0FBQztBQUVGLG1EQUFhLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRTdELG1EQUFhLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFDLENBQUMsQ0FBQztBQUVyRixtREFBYSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSxDQUFDLFNBQWlCLEVBQUUsT0FBZSxFQUFFLFNBQWtCLEVBQUUsRUFBRSxDQUFDLGlEQUFXLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFTL0wsbURBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsRUFBQyxhQUFhLEVBQUUsQ0FBQyxTQUFpQixFQUFFLElBQVksRUFBRSxFQUFFLENBQUMsaURBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9tYWluL3ByZWxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKGdsb2JhbCwgKCkgPT4ge1xucmV0dXJuICIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuLy8gRGlzYWJsZSBuby11bnVzZWQtdmFycywgYnJva2VuIGZvciBzcHJlYWQgYXJnc1xuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBvZmYgKi9cbmltcG9ydCB7IElwY1JlbmRlcmVyRXZlbnQsIGNvbnRleHRCcmlkZ2UsIGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgSVBDTWV0aG9kcyB9IGZyb20gJ3NoYXJlZC9JUEMvdHlwZXMvY2xpZW50VG9TZXJ2ZXInO1xuaW1wb3J0IHsgSVBDX1B1c2hOb3RpZmljYXRpb24gfSBmcm9tICdzaGFyZWQvSVBDL3R5cGVzL3NlcnZlclRvQ2xpZW50JztcblxudHlwZSBDaGFubmVscyA9IGtleW9mIElQQ01ldGhvZHM7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRWxlY3Ryb25IYW5kbGVyIHtcbiAgaXBjUmVuZGVyZXI6IHtcbiAgICBzZW5kTWVzc2FnZShjaGFubmVsOiBDaGFubmVscywgLi4uYXJnczogdW5rbm93bltdKTogdm9pZDtcblxuICAgIG9uOiA8VCBleHRlbmRzIGtleW9mIElQQ19QdXNoTm90aWZpY2F0aW9uPihcbiAgICAgIGNoYW5uZWw6IFQsXG4gICAgICBmdW5jOiAoXG4gICAgICAgIF9ldmVudDogSXBjUmVuZGVyZXJFdmVudCxcbiAgICAgICAgYXJnczogSVBDX1B1c2hOb3RpZmljYXRpb25bVF1bJ3BheWxvYWQnXVxuICAgICAgKSA9PiB2b2lkXG4gICAgKSA9PiB2b2lkO1xuXG4gICAgb2ZmOiA8VCBleHRlbmRzIGtleW9mIElQQ19QdXNoTm90aWZpY2F0aW9uPihcbiAgICAgIGNoYW5uZWw6IFQsXG4gICAgICBmdW5jOiAoXG4gICAgICAgIF9ldmVudDogSXBjUmVuZGVyZXJFdmVudCxcbiAgICAgICAgYXJnczogSVBDX1B1c2hOb3RpZmljYXRpb25bVF1bJ3BheWxvYWQnXVxuICAgICAgKSA9PiB2b2lkXG4gICAgKSA9PiB2b2lkO1xuXG4gICAgcmVtb3ZlQWxsTGlzdGVuZXJzOiA8VCBleHRlbmRzIGtleW9mIElQQ19QdXNoTm90aWZpY2F0aW9uPihcbiAgICAgIGNoYW5uZWw6IFRcbiAgICApID0+IHZvaWQ7XG5cbiAgICBvbmNlOiA8VCBleHRlbmRzIGtleW9mIElQQ19QdXNoTm90aWZpY2F0aW9uPihcbiAgICAgIGNoYW5uZWw6IFQsXG4gICAgICBmdW5jOiAoXG4gICAgICAgIF9ldmVudDogSXBjUmVuZGVyZXJFdmVudCxcbiAgICAgICAgYXJnczogSVBDX1B1c2hOb3RpZmljYXRpb25bVF1bJ3BheWxvYWQnXVxuICAgICAgKSA9PiB2b2lkXG4gICAgKSA9PiB2b2lkO1xuXG4gICAgaW52b2tlOiA8VCBleHRlbmRzIENoYW5uZWxzPihcbiAgICAgIGNoYW5uZWw6IFQsXG4gICAgICBhcmdzOiBJUENNZXRob2RzW1RdWydyZXF1ZXN0J11cbiAgICApID0+IFByb21pc2U8SVBDTWV0aG9kc1tUXVsncmVzcG9uc2UnXT47XG5cbiAgICBsaXN0ZW5lckNvdW50OiA8VCBleHRlbmRzIGtleW9mIElQQ19QdXNoTm90aWZpY2F0aW9uPihjaGFubmVsOiBUKSA9PiBudW1iZXI7XG4gIH07XG59XG5cbmNvbnN0IGVsZWN0cm9uSGFuZGxlcjogRWxlY3Ryb25IYW5kbGVyID0ge1xuICBpcGNSZW5kZXJlcjoge1xuICAgIHNlbmRNZXNzYWdlKGNoYW5uZWw6IENoYW5uZWxzLCAuLi5hcmdzOiB1bmtub3duW10pIHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoY2hhbm5lbCwgYXJncyk7XG4gICAgfSxcblxuICAgIG9uOiA8VCBleHRlbmRzIGtleW9mIElQQ19QdXNoTm90aWZpY2F0aW9uPihcbiAgICAgIGNoYW5uZWw6IFQsXG4gICAgICBmdW5jOiAoXG4gICAgICAgIF9ldmVudDogSXBjUmVuZGVyZXJFdmVudCxcbiAgICAgICAgYXJnczogSVBDX1B1c2hOb3RpZmljYXRpb25bVF1bJ3BheWxvYWQnXVxuICAgICAgKSA9PiB2b2lkXG4gICAgKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5vbihjaGFubmVsLCBmdW5jKTtcbiAgICB9LFxuXG4gICAgb2ZmOiA8VCBleHRlbmRzIGtleW9mIElQQ19QdXNoTm90aWZpY2F0aW9uPihcbiAgICAgIGNoYW5uZWw6IFQsXG4gICAgICBmdW5jOiAoXG4gICAgICAgIF9ldmVudDogSXBjUmVuZGVyZXJFdmVudCxcbiAgICAgICAgYXJnczogSVBDX1B1c2hOb3RpZmljYXRpb25bVF1bJ3BheWxvYWQnXVxuICAgICAgKSA9PiB2b2lkXG4gICAgKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5vZmYoY2hhbm5lbCwgZnVuYyk7XG4gICAgfSxcblxuICAgIHJlbW92ZUFsbExpc3RlbmVyczogPFQgZXh0ZW5kcyBrZXlvZiBJUENfUHVzaE5vdGlmaWNhdGlvbj4oY2hhbm5lbDogVCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKGNoYW5uZWwpO1xuICAgIH0sXG5cbiAgICBsaXN0ZW5lckNvdW50OiA8VCBleHRlbmRzIGtleW9mIElQQ19QdXNoTm90aWZpY2F0aW9uPihcbiAgICAgIGNoYW5uZWw6IFRcbiAgICApOiBudW1iZXIgPT4ge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmxpc3RlbmVyQ291bnQoY2hhbm5lbCk7XG4gICAgfSxcblxuICAgIG9uY2U6IDxUIGV4dGVuZHMga2V5b2YgSVBDX1B1c2hOb3RpZmljYXRpb24+KFxuICAgICAgY2hhbm5lbDogVCxcbiAgICAgIGZ1bmM6IChcbiAgICAgICAgX2V2ZW50OiBJcGNSZW5kZXJlckV2ZW50LFxuICAgICAgICBhcmdzOiBJUENfUHVzaE5vdGlmaWNhdGlvbltUXVsncGF5bG9hZCddXG4gICAgICApID0+IHZvaWRcbiAgICApID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uY2UoY2hhbm5lbCwgZnVuYyk7XG4gICAgfSxcblxuICAgIGludm9rZTogYXN5bmMgKGNoYW5uZWwsIC4uLmFyZ3MpID0+IHtcbiAgICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoY2hhbm5lbCwgLi4uYXJncyk7XG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2VsZWN0cm9uJywgZWxlY3Ryb25IYW5kbGVyKTtcblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZW52Jywge0dFTUlOSV9BUElfS0VZOiBwcm9jZXNzLmVudi5HRU1JTklfQVBJX0tFWX0pO1xuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCd3cml0ZV90b19maWxlJywge3NhdmVGaWxlOiAoZmlsZV9uYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgb3ZlcndyaXRlOiBib29sZWFuKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ3dyaXRlLXRvLWZpbGUnLCB7ZmlsZV9uYW1lLCBjb250ZW50LCBvdmVyd3JpdGV9KX0pO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdyaXRlVG9GaWxlIHtcbiAgc2F2ZUZpbGU6IChmaWxlX25hbWU6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBvdmVyd3JpdGU6IGJvb2xlYW4pID0+IFByb21pc2U8e1xuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XG4gICAgZXJyb3I/OiBzdHJpbmc7XG4gIH0+O1xufVxuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdydW5fdGVzdCcsIHtSdW5QeXRob25Db2RlOiAoZmlsZV9uYW1lOiBzdHJpbmcsIGZpbGU6IHN0cmluZykgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdydW4tdGVzdCcsIHtmaWxlX25hbWUsIGZpbGV9KX0pO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJ1blRlc3Qge1xuICBSdW5QeXRob25Db2RlOiAoZmlsZV9uYW1lOiBzdHJpbmcsIGZpbGU6IHN0cmluZykgPT4gUHJvbWlzZTx7XG4gICAgc3VjY2VzczogbnVtYmVyO1xuICAgIGVycm9yPzogc3RyaW5nO1xuICB9Pjtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=