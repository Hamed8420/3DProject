var swiper = new Swiper(".team-slide", {
loop:true,
grabCursor:true,
spaceBetween:20,
navigation:{
    nextEl:".swiper-button-next",
    prevEl:".swiper-button-prev"
},
breakpoints:{
    0:{
        slidesPerView: 1,
    },
    768:{
        slidesPerView: 2,
    },
    991:{
        slidesPerView: 3,
    },

}
});




/*================================================================================================== */
console.log(20)
const StlData = ()=>{


    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    const accesstoken= localStorage.getItem('access_token'); 
const apiUrl = `http://localhost:3000/api/getData/Project/${itemId}`;   

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

const imgBox=document.querySelector('.imgBox img');
imgBox.src=  `http://localhost:3000/${data.project.projectImage}`;
const slide=document.querySelector('.swiper-wrapper')
const likeButton=document.querySelector('#likeButton')
if(data.find === true){
    likeButton.style.color='blue'
}else{
    likeButton.style.color='white'
    console.log(data.find)
}

data.project.STLs.forEach(element => {
    // const image=document.createElement('img');
    // image.src=  `http://localhost:3000/${element.stlImage}`;
    // slide.appendChild(image)
    const swiper_slide=document.createElement('div');
    swiper_slide.classList.add('swiper-slide');
    swiper_slide.classList.add('slide');
    const image=document.createElement('div');
    image.classList.add('image');
    const img=document.createElement('img');
    img.src=  `http://localhost:3000/${element.stlImage}`;
    image.appendChild(img);
    swiper_slide.appendChild(image)
    slide.appendChild(swiper_slide)
 });

    const update=document.querySelector('.update a');
    update.href=`./updateProject.html?id=${itemId}`

    const order=document.querySelector('.order a');
    order.href=`./order.html?id=${itemId}&word=PROJECT`
    
const like=document.querySelector('.like h2');
like.textContent=data.project.projectName;
    const price= document.querySelector('.price h3');
    const dee=document.createElement('span');
    dee.classList.add('per')
    dee.textContent='$';
    price.textContent= data.project.price;
    const dollar=document.createElement('span');
    dollar.textContent='.00';
    price.prepend(dee)
    price.appendChild(dollar)


    

    const thum=document.querySelector('.thum');
     data.project.files.forEach(element => {
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
     });

     const explain=document.querySelector('.explain p');
     explain.textContent=data.project.description;

     const height=document.getElementById('height');
     height.textContent=data.project.height;

     const width=document.getElementById('width');
     width.textContent=data.project.width;
     const lenght=document.getElementById('lenght');
     lenght.textContent=data.project.length;



 


})
}

function main(){
StlData();
}       
main()

const likeButton = document.querySelector('#likeButton');
let isLiked = 0;

function toggleLike() {
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    const accesstoken= localStorage.getItem('access_token'); 
    const urlapu=`http://localhost:3000/api/getData/like/${itemId}/Project`
const apiUrl = `http://localhost:3000/api/getData/unLike/${itemId}/Project`;
  if (isLiked) {
   
    fetch(apiUrl,{
        method:"POST",
        headers:{
                        'Authorization':`Bearer ${accesstoken}`,
                        "Content-Type":"application/json",
                    },

    }).then(response =>{
        return response.json();
    }).then(data =>{
             isLiked = 0;
        likeButton.style.color = 'white';
        console.log(data);
    }).catch(error=>{
        console.error(error)
    })
  } else {
   
    fetch(urlapu,{
        method:"POST",
        headers:{
                        'Authorization':`Bearer ${accesstoken}`,
                        "Content-Type":"application/json",
                    },

    }).then(response =>{
        return response.json();
    }).then(data =>{
        isLiked = 1;
            likeButton.style.color = 'blue';
        //     console.log(response);
        console.log(data);
    }).catch(error=>{
        console.error(error)
    })
  }
}

likeButton.addEventListener('click', toggleLike);

/*======================================================================== */

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
