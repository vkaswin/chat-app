"use strict";(self.webpackChunkreact_chat_app=self.webpackChunkreact_chat_app||[]).push([[2775,8527,714,2611,8263],{714:function(n,e,a){a.r(e),a.d(e,{Options:function(){return t}});a(2791);var s=a(9930),r=a(184),t=function(n){var e=n.onReply,a=n.onDelete,t=n.onCopy,o=n.selector,c=n.date,i=n.msgId,l=n.msg;return(0,r.jsxs)(s.DropDown,{selector:o,placement:"bottom",children:[(0,r.jsxs)(s.DropDownItem,{className:"dropdown-option",onClick:function(){return e(c,i)},children:[(0,r.jsx)("span",{children:"Reply"}),(0,r.jsx)("i",{className:"bx-share"})]}),(0,r.jsxs)(s.DropDownItem,{className:"dropdown-option",children:[(0,r.jsx)("span",{children:"Forward"}),(0,r.jsx)("i",{className:"bx-share-alt"})]}),(0,r.jsxs)(s.DropDownItem,{className:"dropdown-option",onClick:function(){return t(l)},children:[(0,r.jsx)("span",{children:"Copy"}),(0,r.jsx)("i",{className:"bx-copy"})]}),(0,r.jsxs)(s.DropDownItem,{className:"dropdown-option",children:[(0,r.jsx)("span",{children:"Mark as Unread"}),(0,r.jsx)("i",{className:"bx-message-error"})]}),(0,r.jsxs)(s.DropDownItem,{className:"dropdown-option",onClick:function(){return a(c,i)},children:[(0,r.jsx)("span",{children:"Delete"}),(0,r.jsx)("i",{className:"bx-trash"})]})]})}},2611:function(n,e,a){a.r(e),a.d(e,{Reaction:function(){return c}});a(2791);var s=a(77),r=a(9930),t=a(8263),o=a(184),c=function(n){var e=n.reactions,a=n.selector,c=n.onClick;return(0,o.jsx)(r.DropDown,{selector:a,className:t.default.container,placement:"bottom",zIndex:2e3,children:e.map((function(n,e){return(0,o.jsx)(r.DropDownItem,{className:t.default.wrapper,onClick:function(){return c(n)},children:(0,o.jsx)("img",{id:n,src:"".concat(s.baseURL,"/reaction/").concat(n,".png")})},e)}))})}},2775:function(n,e,a){a.r(e),a.d(e,{Conversation:function(){return _}});var s=a(1413),r=a(4942),t=a(2791),o=a(2703),c=a(2611),i=a(714),l=a(2426),d=a.n(l),p=a(8527),u=a(184),_=function(n){var e=n.chats,a=n.onDelete,l=n.onCopy,_=n.onReply,m=n.userId,h=n.focusMsgById,x=n.otherUserId,j=n.unReadMsg,f=n.isGroupChat,v=n.reactionList,C=n.handleReaction;return(0,u.jsx)(t.Fragment,{children:e.map((function(n,g){var N=n.day,w=n.messages;return(0,u.jsxs)(t.Fragment,{children:[(0,u.jsx)("div",{className:p.default.date,children:(0,u.jsx)("span",{children:d()(N).format("D MMMM YYYY")})}),(0,u.jsx)("div",{className:p.default.container,children:w.map((function(n,N){var D=n.msg,y=n.date,k=n.sender,b=(k=void 0===k?{}:k).id,I=void 0===b?null:b,R=k.name,M=void 0===R?null:R,F=k.avatar,Z=void 0===F?null:F,L=n._id,S=n.seen,U=n.reply,Y=void 0===U?null:U,A=n.reactions;return(0,u.jsxs)(t.Fragment,{children:[j.id&&j.id===L&&(0,u.jsx)("div",{className:p.default.unread_msg,children:(0,u.jsxs)("span",{children:[j.total," Unread Message",j.total>1&&"s"]})}),(0,u.jsxs)("div",(0,s.Z)((0,s.Z)((0,s.Z)({className:(0,o.classNames)(p.default.chat_wrapper,(0,r.Z)({},p.default.end,m===I)),msgid:L},0===g&&0===N&&{first:""}),g===e.length-1&&N===w.length-1&&{last:""}),{},{children:[(0,u.jsxs)("div",{className:p.default.chat_card,id:"reaction-".concat(L),children:[Y&&(0,u.jsx)("div",{className:p.default.reply_card,onClick:function(){return h(Y._id,"smooth")},children:(0,u.jsx)("span",{children:Y.msg})}),(0,u.jsxs)("div",{children:[f&&I!==m&&(0,u.jsx)("span",{style:{color:Z},className:p.default.user_name,children:M.split(" ")[0]}),(0,u.jsx)("span",{children:D})]}),(0,u.jsxs)("div",{className:p.default.msg_time,children:[(0,u.jsx)("i",{className:"bx-time ".concat(p.default.clock)}),(0,u.jsx)("span",{children:d()(new Date(y)).format("h:mm a")}),(0,u.jsx)("i",{className:"bx bx-check-double ".concat(p.default.tick),seen:Array.isArray(x)?(S.length===x.length).toString():S.includes(x).toString()})]})]}),(0,u.jsxs)("div",{className:p.default.options,children:[(0,u.jsx)("i",{className:"bx-dots-vertical-rounded",id:"option-".concat(L)}),(0,u.jsx)(i.Options,{selector:"#option-".concat(L),onCopy:l,onReply:_,onDelete:a,date:y,msgId:L,msg:D})]})]})),(0,u.jsx)(c.Reaction,{selector:"#reaction-".concat(L),reactions:v,onClick:function(n){return C(n,A,L)}})]},L)}))})]},g)}))})}},8527:function(n,e,a){a.r(e),e.default={container:"Conversation_container__I7CJi",chat_wrapper:"Conversation_chat_wrapper__S3O8R",end:"Conversation_end__ZMbi5",chat_card:"Conversation_chat_card__jz70L",reply_card:"Conversation_reply_card__AEy90",msg_time:"Conversation_msg_time__wN53F",tick:"Conversation_tick__RkyEe",user_name:"Conversation_user_name__RDhDd",clock:"Conversation_clock__y4n8i",options:"Conversation_options__WLSBI",date:"Conversation_date__ZfQTB",unread_msg:"Conversation_unread_msg__yFItk",section:"Conversation_section__wG88I",load:"Conversation_load__rqCbg"}},8263:function(n,e,a){a.r(e),e.default={container:"Reaction_container__yXj24",wrapper:"Reaction_wrapper__m5dkH"}}}]);
//# sourceMappingURL=2775.571bba63.chunk.js.map