"use strict";(self.webpackChunkreact_chat_app=self.webpackChunkreact_chat_app||[]).push([[332,406],{44332:function(a,e,t){t.r(e);var s=t(74165),n=t(42982),c=t(15861),l=t(70885),r=t(72791),i=t(59930),u=t(14717),o=t(92449),d=t(68406),_=t(72426),p=t.n(_),f=t(80184);e.default=function(){var a=(0,u.useAuth)().user,e=(0,u.useRouter)(),t=(0,r.useState)([]),_=(0,l.Z)(t,2),h=_[0],v=_[1],x=(0,r.useState)(!0),m=(0,l.Z)(x,2),j=m[0],N=m[1];(0,r.useEffect)((function(){y()}),[]);var y=function(){var a=(0,c.Z)((0,s.Z)().mark((function a(){var e,t;return(0,s.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,(0,o.getCallHistory)();case 3:e=a.sent,t=e.data.data,v([].concat((0,n.Z)(h),(0,n.Z)(t))),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(0),(0,i.Toast)({type:"error",message:null===a.t0||void 0===a.t0?void 0:a.t0.message});case 11:return a.prev=11,N(!1),a.finish(11);case 14:case"end":return a.stop()}}),a,null,[[0,8,11,14]])})));return function(){return a.apply(this,arguments)}}();return j?(0,f.jsx)("div",{children:"Loading..."}):(0,f.jsx)("div",{className:d.default.calls_container,children:h.length>0&&h.map((function(t,s){var n=t.date,c=t.type,l=t.user,r=l.name,u=l.status,o=l.avatar,_=t.initiatedBy,h=t.chatId;return(0,f.jsxs)("div",{className:d.default.call_card,onClick:function(){return function(a){e.push("/chats/".concat(a))}(h)},children:[(0,f.jsxs)("div",{className:d.default.user,children:[(0,f.jsx)(i.Avatar,{src:o,name:r,size:40,status:u}),(0,f.jsxs)("div",{className:d.default.call_info,children:[(0,f.jsx)("span",{className:"truncate-1",children:r}),(0,f.jsxs)("div",{children:[_===(null===a||void 0===a?void 0:a.id)?(0,f.jsx)("i",{className:"bx-up-arrow-alt","data-type":"outgoing"}):(0,f.jsx)("i",{className:"bx-down-arrow-alt","data-type":"incoming"}),(0,f.jsx)("span",{className:"truncate-1",children:p()(n).format("D ddd YYYY, hh:mm a")})]})]})]}),(0,f.jsx)("div",{className:d.default.type_icon,children:"video"===c?(0,f.jsx)("i",{className:"bx-video"}):(0,f.jsx)("i",{className:"bx-phone-call"})})]},s)}))})}},68406:function(a,e,t){t.r(e),e.default={calls_container:"Calls_calls_container__julVl",call_card:"Calls_call_card__9L-+S",user:"Calls_user__pFFMG",call_info:"Calls_call_info__ohoQS",type_icon:"Calls_type_icon__xoqiZ"}}}]);
//# sourceMappingURL=332.f106d022.chunk.js.map