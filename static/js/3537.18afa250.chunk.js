"use strict";(self.webpackChunkreact_chat_app=self.webpackChunkreact_chat_app||[]).push([[3537,9599],{3537:function(e,t,n){n.r(t),n.d(t,{createMessage:function(){return o}});var r=n(9599),s=n(77),o=function(e,t){return(0,r.axios)({url:"".concat(s.endpoints.message.createMessage,"/").concat(e),method:"post",data:t})}},9599:function(e,t,n){n.r(t),n.d(t,{axios:function(){return u}});var r=n(4569),s=n.n(r),o=n(2703),a=n(77),u=s().create({baseURL:a.baseURL});u.interceptors.request.use((function(e){var t=(0,o.cookies)().get("authToken");return t&&(e.headers.Authorization=t),e}),(function(e){return Promise.reject(e)})),u.interceptors.response.use((function(e){return e}),(function(e){var t;return 401===e.response.status&&document.dispatchEvent(new CustomEvent("logout")),Promise.reject(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.data)}))}}]);
//# sourceMappingURL=3537.18afa250.chunk.js.map