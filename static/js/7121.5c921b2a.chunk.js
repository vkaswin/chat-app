"use strict";(self.webpackChunkchat_app=self.webpackChunkchat_app||[]).push([[7121,7321,9599,3537],{7121:function(e,t,n){n.r(t);var a=n(4165),r=n(5861),s=n(885),o=n(2791),c=n(9930),u=n(3537),i=n(7321),d=n(184);t.default=function(e){var t=e.clearMsgId,n=e.msgId,p=(0,o.useState)([]),l=(0,s.Z)(p,2),f=l[0],m=l[1],g=(0,o.useState)(!1),v=(0,s.Z)(g,2),h=v[0],x=v[1];(0,o.useEffect)((function(){n&&_(1).finally((function(){return x(!0)}))}),[n]);var _=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(t){var r,s,o;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={page:t,limit:25},e.prev=1,e.next=4,(0,u.getSeenByMsgId)(n,r);case 4:s=e.sent,o=s.data.data,m(o),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),(0,c.Toast)({type:"error",message:null===e.t0||void 0===e.t0?void 0:e.t0.message});case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();return(0,d.jsx)(c.Modal,{isOpen:h,toggle:function(){t(),x(!1)},children:(0,d.jsxs)("div",{className:i.default.popup,children:[(0,d.jsx)("div",{className:i.default.reactions,children:(0,d.jsx)("div",{className:i.default.all,children:(0,d.jsx)("span",{children:"Seen"})})}),(0,d.jsx)("div",{className:i.default.users,children:f.map((function(e,t){var n=e.avatar,a=(e.email,e._id),r=e.name,s=e.status,o=(e.date,e.colorCode);return(0,d.jsxs)("div",{className:i.default.card,children:[(0,d.jsx)(c.Avatar,{name:r,size:40,status:s,userId:a,src:n||o}),(0,d.jsx)("span",{children:r})]},t)}))})]})})}},3537:function(e,t,n){n.r(t),n.d(t,{createMessage:function(){return s},getReactions:function(){return o},getReactionsByType:function(){return c},getSeenByMsgId:function(){return u}});var a=n(9599),r=n(77),s=function(e,t){return(0,a.axios)({url:"".concat(r.endpoints.message.createMessage,"/").concat(e),method:"post",data:t})},o=function(e){return(0,a.axios)({url:"".concat(r.endpoints.message.getReaction,"/").concat(e),method:"get"})},c=function(e,t){return(0,a.axios)({url:"".concat(r.endpoints.message.getReactionByType,"/").concat(e),method:"get",params:t})},u=function(e,t){return(0,a.axios)({url:"".concat(r.endpoints.message.getSeen,"/").concat(e),method:"get",params:t})}},9599:function(e,t,n){n.r(t),n.d(t,{axios:function(){return c}});var a=n(4569),r=n.n(a),s=n(2703),o=n(77),c=r().create({baseURL:o.baseURL});c.interceptors.request.use((function(e){var t=(0,s.cookies)().get("auth_token");return t&&(e.headers.Authorization=t),e}),(function(e){return Promise.reject(e)})),c.interceptors.response.use((function(e){return e}),(function(e){var t;return 401===e.response.status&&document.dispatchEvent(new CustomEvent("logout")),Promise.reject(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.data)}))},7321:function(e,t,n){n.r(t),t.default={popup:"SeenPopup_popup__Y4qhk",reactions:"SeenPopup_reactions__MG2fO",all:"SeenPopup_all__r9B82",users:"SeenPopup_users__L5xMC",card:"SeenPopup_card__FRfpx"}}}]);
//# sourceMappingURL=7121.5c921b2a.chunk.js.map