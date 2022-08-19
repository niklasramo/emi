!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).eventti={})}(this,(function(e){"use strict";function t(e,t){let s=e.get(t);return s||(s=new i,e.set(t,s)),s}class i{constructor(){this.idMap=new Map,this.fnMap=new Map,this.onceList=new Set,this.emitList=null}add(e,t,i,s,n){if(!n&&this.fnMap.has(e))throw new Error("Emitter: tried to add an existing event listener to an event!");if(this.idMap.has(i))switch(s){case"throw":throw new Error("Emitter: tried to add an existing event listener id to an event!");case"ignore":return i;default:this.delId(i,"update"===s)}let d=this.fnMap.get(e);return d||(d=new Set,this.fnMap.set(e,d)),d.add(i),this.idMap.set(i,e),t&&this.onceList.add(i),this.emitList&&this.emitList.push(e),i}delId(e,t=!1){const i=this.idMap.get(e);if(!i)return;const s=this.fnMap.get(i);t||this.idMap.delete(e),this.onceList.delete(e),s.delete(e),s.size||this.fnMap.delete(i),this.emitList=null}delFn(e){const t=this.fnMap.get(e);t&&(t.forEach((e=>{this.onceList.delete(e),this.idMap.delete(e)})),this.fnMap.delete(e),this.emitList=null)}}e.Emitter=class{constructor(e={}){const{idDedupeMode:t="replace",allowDuplicateListeners:i=!0}=e;this.idDedupeMode=t,this.allowDuplicateListeners=i,this._events=new Map}_getListeners(e){const t=this._events.get(e);if(!t)return null;const{idMap:i,onceList:s}=t;if(!i.size)return null;const n=t.emitList||[...i.values()];if(s.size)if(s.size===i.size)this._events.delete(e);else for(const e of s)t.delId(e);else t.emitList=n;return n}on(e,i,s=Symbol()){return t(this._events,e).add(i,!1,s,this.idDedupeMode,this.allowDuplicateListeners)}once(e,i,s=Symbol()){return t(this._events,e).add(i,!0,s,this.idDedupeMode,this.allowDuplicateListeners)}off(e,t){if(void 0===e)return void this._events.clear();if(void 0===t)return void this._events.delete(e);const i=this._events.get(e);i&&("function"==typeof t?i.delFn(t):i.delId(t),i.idMap.size||this._events.delete(e))}emit(e,...t){const i=this._getListeners(e);if(!i)return;let s=0,n=i.length;for(;s<n;s++)i[s](...t)}listenerCount(e){var t;if(void 0===e){let e=0;return this._events.forEach(((t,i)=>{e+=this.listenerCount(i)})),e}return(null===(t=this._events.get(e))||void 0===t?void 0:t.idMap.size)||0}},e.emitBatch=function(e,t,...i){t.map((t=>e._getListeners(t))).forEach((e=>{if(e){let t=0,s=e.length;for(;t<s;t++)e[t](...i)}}))},Object.defineProperty(e,"__esModule",{value:!0})}));