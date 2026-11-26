"use strict";
document.addEventListener("DOMContentLoaded",()=>{
 const store=createCatalogue(sampleProducts()),get=id=>document.getElementById(id),key="productverse-cart-v1",themeKey="productverse-theme-v1",money=c=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(c/100);
 let cart=[];try{cart=store.normalize(JSON.parse(localStorage.getItem(key)||"[]"));}catch{}
 const n=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
 const btn=(text,fn,cls)=>{const b=n("button",text,cls);b.type="button";b.addEventListener("click",fn);return b;};
 const notify=text=>{get("notice").textContent=text;};
 function save(){try{localStorage.setItem(key,JSON.stringify(cart));}catch{notify("Cart storage unavailable; changes are temporary.");}renderCart();}
 function renderProducts(){const list=get("productContainer"),rows=store.filter(get("search").value,get("category").value,get("sort").value);list.replaceChildren();get("results").textContent=rows.length+" products";if(!rows.length)list.append(n("p","No products match these filters."));
 for(const p of rows){const card=n("article",undefined,"product-card"),art=n("div",({Electronics:"EL",Clothing:"CL",Books:"BK"})[p.category],"product-art"),info=n("div",undefined,"product-info");art.dataset.category=p.category;art.setAttribute("aria-hidden","true");
 const details=n("details"),dl=n("dl");details.append(n("summary","View specifications"));for(const [k,v] of p.getDetails()){const row=n("div");row.append(n("dt",k),n("dd",v));dl.append(row);}details.append(dl);
 info.append(n("p",p.category,"category"),n("h3",p.name),n("p",p.description,"description"),n("strong",money(p.price),"price"),details,btn("Add to cart",()=>{cart=store.change(cart,p.id,1);save();notify(p.name+" added.");}));card.append(art,info);list.append(card);}}
 function renderCart(){const list=get("items"),s=store.totals(cart);list.replaceChildren();get("count").textContent=s.count;get("total").textContent=money(s.total);get("checkout").disabled=!s.count;if(!cart.length)list.append(n("p","Your cart is empty."));
 for(const r of cart){const p=store.find(r.id),row=n("article",undefined,"cart-row"),controls=n("div",undefined,"quantity");row.append(n("h3",p.name),n("p",money(p.price*r.qty)));for(const [text,delta] of [["−",-1],["+",1]]){const b=btn(text,()=>{cart=store.change(cart,p.id,delta);save();},"secondary");b.setAttribute("aria-label",(delta<0?"Decrease ":"Increase ")+p.name+" quantity");controls.append(b);if(delta<0)controls.append(n("span",String(r.qty)));}controls.append(btn("Remove",()=>{cart=cart.filter(x=>x.id!==p.id);save();},"secondary"));row.append(controls);list.append(row);}}
 for(const id of ["search","category","sort"])get(id).addEventListener(id==="search"?"input":"change",renderProducts);
 get("reset").addEventListener("click",()=>{get("search").value="";get("category").value="All";get("sort").value="featured";renderProducts();get("search").focus();});
 get("checkout").addEventListener("click",()=>{if(store.totals(cart).count)notify("Demo checkout preview complete. No order or payment was processed.");});
 const theme=get("theme");let pref="system";try{const v=localStorage.getItem(themeKey);if(["light","dark","system"].includes(v))pref=v;}catch{}
 function apply(){if(pref==="system")delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=pref;theme.value=pref;}
 theme.addEventListener("change",()=>{pref=theme.value;try{localStorage.setItem(themeKey,pref);}catch{}apply();});theme.disabled=false;apply();get("filters").hidden=false;renderProducts();renderCart();
});