"use strict";(self.webpackChunkchat_app=self.webpackChunkchat_app||[]).push([[9855,9599],{9855:function(t,n,e){e.r(n),e.d(n,{addToFavourite:function(){return s},getChatById:function(){return r},getChatByType:function(){return c},getChatId:function(){return f},getChatMessageByRange:function(){return m},getChatMessagesByMsgId:function(){return u},markAsRead:function(){return h},markAsReadByMsgId:function(){return d},removeFromFavourite:function(){return i},sendReaction:function(){return p}});var o=e(9599),a=e(77),c=function(t){return(0,o.axios)({url:"".concat(a.endpoints.chat.list,"/").concat(t),method:"get"})},r=function(t,n){return(0,o.axios)({url:"".concat(a.endpoints.chat.chatDetails,"/").concat(t),method:"get",params:n})},u=function(t,n,e){return(0,o.axios)({url:"".concat(a.endpoints.chat.chatMessages,"/").concat(t,"/").concat(n),method:"get",params:e})},s=function(t){return(0,o.axios)({url:"".concat(a.endpoints.chat.addFavourite,"/").concat(t),method:"put"})},i=function(t){return(0,o.axios)({url:"".concat(a.endpoints.chat.removeFavourite,"/").concat(t),method:"delete"})},d=function(t,n){return(0,o.axios)({url:"".concat(a.endpoints.chat.markAsReadByMsgId,"/").concat(t,"/").concat(n),method:"put"})},h=function(t){return(0,o.axios)({url:"".concat(a.endpoints.chat.markAsRead,"/").concat(t),method:"put"})},p=function(t,n){return(0,o.axios)({url:"".concat(a.endpoints.chat.sendReaction,"/").concat(t),method:"post",data:n})},f=function(t){return(0,o.axios)({url:"".concat(a.endpoints.chat.getChatId,"/").concat(t),method:"get"})},m=function(t,n){return(0,o.axios)({url:"".concat(a.endpoints.chat.chatMessageByRange,"/").concat(t),method:"get",params:n})}},9599:function(t,n,e){e.r(n),e.d(n,{axios:function(){return u}});var o=e(4569),a=e.n(o),c=e(2703),r=e(77),u=a().create({baseURL:r.baseURL});u.interceptors.request.use((function(t){var n=(0,c.cookies)().get("auth_token");return n&&(t.headers.Authorization=n),t}),(function(t){return Promise.reject(t)})),u.interceptors.response.use((function(t){return t}),(function(t){var n;return 401===t.response.status&&document.dispatchEvent(new CustomEvent("logout")),Promise.reject(null===t||void 0===t||null===(n=t.response)||void 0===n?void 0:n.data)}))}}]);
//# sourceMappingURL=9855.8b1e55b1.chunk.js.map