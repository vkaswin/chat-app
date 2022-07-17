"use strict";(self.webpackChunkchat_app=self.webpackChunkchat_app||[]).push([[3381,7717,2511,4265,2723,3188,1027,2879,2369],{4265:function(e,i,t){t.r(i),t.d(i,{Conversation:function(){return c}});var o=t(4942),a=(t(2791),t(7717)),s=t(2723),n=t(2703),r=t(9930),m=t(184),c=function(){var e=a.chats,i=[{icon:"bx-share ms-2",label:"Reply"},{icon:"bx-share-alt",label:"Forward"},{icon:"bx-copy text-muted",label:"Copy"},{icon:"bx-bookmarks text-muted",label:"Bookmark"},{icon:"bx-message-error",label:"Mark as Unread"},{icon:"bx-trash text-muted",label:"Delete"}];return(0,m.jsx)("div",{className:s.default.conversation_container,children:e.map((function(e,t){var a=e.msg,c=e.datetime;return(0,m.jsxs)("div",{className:(0,n.classNames)(s.default.conversation_wrapper,(0,o.Z)({},s.default.end,t%2===0)),children:[(0,m.jsxs)("div",{className:s.default.chat_wrapper,children:[(0,m.jsx)("div",{className:s.default.chat_card,children:(0,m.jsx)("span",{children:a})}),(0,m.jsxs)("div",{className:s.default.options,children:[(0,m.jsx)("i",{className:"bx-dots-vertical-rounded",id:"chat-option-".concat(t)}),(0,m.jsx)(r.DropDown,{selector:"#chat-option-".concat(t),position:"bottom-center",children:i.map((function(e,i){var t=e.label,o=e.icon;return(0,m.jsxs)(r.DropDown.Item,{className:s.default.chat_option,children:[(0,m.jsx)("span",{children:t}),(0,m.jsx)("i",{className:o})]},i)}))})]})]}),(0,m.jsxs)("div",{className:s.default.msg_time,children:[(0,m.jsx)("span",{children:c}),(0,m.jsx)("i",{className:"bx bx-check-double","data-seen":!0})]})]},t)}))})}},1027:function(e,i,t){t.r(i),t.d(i,{Emoji:function(){return l}});var o=t(885),a=t(2791),s=t(9930),n=t(1776),r=t(2703),m=t(9022),c=t(2879),d=t(184),l=function(e){var i=e.toggle,t=e.isOpen,l=e.selector,_=[{label:"Smileys & People",icon:"bx-smile"},{label:"Animals & Nature",icon:"bx-leaf"},{label:"Travel & Places",icon:"bx-home-alt"},{label:"Activities",icon:"bx-baseball"},{label:"Objects",icon:"bx-world"},{label:"Symbols",icon:"bx-bulb"},{label:"Flags",icon:"bx-flag"}],u=(0,a.useRef)(),j=(0,a.useRef)();(0,a.useEffect)((function(){if(0!==l.length){var e=document.querySelector(l);e&&(u.current=e,e.onclick=i)}}),[]);return(0,d.jsx)(s.Portal,{children:(0,d.jsx)(n.Z,{in:t,timeout:300,unmountOnExit:!0,classNames:{enterActive:c.default.emoji_enter,exitActive:c.default.emoji_exit},onEntered:function(e){(0,r.clickOutside)({ref:e,onClose:i,doNotClose:function(e){return console.log(e),console.log(u.current.contains(e)),u.current.contains(e)}})},children:(0,d.jsx)("div",{children:(0,d.jsx)(s.Popper,{referenceElement:u,position:"top-center",offset:20,render:function(e){var t=e.popper,a=e.position,n=e.ref;return(0,d.jsx)("div",{ref:n,className:c.default.emoji_container,"data-position":a,style:t,children:(0,d.jsxs)("div",{className:c.default.emoji_wrapper,children:[(0,d.jsxs)("div",{className:c.default.emoji_header,children:[_.map((function(e,i){var t,o=e.label,a=e.icon;return(0,d.jsxs)("div",{id:"emoji-type-".concat(i),className:c.default.emoji_type,onClick:(t=o,function(){var e=document.querySelector('[data-emoji-title="'.concat(t,'"]')).offsetTop;j.current.scrollTo(0,e-95)}),children:[(0,d.jsx)("i",{className:a}),(0,d.jsx)(s.Tooltip,{position:"top-center",selector:"#emoji-type-".concat(i),offset:20,children:o})]},i)})),(0,d.jsxs)("div",{id:"emoji-close",className:c.default.close,onClick:i,children:[(0,d.jsx)("span",{children:"\u2a2f"}),(0,d.jsx)(s.Tooltip,{position:"top-center",selector:"#emoji-close",offset:15,children:"Close"})]})]}),(0,d.jsxs)("div",{className:c.default.search_emoji,children:[(0,d.jsx)("input",{type:"text",placeholder:"Search Emoji"}),(0,d.jsx)("div",{className:c.default.search_icon,children:(0,d.jsx)("i",{className:"bx-search-alt-2"})})]}),(0,d.jsx)("div",{className:c.default.emoji_card,ref:j,children:Object.entries(m).map((function(e,i){var t=(0,o.Z)(e,2),a=t[0],s=t[1];return(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{className:c.default.emoji_title,"data-emoji-title":a,children:(0,d.jsx)("b",{children:a})}),(0,d.jsx)("div",{className:c.default.emoji_list,children:s.map((function(e,i){var t=e.emoji,o=e.description;return(0,d.jsx)("button",{title:o,children:(0,d.jsx)("div",{className:c.default.emoji_icon,children:t})},i)}))})]},i)}))})]})})}})})})})}},3188:function(e,i,t){t.r(i),t.d(i,{TextArea:function(){return m}});var o=t(885),a=t(2791),s=t(1027),n=t(2369),r=t(184),m=function(){var e=(0,a.useState)(!1),i=(0,o.Z)(e,2),t=i[0],m=i[1];return(0,r.jsxs)(a.Fragment,{children:[(0,r.jsxs)("div",{className:n.default.chat_input,children:[(0,r.jsx)("i",{className:"bx-paperclip",id:"attach"}),(0,r.jsx)("i",{className:"bx-smile",id:"emoji"}),(0,r.jsx)("textarea",{}),(0,r.jsx)("i",{className:"bx-microphone",id:"mic"}),(0,r.jsx)("button",{children:(0,r.jsx)("i",{className:"bxs-send"})})]}),(0,r.jsx)(s.Emoji,{selector:"#emoji",isOpen:t,toggle:function(){m(!t)}})]})}},3381:function(e,i,t){t.r(i),t.d(i,{Chats:function(){return d}});var o=t(885),a=t(2791),s=t(9930),n=t(3188),r=t(4265),m=t(2511),c=t(184),d=function(){var e=(0,a.useState)(!1),i=(0,o.Z)(e,2),t=i[0],d=i[1],l=function(){d(!t)};return(0,c.jsxs)(a.Fragment,{children:[(0,c.jsx)(r.Conversation,{}),(0,c.jsxs)("div",{className:m.default.chat_header,children:[(0,c.jsxs)("div",{className:m.default.user_info,children:[(0,c.jsx)(s.Avatar,{src:"https://themesbrand.com/doot/layouts/assets/images/users/avatar-2.jpg",size:50,status:!0}),(0,c.jsxs)("div",{className:m.default.user_name,children:[(0,c.jsx)("b",{children:"Bella Cote"}),(0,c.jsx)("span",{children:"Online"})]})]}),(0,c.jsxs)("div",{className:m.default.chat_icons,children:[(0,c.jsx)("i",{className:"bx-search"}),(0,c.jsx)("i",{className:"bxs-phone-call"}),(0,c.jsx)("i",{className:"bx-video"}),(0,c.jsx)("i",{className:"bxs-info-circle",onClick:l}),(0,c.jsx)("i",{className:"bx-dots-vertical-rounded",id:"more-option"}),(0,c.jsx)(s.DropDown,{selector:"#more-option",position:"bottom-end",children:[{label:"Archive",icon:"bx-archive"},{label:"Muted",icon:"bx-microphone-off"},{label:"Delete",icon:"bx-trash"}].map((function(e,i){var t=e.label,o=e.icon;return(0,c.jsxs)(s.DropDown.Item,{className:m.default.more_option,children:[(0,c.jsx)("span",{children:t}),(0,c.jsx)("i",{className:o})]},i)}))})]})]}),(0,c.jsx)(n.TextArea,{}),(0,c.jsx)(s.OffCanvas,{isOpen:t,position:"right",className:m.default.profile_sidebar,toggle:l,children:(0,c.jsx)("div",{children:"helo"})})]})}},2511:function(e,i,t){t.r(i),i.default={chat_header:"Chats_chat_header__oSRpJ",user_info:"Chats_user_info__R7UuI",user_name:"Chats_user_name__hOeU3",chat_icons:"Chats_chat_icons__jh6im",more_option:"Chats_more_option__M8Npj",profile_sidebar:"Chats_profile_sidebar__ZP1Tf"}},2723:function(e,i,t){t.r(i),i.default={conversation_container:"Conversation_conversation_container__6wBY5",conversation_wrapper:"Conversation_conversation_wrapper__snJzP",end:"Conversation_end__Kjdak",chat_wrapper:"Conversation_chat_wrapper__FyiKP",chat_card:"Conversation_chat_card__-jtgC",msg_time:"Conversation_msg_time__DOXK4",options:"Conversation_options__mUos4",chat_option:"Conversation_chat_option__enVL0"}},2879:function(e,i,t){t.r(i),i.default={emoji_enter:"Emoji_emoji_enter__w7yZT",emoji_container:"Emoji_emoji_container__HXSvO",emoji_wrapper:"Emoji_emoji_wrapper__kFwoG","emoji-anime":"Emoji_emoji-anime__ESXmi",emoji_exit:"Emoji_emoji_exit__ZVQuH",emoji_header:"Emoji_emoji_header__gxRGj",emoji_type:"Emoji_emoji_type__Ud0mK",close:"Emoji_close__9CIRK",search_emoji:"Emoji_search_emoji__fvxQi",search_icon:"Emoji_search_icon__KWKYf",emoji_card:"Emoji_emoji_card__6gbRj",emoji_title:"Emoji_emoji_title__mvcKK",emoji_list:"Emoji_emoji_list__p+OUC",emoji_icon:"Emoji_emoji_icon__DOJpp"}},2369:function(e,i,t){t.r(i),i.default={chat_input:"TextArea_chat_input__zkCUT"}},7717:function(e){e.exports=JSON.parse('{"chats":[{"id":1,"from_id":2,"to_id":1,"msg":"Good morning \ud83d\ude0a","datetime":"10:07 am"},{"id":2,"from_id":1,"to_id":2,"msg":"Good morning, How are you? What about our next meeting?","datetime":"10:12 am"},{"id":3,"from_id":2,"to_id":1,"msg":"Yeah everything is fine. Our next meeting tomorrow at 10.00 AM","datetime":"10:13 am"},{"id":4,"from_id":2,"to_id":1,"msg":"Hey, I\'m going to meet a friend of mine at the department store. I have to buy some presents for my parents \ud83c\udf81.","datetime":"10:13 am"},{"id":5,"from_id":1,"to_id":2,"msg":"Wow that\'s great","datetime":"10:14 am"},{"id":6,"from_id":2,"to_id":1,"msg":"@Jean Berwick, Please Assign AB-123 to me","datetime":"10:15 am"},{"id":7,"from_id":1,"to_id":2,"msg":"Wow that\'s great","datetime":"10:16 am"},{"id":8,"from_id":2,"to_id":1,"msg":"Okay, Sure","datetime":"10:20 am"},{"id":1,"from_id":2,"to_id":1,"msg":"Good morning \ud83d\ude0a","datetime":"10:07 am"},{"id":2,"from_id":1,"to_id":2,"msg":"Good morning, How are you? What about our next meeting?","datetime":"10:12 am"},{"id":3,"from_id":2,"to_id":1,"msg":"Yeah everything is fine. Our next meeting tomorrow at 10.00 AM","datetime":"10:13 am"},{"id":4,"from_id":2,"to_id":1,"msg":"Hey, I\'m going to meet a friend of mine at the department store. I have to buy some presents for my parents \ud83c\udf81.","datetime":"10:13 am"},{"id":5,"from_id":1,"to_id":2,"msg":"Wow that\'s great","datetime":"10:14 am"},{"id":6,"from_id":2,"to_id":1,"msg":"@Jean Berwick, Please Assign AB-123 to me","datetime":"10:15 am"},{"id":7,"from_id":1,"to_id":2,"msg":"Wow that\'s great","datetime":"10:16 am"},{"id":8,"from_id":2,"to_id":1,"msg":"Okay, Sure","datetime":"10:20 am"},{"id":1,"from_id":2,"to_id":1,"msg":"Good morning \ud83d\ude0a","datetime":"10:07 am"},{"id":2,"from_id":1,"to_id":2,"msg":"Good morning, How are you? What about our next meeting?","datetime":"10:12 am"},{"id":3,"from_id":2,"to_id":1,"msg":"Yeah everything is fine. Our next meeting tomorrow at 10.00 AM","datetime":"10:13 am"},{"id":4,"from_id":2,"to_id":1,"msg":"Hey, I\'m going to meet a friend of mine at the department store. I have to buy some presents for my parents \ud83c\udf81.","datetime":"10:13 am"},{"id":5,"from_id":1,"to_id":2,"msg":"Wow that\'s great","datetime":"10:14 am"},{"id":6,"from_id":2,"to_id":1,"msg":"@Jean Berwick, Please Assign AB-123 to me","datetime":"10:15 am"},{"id":7,"from_id":1,"to_id":2,"msg":"Wow that\'s great","datetime":"10:16 am"},{"id":8,"from_id":2,"to_id":1,"msg":"Okay, Sure","datetime":"10:20 am"}]}')}}]);
//# sourceMappingURL=3381.80914923.chunk.js.map