"use strict";(self.webpackChunkreact_chat_app=self.webpackChunkreact_chat_app||[]).push([[9855,9599],{9855:function(t,n,e){e.r(n),e.d(n,{addToFavourite:function(){return i},createReaction:function(){return p},getChatById:function(){return c},getChatByType:function(){return a},getChatMessagesByMsgId:function(){return u},markAsRead:function(){return h},markAsReadByMsgId:function(){return d},removeFromFavourite:function(){return s},updateReaction:function(){return f}});var o=e(9599),r=e(77),a=function(t){return(0,o.axios)({url:"".concat(r.endpoints.chat.list,"/").concat(t),method:"get"})},c=function(t,n){return(0,o.axios)({url:"".concat(r.endpoints.chat.chatDetails,"/").concat(t),method:"get",params:n})},u=function(t,n,e){return(0,o.axios)({url:"".concat(r.endpoints.chat.chatMessages,"/").concat(t,"/").concat(n),method:"get",params:e})},i=function(t){return(0,o.axios)({url:r.endpoints.chat.addFavourite,method:"put"})},s=function(t){return(0,o.axios)({url:r.endpoints.chat.removeFavourite,method:"delete"})},d=function(t,n){return(0,o.axios)({url:"".concat(r.endpoints.chat.markAsReadByMsgId,"/").concat(t,"/").concat(n),method:"put"})},h=function(t){return(0,o.axios)({url:"".concat(r.endpoints.chat.markAsRead,"/").concat(t),method:"put"})},p=function(t){return(0,o.axios)({url:"".concat(r.endpoints.chat.createReaction),method:"post",data:t})},f=function(t){return(0,o.axios)({url:"".concat(r.endpoints.chat.updateReaction),method:"put",data:t})}},9599:function(t,n,e){e.r(n),e.d(n,{axios:function(){return u}});var o=e(4569),r=e.n(o),a=e(2703),c=e(77),u=r().create({baseURL:c.baseURL});u.interceptors.request.use((function(t){var n=(0,a.cookies)().get("authToken");return n&&(t.headers.Authorization=n),t}),(function(t){return Promise.reject(t)})),u.interceptors.response.use((function(t){return t}),(function(t){var n;return 401===t.response.status&&document.dispatchEvent(new CustomEvent("logout")),Promise.reject(null===t||void 0===t||null===(n=t.response)||void 0===n?void 0:n.data)}))}}]);
//# sourceMappingURL=9855.24a59e9b.chunk.js.map