"use strict";(self.webpackChunkreact_chat_app=self.webpackChunkreact_chat_app||[]).push([[688,790,343],{83688:function(t,n,e){e.r(n);var a=e(42982),c=e(74165),r=e(15861),s=e(70885),o=e(72791),i=e(59930),u=e(2703),l=e(14717),d=e(25343),p=e(55790),f=e(80184),m=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];n.default=function(){var t=(0,l.useRouter)(),n=(0,o.useState)([]),e=(0,s.Z)(n,2),h=e[0],_=e[1];(0,o.useEffect)((function(){v()}),[]);var v=function(){var t=(0,r.Z)((0,c.Z)().mark((function t(){var n,e;return(0,c.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,d.getContacts)();case 3:n=t.sent,e=n.data.data,x(e),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),(0,i.Toast)({type:"error",message:null===t.t0||void 0===t.t0?void 0:t.t0.message});case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(){return t.apply(this,arguments)}}(),x=function(t){var n=m.map((function(n){var e=t.filter((function(t){return t.user.name.charAt(0).toLowerCase()===n}));return{word:n.toUpperCase(),users:e.length>0?e.sort((function(t,n){return t.user.name.localeCompare(n.user.name)})):e}}));_([].concat((0,a.Z)(h),(0,a.Z)(n)))};return(0,f.jsx)("div",{id:"contacts-container",className:p.default.contacts_list,children:null===h||void 0===h?void 0:h.map((function(n,e){var a=n.word,c=n.users;return c.length>0&&(0,f.jsxs)(o.Fragment,{children:[(0,f.jsx)("div",{className:p.default.title,children:(0,f.jsx)("b",{children:a})}),c.map((function(n,e){var c=n.user,r=c.name,s=c.avatar,l=c.status,d=n.chatId;n._id;return(0,f.jsxs)(o.Fragment,{children:[(0,f.jsxs)("div",{className:(0,u.classNames)(p.default.contact_card),children:[(0,f.jsxs)("div",{className:p.default.user,onClick:function(){return function(n){t.push("/chats/".concat(n))}(d)},children:[(0,f.jsx)(i.Avatar,{src:s,name:r,size:35,status:l}),(0,f.jsx)("span",{children:r})]}),(0,f.jsx)("i",{className:"bx-dots-vertical-rounded",id:"".concat(a,"-").concat(e)})]}),(0,f.jsxs)(i.DropDown,{placement:"bottom",selector:"#".concat(a,"-").concat(e),children:[(0,f.jsxs)(i.DropDown.Item,{className:"dropdown-option",children:[(0,f.jsx)("span",{children:"Block"}),(0,f.jsx)("i",{className:"bx-block"})]}),(0,f.jsxs)(i.DropDown.Item,{className:"dropdown-option",children:[(0,f.jsx)("span",{children:"Remove"}),(0,f.jsx)("i",{className:"bx-trash"})]})]})]},e)}))]},e)}))})}},25343:function(t,n,e){e.r(n),e.d(n,{createContact:function(){return s},deleteContact:function(){return o},getContacts:function(){return r}});var a=e(39599),c=e(40077),r=function(t){return(0,a.axios)({method:"get",url:c.endpoints.contact.getContact,params:t})},s=function(t){return(0,a.axios)({method:"post",url:c.endpoints.contact.createContact,data:t})},o=function(t){return(0,a.axios)({method:"delete",url:"".concat(c.endpoints.contact.deleteContact,"/").concat(t)})}},55790:function(t,n,e){e.r(n),n.default={contacts_list:"Contacts_contacts_list__70eS1",title:"Contacts_title__CFJgb",contact_card:"Contacts_contact_card__e3hM8",user:"Contacts_user__9UUPA",contact_option:"Contacts_contact_option__v54NK"}}}]);
//# sourceMappingURL=688.0e53f8c9.chunk.js.map