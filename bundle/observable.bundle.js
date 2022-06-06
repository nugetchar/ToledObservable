var t={d:(r,e)=>{for(var n in e)t.o(e,n)&&!t.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:e[n]})},o:(t,r)=>Object.prototype.hasOwnProperty.call(t,r)},r={};t.d(r,{gC:()=>i,hX:()=>o,rM:()=>k,Dp:()=>g,dJ:()=>q,KJ:()=>u,UI:()=>a,Nl:()=>x,hL:()=>$,of:()=>M,Vl:()=>P,IH:()=>c,d_:()=>j,wt:()=>p,qn:()=>D,bw:()=>f,C4:()=>s});var e,n=function(){function t(t,r,e){this._value=t,this._flag=r,this._error=e}return Object.defineProperty(t.prototype,"value",{get:function(){return this._value},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"flag",{get:function(){return this._flag},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"error",{get:function(){return this._error},enumerable:!1,configurable:!0}),t.prototype.isUnwrapSwitch=function(){return this._flag===e.UnwrapSwitch},t.prototype.isMustStop=function(){return this._flag===e.MustStop},t.prototype.isFilterNotMatched=function(){return this._flag===e.FilterNotMatched},t.prototype.isOperationError=function(){return this._flag===e.OperationError},t}();!function(t){t.UnwrapSwitch="UnwrapSwitch",t.MustStop="MustStop",t.FilterNotMatched="FilterNotMatched",t.OperationError="OperationError"}(e||(e={}));var o=function(t){return function(r){return new n(r,t(r)?void 0:e.FilterNotMatched)}},i=function(t){var r=!1;return function(i){return new n(i,(r=r||o(t)(i).isFilterNotMatched())?e.MustStop:void 0)}},u=function(t,r,e){return function(n){var i=o(t)(n),u=i.isFilterNotMatched()?null!=e?e:[]:r,c=u.shift();return c?u.reduce((function(t,r){return r(t.value)}),c(n)):i}},c=function(t){var r=!1;return function(o){return r?new n(o,e.MustStop):!t||t(o)?(r=!0,new n(o)):new n(o,e.FilterNotMatched)}},s=function(t){var r=!1;return function(i){return new n(i,(r=r||!o(t)(i).isFilterNotMatched())?e.MustStop:void 0)}},a=function(t){return function(r){return new n(t(r))}};function p(t){return function(r){return new n(t(r),e.UnwrapSwitch)}}var f=function(t){return function(r){return t(r),new n(r)}};function l(t){return"function"==typeof t}function h(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return t.filter((function(t){return l(t)}))}var b=function(){function t(t){this._unsubscribeCallback=t}return t.prototype.unsubscribe=function(){this._unsubscribeCallback&&this._unsubscribeCallback()},t}();function v(t){return!l(t)&&function(t){for(var r=[],e=1;e<arguments.length;e++)r[e-1]=arguments[e];return r.some((function(r){return void 0!==t[r]&&null!==t[r]&&l(t[r])}))}(t,"next","error","complete")}function _(t,r,e){var n={next:t,error:r,complete:e};if(!v(n))throw new Error("Please provide functions for next, error and complete");return n}new b;var y,w=function(){function t(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];this._subscribers=[],this._isComplete=!0,this._innerSequence=t.map((function(t){return new n(t)}))}return t.prototype.pipe=function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];for(var i=new t,u=[],c=this._innerSequence,s=0,a=c.length;s<a&&!c[s].isMustStop();s++)try{var p=this._executeOperations(c[s].value,r);p.isFilterNotMatched()||u.push(p)}catch(t){u.push(new n(c[s].value,e.OperationError,t)),s=a}return i._innerSequence=u,i},t.prototype.subscribe=function(t){var r=this;if(!l(t)&&!v(t))throw new Error("Please provide either a function or a Subscriber");var e=v(t)?t:_(t);return this._subscribers.push(e),this.executeSubscriber(e,this._innerSequence),new b((function(){return r._subscribers=r._subscribers.filter((function(r){return r!==t}))}))},t.prototype.executeSubscriber=function(t,r){for(var e=function(e,o){var i=r[e];return i.isOperationError()?(n._error=i.error,(t.error||function(){throw i.error})(i.error),"break"):i.isFilterNotMatched()?"continue":i.isMustStop()?"break":void(t.next&&t.next(i.value))},n=this,o=0,i=r.length;o<i&&"break"!==e(o);o++);this._isComplete&&t.complete&&t.complete()},t.prototype._computeValue=function(t){for(var r,o=[],i=1;i<arguments.length;i++)o[i-1]=arguments[i];for(var u=new n(t),c=0;c<o.length;c++)switch((u=o[c](u.value)).flag){case e.FilterNotMatched:case e.MustStop:c=o.length;break;case e.UnwrapSwitch:u=new n(null===(r=u.value._innerSequence.pop())||void 0===r?void 0:r.value)}return u},t.prototype._executeOperations=function(t,r){return this._computeValue.apply(this,function(t,r){for(var e=0,n=r.length,o=t.length;e<n;e++,o++)t[o]=r[e];return t}([t],h.apply(void 0,r)))},t}(),g=function(t){return new(w.bind.apply(w,function(t,r){for(var e=0,n=r.length,o=t.length;e<n;e++,o++)t[o]=r[e];return t}([void 0],t)))},O=(y=function(t,r){return(y=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])})(t,r)},function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function e(){this.constructor=t}y(t,r),t.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}),d=function(t,r){for(var e=0,n=r.length,o=t.length;e<n;e++,o++)t[o]=r[e];return t},S=function(t){function r(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];var n=t.apply(this,r)||this;return n._preProcessOperations=[],n._isComplete=!1,n}return O(r,t),r.prototype.close=function(){return this._isComplete||(this._isComplete=!0,this._subscribers.filter((function(t){return t.complete})).forEach((function(t){t.complete()}))),this},r.prototype.compile=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];if(this._isComplete)return this;var e=this._buildNewSequence(this._innerSequence.filter((function(t){return!t.isOperationError()})).map((function(t){return t.value})),d(d([],t),this._preProcessOperations)).filter((function(t){return!t.isMustStop()})),n=e.findIndex((function(t){return t.isOperationError()}));return n>-1?(this._innerSequence=e.slice(0,n),this.next.apply(this,this._innerSequence.map((function(t){return t.value}))),this._innerSequence.push(e[n]),this._triggerExecution([e[n]],this._subscribers),this):(this._triggerExecution(this._innerSequence=e,this._subscribers),this)},r.prototype.next=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return this._isComplete||(this._innerSequence=this._buildNewSequence(t,this._preProcessOperations),this._triggerExecution(this._innerSequence,this._subscribers)),this},r.prototype._buildNewSequence=function(t,r){for(var o=[],i=0,u=t.length;i<u;i++)try{var c=this._executeOperations(t[i],r);if(c.isMustStop()){o.push(c);break}c.isFilterNotMatched()||o.push(c)}catch(r){this._error=r,o.push(new n(t[i],e.OperationError,r)),i=u}return o},r.prototype._triggerExecution=function(t,r){var e=this;r.forEach((function(r){return e.executeSubscriber(r,t)}))},r}(w),m=function(t,r){for(var e=0,n=r.length,o=t.length;e<n;e++,o++)t[o]=r[e];return t},x=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new(S.bind.apply(S,m([void 0],t)))},E=function(t,r){for(var e=0,n=r.length,o=t.length;e<n;e++,o++)t[o]=r[e];return t},M=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new(w.bind.apply(w,E([void 0],t)))},P=function(t,r){var e=new S;return t.addEventListener(r,(function(t){return e.next(t)})),e};function j(){for(var t,r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];var n=new S;return(t=n._preProcessOperations).push.apply(t,r),n}var q,C=function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])})(r,e)};return function(r,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),N=function(t){function r(r){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var o=t.call(this)||this;return o.sourceObs$=r,o.subscriptions=[],o.operators=[],o.operators=e,o._isComplete=r._isComplete,o.sourceObs$.subscribe({name:"subscriber fork constructor",next:function(t){o._subscribers.filter((function(t){return t.next})).forEach((function(r){var n=o._executeOperations(t,e);if(!n.isFilterNotMatched()&&!n.isMustStop())return r.next(n.value);n.isMustStop()&&o.close()}))},error:function(t){o._error=t,o._subscribers.filter((function(t){return t.error})).forEach((function(r){return r.error(t)}))},complete:function(){o._isComplete=!0,o.unsubscribe(),o._subscribers.filter((function(t){return t.complete})).forEach((function(t){return t.complete()}))}}),o}return C(r,t),r.prototype.subscribe=function(t){var r=this;if(!l(t)&&!v(t))throw new Error("Please provide either a function or a Subscriber");var o=v(t)?t:_(t);this._subscribers.push(o);for(var i=[],u=this.sourceObs$._innerSequence,c=0,s=u.length;c<s;c++)try{if(u[c].isOperationError())throw u[c].error;i.push(this._executeOperations(u[c].value,this.operators))}catch(t){i.push(new n(u[c].value,e.OperationError,t)),c=s}return this.executeSubscriber(o,i),new b((function(){return r._subscribers=r._subscribers.filter((function(r){return r!==t}))}))},r.prototype.close=function(){this._subscribers.forEach((function(t){return t.complete&&t.complete()})),this.unsubscribe()},r.prototype.unsubscribe=function(){this.subscriptions.forEach((function(t){return t.unsubscribe()}))},r}(w),F=function(t,r){for(var e=0,n=r.length,o=t.length;e<n;e++,o++)t[o]=r[e];return t},k=function(t){for(var r=[],e=1;e<arguments.length;e++)r[e-1]=arguments[e];var n=new(N.bind.apply(N,F([void 0,t],r)));return n},U=function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])})(r,e)};return function(r,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),I=function(t,r){for(var e=0,n=r.length,o=t.length;e<n;e++,o++)t[o]=r[e];return t},T=function(t){function r(r){var o=t.call(this)||this;return o.promise=r.then((function(t){o._innerSequence.push(new n(t))})).catch((function(t){o._innerSequence.push(new n(void 0,e.OperationError,t))})),o}return U(r,t),r.prototype.pipe=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return k.apply(void 0,I([this],t))},r.prototype.subscribe=function(t){var r=this;if(!l(t)&&!v(t))throw new Error("Please provide either a function or a Subscriber");var e=v(t)?t:_(t);return this._subscribers.push(e),this.promise.then((function(){return r.executeSubscriber(e,r._innerSequence)})),new b((function(){return r._subscribers=r._subscribers.filter((function(r){return r!==t}))}))},r}(w),A=function(){return(A=Object.assign||function(t){for(var r,e=1,n=arguments.length;e<n;e++)for(var o in r=arguments[e])Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o]);return t}).apply(this,arguments)},J=function(t,r){void 0===r&&(r={type:"json"});var e=r.type,n=function(t,r){var e={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&r.indexOf(n)<0&&(e[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)r.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(e[n[o]]=t[n[o]])}return e}(r,["type"]);return new T(new Promise((function(r,o){fetch(t,A(A({},n),{method:"GET"})).then((function(t){return r("text"===e?t.text():"blob"===e?t.blob():t.json())})).catch((function(t){return o(t)}))})))},L=function(){return(L=Object.assign||function(t){for(var r,e=1,n=arguments.length;e<n;e++)for(var o in r=arguments[e])Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o]);return t}).apply(this,arguments)},V=function(t,r){void 0===r&&(r={type:"json"});var e=r.type,n=function(t,r){var e={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&r.indexOf(n)<0&&(e[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)r.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(e[n[o]]=t[n[o]])}return e}(r,["type"]);return new T(new Promise((function(r,o){fetch(t,L(L({},n),{method:"POST"})).then((function(t){return r("text"===e?t.text():"blob"===e?t.blob():t.json())})).catch((function(t){return o(t)}))})))};!function(t){t.get=J,t.post=V}(q||(q={}));var $=function(t){var r=0;return function(o){return++r===t?new n(o):new n(o,r<t?e.FilterNotMatched:e.MustStop)}},D=function(t){var r=0;return function(o){return++r>t?new n(o,e.MustStop):new n(o)}},H=r.gC,K=r.hX,X=r.rM,G=r.Dp,z=r.dJ,B=r.KJ,Q=r.UI,R=r.Nl,W=r.hL,Y=r.of,Z=r.Vl,tt=r.IH,rt=r.d_,et=r.wt,nt=r.qn,ot=r.bw,it=r.C4;export{H as asLongAs,K as filter,X as fork,G as from,z as http,B as ifElse,Q as map,R as mutable,W as nth,Y as of,Z as onEvent,tt as once,rt as preProcess,et as switchMap,nt as take,ot as tap,it as until};