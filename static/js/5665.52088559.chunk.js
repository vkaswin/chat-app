"use strict";(self.webpackChunkreact_chat_app=self.webpackChunkreact_chat_app||[]).push([[5665,3693],{5665:function(a,e,s){s.r(e);var n=s(885),r=s(2791),t=s(9930),c=s(2703),i=s(3693),u=s(184);e.default=function(a){var e,s=a.isOpen,l=a.toggle,o=a.message,d=(0,r.useState)(),p=(0,n.Z)(d,2),f=p[0],_=p[1],h=(0,r.useMemo)((function(){return o.hasOwnProperty("reactions")?0===f||f?o.reactions[f].users:o.reactions.reduce((function(a,e){var s=e.users;return a.concat(s)}),[]):[]}),[f,o]);return(0,u.jsx)(t.Modal,{isOpen:s,toggle:l,children:(0,u.jsxs)("div",{className:i.default.popup,children:[(0,u.jsxs)("div",{className:i.default.reactions,children:[(0,u.jsx)("div",{className:i.default.all,onClick:function(){return _()},children:(0,u.jsx)("span",{children:"All"})}),null===o||void 0===o||null===(e=o.reactions)||void 0===e?void 0:e.map((function(a,e){var s=a.reaction,n=a.total;return(0,u.jsxs)("div",{className:i.default.card,onClick:function(){return _(e)},children:[(0,u.jsx)("img",{src:(0,c.getReactionUrl)(s)}),(0,u.jsx)("span",{children:n})]},e)}))]}),(0,u.jsx)("div",{className:i.default.users,children:h.map((function(a,e){var s=a.avatar,n=(a.email,a.id),r=a.name,c=a.status;return(0,u.jsxs)("div",{className:i.default.card,children:[(0,u.jsx)(t.Avatar,{name:r,size:40,status:c,userId:n,src:s}),(0,u.jsx)("span",{children:r})]},e)}))})]})})}},3693:function(a,e,s){s.r(e),e.default={popup:"ReactionPopup_popup__yt4AZ",reactions:"ReactionPopup_reactions__3HDB6",all:"ReactionPopup_all__nfaPI",card:"ReactionPopup_card__P+lgl",users:"ReactionPopup_users__81RJu"}}}]);
//# sourceMappingURL=5665.52088559.chunk.js.map