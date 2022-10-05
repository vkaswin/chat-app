"use strict";(self.webpackChunkreact_chat_app=self.webpackChunkreact_chat_app||[]).push([[7352,101,4329,9599,2449,9855,3537,3487],{2775:function(e,t,n){n.r(t),n.d(t,{Conversation:function(){return d}});var r=n(4942),a=n(2791),o=n(9930),s=n(2703),i=n(2426),c=n.n(i),u=n(8527),l=n(184),d=function(e){var t=e.chats,n=e.onDelete,i=e.onCopy,d=e.onReply,f=e.userId,m=e.focusMsgById,p=e.otherUserId,h=e.unReadMsg,v=e.isGroupChat;return(0,l.jsx)(a.Fragment,{children:t.map((function(e,_){var x=e.day,j=e.messages;return(0,l.jsxs)(a.Fragment,{children:[(0,l.jsx)("div",{className:u.default.date,children:(0,l.jsx)("span",{children:c()(x).format("D MMMM YYYY")})}),(0,l.jsx)("div",{className:u.default.container,children:j.map((function(e,x){var g=e.msg,y=e.date,b=e.sender,w=(b=void 0===b?{}:b).id,k=void 0===w?null:w,C=b.name,N=void 0===C?null:C,Z=b.avatar,I=void 0===Z?null:Z,D=e._id,S=e.seen,E=e.reply,M=void 0===E?null:E;return(0,l.jsxs)(a.Fragment,{children:[h.id&&h.id===D&&(0,l.jsx)("div",{className:u.default.unread_msg,children:(0,l.jsxs)("span",{children:[h.total," Unread Message",h.total>1&&"s"]})}),(0,l.jsxs)("div",{className:(0,s.classNames)(u.default.chat_wrapper,(0,r.Z)({},u.default.end,f===k)),msgid:D,first:0===_&&0===x&&"",last:_===t.length-1&&x===j.length-1&&"",children:[(0,l.jsxs)("div",{className:u.default.chat_card,children:[M&&(0,l.jsx)("div",{className:u.default.reply_card,onClick:function(){return m(M._id,"smooth")},children:(0,l.jsx)("span",{children:M.msg})}),(0,l.jsxs)("div",{children:[v&&k!==f&&(0,l.jsx)("span",{style:{color:I},className:u.default.user_name,children:N.split(" ")[0]}),(0,l.jsx)("span",{children:g})]}),(0,l.jsxs)("div",{className:u.default.msg_time,children:[(0,l.jsx)("i",{className:"bx-time ".concat(u.default.clock)}),(0,l.jsx)("span",{children:c()(new Date(y)).format("h:mm a")}),(0,l.jsx)("i",{className:"bx bx-check-double ".concat(u.default.tick),seen:Array.isArray(p)?(S.length===p.length).toString():S.includes(p).toString()})]})]}),(0,l.jsxs)("div",{className:u.default.options,children:[(0,l.jsx)("i",{className:"bx-dots-vertical-rounded",id:"option-".concat(_).concat(x)}),(0,l.jsxs)(o.DropDown,{selector:"#option-".concat(_).concat(x),placement:"bottom",children:[(0,l.jsxs)(o.DropDownItem,{className:"dropdown-option",onClick:function(){return d(y,D)},children:[(0,l.jsx)("span",{children:"Reply"}),(0,l.jsx)("i",{className:"bx-share"})]}),(0,l.jsxs)(o.DropDownItem,{className:"dropdown-option",children:[(0,l.jsx)("span",{children:"Forward"}),(0,l.jsx)("i",{className:"bx-share-alt"})]}),(0,l.jsxs)(o.DropDownItem,{className:"dropdown-option",onClick:function(){return i(g)},children:[(0,l.jsx)("span",{children:"Copy"}),(0,l.jsx)("i",{className:"bx-copy"})]}),(0,l.jsxs)(o.DropDownItem,{className:"dropdown-option",children:[(0,l.jsx)("span",{children:"Mark as Unread"}),(0,l.jsx)("i",{className:"bx-message-error"})]}),(0,l.jsxs)(o.DropDownItem,{className:"dropdown-option",onClick:function(){return n(y,D)},children:[(0,l.jsx)("span",{children:"Delete"}),(0,l.jsx)("i",{className:"bx-trash"})]})]})]})]})]},x)}))})]},_)}))})}},1256:function(e,t,n){n.r(t),n.d(t,{Header:function(){return c}});var r=n(2791),a=n(9930),o=n(2703),s=n(9041),i=n(184),c=function(e){var t,n=e.clearChatId,c=e.chatDetails,u=e.toggleInfo,l=e.handleCall,d=e.show,f=matchMedia("(max-width: 768px)").matches;return(0,i.jsxs)("div",{className:(0,o.classNames)(s.default.chat_header,d&&s.default.show),children:[(0,i.jsxs)("div",{className:s.default.user_info,children:[(0,i.jsx)("div",{className:s.default.go_back,onClick:n,children:(0,i.jsx)("i",{className:"bx bx-chevron-left"})}),(0,i.jsx)(a.Avatar,{src:null===c||void 0===c?void 0:c.avatar,name:null===c||void 0===c?void 0:c.name,size:50,status:null===c||void 0===c?void 0:c.status,userId:null===c||void 0===c?void 0:c.userId}),(0,i.jsxs)("div",{className:s.default.user_name,children:[(0,i.jsx)("b",{children:null===c||void 0===c?void 0:c.name}),(0,i.jsx)("span",{userid:null===c||void 0===c?void 0:c.userId,children:null!==c&&void 0!==c&&c.users?"".concat(null===c||void 0===c||null===(t=c.users)||void 0===t?void 0:t.length," Members"):null!==c&&void 0!==c&&c.status?"Online":"Offline"})]})]}),(0,i.jsxs)("div",{className:s.default.chat_icons,children:[(0,i.jsx)("i",{className:"bx-video",onClick:function(){return l("video")}}),(0,i.jsx)("i",{className:"bxs-info-circle",onClick:u}),(0,i.jsx)("i",{className:"bx-dots-vertical-rounded",id:"more-option"}),(0,i.jsxs)(a.DropDown,{selector:"#more-option",placement:"bottom-end",zIndex:2001,children:[f&&(0,i.jsxs)(r.Fragment,{children:[(0,i.jsxs)(a.DropDownItem,{className:"dropdown-option",onClick:u,children:[(0,i.jsx)("span",{children:"View Profile"}),(0,i.jsx)("i",{className:"bx bx-user"})]}),(0,i.jsxs)(a.DropDownItem,{className:"dropdown-option",onClick:function(){return l("video")},children:[(0,i.jsx)("span",{children:"Video"}),(0,i.jsx)("i",{className:"bx bx-video"})]})]}),(0,i.jsxs)(a.DropDownItem,{className:"dropdown-option",children:[(0,i.jsx)("span",{children:"Muted"}),(0,i.jsx)("i",{className:"bx-microphone-off"})]}),(0,i.jsxs)(a.DropDownItem,{className:"dropdown-option",children:[(0,i.jsx)("span",{children:"Delete"}),(0,i.jsx)("i",{className:"bx-trash"})]})]})]})]})}},4273:function(e,t,n){n.r(t),n.d(t,{Loader:function(){return o}});n(2791);var r=n(67),a=n(184),o=function(){return(0,a.jsxs)("div",{className:r.default.loader,children:[(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{})]})}},3414:function(e,t,n){n.r(t),n.d(t,{PageLoader:function(){return s}});n(2791);var r=n(2703),a=n(22),o=n(184),s=function(){var e=["25%","27.5%","30%","32.5%","35%"],t=Array.from({length:10},(function(){return e[Math.floor(Math.random()*e.length)]}));return(0,o.jsx)("div",{className:a.default.container,children:t.map((function(e,t){return(0,o.jsxs)("div",{className:(0,r.classNames)(a.default.card,t%2===0&&a.default.end),style:{"--width":e},children:[(0,o.jsx)("div",{className:"".concat(a.default.line," skeleton")}),(0,o.jsx)("div",{className:"".concat(a.default.line," skeleton")})]},t)}))})}},8641:function(e,t,n){n.r(t),n.d(t,{Emoji:function(){return u}});var r=n(885),a=n(2791),o=n(9930),s=n(5357),i=n(517),c=n(184),u=function(e){var t=e.toggle,n=e.isOpen,u=e.selector,l=e.onChange,d=(0,a.useRef)(),f=function(e){return function(){l(e),t()}};return(0,c.jsx)(o.DropDown,{isOpen:n,toggle:t,selector:u,placement:"top-center",zIndex:2e3,children:(0,c.jsxs)("div",{className:i.default.emoji_container,children:[(0,c.jsxs)("div",{className:i.default.emoji_header,children:[[{label:"Smileys & People",icon:"bx-smile"},{label:"Animals & Nature",icon:"bx-leaf"},{label:"Travel & Places",icon:"bx-home-alt"},{label:"Activities",icon:"bx-baseball"},{label:"Objects",icon:"bx-world"},{label:"Symbols",icon:"bx-bulb"},{label:"Flags",icon:"bx-flag"}].map((function(e,t){var n,r=e.label,a=e.icon;return(0,c.jsxs)("div",{id:"emoji-type-".concat(t),className:i.default.emoji_type,onClick:(n=r,function(){var e=document.querySelector('[emoji-title="'.concat(n,'"]')).offsetTop;d.current.scrollTo(0,e-95)}),children:[(0,c.jsx)("i",{className:a}),(0,c.jsx)(o.Tooltip,{placement:"top",selector:"#emoji-type-".concat(t),offset:10,children:r})]},t)})),(0,c.jsxs)("div",{id:"emoji-close",className:i.default.close,onClick:t,children:[(0,c.jsx)("span",{children:"\u2a2f"}),(0,c.jsx)(o.Tooltip,{placement:"top",selector:"#emoji-close",offset:10,children:"Close"})]})]}),(0,c.jsxs)("div",{className:i.default.search_emoji,children:[(0,c.jsx)("input",{type:"text",placeholder:"Search Emoji"}),(0,c.jsx)("div",{className:i.default.search_icon,children:(0,c.jsx)("i",{className:"bx-search-alt-2"})})]}),(0,c.jsx)("div",{className:i.default.emoji_card,ref:d,children:Object.entries(s).map((function(e,t){var n=(0,r.Z)(e,2),a=n[0],o=n[1];return(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:i.default.emoji_title,"emoji-title":a,children:(0,c.jsx)("b",{children:a})}),(0,c.jsx)("div",{className:i.default.emoji_list,children:o.map((function(e,t){var n=e.emoji,r=e.description;return(0,c.jsx)("button",{title:r,onClick:f(n),children:(0,c.jsx)("div",{className:i.default.emoji_icon,children:n})},t)}))})]},t)}))})]})})}},1077:function(e,t,n){n.r(t),n.d(t,{TextArea:function(){return h}});var r=n(7762),a=n(4165),o=n(5861),s=n(885),i=n(2791),c=n(3487),u=n(8641),l=n(5145),d=n(2703),f=n(9102),m=n(8731),p=n(184),h=function(e){var t=e.onSend,n=e.onFocus,h=e.chatId,v=e.otherUser,_=(0,i.useState)(!1),x=(0,s.Z)(_,2),j=x[0],g=x[1],y=(0,i.useState)(""),b=(0,s.Z)(y,2),w=b[0],k=b[1],C=(0,i.useState)(),N=(0,s.Z)(C,2),Z=N[0],I=N[1],D=(0,i.useState)(!1),S=(0,s.Z)(D,2),E=S[0],M=S[1],A=(0,i.useRef)();(0,i.useEffect)((function(){var e=new(window.SpeechRecognition||window.webkitSpeechRecognition);e.interimResults=!0,e.continuous=!0,e.onstart=function(e){console.log(e)},e.onend=function(e){console.log(e)},e.onresult=function(e){var t=e.results,n=Array.from(t).map((function(e){return e[0]})).map((function(e){return e.transcript})).join("");k(w.concat(n))},e.onerror=function(e){console.log(e)},I(e)}),[]);var T=function(){return Array.isArray(v)?v.map((function(e){return{id:e._id,name:e.name}})):v},R=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==(n=A.current.value).length){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,t(n);case 5:A.current.value="";case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){var n,o,s,i,u,d;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.target.files,e.prev=1,o=new FormData,s=(0,r.Z)(n);try{for(s.s();!(i=s.n()).done;)u=i.value,o.append("file",u)}catch(a){s.e(a)}finally{s.f()}return e.next=7,(0,c.fileUpload)(o);case 7:d=e.sent,console.log(d),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),(0,l.Toast)({type:"error",message:null===e.t0||void 0===e.t0?void 0:e.t0.message});case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}();return(0,p.jsxs)(i.Fragment,{children:[(0,p.jsxs)("div",{className:m.default.chat_input,children:[(0,p.jsx)("i",{className:"bx-smile",id:"emoji"}),(0,p.jsxs)("div",{className:m.default.input_field,children:[(0,p.jsx)("textarea",{ref:A,placeholder:"Type your message...",name:"chat-input",onFocus:n,onKeyDown:function(){E||(f.socket.emit("start-typing",h,T()),M(!0))},onChange:(0,d.debounce)((function(){f.socket.emit("end-typing",h,T()),M(!1)}),1e3)}),(0,p.jsx)("label",{htmlFor:"chat-file",children:(0,p.jsx)("i",{className:"bx-paperclip",id:"attach"})}),(0,p.jsx)("input",{id:"chat-file",type:"file",onChange:P,multiple:!0,hidden:!0})]}),(0,p.jsx)("button",{onClick:R,children:(0,p.jsx)("i",{className:"bxs-send"})}),(0,p.jsx)("i",{className:"bx-microphone",id:"mic",onPointerDown:function(){null===Z||void 0===Z||Z.start()},onPointerUp:function(){null===Z||void 0===Z||Z.stop()}})]}),(0,p.jsx)(u.Emoji,{selector:"#emoji",isOpen:j,toggle:function(){g(!j)},onChange:function(e){k(w.concat(e))}})]})}},8325:function(e,t,n){n.r(t),n.d(t,{VideoPopup:function(){return s}});n(2791);var r=n(9930),a=n(2786),o=n(184),s=function(e){var t=e.isOpen;return(0,o.jsx)(r.Modal,{isOpen:t,width:750,closeClickOnOutside:!1,zIndex:2002,children:(0,o.jsxs)("div",{className:a.default.video_container,children:[(0,o.jsx)("video",{id:"local-stream",className:a.default.local,poster:"https://vue.pixelstrap.com/chitchat/_nuxt/img/videocall.336a27d.jpg",autoPlay:!0,muted:!0}),(0,o.jsx)("video",{id:"remote-stream",className:a.default.remote,poster:"https://vue.pixelstrap.com/chitchat/_nuxt/img/videocall_bg.ab164fb.jpg",autoPlay:!0})]})})}},7352:function(e,t,n){n.r(t),n.d(t,{Chat:function(){return D}});var r=n(4942),a=n(1413),o=n(2982),s=n(4165),i=n(5861),c=n(885),u=n(2791),l=n(9930),d=n(1077),f=n(1256),m=n(2775),p=n(8325),h=n(4717),v=n(3537),_=n(9855),x=n(2449),j=n(2703),g=n(5322),y=n(9102),b=n(4273),w=n(3414),k=n(101),C=n(4329),N=n(9961),Z=n(184),I=new Audio(k),D=function(){var e=(0,u.useRef)(),t=(0,u.useRef)(),n=(0,h.useAuth)(),k=n.user,D=n.chatId,S=n.clearChatId,E=(0,u.useRef)(),M=(0,u.useState)([]),A=(0,c.Z)(M,2),T=A[0],R=A[1],P=(0,u.useState)(!1),F=(0,c.Z)(P,2),O=F[0],L=F[1],q=(0,u.useState)(!1),B=(0,c.Z)(q,2),H=B[0],U=B[1],z=(0,u.useState)(null),V=(0,c.Z)(z,2),Y=V[0],Q=V[1],G=(0,u.useState)({}),J=(0,c.Z)(G,2),K=J[0],W=J[1],X=(0,u.useState)(!1),$=(0,c.Z)(X,2),ee=$[0],te=$[1],ne=(0,u.useState)(!1),re=(0,c.Z)(ne,2),ae=re[0],oe=re[1],se=(0,u.useState)({}),ie=(0,c.Z)(se,2),ce=ie[0],ue=ie[1],le=(0,u.useState)(),de=(0,c.Z)(le,2),fe=de[0],me=de[1],pe=(0,u.useState)(),he=(0,c.Z)(pe,2),ve=he[0],_e=he[1],xe=(0,u.useState)(),je=(0,c.Z)(xe,2),ge=je[0],ye=je[1],be=(0,u.useRef)(),we=(0,u.useRef)();(0,u.useEffect)((function(){return document.addEventListener("socket",ke),function(){document.removeEventListener("socket",ke)}}),[]),(0,u.useEffect)((function(){0!==T.length&&R([]),Ie()}),[D]),(0,u.useEffect)((function(){be.current&&0!==T.length&&Pe(be.current)}),[T]),(0,u.useEffect)((function(){be.current&&!fe&&Pe(be.current)}),[fe]);var ke=function(){y.socket.on("message",Oe),y.socket.on("seen",Le),y.socket.on("receive-offer",Ye),y.socket.on("receive-answer",Qe),y.socket.on("start-typing",Ce),y.socket.on("end-typing",Ne)},Ce=function(t,n){var r=sessionStorage.getItem("chatId");if(r&&t===r&&e.current){var a=e.current.querySelector("[typingstatus]");a&&a.setAttribute("typing","".concat(n.split(" ")[0]," is typing..."))}},Ne=function(t){var n=sessionStorage.getItem("chatId");if(n&&t===n&&e.current){var r=e.current.querySelector("[typingstatus]");r&&r.removeAttribute("typing")}},Ze=function(){L(!O)},Ie=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var t,n,r,a,o,i,c,u,d,f,m,p,h,v;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return me(!0),e.prev=1,e.next=4,(0,_.getChatById)(D,{limit:50});case 4:if(t=e.sent,n=t.data.data,r=n.chatDetails,a=void 0===r?{}:r,o=n.unReadMsgList,i=void 0===o?[]:o,c=n.msgList,u=void 0===c?[]:c,d=n.hasMoreTop,f=void 0!==d&&d,m=n.hasMoreBottom,p=void 0!==m&&m,h=n.totalUnReadMsg,v=void 0===h?0:h,!(i.length>0)){e.next=27;break}return be.current=i[0].messages[0]._id,Ee(u,i),ue({id:be.current,total:v}),ye(p),e.next=25,(0,_.markAsRead)(D);case 25:e.next=28;break;case 27:u.length>0&&(be.current=u.at(-1).messages.at(-1)._id);case 28:W(a),R(u),_e(f),e.next=36;break;case 33:e.prev=33,e.t0=e.catch(1),(0,l.Toast)({type:"error",message:null===e.t0||void 0===e.t0?void 0:e.t0.message});case 36:return e.prev=36,me(!1),e.finish(36);case 39:case"end":return e.stop()}}),e,null,[[1,33,36,39]])})));return function(){return e.apply(this,arguments)}}(),De=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t,n){var r,a,i,c,u;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,_.getChatMessagesByMsgId)(D,t,{limit:50,latest:n});case 3:r=e.sent,a=r.data.data,i=a.list,c=a.hasMore,u=(0,o.Z)(T),n?Ee(u,i):Se(u,i.reverse()),R(u),n?ye(c):_e(c),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),(0,l.Toast)({type:"error",message:null===e.t0||void 0===e.t0?void 0:e.t0.message});case 16:return e.prev=16,n?oe(!1):te(!1),e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[0,13,16,19]])})));return function(t,n){return e.apply(this,arguments)}}(),Se=function(e,t){t.forEach((function(t,n){var r,a=t.day,s=t.messages,i=e.findIndex((function(e){var t=e.day;return a===t}));-1===i?e.unshift({day:a,messages:s}):(r=e[i].messages).unshift.apply(r,(0,o.Z)(s)),0===n&&(be.current=s[s.length-1]._id)}))},Ee=function(e,t){t.forEach((function(n,r){var a,s=n.day,i=n.messages,c=e.findIndex((function(e){var t=e.day;return s===He(t)}));-1===c?e.push({day:s,messages:i}):(a=e[c].messages).push.apply(a,(0,o.Z)(i)),0===r&&(be.current=t[0].messages[0]._id)}))},Me=function(e,t,n){var r=e.findIndex((function(e){var t=e.day;return n===t}));-1===r?e.push({day:n,messages:[t]}):e[r].messages.push(t)},Ae=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(D){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,(0,_.markAsReadByMsgId)(D,t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})));return function(t){return e.apply(this,arguments)}}(),Te=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t){var n,r,i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=(0,a.Z)({msg:t,date:(new Date).toISOString()},Y&&{reply:Y}),e.next=4,(0,v.createMessage)(D,n);case 4:r=e.sent,i=r.data.data,R((function(e){var t=(0,o.Z)(e);return Me(t,i,He(i.date)),be.current=i._id,t})),Y&&Re(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),(0,l.Toast)({type:"error",message:null===e.t0||void 0===e.t0?void 0:e.t0.message});case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),Re=function(){Q(null)},Pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:be.current||null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"auto";if(e){var n=document.querySelector("[msgid='".concat(e,"']"));n&&n.scrollIntoView({block:"center",behavior:t})}},Fe=(0,u.useMemo)((function(){return null}),[Y]),Oe=function(e){e.sender.id!==(null===k||void 0===k?void 0:k.id)&&(Be(e.msg),qe(),R((function(t){var n=(0,o.Z)(t);return Me(n,e,He(e.date)),be.current=e._id,n})),Ae(e._id))},Le=function(e){var t=e.userId,n=e.msgId;if((null===k||void 0===k?void 0:k.id)!==t){var r=function(e){var t=document.querySelector("[msgid='".concat(e,"']"));t&&t.querySelector("[seen]").setAttribute("seen",!0)};Array.isArray(n)?n.forEach((function(e){var t=e.id;r(t)})):r(n)}},qe=function(){I.muted=!1,I.play()},Be=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("granted"===Notification.permission){e.next=2;break}return e.abrupt("return");case 2:new Notification("New Message",{body:t,icon:C});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),He=function(e){return e.split("T")[0]},Ue=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t){var n,r,a;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return U(!0),e.prev=1,E.current=new RTCPeerConnection,E.current.onicecandidate=Ve,E.current.ontrack=ze,e.next=7,navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},video:!0});case 7:return n=e.sent,document.querySelector("#local-stream").srcObject=n,n.getTracks().forEach((function(e){E.current.addTrack(e,n)})),e.next=13,E.current.createOffer({offerToReceiveAudio:1,offerToReceiveVideo:1});case 13:return r=e.sent,e.next=16,E.current.setLocalDescription(r);case 16:return a={date:(new Date).toISOString(),offer:r,type:t},e.next=19,(0,x.initiateCall)(D,a);case 19:e.next=24;break;case 21:e.prev=21,e.t0=e.catch(1),(0,l.Toast)({type:"error",message:null===e.t0||void 0===e.t0?void 0:e.t0.message});case 24:case"end":return e.stop()}}),e,null,[[1,21]])})));return function(t){return e.apply(this,arguments)}}(),ze=function(e){var t=(0,c.Z)(e.streams,1)[0];document.querySelector("#remote-stream").srcObject=t},Ve=function(e){var t=e.target.localDescription,n=e.candidate;if(n&&(we.current=n),!n||!we.current)if("offer"===t.type){var r={offer:t,iceCandidate:we.current};y.socket.emit("send-offer",r,D)}else if("answer"===t.type){var a={answer:t,iceCandidate:we.current};y.socket.emit("send-answer",a,D)}},Ye=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t){var n,r,a,o,i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.iceCandidate,r=t.offer,U(!0),a=new RTCPeerConnection,E.current=a,E.current.onicecandidate=Ve,E.current.ontrack=ze,e.prev=6,e.next=9,navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},video:!0});case 9:return o=e.sent,document.querySelector("#local-stream").srcObject=o,o.getTracks().forEach((function(e){E.current.addTrack(e,o)})),e.next=15,E.current.setRemoteDescription(r);case 15:return e.next=17,E.current.addIceCandidate(n);case 17:return e.next=19,E.current.createAnswer();case 19:return i=e.sent,e.next=22,E.current.setLocalDescription(i);case 22:e.next=27;break;case 24:e.prev=24,e.t0=e.catch(6),console.log(e.t0);case 27:case"end":return e.stop()}}),e,null,[[6,24]])})));return function(t){return e.apply(this,arguments)}}(),Qe=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t){var n,r;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.iceCandidate,r=t.answer,e.prev=1,e.next=4,E.current.setRemoteDescription(r);case 4:return e.next=6,E.current.addIceCandidate(n);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return(0,Z.jsxs)("div",{ref:e,className:N.default.chat_wrapper,onScroll:(0,j.debounce)((function(t){var n=t.target,r=n.scrollTop,a=n.scrollHeight,o=n.clientHeight;if(!(fe||ee||ae)){if(ve&&0===r){var s=e.current.querySelector("[first]").getAttribute("msgid");te(!0),De(s,0)}if(ge&&a-r===o){var i=e.current.querySelector("[last]").getAttribute("msgid");oe(!0),De(i,1)}}}),100),children:[(0,Z.jsx)(f.Header,{clearChatId:S,chatDetails:K,handleCall:Ue,toggleInfo:Ze,show:!!D}),ee&&(0,Z.jsx)(b.Loader,{}),(0,Z.jsx)("div",{id:"conversation",className:N.default.chat_section,children:fe?(0,Z.jsx)(w.PageLoader,{}):(0,Z.jsx)(m.Conversation,{chats:T,onDelete:function(e,t){var n=He(e);if(T.hasOwnProperty(n)){var o=T[n].filter((function(e){var n=e._id;return t!==n}));R((0,a.Z)((0,a.Z)({},T),{},(0,r.Z)({},n,o)))}},onCopy:function(e){navigator.clipboard.writeText(e)},onReply:function(e,t){var n=He(e);Q({key:n,id:t})},userId:null===k||void 0===k?void 0:k.id,otherUserId:(null===K||void 0===K?void 0:K.userId)||(null===K||void 0===K?void 0:K.users),focusMsgById:Pe,chatId:D,unReadMsg:ce,isGroupChat:!(null===K||void 0===K||!K.group)})}),(0,Z.jsx)("div",{className:N.default.typing,typingstatus:""}),ae&&(0,Z.jsx)(b.Loader,{}),(0,Z.jsx)(d.TextArea,{onSend:Te,onFocus:function(){matchMedia("(max-width: 768px)").matches&&Pe()},chatId:D,otherUser:null!==K&&void 0!==K&&K.userId?{id:null===K||void 0===K?void 0:K.userId,name:null===K||void 0===K?void 0:K.name}:null===K||void 0===K?void 0:K.users}),(0,Z.jsx)(g.Z,{in:Boolean(Y),timeout:250,classNames:{enterActive:N.default.reply_enter,exitActive:N.default.reply_exit},unmountOnExit:!0,children:(0,Z.jsx)("div",{className:N.default.reply_container,ref:t,children:(0,Z.jsxs)("div",{className:N.default.reply_card,children:[(0,Z.jsx)("span",{className:"truncate-4",children:null===Fe||void 0===Fe?void 0:Fe.msg}),(0,Z.jsx)("i",{className:"bx-x ".concat(N.default.close),onClick:Re})]})})}),(0,Z.jsx)(l.OffCanvas,{isOpen:O,position:"right",className:N.default.profile_sidebar,toggle:Ze,zIndex:2001,children:(0,Z.jsx)("div",{children:"Hello"})}),(0,Z.jsx)(p.VideoPopup,{isOpen:H})]})}},2449:function(e,t,n){n.r(t),n.d(t,{getCallHistory:function(){return o},initiateCall:function(){return s}});var r=n(9599),a=n(77),o=function(){return(0,r.axios)({url:a.endpoints.call.history,method:"get"})},s=function(e,t){return(0,r.axios)({url:"".concat(a.endpoints.call.initiate,"/").concat(e),method:"post",data:t})}},9855:function(e,t,n){n.r(t),n.d(t,{addToFavourite:function(){return c},getChatById:function(){return s},getChatByType:function(){return o},getChatMessagesByMsgId:function(){return i},markAsRead:function(){return d},markAsReadByMsgId:function(){return l},removeFromFavourite:function(){return u}});var r=n(9599),a=n(77),o=function(e){return(0,r.axios)({url:"".concat(a.endpoints.chat.list,"/").concat(e),method:"get"})},s=function(e,t){return(0,r.axios)({url:"".concat(a.endpoints.chat.chatDetails,"/").concat(e),method:"get",params:t})},i=function(e,t,n){return(0,r.axios)({url:"".concat(a.endpoints.chat.chatMessages,"/").concat(e,"/").concat(t),method:"get",params:n})},c=function(e){return(0,r.axios)({url:a.endpoints.chat.addFavourite,method:"put"})},u=function(e){return(0,r.axios)({url:a.endpoints.chat.removeFavourite,method:"delete"})},l=function(e,t){return(0,r.axios)({url:"".concat(a.endpoints.chat.markAsReadByMsgId,"/").concat(e,"/").concat(t),method:"put"})},d=function(e){return(0,r.axios)({url:"".concat(a.endpoints.chat.markAsRead,"/").concat(e),method:"put"})}},3537:function(e,t,n){n.r(t),n.d(t,{createMessage:function(){return o}});var r=n(9599),a=n(77),o=function(e,t){return(0,r.axios)({url:"".concat(a.endpoints.message.createMessage,"/").concat(e),method:"post",data:t})}},3487:function(e,t,n){n.r(t),n.d(t,{fileUpload:function(){return c},metaData:function(){return i}});var r=n(4165),a=n(5861),o=n(9599),s=n(77),i=(n(9930),function(e){var t;return(0,o.axios)({url:null===(t=s.endpoints.others)||void 0===t?void 0:t.metaData,method:"post",data:e})}),c=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.axios)({url:null===(n=s.endpoints.others)||void 0===n?void 0:n.fileUpload,method:"post",data:t}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},9599:function(e,t,n){n.r(t),n.d(t,{axios:function(){return i}});var r=n(4569),a=n.n(r),o=n(2703),s=n(77),i=a().create({baseURL:s.baseURL});i.interceptors.request.use((function(e){var t=(0,o.cookies)().get("authToken");return t&&(e.headers.Authorization=t),e}),(function(e){return Promise.reject(e)})),i.interceptors.response.use((function(e){return e}),(function(e){var t;return 401===e.response.status&&document.dispatchEvent(new CustomEvent("logout")),Promise.reject(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.data)}))},9961:function(e,t,n){n.r(t),t.default={chat_wrapper:"Chat_chat_wrapper__gid5u",chat_section:"Chat_chat_section__3JB1Y",chat_skeleton:"Chat_chat_skeleton__6w6um",reply_enter:"Chat_reply_enter__QdcSq","from-bottom":"Chat_from-bottom__yjlc1",reply_exit:"Chat_reply_exit__CEbB5",reply_container:"Chat_reply_container__Hj6fN",reply_card:"Chat_reply_card__6LYq6",close:"Chat_close__2-iqb",profile_sidebar:"Chat_profile_sidebar__DYbvp",typing:"Chat_typing__kJgMt","zoom-in":"Chat_zoom-in__p3vEB"}},8527:function(e,t,n){n.r(t),t.default={container:"Conversation_container__I7CJi",chat_wrapper:"Conversation_chat_wrapper__S3O8R",end:"Conversation_end__ZMbi5",chat_card:"Conversation_chat_card__jz70L",reply_card:"Conversation_reply_card__AEy90",msg_time:"Conversation_msg_time__wN53F",tick:"Conversation_tick__RkyEe",user_name:"Conversation_user_name__RDhDd",clock:"Conversation_clock__y4n8i",options:"Conversation_options__WLSBI",date:"Conversation_date__ZfQTB",unread_msg:"Conversation_unread_msg__yFItk",section:"Conversation_section__wG88I",load:"Conversation_load__rqCbg"}},9041:function(e,t,n){n.r(t),t.default={chat_header:"Header_chat_header__QpmQQ",user_info:"Header_user_info__iEHZa",go_back:"Header_go_back__lCP4K",user_name:"Header_user_name__Trw38",chat_icons:"Header_chat_icons__JOz6D",show:"Header_show__F368n"}},67:function(e,t,n){n.r(t),t.default={loader:"Loader_loader__gQpe+",rotation:"Loader_rotation__Q-TX-"}},22:function(e,t,n){n.r(t),t.default={container:"PageLoader_container__WEvcy",card:"PageLoader_card__Fmr-Q",end:"PageLoader_end__ahXWd",line:"PageLoader_line__y70Cl"}},517:function(e,t,n){n.r(t),t.default={emoji_enter:"Emoji_emoji_enter__hm4pK",emoji_container:"Emoji_emoji_container__FeFYJ",emoji_wrapper:"Emoji_emoji_wrapper__Mni-7","emoji-anime":"Emoji_emoji-anime__vboWK",emoji_exit:"Emoji_emoji_exit__yUFuv",emoji_header:"Emoji_emoji_header__HJTsc",emoji_type:"Emoji_emoji_type__Hmz-D",close:"Emoji_close__Tlf+A",search_emoji:"Emoji_search_emoji__QHZYs",search_icon:"Emoji_search_icon__EVS9p",emoji_card:"Emoji_emoji_card__cVAbK",emoji_title:"Emoji_emoji_title__uaqYB",emoji_list:"Emoji_emoji_list__zUunG",emoji_icon:"Emoji_emoji_icon__QGww2"}},8731:function(e,t,n){n.r(t),t.default={chat_input:"TextArea_chat_input__+dl6x",input_field:"TextArea_input_field__++nq-"}},2786:function(e,t,n){n.r(t),t.default={video_container:"VideoPopup_video_container__EcnPE",remote:"VideoPopup_remote__x1HvW",local:"VideoPopup_local__xIYkj"}},101:function(e,t,n){e.exports=n.p+"static/media/fade-in-tone.4355e6fe3e157d8945f6.mp3"},4329:function(e,t,n){e.exports=n.p+"static/media/favicon.6072f0ecd8b7685691ff.ico"}}]);
//# sourceMappingURL=7352.8bac1905.chunk.js.map