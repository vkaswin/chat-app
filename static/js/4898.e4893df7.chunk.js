"use strict";(self.webpackChunkchat_app=self.webpackChunkchat_app||[]).push([[4898,9599],{4898:function(e,t,n){n.r(t),n.d(t,{loginUser:function(){return o},registerUser:function(){return u},searchUsers:function(){return i}});var r=n(9599),s=n(8830),o=function(e){return(0,r.axios)({url:s.endpoints.user.login,method:"post",data:e})},u=function(e){return(0,r.axios)({url:s.endpoints.user.register,method:"post",data:e})},i=function(e){return(0,r.axios)({url:s.endpoints.user.search,method:"get",params:e})}},9599:function(e,t,n){n.r(t),n.d(t,{axios:function(){return i}});var r=n(4569),s=n.n(r),o=n(2703),u=n(8830),i=s().create({baseURL:u.baseURL});i.interceptors.request.use((function(e){var t=(0,o.cookies)().get("auth_token");return t&&(e.headers.Authorization=t),e}),(function(e){return Promise.reject(e)})),i.interceptors.response.use((function(e){return e}),(function(e){var t;return 401===e.response.status&&document.dispatchEvent(new CustomEvent("logout")),Promise.reject(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.data)}))}}]);
//# sourceMappingURL=4898.e4893df7.chunk.js.map