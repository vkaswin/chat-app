"use strict";(self.webpackChunkchat_app=self.webpackChunkchat_app||[]).push([[5343,9599],{5343:function(t,e,n){n.r(e),n.d(e,{createContact:function(){return u},deleteContact:function(){return a},getContacts:function(){return c}});var o=n(9599),r=n(8830),c=function(t){return(0,o.axios)({method:"get",url:r.endpoints.contact.getContact,params:t})},u=function(t){return(0,o.axios)({method:"post",url:r.endpoints.contact.createContact,data:t})},a=function(t){return(0,o.axios)({method:"delete",url:"".concat(r.endpoints.contact.deleteContact,"/").concat(t)})}},9599:function(t,e,n){n.r(e),n.d(e,{axios:function(){return a}});var o=n(4569),r=n.n(o),c=n(2703),u=n(8830),a=r().create({baseURL:u.baseURL});a.interceptors.request.use((function(t){var e=(0,c.cookies)().get("auth_token");return e&&(t.headers.Authorization=e),t}),(function(t){return Promise.reject(t)})),a.interceptors.response.use((function(t){return t}),(function(t){var e;return 401===t.response.status&&document.dispatchEvent(new CustomEvent("logout")),Promise.reject(null===t||void 0===t||null===(e=t.response)||void 0===e?void 0:e.data)}))}}]);
//# sourceMappingURL=5343.7a533fce.chunk.js.map