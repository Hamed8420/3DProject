
/*============================================================================================= */

/*============================================================================================= */


const descriptionData=()=>{
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    const accesstoken= localStorage.getItem('access_token'); 
const CourseUrl = `http://localhost:3000/api/getData/Course/${itemId}`;

fetch(CourseUrl,{
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
fetch(CourseUrl,{
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
const conatiner_rating = document.querySelector('.conatiner-rating');

const description=document.createElement('div');
description.classList.add('description');


const namecourse=document.createElement('h3');
namecourse.textContent=data.course.courseName;

const expliainCourse=document.createElement('p');
expliainCourse.textContent=data.course.description;



description.appendChild(namecourse);
description.appendChild(expliainCourse);

conatiner_rating.appendChild(description);



})


}
descriptionData();

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

const alllesson = ()=>{


    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    const accesstoken= localStorage.getItem('access_token'); 
const apiUrl = `http://localhost:3000/api/admin/Lesson/courseLessons/${itemId}`;   

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

    const addw=document.querySelector('.add');
    // console.log(itemId)
    // addw.href=`./addLesson.html?id=${itemId}`;
    
    const button=document.createElement('button');
    const linkre=document.createElement('a');
    linkre.href=`addLesson.html?id=${itemId}`;
    console.log(data.lessons.courseId)
    linkre.textContent='add Lesson';
    button.appendChild(linkre);
    addw.appendChild(button);
    
    
    
    console.log(`hello world`)
const tbody = document.querySelector('.tbody');
data.lessons.forEach((element)=>{
  console.log(element.id)
  const der=document.createElement('div');
  der.classList.add('der')
  const click=document.createElement('div');
  click.classList.add('click');

  const image=document.createElement('div');
  image.classList.add('image');
  const img = document.createElement('img');
  img.src=  `http://localhost:3000/${element.lessonImage}`;

  const alink = document.createElement('a');
  alink.href=  `videolesson.html?id=${element.id}`;

  alink.appendChild(img);
  image.appendChild(alink);
  click.appendChild(image);
  der.appendChild(click)

  const name=document.createElement('div');
  name.classList.add('name');
  const number=document.createElement('span');
  number.textContent=element.lessonId ;
  const number1=document.createElement('span');
  number1.textContent='#' ;
  const paragrap=document.createElement('p');
  paragrap.textContent=element.description;

  number1.appendChild(number);
  name.appendChild(number1);
  name.appendChild(paragrap);

  der.appendChild(name)
  const far =document.createElement('div');
  far.classList.add('add');

  far.innerHTML=`

  <div style="margin-top:10px;display: flex; justify-content: space-between;align-items: center;">
  <span id="btn-edit" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729;cursor: pointer; margin-top:10px 0; "  onclick="deleteData(${element.id})"> delete</span>
  <a href="updateCourses.html?id=${element.id}" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729; margin-top:10px 0; cursor: pointer; ">Edit</a>
  </div>
  `

  der.appendChild(far);
  tbody.appendChild(der);


})

})
}

function main(){
  alllesson();
}       
main()
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

/*=====================================================================================*/

function deleteData(id)
{
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);


    const accesstoken= localStorage.getItem('access_token'); 
    fetch(`http://localhost:3000/api/admin/Lesson/deleteLesson/${id}`,{
        method:"DELETE",
    headers:{
        'Authorization':`Bearer ${accesstoken}`,
        "Content-Type":"application/json",
    },
    body:JSON.stringify({courseId:itemId})
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
    fetch(`http://localhost:3000/api/admin/Lesson/deleteLesson/${id}`,{
        method:"DELETE",
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
    console.log("Data fetched SuccessFully:", data);
    })

    location.reload();
}

/*==================================================================================== */



  function addrate(){
    const token = localStorage.getItem('access_token');
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    const rate = document.getElementById("ser").value;
    console.log(rate)
    

fetch(`http://localhost:3000/api/getData/rate/${itemId}`,{
  method:'POST',
  headers:{
    'Authorization':`Bearer ${token}`,
    "Content-Type":"application/json",
},
body:JSON.stringify({rate:rate})
}).then(response =>{
   return response.json();
}).then(data =>{
  console.log(data)

  const conatiner_rating = document.querySelector('.conatiner-rating');
  const description=document.querySelector('.description')
  const icon=document.createElement('div');
  icon.classList.add('icon');

  const rate=document.createElement('span');
rate.textContent=data.rate;
console.log(data.rate)

const link = document.createElement('i');

link.classList.add('fa', 'fa-star');
link.setAttribute('aria-hidden', 'true');
icon.appendChild(rate);
icon.appendChild(link);



description.appendChild(icon)
conatiner_rating.appendChild(description);

fetch(`http://localhost:3000/api/getData/getCourseRate/${itemId}`,{
    headers:{
        'Authorization':`Bearer ${token}`,
        "Content-Type":"application/json",
    },
}).then(res =>{
    return res.json();
}).then(det =>{
    console.log(det)
})

})

  
  }


function getrate(){
    const token = localStorage.getItem('access_token');
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    fetch(`http://localhost:3000/api/getData/getCourseRate/${itemId}`,{
        headers:{
            'Authorization':`Bearer ${token}`,
            "Content-Type":"application/json",
        },
    }).then(res =>{
        return res.json();
    }).then(det =>{
        console.log(det)
    })
}
getrate();

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





  const bar=document.querySelector('.bar .fa-bars');
const navbar=document.querySelector('.side');
const sidebar=document.querySelector('.sidebar');
const bars=document.querySelector('.bars .fa-times');
const term=document.querySelector('.bars');




bar.addEventListener('click',()=>{
    console.log(`klsfgjdfklgj`)
navbar.style.display="block"
sidebar.style.width="230px"
term.style.display='block'

})

bars.addEventListener('click',()=>{
    console.log(`klsfgjdfklgj`)
    navbar.style.display="none"
sidebar.style.width="0"

})