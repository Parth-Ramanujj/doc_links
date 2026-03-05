(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18566,(e,t,r)=>{t.exports=e.r(76562)},91137,89265,e=>{"use strict";e.i(47167);var t=e.i(43476),r=e.i(71645),a=e.i(18566),o=e.i(3215);let i={register:async e=>(await o.default.post("/auth/register",e)).data,login:async(e,t)=>{let{user:r,accessToken:a}=(await o.default.post("/auth/login",{email:e,password:t})).data;return(0,o.setAccessToken)(a),{user:r,accessToken:a}},logout:async()=>{(0,o.clearTokens)();try{await o.default.post("/auth/logout")}catch(e){console.error("Logout error:",e)}},getCurrentUser:async()=>(await o.default.get("/auth/me")).data.user,forgotPassword:async e=>await o.default.post("/auth/forgot-password",{email:e}),resetPassword:async(e,t,r)=>await o.default.post("/auth/reset-password",{token:e,newPassword:t,confirmPassword:r}),changePassword:async(e,t)=>await o.default.post("/auth/change-password",{currentPassword:e,newPassword:t}),sendOTP:async e=>await o.default.post("/auth/send-otp",e),verifyOTP:async(e,t,r="verification")=>(await o.default.post("/auth/verify-otp",{email:e,otp:t,type:r})).data,resendVerification:async e=>await o.default.post("/auth/resend-verification",{email:e}),refreshToken:async()=>{let{accessToken:e}=(await o.default.post("/auth/refresh")).data;return(0,o.setAccessToken)(e),e},googleLogin:async e=>{let{user:t,accessToken:r,isNewUser:a}=(await o.default.post("/auth/google",{credential:e})).data;return(0,o.setAccessToken)(r),{user:t,accessToken:r,isNewUser:a}},updatePhone:async e=>(await o.default.put("/auth/update-phone",{phone:e})).data,updateProfile:async e=>(await o.default.put("/auth/profile",e)).data,registerWithPayment:async(e,t)=>(await o.default.post("/auth/register-with-payment",{...e,planSlug:t})).data,verifyRegistrationPayment:async e=>{let{user:t,accessToken:r,subscription:a}=(await o.default.post("/auth/verify-registration-payment",{orderId:e.razorpay_order_id,paymentId:e.razorpay_payment_id,signature:e.razorpay_signature})).data;return(0,o.setAccessToken)(r),{user:t,accessToken:r,subscription:a}}};e.s(["default",0,i],89265);var s=e.i(10936);let n=(0,r.createContext)(null);function l({children:e}){let[l,c]=(0,r.useState)(null),[d,u]=(0,r.useState)(!0),[f,p]=(0,r.useState)(null),[m,y]=(0,r.useState)(null),h=(0,a.useRouter)(),g=(0,r.useCallback)(async()=>{try{if(!(0,o.getAccessToken)())return void u(!1);let e=await i.getCurrentUser();c(e)}catch(e){console.error("Failed to load user:",e),(0,o.clearTokens)(),c(null)}finally{u(!1)}},[]);(0,r.useEffect)(()=>{g()},[g]);let b=e=>m&&C(m,e)?(y(null),m):(y(null),O(e)),v=async(e,t,r=null)=>{try{p(null);let{user:a}=await i.login(e,t);c(a);let o=r&&C(r,a.role)?r:b(a.role);return h.push(o),a}catch(e){throw p(e.message),e}},w=async e=>{try{return p(null),await i.register(e)}catch(e){throw p(e.message),e}},x=async(e,t=null)=>{try{p(null);let{user:r,isNewUser:a}=await i.googleLogin(e);if(c(r),r.phone){let e=t&&C(t,r.role)?t:b(r.role);h.push(e)}return{user:r,isNewUser:a}}catch(e){throw p(e.message),e}},_=async e=>{try{return p(null),await i.updatePhone(e),c(t=>({...t,phone:e})),!0}catch(e){throw p(e.message),e}},k=async()=>{y(null);try{await i.logout()}finally{c(null),h.push("/login")}},E=async()=>{try{let e=await i.getCurrentUser();return c(e),e}catch(e){throw console.error("Failed to refresh user:",e),e}},C=(e,t)=>{if(!e||!t)return!1;let r=e.startsWith("/")?e:`/${e}`,a=t.toLowerCase().trim();for(let[e,t]of Object.entries({"/clinic":"clinic","/patient":"patient","/provider":"doctor","/doctor":"doctor","/hospital":"hospital","/lab":"lab","/admin":"admin"}))if(r===e||r.startsWith(`${e}/`))return a===t;return!1},O=e=>{if(!e)return"/";let t=e.toLowerCase().trim(),r={patient:"/patient",doctor:"/provider",hospital:"/hospital",clinic:"/clinic",lab:"/lab",admin:"/admin"}[t];if(r)return r;let a=s.DASHBOARD_NAV[t];return a&&a.length>0?a[0].href:"/"},I=!!l,A=["doctor","hospital","clinic","lab"].includes(l?.role),T=l?.role==="admin";return(0,t.jsx)(n.Provider,{value:{user:l,loading:d,error:f,isAuthenticated:I,isProvider:A,isAdmin:T,login:v,googleLogin:x,register:w,logout:k,updateUser:e=>{c(t=>({...t,...e}))},updateUserPhone:_,refreshUser:E,hasRole:e=>!!l&&(Array.isArray(e)?e:[e]).includes(l.role),getDashboardPath:O,getRedirectUrl:b,setLoginRedirect:e=>{y(e)},isRedirectAllowedForRole:C,clearError:()=>p(null)},children:e})}function c(){let e=(0,r.useContext)(n);if(!e)throw Error("useAuth must be used within an AuthProvider");return e}e.s(["AuthProvider",()=>l,"default",0,n,"useAuth",()=>c],91137)},5766,e=>{"use strict";let t,r;var a,o=e.i(71645);let i={data:""},s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",a="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?c(s,i):i+"{"+c(s,"k"==i[1]?"":t)+"}":"object"==typeof s?a+=c(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=c.p?c.p(i,s):i+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},d={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function f(e){let t,r,a=this||{},o=e.call?e(a.p):e;return((e,t,r,a,o)=>{var i;let f=u(e),p=d[f]||(d[f]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(f));if(!d[p]){let t=f!==e?e:(e=>{let t,r,a=[{}];for(;t=s.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);d[p]=c(o?{["@keyframes "+p]:t}:t,r?"":"."+p)}let m=r&&d.g?d.g:null;return r&&(d.g=d[p]),i=d[p],m?t.data=t.data.replace(m,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),p})(o.unshift?o.raw?(t=[].slice.call(arguments,1),r=a.p,o.reduce((e,a,o)=>{let i=t[o];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):o.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):o,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}f.bind({g:1});let p,m,y,h=f.bind({k:1});function g(e,t){let r=this||{};return function(){let a=arguments;function o(i,s){let n=Object.assign({},i),l=n.className||o.className;r.p=Object.assign({theme:m&&m()},n),r.o=/ *go\d+/.test(l),n.className=f.apply(r,a)+(l?" "+l:""),t&&(n.ref=s);let c=e;return e[0]&&(c=n.as||e,delete n.as),y&&c[0]&&y(n),p(c,n)}return t?t(o):o}}var b=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),w=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},x="default",_=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return _(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},k=[],E={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},O=(e,t=x)=>{C[t]=_(C[t]||E,e),k.forEach(([e,r])=>{e===t&&r(C[t])})},I=e=>Object.keys(C).forEach(t=>O(e,t)),A=(e=x)=>t=>{O(t,e)},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=(e={},t=x)=>{let[r,a]=(0,o.useState)(C[t]||E),i=(0,o.useRef)(C[t]);(0,o.useEffect)(()=>(i.current!==C[t]&&a(C[t]),k.push([t,a]),()=>{let e=k.findIndex(([e])=>e===t);e>-1&&k.splice(e,1)}),[t]);let s=r.toasts.map(t=>{var r,a,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...r,toasts:s}},j=e=>(t,r)=>{let a,o=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||v()}))(t,e,r);return A(o.toasterId||(a=o.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===a))))({type:2,toast:o}),o.id},S=(e,t)=>j("blank")(e,t);S.error=j("error"),S.success=j("success"),S.loading=j("loading"),S.custom=j("custom"),S.dismiss=(e,t)=>{let r={type:3,toastId:e};t?A(t)(r):I(r)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let r={type:4,toastId:e};t?A(t)(r):I(r)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,r)=>{let a=S.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?b(t.success,e):void 0;return o?S.success(o,{id:a,...r,...null==r?void 0:r.success}):S.dismiss(a),e}).catch(e=>{let o=t.error?b(t.error,e):void 0;o?S.error(o,{id:a,...r,...null==r?void 0:r.error}):S.dismiss(a)}),e};var L=1e3,$=(e,t="default")=>{let{toasts:r,pausedAt:a}=P(e,t),i=(0,o.useRef)(new Map).current,s=(0,o.useCallback)((e,t=L)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,o.useEffect)(()=>{if(a)return;let e=Date.now(),o=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&S.dismiss(r.id);return}return setTimeout(()=>S.dismiss(r.id,t),a)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,o.useCallback)(A(t),[t]),l=(0,o.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,o.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,o.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:i}=t||{},s=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[r]);return(0,o.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)s(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},M=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,N=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,R=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,H=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${R} 1s linear infinite;
`,q=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,U=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,B=g("div")`
  position: absolute;
`,V=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,J=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?o.createElement(J,null,t):t:"blank"===r?null:o.createElement(V,null,o.createElement(H,{...a}),"loading"!==r&&o.createElement(B,null,"error"===r?o.createElement(N,{...a}):o.createElement(U,{...a})))},Y=g("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Z=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,G=o.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,o]=w()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},s=o.createElement(K,{toast:e}),n=o.createElement(Z,{...e.ariaProps},b(e.message,e));return o.createElement(Y,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:s,message:n}):o.createElement(o.Fragment,null,s,n))});a=o.createElement,c.p=void 0,p=a,m=void 0,y=void 0;var Q=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let s=o.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return o.createElement("div",{ref:s,className:t,style:r},i)},X=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:s,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=$(r,s);return o.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let s,n,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(s=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:w()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...n});return o.createElement(Q,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?X:"",style:u},"custom"===r.type?b(r.message,r):i?i(r):o.createElement(G,{toast:r,position:l}))}))};e.s(["CheckmarkIcon",()=>U,"ErrorIcon",()=>N,"LoaderIcon",()=>H,"ToastBar",()=>G,"ToastIcon",()=>K,"Toaster",()=>ee,"default",()=>S,"resolveValue",()=>b,"toast",()=>S,"useToaster",()=>$,"useToasterStore",()=>P],5766)},8341,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={cancelIdleCallback:function(){return s},requestIdleCallback:function(){return i}};for(var o in a)Object.defineProperty(r,o,{enumerable:!0,get:a[o]});let i="u">typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},s="u">typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},79520,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return v},handleClientScriptLoad:function(){return h},initScriptLoader:function(){return g}};for(var o in a)Object.defineProperty(r,o,{enumerable:!0,get:a[o]});let i=e.r(55682),s=e.r(90809),n=e.r(43476),l=i._(e.r(74080)),c=s._(e.r(71645)),d=e.r(42732),u=e.r(22737),f=e.r(8341),p=new Map,m=new Set,y=e=>{let{src:t,id:r,onLoad:a=()=>{},onReady:o=null,dangerouslySetInnerHTML:i,children:s="",strategy:n="afterInteractive",onError:c,stylesheets:d}=e,f=r||t;if(f&&m.has(f))return;if(p.has(t)){m.add(f),p.get(t).then(a,c);return}let y=()=>{o&&o(),m.add(f)},h=document.createElement("script"),g=new Promise((e,t)=>{h.addEventListener("load",function(t){e(),a&&a.call(this,t),y()}),h.addEventListener("error",function(e){t(e)})}).catch(function(e){c&&c(e)});i?(h.innerHTML=i.__html||"",y()):s?(h.textContent="string"==typeof s?s:Array.isArray(s)?s.join(""):"",y()):t&&(h.src=t,p.set(t,g)),(0,u.setAttributesFromProps)(h,e),"worker"===n&&h.setAttribute("type","text/partytown"),h.setAttribute("data-nscript",n),d&&(e=>{if(l.default.preinit)return e.forEach(e=>{l.default.preinit(e,{as:"style"})});if("u">typeof window){let t=document.head;e.forEach(e=>{let r=document.createElement("link");r.type="text/css",r.rel="stylesheet",r.href=e,t.appendChild(r)})}})(d),document.body.appendChild(h)};function h(e){let{strategy:t="afterInteractive"}=e;"lazyOnload"===t?window.addEventListener("load",()=>{(0,f.requestIdleCallback)(()=>y(e))}):y(e)}function g(e){e.forEach(h),[...document.querySelectorAll('[data-nscript="beforeInteractive"]'),...document.querySelectorAll('[data-nscript="beforePageRender"]')].forEach(e=>{let t=e.id||e.getAttribute("src");m.add(t)})}function b(e){let{id:t,src:r="",onLoad:a=()=>{},onReady:o=null,strategy:i="afterInteractive",onError:s,stylesheets:u,...p}=e,{updateScripts:h,scripts:g,getIsSsr:b,appDir:v,nonce:w}=(0,c.useContext)(d.HeadManagerContext);w=p.nonce||w;let x=(0,c.useRef)(!1);(0,c.useEffect)(()=>{let e=t||r;x.current||(o&&e&&m.has(e)&&o(),x.current=!0)},[o,t,r]);let _=(0,c.useRef)(!1);if((0,c.useEffect)(()=>{if(!_.current){if("afterInteractive"===i)y(e);else"lazyOnload"===i&&("complete"===document.readyState?(0,f.requestIdleCallback)(()=>y(e)):window.addEventListener("load",()=>{(0,f.requestIdleCallback)(()=>y(e))}));_.current=!0}},[e,i]),("beforeInteractive"===i||"worker"===i)&&(h?(g[i]=(g[i]||[]).concat([{id:t,src:r,onLoad:a,onReady:o,onError:s,...p,nonce:w}]),h(g)):b&&b()?m.add(t||r):b&&!b()&&y({...e,nonce:w})),v){if(u&&u.forEach(e=>{l.default.preinit(e,{as:"style"})}),"beforeInteractive"===i)if(!r)return p.dangerouslySetInnerHTML&&(p.children=p.dangerouslySetInnerHTML.__html,delete p.dangerouslySetInnerHTML),(0,n.jsx)("script",{nonce:w,dangerouslySetInnerHTML:{__html:`(self.__next_s=self.__next_s||[]).push(${JSON.stringify([0,{...p,id:t}])})`}});else return l.default.preload(r,p.integrity?{as:"script",integrity:p.integrity,nonce:w,crossOrigin:p.crossOrigin}:{as:"script",nonce:w,crossOrigin:p.crossOrigin}),(0,n.jsx)("script",{nonce:w,dangerouslySetInnerHTML:{__html:`(self.__next_s=self.__next_s||[]).push(${JSON.stringify([r,{...p,id:t}])})`}});"afterInteractive"===i&&r&&l.default.preload(r,p.integrity?{as:"script",integrity:p.integrity,nonce:w,crossOrigin:p.crossOrigin}:{as:"script",nonce:w,crossOrigin:p.crossOrigin})}return null}Object.defineProperty(b,"__nextScript",{value:!0});let v=b;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)}]);