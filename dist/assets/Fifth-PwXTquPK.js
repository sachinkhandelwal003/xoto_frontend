import{u,r as n,j as e,M as v,C as g,b as f,H as w}from"./index-Dp8vyqmQ.js";import{w as j}from"./waveint2-MexPUdIf.js";import{w as b}from"./wave2-BEYQ7sjW.js";const s=[{title:"projects.kitchen",location:"projects.kitchenLocation",img:"https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200"},{title:"projects.penthouse",location:"projects.penthouseLocation",img:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200"},{title:"projects.villa",location:"projects.villaLocation",img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"}];function C(){const{t}=u("interior5"),[a,o]=n.useState(0),[r,m]=n.useState(!1),i=n.useRef(null),[l,d]=n.useState(0),p=()=>o(c=>(c+1)%s.length),x=()=>o(c=>(c-1+s.length)%s.length);n.useEffect(()=>{if(!r)return i.current=setInterval(p,2e3),()=>clearInterval(i.current)},[r]);const h=c=>(a+c+s.length)%s.length;return e.jsxs("div",{className:"relative overflow-hidden pb-24 bg-[var(--color-body)]",children:[e.jsx("div",{className:"absolute left-0 w-full z-0 pointer-events-none select-none -bottom-20",children:e.jsx("img",{src:j,alt:"wave-bg",className:"w-full object-cover"})}),e.jsxs("div",{className:"mx-auto pt-12 relative z-10 px-4",children:[e.jsxs("div",{className:"flex flex-col lg:flex-row gap-8 px-6 lg:px-10 mb-16 text-center lg:text-left items-center lg:items-start w-full",children:[e.jsxs("h1",{className:"text-3xl sm:text-4xl lg:text-5xl heading-dark-1 text-black max-w-xl",children:[t("showcase.title")," ",e.jsx("br",{}),e.jsx("span",{children:t("showcase.subtitle")})]}),e.jsx("p",{className:`\r
    font-medium\r
    text-[24px]\r
    leading-[33px]\r
    tracking-[0]\r
    text-[#547593]\r
    max-w-[567px]\r
    text-left\r
    ml-auto\r
  `,children:t("showcase.description")})]}),e.jsxs("div",{className:"relative w-full overflow-hidden",onMouseEnter:()=>m(!0),onMouseLeave:()=>m(!1),children:[e.jsxs("div",{className:"relative flex justify-center items-center h-[450px]",children:[e.jsx("div",{className:"hidden md:block absolute -left-[5%] w-[350px] opacity-70 overflow-hidden",children:e.jsx("img",{src:s[h(-1)].img,alt:t(s[h(-1)].title),className:"h-64 w-full object-cover rounded-r-2xl"})}),e.jsxs("div",{className:"absolute w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-30",children:[e.jsx("img",{src:s[a].img,alt:t(s[a].title),className:"h-[400px] w-full object-cover"}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-6",children:[e.jsx("h3",{className:`\r
                  font-semibold\r
                  text-[40px]\r
                  leading-[36px]\r
                  tracking-[0px]\r
                  text-white\r
                  text-left`,children:t(s[a].title)}),e.jsxs("p",{className:`\r
                  flex items-center gap-2\r
                  font-medium\r
                  text-[24px]\r
                  leading-[23px]\r
                  text-white\r
                  mt-2\r
                  py-4              `,children:[e.jsx(v,{size:18,className:"text-white shrink-0"}),t(s[a].location)]})]})]}),e.jsx("div",{className:"hidden md:block absolute -right-[5%] w-[350px] opacity-70 overflow-hidden",children:e.jsx("img",{src:s[h(1)].img,alt:t(s[h(1)].title),className:"h-64 w-full object-cover rounded-l-2xl"})})]}),e.jsxs("div",{className:"flex justify-center gap-3 mt-8",children:[e.jsx("button",{onClick:x,className:`\r
              p-3\r
              border\r
              rounded-sm\r
              bg-white\r
              text-[#5C039B]\r
              transition-colors duration-200\r
              hover:bg-[#5C039B]\r
              hover:text-white `,children:e.jsx(g,{className:"w-5 h-5"})}),e.jsx("button",{onClick:p,className:`    p-3\r
    border\r
    rounded-sm\r
    bg-white\r
    text-[#5C039B]\r
    transition-colors duration-200\r
    hover:bg-[#5C039B]\r
    hover:text-white`,children:e.jsx(f,{className:"w-5 h-5 "})})]})]})]})]})}const I="/assets/hello-BuWvljVd.jpg";function B(){const{t}=u("interior6"),a=n.useRef(null),[o,r]=n.useState(0),m=[{title:"cards.title1",text:"cards.text",name:"names.shubham",location:"locations.pune",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"},{title:"cards.title1",text:"cards.text",name:"names.punit",location:"locations.pune",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"},{title:"cards.title2",text:"cards.text",name:"names.harsh",location:"locations.bangalore",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"},{title:"cards.title1",text:"cards.text",name:"names.shubham",location:"locations.pune",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"},{title:"cards.title3",text:"cards.text",name:"names.jaiMathur",location:"locations.pune",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"},{title:"cards.title3",text:"cards.text",name:"names.madhur",location:"locations.pune",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"},{title:"cards.title3",text:"cards.text",name:"names.avn",location:"locations.pune",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"},{title:"cards.title3",text:"cards.text",name:"names.sam",location:"locations.pune",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"}],i=l=>{if(!a.current)return;const d=a.current.firstChild.offsetWidth+24;a.current.scrollBy({left:l*d,behavior:"smooth"})};return e.jsxs("section",{className:"relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 w-full flex flex-col items-center pt-12 md:pt-16",children:[e.jsxs("div",{className:"relative w-full z-10 px-4 sm:px-10 md:px-20",children:[e.jsx("h2",{className:"text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center card-heading-1",children:t("heading")}),e.jsx("div",{className:"mt-5 relative flex items-center",children:e.jsx("div",{ref:a,className:"flex overflow-x-scroll gap-4 sm:gap-6 snap-x snap-mandatory scroll-smooth w-full scrollbar-hide",children:m.map((l,d)=>e.jsxs("div",{className:`\r
                  snap-start\r
                  bg-white\r
                  flex-none\r
                  w-[260px] sm:w-[300px] md:w-[320px]   /* ✅ FIXED WIDTH */\r
                  min-h-[380px]                         /* ✅ FIXED HEIGHT */\r
                  rounded-2xl\r
                  p-6\r
                  text-center\r
                  shadow-[0_4px_15px_rgba(92,3,155,0.2)]\r
                  hover:shadow-[0_8px_25px_rgba(92,3,155,0.3)]\r
                  hover:-translate-y-2\r
                  transition-transform\r
                `,children:[e.jsx("img",{src:l.image,alt:l.name,className:"w-20 h-20 rounded-full mx-auto mb-4"}),e.jsx("h3",{className:"font-semibold text-gray-900",children:t(l.title)}),e.jsx("p",{className:"text-sm text-[#547593] mt-2 leading-relaxed",children:t(l.text)}),e.jsx("div",{className:"flex justify-center gap-1 my-3",children:[...Array(5)].map((p,x)=>e.jsx(w,{className:`w-4 h-4 ${x<4?"fill-yellow-400 text-yellow-400":"text-gray-300"}`},x))}),e.jsx("div",{className:"flex justify-center py-3 mt-1 mb-4",children:e.jsx("div",{className:"h-[4px] w-[213px] rounded-full bg-gradient-to-r from-[#03A4F4] to-[#64EF0A]"})}),e.jsx("p",{className:"font-medium text-gray-900",children:t(l.name)}),e.jsx("p",{className:"text-sm text-gray-500",children:t(l.location)})]},d))})}),e.jsxs("div",{className:"flex justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 md:mt-12 mb-4 z-10 relative",children:[e.jsx("button",{onClick:()=>{i(-1),r("left")},onMouseLeave:()=>r(null),className:`p-3 rounded-sm border transition
      ${o==="left"?"bg-[var(--color-primary)] text-white border-transparent":"bg-white border-gray-300 hover:bg-[var(--color-primary)] hover:text-white"}`,children:e.jsx(g,{className:"w-5 sm:w-7 h-5 sm:h-7"})}),e.jsx("button",{onClick:()=>{i(1),r("right")},onMouseLeave:()=>r(null),className:`p-3 rounded-sm border transition
      ${o==="right"?"bg-[var(--color-primary)] text-white border-transparent":"bg-white border-gray-300 hover:bg-[var(--color-primary)] hover:text-white"}`,children:e.jsx(f,{className:"w-5 sm:w-7 h-5 sm:h-7"})})]})]}),e.jsx("div",{className:"absolute left-0 w-full z-0 -bottom-110",children:e.jsx("img",{src:b,alt:"wave-bg",className:"w-full object-cover"})})]})}export{C as D,B as T,I as h};
