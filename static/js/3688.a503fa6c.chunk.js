"use strict";(self.webpackChunkreact_chat_app=self.webpackChunkreact_chat_app||[]).push([[3688,4675,3259,5790],{83688:function(t,s,a){a.r(s);var e=a(42982),r=a(70885),o=a(72791),n=a(59930),c=a(2703),i=a(14717),u=a(74675),l=a(73259),d=a(55790),m=a(80184);s.default=function(){var t=[{label:"Edit",icon:"bx-pencil"},{label:"Block",icon:"bx-block"},{label:"Delete",icon:"bx-trash"}],s=(0,i.useRouter)(),a=(0,o.useState)([]),p=(0,r.Z)(a,2),h=p[0],f=p[1];(0,o.useEffect)((function(){v()}),[]);var v=function(){var t=u.map((function(t){var s=l.filter((function(s){return s.name.charAt(0).toLowerCase()===t}));return{word:t.toUpperCase(),users:s.length>0?s.sort((function(t,s){return t.name.localeCompare(s.name)})):s}}));f([].concat((0,e.Z)(h),(0,e.Z)(t)))},g=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"4684";return function(){s.push({search:"userId=".concat(t)})}};return(0,m.jsx)("div",{id:"contacts-container",className:d.default.contacts_list,children:null===h||void 0===h?void 0:h.map((function(s,a){var e=s.word,r=s.users;return r.length>0&&(0,m.jsxs)(o.Fragment,{children:[(0,m.jsx)("div",{className:d.default.title,children:(0,m.jsx)("b",{children:e})}),r.map((function(s,a){var r=s.name,i=s.profile,u=s.status;return(0,m.jsxs)(o.Fragment,{children:[(0,m.jsxs)("div",{className:(0,c.classNames)(d.default.contact_card),children:[(0,m.jsxs)("div",{className:d.default.user,onClick:g(),children:[(0,m.jsx)(n.Avatar,{src:i,userName:r,size:35,status:u}),(0,m.jsx)("span",{children:r})]}),(0,m.jsx)("i",{className:"bx-dots-vertical-rounded",id:"".concat(e,"-").concat(a)})]}),(0,m.jsx)(n.DropDown,{placement:"bottom",selector:"#".concat(e,"-").concat(a),children:t.map((function(t,s){var a=t.icon,e=t.label;return(0,m.jsxs)(n.DropDown.Item,{className:d.default.contact_option,children:[(0,m.jsx)("span",{children:e}),(0,m.jsx)("i",{className:a})]},s)}))})]},a)}))]},a)}))})}},55790:function(t,s,a){a.r(s),s.default={contacts_list:"Contacts_contacts_list__70eS1",title:"Contacts_title__CFJgb",contact_card:"Contacts_contact_card__e3hM8",user:"Contacts_user__9UUPA",contact_option:"Contacts_contact_option__v54NK"}},74675:function(t){t.exports=JSON.parse('["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]')},73259:function(t){t.exports=JSON.parse('[{"id":1,"name":"Adam Zampa","status":true,"profile":"https://themesbrand.com/doot/layouts/assets/images/users/avatar-1.jpg"},{"id":2,"name":"Bella Cote","status":true,"profile":"https://themesbrand.com/doot/layouts/assets/images/users/avatar-2.jpg"},{"id":3,"name":"Floria Underhill","status":true,"profile":"https://themesbrand.com/doot/layouts/assets/images/users/avatar-3.jpg"},{"id":4,"name":"Fidel Pinard","status":false,"profile":""},{"id":5,"name":"Fenrick Beriwck","status":false,"profile":"https://themesbrand.com/doot/layouts/assets/images/users/avatar-6.jpg"},{"id":6,"name":"Iris Lewis","status":true,"profile":"https://themesbrand.com/doot/layouts/assets/images/users/avatar-7.jpg"},{"id":7,"name":"John Foss","status":true,"profile":"https://themesbrand.com/doot/layouts/assets/images/users/avatar-8.jpg"},{"id":8,"name":"Kathryn Swarey","status":true,"profile":"https://themesbrand.com/doot/layouts/assets/images/users/avatar-9.jpg"},{"id":9,"name":"Nicholas Staten","status":true,"profile":"https://themesbrand.com/doot/layouts/assets/images/users/avatar-10.jpg"},{"id":10,"name":"Patrick Hendricks","status":true,"profile":"https://themesbrand.com/doot/layouts/assets/images/users/avatar-11.jpg","messagecount":18},{"id":11,"name":"Robert Ledonne","status":true,"profile":"https://themesbrand.com/doot/layouts/assets/images/users/avatar-12.jpg"},{"id":12,"name":"Dobert Ledonne","status":true,"profile":"https://themesbrand.com/doot/layouts/assets/images/users/avatar-5.jpg"}]')}}]);
//# sourceMappingURL=3688.a503fa6c.chunk.js.map