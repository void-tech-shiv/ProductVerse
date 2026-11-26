"use strict";
class Product{
 constructor(id,name,price,description){if(!Number.isInteger(id)||id<1||!Number.isSafeInteger(price)||price<0)throw new TypeError("Invalid product");Object.assign(this,{id,name,price,description});}
 get category(){return "General";}
 getInfo(){return {id:this.id,name:this.name,price:this.price,description:this.description,category:this.category};}
 getDetails(){return [];}
 display(){return `${this.name} — $${(this.price/100).toFixed(2)} | ${this.getDetails().map(([k,v])=>`${k}: ${v}`).join(" | ")}`;}
}

class Electronics extends Product{
 constructor(id,name,price,description,brand,warranty){super(id,name,price,description);Object.assign(this,{brand,warranty});}
 get category(){return "Electronics";}
 getDetails(){return [["Brand",this.brand],["Warranty",`${this.warranty} year(s)`]];}
 getTechSpecs(){return this.getDetails().map(([k,v])=>`${k}: ${v}`).join(", ");}
}

class Clothing extends Product{
 constructor(id,name,price,description,size,color,material){super(id,name,price,description);Object.assign(this,{size,color,material});}
 get category(){return "Clothing";}
 getDetails(){return [["Size",this.size],["Colour",this.color],["Material",this.material]];}
 getSizeInfo(){return this.getDetails().map(([k,v])=>`${k}: ${v}`).join(", ");}
}

class Book extends Product{
 constructor(id,name,price,description,author,genre,pages){super(id,name,price,description);Object.assign(this,{author,genre,pages});}
 get category(){return "Books";}
 getDetails(){return [["Author",this.author],["Genre",this.genre],["Pages",String(this.pages)]];}
 getBookInfo(){return this.getDetails().map(([k,v])=>`${k}: ${v}`).join(", ");}
}

function sampleProducts(){return [
 new Electronics(1,"Smartphone X",69999,"Sample smartphone with modern features.","TechBrand",2),
 new Electronics(2,"Wireless Headphones",19999,"Noise-cancelling wireless headphones.","SoundMax",1),
 new Clothing(3,"Casual T-Shirt",2999,"Comfortable cotton t-shirt.","M","Blue","Cotton"),
 new Clothing(4,"Designer Jeans",7999,"Slim-fit jeans.","32","Dark Blue","Denim"),
 new Book(5,"JavaScript Guide",3999,"Example guide to modern JavaScript.","John Developer","Programming",450),
 new Book(6,"CSS Mastery",4599,"Example guide to advanced CSS.","Style Master","Web Design",380)
];}

function createCatalogue(products){
 const find=id=>products.find(p=>p.id===id);
 function filter(query="",category="All",sort="featured"){const q=String(query).trim().toLowerCase();const rows=products.filter(p=>(category==="All"||p.category===category)&&(p.name+" "+p.description+" "+p.display()).toLowerCase().includes(q));if(sort==="low")rows.sort((a,b)=>a.price-b.price);if(sort==="high")rows.sort((a,b)=>b.price-a.price);return rows;}
 function normalize(raw){const m=new Map();if(Array.isArray(raw))for(const row of raw){if(row&&find(row.id)&&Number.isInteger(row.qty)&&row.qty>0)m.set(row.id,Math.min(99,(m.get(row.id)||0)+row.qty));}return Array.from(m,([id,qty])=>({id,qty}));}
 function change(raw,id,delta){const rows=normalize(raw);if(!find(id)||!Number.isInteger(delta))return rows;const qty=Math.min(99,Math.max(0,(rows.find(r=>r.id===id)?.qty||0)+delta));return rows.filter(r=>r.id!==id).concat(qty?[{id,qty}]:[]);}
 function totals(raw){return normalize(raw).reduce((s,r)=>({count:s.count+r.qty,total:s.total+find(r.id).price*r.qty}),{count:0,total:0});}
 return {find,filter,normalize,change,totals};
}
if(typeof module!=="undefined"&&module.exports)module.exports={Product,Electronics,Clothing,Book,sampleProducts,createCatalogue};
