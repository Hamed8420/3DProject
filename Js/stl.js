
$(document).ready(function(){
    $('.thumb a').click (function(e)
    {
        e.preventDefault();
        $('.imgBox img').attr("src" , $(this).attr("href"));
    })
})

console.log(20)
const StlData = ()=>{


    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    const accesstoken= localStorage.getItem('access_token'); 
const apiUrl = `http://localhost:3000/api/getData/STL/${itemId}`;  
  fetch(apiUrl,{
    headers:{
        'Authorization':`Bearer ${accesstoken}`,
        "Content-Type":"application/json",
    },
}).then(response =>{
    if(response.status === 500)
    {
    const refreshToken=localStorage.getItem("refresh_token");
fetch('http://localhost:3000/api/auth/refreshToken',{
method:"POST",
headers:{
"Content-Type":"application/json",
},
body:JSON.stringify({
token:refreshToken
}),
}).then(refreshResponse =>{
if(refreshResponse.ok)
{
return refreshResponse.json();


}else{
console.erorr('refresh token is invalid or expired.');
}
}).then(data=>{
localStorage.setItem("access_token",data.accessToken);
const newAccessToken = localStorage.getItem("access_token");
fetch(apiUrl,{
                headers:{
                    Authorization:`Bearer ${newAccessToken}`,
                    "Content-Type":"application/json",
                },
        }).then(newResponse=>{
            return newResponse.json();
        }).then(newData=>{
            console.log('Data Fetsh Successfully:',newData);
            
        })
      
})

}else{
    return response.json();
}
}).then(data =>{

const imageb=document.querySelector('.imgBox img');
imageb.src=`http://localhost:3000/${data.stl.stlImage}`

const thumb=document.querySelector('.thumb');
thumb.innerHTML=""
const likeButton=document.querySelector('#likeButton')
if(data.isLike === true){
    likeButton.style.color='blue'
}else{
    likeButton.style.color='white'
    console.log(data.find)
}
 data.stl.images.forEach(element => {
    const li=document.createElement('li');
    const a=document.createElement('a');

    a.href=`http://localhost:3000/${element.path}`;
    const img=document.createElement('img');
    img.src=`http://localhost:3000/${element.path}`
     a.appendChild(img)
li.appendChild(a)
    thumb.appendChild(li);
 }); 
const idsf=document.querySelector('.idsf');
idsf.textContent=data.stl.user.id;
console.log(idsf)
 const imagd=document.querySelector('.de');
console.log(idsf.innerHTML)

//  imagd.src=`http://localhost:3000/${element.userImage}`;

 imagd.addEventListener('click',()=>{
    console.log(1)
window.location.href=`./profil.html?id=${idsf.innerHTML}`
 })
    const met=document.querySelector('.met');
const like=document.querySelector('.like h2');
like.textContent=data.stl.stlName;
const price= document.querySelector('.price h4');
price.textContent=data.stl.price;

const update=document.querySelector('.update a');
update.href=`./updateStl.html?id=${itemId}`


const order=document.querySelector('.order a');
order.href=`./order.html?id=${itemId}&word=STL`

localStorage.setItem('usernum', data.stl.user.id);

const dollar=document.createElement('span');
dollar.textContent='.00$';
price.appendChild(dollar)
 const matrail=document.querySelector('.matrail');
 data.stl.materials.forEach(element => {
    const span=document.createElement('span');
    span.textContent=element.materialName;
    matrail.appendChild(span);

 });

 const color=document.querySelector('.color');

 data.stl.colors.forEach(element => {
    const span=document.createElement('p');
    span.style.background=element.colorName;
    met.appendChild(span);
    color.appendChild(met)

 });
     

//  data.stl.colors.forEach(element => {
//     const span=document.createElement('p');
//     span.style.background=element.colorName;
//     met.appendChild(span);
//     color.appendChild(met)
//  });

const thum=document.querySelector('.thum');
// thum.innerHTML=``

 data.stl.files.forEach(element => {
console.log(element)

const li=document.createElement('li');
const a=document.createElement('a');

a.href=`http://localhost:3000/${element.path}`;
const img=document.createElement('span');
img.textContent=element.fileableType;
a.setAttribute('download','file.pdf')
 a.appendChild(img)
li.appendChild(a)
thum.appendChild(li);

// const span=document.createElement('a');
// span.setAttribute("class", "idSelectFile");
// span.href=element.fileName;
// span.textContent='sakjdh'
// span.setAttribute('id','file');
// // span.style.display='none';



// btn.appendChild(span);


// down.textContent=element.path;   

 });

 const explain=document.querySelector('.explain p');
 explain.textContent=data.stl.description;

 const height=document.getElementById('height');
 height.textContent=data.stl.height;

 const width=document.getElementById('width');
 width.textContent=data.stl.width;
 const lenght=document.getElementById('lenght');
 lenght.textContent=data.stl.length;

 const feature=document.querySelector('.feature');
 data.stl.features.forEach(element => {
    const span=document.createElement('p');
    span.textContent=element.featureName;
    feature.appendChild(span);

 });

})
}

function main(){
    StlData();
}       
main()

/*============================================================ */
const likeButton = document.querySelector('#likeButton');
let isLiked = 0;

function toggleLike() {
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    const accesstoken= localStorage.getItem('access_token'); 
    const urlapu=`http://localhost:3000/api/getData/like/${itemId}/Stl`
const apiUrl = `http://localhost:3000/api/getData/unLike/${itemId}/Stl`;
  if (isLiked) {
    // Unlike the post
    $.ajax({
      url: apiUrl,
      type: 'POST',
      headers:{
                'Authorization':`Bearer ${accesstoken}`,
                "Content-Type":"application/json",
            },
      success: function(response) {
        isLiked = 0;
        likeButton.style.color = 'white';
        console.log(response);
      },
      error: function(jqXHR, status, error) {
        console.error(error);
      }
    });
  } else {
    // Like the post
    $.ajax({
      url: urlapu,
      type: 'POST',
      headers:{
                'Authorization':`Bearer ${accesstoken}`,
                "Content-Type":"application/json",
            },
      success: function(response) {
        isLiked = 1;
        likeButton.style.color = 'blue';
        console.log(response);
      },
      error: function(jqXHR, status, error) {
        console.error(error);
      }
    });
  }
}

likeButton.addEventListener('click', toggleLike);

// لا يلزم استخدام هذا التابع في هذه الصفحة
function getQueryStringParams(query) {
    return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query)
            .split('&')
            .reduce((params, param) => {
                    let [key, value] = param.split('=');
                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                    return params;
                }, {}
            )
        : {}
}

