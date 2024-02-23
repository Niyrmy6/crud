let title= document.getElementById('title');
let price= document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let submit= document.getElementById('submit');
let search=document.getElementById('search');
let mood='create';
let temp;

function getTotal(){
    if (price.value!=''){
        let result= (+ price.value+ +taxes.value+ +ads.value) - +discount.value;
        total.innerHTML= result;
        total.style.backgroundColor='#040';
    }
    else{
        total.innerHTML= '';
        total.style.backgroundColor='#a00d02';

    }
}
let array;
if(localStorage.product!=null){
    array=JSON.parse(localStorage.product);
}
else{
 array=[];}
submit.onclick= function(){
let product={
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase()
};
if(title.value!=''&& price.value!=''&& count.value<100){
if (mood ==='create'){
    if(product.count>1){
    for(let i=0;i<product.count;i++){
    array.push(product);
    }
        }
else{
    array.push(product);
}
}
else{
    array[temp]= product;
    mood='create';
    submit.innerHTML='Create';
    count.style.display='block';}
    clearData();
}
    localStorage.setItem('product', JSON.stringify(array));
    
showData();

}






function clearData(){
    title.value= '';
    price.value= '';
    taxes.value= '';
    ads.value= '';
    discount.value= '';
    total.innerHTM='';
    count.value= '';
    category.value= '';
   
}
function showData(){
    getTotal();
    let table=' ';
    for (let i=0;i<array.length;i++){
table+=`
<tr>
        <td>${i+1}</td>
        <td>${array[i].title}</td>
        <td>${array[i].price}</td>
        <td>${array[i].taxes}</td>
        <td>${array[i].ads}</td>
        <td>${array[i].discount}</td>
        <td>${array[i].total}</td>
        <td>${array[i].category}</td>
        <td><button class="update" onclick="btnupdate(${i})">update</button></td>
        <td><button class="delete" onclick="btndelete(${i})">delete</button></td>
 </tr>`;
 
    }
    
  
   document.getElementById('tbody').innerHTML=table;
   
}
function btnupdate(i){
    title.value=array[i].title;
    price.value=array[i].price;
    taxes.value=array[i].taxes;
    ads.value=array[i].ads;
    discount.value=array[i].discount;
    category.value=array[i].category;
    getTotal();
    count.style.display='none';
    submit.innerHTML='Update';
    mood='update';
    temp=i;
    scroll({
        top:0,
        behavior:'smooth',})


}
function btndelete(i){

array.splice(i,1);
localStorage.product=JSON.stringify(array);
showData();

}
let searchmood='title';
function getsearch(id){
    if(id=="searchTitle"){
     searchmood='title';  
    }
    else{
        searchmood='category'; 
    }
    search.placeholder='Search by '+searchmood;
    search.focus();
    search.value='';
    showData();
}
function searchData(value){
    let table=' ';
    for(let i=0;i<array.length;i++){
    if(searchmood =='title'){
        if(array[i].title.includes(value.toLowerCase())){
        table+=`
        <tr>
                <td>${i+1}</td>
                <td>${array[i].title}</td>
                <td>${array[i].price}</td>
                <td>${array[i].taxes}</td>
                <td>${array[i].ads}</td>
                <td>${array[i].discount}</td>
                <td>${array[i].total}</td>
                <td>${array[i].category}</td>
                <td><button class="update" onclick="btnupdate(${i})">update</button></td>
                <td><button class="delete" onclick="btndelete(${i})">delete</button></td>
         </tr>`;
         
            }
        
    
}

    
       else{
        if(array[i].category.includes(value.toLowerCase())){
            
        table+=`
        <tr>
                <td>${i+1}</td>
                <td>${array[i].title}</td>
                <td>${array[i].price}</td>
                <td>${array[i].taxes}</td>
                <td>${array[i].ads}</td>
                <td>${array[i].discount}</td>
                <td>${array[i].total}</td>
                <td>${array[i].category}</td>
                <td><button class="update" onclick="btnupdate(${i})">update</button></td>
                <td><button class="delete" onclick="btndelete(${i})">delete</button></td>
         </tr>`;
         
            
        }
    
    }
document.getElementById('tbody').innerHTML=table;

    }
}
showData();