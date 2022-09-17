"use strict";(self.webpackChunkreact_chat_app=self.webpackChunkreact_chat_app||[]).push([[1866,4411,5970,9604,7730,9563,4498],{9604:function(e,t,a){a.r(t),a.d(t,{EmptyChat:function(){return i}});a(2791);var s=a(7730),c=a(184),i=function(){return(0,c.jsxs)("div",{className:s.default.empty_chat,children:[(0,c.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",version:"1.1",id:"Layer_1",x:"0px",y:"0px",viewBox:"0 0 490 490",style:{enableBackground:"new 0 0 490 490"},xmlSpace:"preserve",children:[(0,c.jsx)("g",{children:(0,c.jsx)("g",{children:(0,c.jsxs)("g",{children:[(0,c.jsx)("path",{d:"M460,154.999H360v-120c0-16.542-13.458-30-30-30H30c-16.542,0-30,13.458-30,30v190c0,16.542,13.458,30,30,30h5v65     c0,4.107,2.512,7.797,6.333,9.303c1.191,0.47,2.433,0.697,3.665,0.697c2.719,0,5.384-1.11,7.313-3.177l67.035-71.823H130v120     c0,16.542,13.458,30,30,30h190v70c0,4.044,2.437,7.691,6.173,9.239c1.237,0.513,2.536,0.762,3.825,0.762     c2.602,0,5.16-1.017,7.073-2.929L444.142,405H460c16.542,0,30-13.458,30-30v-190C490,168.458,476.542,154.999,460,154.999z      M130,184.999v50h-15c-2.772,0-5.419,1.15-7.311,3.177L55,294.63v-49.63c0-5.523-4.477-10-10-10H30c-5.514,0-10-4.486-10-10v-190     c0-5.514,4.486-10,10-10h300c5.514,0,10,4.486,10,10v120H160C143.458,154.999,130,168.458,130,184.999z M470,375     c0,5.514-4.486,10-10,10h-20c-2.652,0-5.196,1.054-7.071,2.929L370,450.857V395c0-5.523-4.477-10-10-10H160     c-5.514,0-10-4.486-10-10v-190c0-5.514,4.486-10,10-10h300c5.514,0,10,4.486,10,10V375z"}),(0,c.jsx)("rect",{x:110,y:"54.999",width:190,height:20}),(0,c.jsx)("rect",{x:60,y:"104.999",width:240,height:20}),(0,c.jsx)("rect",{x:60,y:"154.999",width:50,height:20}),(0,c.jsx)("rect",{x:60,y:"54.999",width:35,height:20}),(0,c.jsx)("rect",{x:180,y:"219.999",width:260,height:20}),(0,c.jsx)("rect",{x:180,y:270,width:260,height:20}),(0,c.jsx)("rect",{x:180,y:320,width:190,height:20}),(0,c.jsx)("rect",{x:390,y:320,width:50,height:20})]})})}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{}),(0,c.jsx)("g",{})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("b",{children:"It's nice to chat with somone"}),(0,c.jsx)("span",{children:"Pick a person from left menu and start your conversation"})]})]})}},9563:function(e,t,a){a.r(t),a.d(t,{SideBar:function(){return h}});var s=a(4942),c=a(2791),i=a(4717),n=a(3504),l=a(2703),r=a(9930),o=a(4498),d=a(184),h=function(e){var t=e.theme,a=e.toggleTheme,h=e.className,u=(0,c.useRef)(),x=(0,c.useRef)(),p=(0,i.useRouter)().pathName,m=(0,i.useAuth)(),_=m.logout,f=m.user,v=[{icon:"bx-user-circle",label:"Profile",to:"profile"},{icon:"bx-conversation",label:"Chats",to:"chats"},{icon:"bxs-user-detail",label:"Contacts",to:"contacts"},{icon:"bx-phone-call",label:"Calls",to:"calls"},{icon:"bx-cog",label:"Settings",to:"settings"}];(0,c.useLayoutEffect)((function(){var e,t=v.findIndex((function(e){return e.to===p.split("/")[1]})),a=matchMedia("(max-width: 768px)").matches,s=null===(e=u.current)||void 0===e?void 0:e.children[t],c=s.clientHeight,i=s.offsetTop,n=s.offsetLeft,l=s.clientWidth;a?(x.current.style.width="".concat(l,"px"),x.current.style.left="".concat(n,"px")):(x.current.style.height="".concat(c,"px"),x.current.style.top="".concat(i,"px"))}),[p]);var g=(0,c.useMemo)((function(){return matchMedia("(max-width: 768px)").matches?"top":"right"}),[]);return(0,d.jsxs)("div",{className:"".concat(o.default.sidebar," ").concat(h),children:[(0,d.jsx)("div",{className:o.default.logo,children:(0,d.jsx)("i",{className:"bxs-message-alt-detail"})}),(0,d.jsxs)("div",{className:o.default.nav_wrapper,ref:u,children:[v.map((function(e,t){var a=e.icon,c=e.label,i=e.to;return(0,d.jsxs)(n.OL,{to:i,className:function(e){var t=e.isActive;return(0,l.classNames)(o.default.nav_item,(0,s.Z)({},o.default.active,t))},children:[(0,d.jsx)("i",{className:(0,l.classNames)(a,o.default.nav_icon),id:"nav-".concat(t)}),(0,d.jsx)(r.Tooltip,{offset:20,placement:g,selector:"#nav-".concat(t),children:(0,d.jsx)("span",{children:c})})]},t)})),(0,d.jsx)("div",{className:(0,l.classNames)(o.default.nav_item,o.default.theme),children:(0,d.jsxs)("div",{className:o.default.nav_icon,children:[(0,d.jsx)("i",{id:"theme",className:"light"===t?"bx-moon":"bx-sun",onClick:a("light"===t?"dark":"light")}),(0,d.jsx)(r.Tooltip,{placement:g,selector:"#theme",offset:20,children:"light"===t?"Dark Mode":"Light Mode"})]})}),(0,d.jsx)("div",{id:"avatar",className:(0,l.classNames)(o.default.nav_item,o.default.profile),children:(0,d.jsx)(r.Avatar,{src:null===f||void 0===f?void 0:f.avatar,name:null===f||void 0===f?void 0:f.name,size:40,outline:!0,status:!0,userId:null===f||void 0===f?void 0:f.id})}),(0,d.jsxs)(r.DropDown,{selector:"#avatar",placement:"top",children:[[{label:"Profile",icon:"bx-user-circle",to:"profile"},{label:"Settings",icon:"bx-cog",to:"settings"},{label:"Change Password",icon:"bx-lock-open",to:"/change-password"}].map((function(e,t){var a=e.label,s=e.icon,c=e.to;return(0,d.jsx)(n.OL,{to:c,children:(0,d.jsxs)(r.DropDownItem,{className:"dropdown-option",children:[(0,d.jsx)("span",{children:a}),(0,d.jsx)("i",{className:s})]})},t)})),(0,d.jsxs)(r.DropDownItem,{onClick:_,className:"dropdown-option",children:[(0,d.jsx)("span",{children:"Logout"}),(0,d.jsx)("i",{className:"bx-log-out-circle"})]})]}),(0,d.jsx)("div",{ref:x,className:o.default.tab_indicator})]})]})};t.default=h},1752:function(e,t,a){a.r(t);var s=a(885),c=a(2791),i=a(9563),n=a(9604),l=a(7352),r=(a(9930),a(4717)),o=a(2703),d=a(6871),h=a(4411),u=a(184);t.default=function(){var e=(0,r.useAuth)(),t=e.chatId,a=e.isLoading,x=(0,o.localStorage)(),p=(0,c.useState)(),m=(0,s.Z)(p,2),_=m[0],f=m[1];(0,c.useEffect)((function(){var e,t=null!==(e=x.get("theme"))&&void 0!==e?e:"light";document.querySelector(":root").setAttribute("theme",t),f(t)}),[]);return(0,u.jsxs)(c.Fragment,{children:[(0,u.jsx)(i.SideBar,{className:(0,o.classNames)(t&&h.default.hide),theme:_,toggleTheme:function(e){return function(){document.querySelector(":root").setAttribute("theme",e),x.set("theme",e),f(e)}}}),(0,u.jsxs)("div",{className:h.default.app_layout,children:[(0,u.jsx)("div",{className:h.default.pages_container,children:(0,u.jsx)(d.j3,{})}),!a&&(0,u.jsx)(c.Fragment,{children:t?(0,u.jsx)(l.Chat,{}):(0,u.jsx)(n.EmptyChat,{})})]})]})}},4411:function(e,t,a){a.r(t),t.default={app_layout:"AppLayout_app_layout__4MY6X",pages_container:"AppLayout_pages_container__NUOnl",empty_chat:"AppLayout_empty_chat__n2twR",hide:"AppLayout_hide__CjBs-"}},7730:function(e,t,a){a.r(t),t.default={empty_chat:"EmptyChat_empty_chat__akg3l"}},4498:function(e,t,a){a.r(t),t.default={sidebar:"SideBar_sidebar__0nIPq",logo:"SideBar_logo__sX0Lu",nav_wrapper:"SideBar_nav_wrapper__n4wWR",nav_item:"SideBar_nav_item__0Lxi5",active:"SideBar_active__3jQdi",theme:"SideBar_theme__Ci0nU",nav_icon:"SideBar_nav_icon__WkDU2",tab_indicator:"SideBar_tab_indicator__dSGyQ",profile:"SideBar_profile__rqxDK"}}}]);
//# sourceMappingURL=1866.31cd3542.chunk.js.map