"use strict";(self.webpackChunkreact_chat_app=self.webpackChunkreact_chat_app||[]).push([[6467,7181],{6467:function(e,a,r){r.r(a);var i=r(885),s=r(2791),l=r(2015),n=r(9930),t=r(2703),o=r(4717),d=r(7181),c=r(3504),u=r(184);a.default=function(){var e=(0,l.cI)(),a=e.register,r=e.handleSubmit,h=e.reset,g=e.formState.errors,m=(0,o.useRouter)(),p=(0,s.useState)(!1),_=(0,i.Z)(p,2),f=_[0],v=_[1];(0,s.useEffect)((function(){var e,a=null!==(e=(0,t.getCookie)("login-cache"))&&void 0!==e?e:{},r=a.email,i=void 0===r?null:r,s=a.password,l=void 0===s?null:s;i&&l&&(h({email:i,password:l}),v(!0))}),[]);return(0,u.jsxs)("div",{children:[(0,u.jsxs)("div",{className:d.default.login_title,children:[(0,u.jsx)("b",{children:"Welcome Back! \ud83d\udc4b"}),(0,u.jsx)("span",{children:"Sign in to continue"})]}),(0,u.jsxs)("div",{className:d.default.login_field,children:[(0,u.jsx)(n.Input,{label:"Email",placeholder:"Enter email",register:a("email",{required:!0,pattern:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/}),error:null===g||void 0===g?void 0:g.email,message:{required:"Please enter email id",pattern:"Invalid email id"}}),(0,u.jsx)(n.PasswordInput,{label:"Password",register:a("password",{required:!0}),error:g.password,message:{required:"Please enter password"}}),(0,u.jsx)(n.CheckBox,{label:"Remeber Me",name:"rememberMe",onChange:function(e){var a=e.target.checked;v(a)},checked:f}),(0,u.jsx)("button",{className:"btn-primary",onClick:r((function(e){var a=e.email,r=e.password;f&&(0,t.setCookie)({name:"login-cache",value:{email:a,password:r},days:14}),m.push("/chats")})),children:"Log In"}),(0,u.jsxs)("div",{className:d.default.register,children:[(0,u.jsx)("span",{children:"Dont't have an account ?"}),(0,u.jsx)(c.OL,{to:"/auth/register",children:(0,u.jsx)("span",{children:"Register"})})]})]})]})}},7181:function(e,a,r){r.r(a),a.default={login_title:"Login_login_title__DtVsO",login_field:"Login_login_field__Uyc8w",register:"Login_register__2QbhW"}}}]);
//# sourceMappingURL=6467.c5d15ba7.chunk.js.map