
const video = ()=>{

    const likeButton=document.querySelector('#likeButton');
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    const accesstoken= localStorage.getItem('access_token'); 
const apiUrl = `http://localhost:3000/api/admin/Lesson/${itemId}`;
   

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
console.log(data)
    const sen=document.querySelector('.ser');
    const adress=document.querySelector('.adress');
    const myLink = document.createElement("a");
    if(data.find === true){
        likeButton.style.color='blue'
    }else{
        likeButton.style.color='white'
        console.log(data.find)
    }
 
myLink.innerHTML = "question";
myLink.href =`quastion1.html?id=${itemId}` ;
sen.appendChild(myLink)
    const header=document.querySelector('.header');
    header.textContent=data.lesson.lessonName;
    console.log(header)
    
    const number=document.querySelector('span');
    number.innerHTML=data.lesson.lessonId;
    console.log(number)
    
    const title=document.querySelector('.title');
    title.textContent=data.lesson.description;

   

//  console.log(data.lesson.id)
//  console.log(data.lesson.lessonName);
//  console.log(data.lesson.description);
//  console.log(data.lesson.courseId);

 




   
})

}

function main(){
    video();
}       
main()

function videroLink(){
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    const accesstoken= localStorage.getItem('access_token'); 
const apiUrl = `http://localhost:3000/api/lesson/Video/${itemId}`;
// fetch(apiUrl,{
//     headers:{
        
//         'Authorization':`Bearer ${accesstoken}`,
//         "Content-Type":"application/json",
//     },
// }).then(response =>{
//     if(response.status === 500)
//     {
//     const refreshToken=localStorage.getItem("refresh_token");
// fetch('http://localhost:3000/api/auth/refreshToken',{
// method:"POST",
// headers:{
// "Content-Type":"application/json",
// },
// body:JSON.stringify({
// token:refreshToken
// }),
// }).then(refreshResponse =>{
// if(refreshResponse.ok)
// {
// return refreshResponse.blob();


// }else{
// console.erorr('refresh token is invalid or expired.');
// }
// }).then(data=>{
// localStorage.setItem("access_token",data.accessToken);
// const newAccessToken = localStorage.getItem("access_token");
// fetch(apiUrl,{
//                 headers:{
//                     Authorization:`Bearer ${newAccessToken}`,
//                     "Content-Type":"application/json",
//                 },
//         }).then(newResponse=>{
//             return newResponse.blob();
//         }).then(newData=>{
//             console.log('Data Fetsh Successfully:',newData);
            
//         })
      
// })

// }else{
//     return response.blob();
// }
// }).then(blob =>{
//     const videos=document.querySelector('#video');
//     const video = document.createElement('video');
//     video.src = URL.createObjectURL(blob);
//   videos.prepend(video);
   
// })

const videoPlayer = document.querySelector('#videoe');

fetch(apiUrl,{
    headers:{
                'Authorization':`Bearer ${accesstoken}`,
                "Content-Type":"application/json",
            },
})
  .then(response => response.blob())
  .then(blob => {
    videoPlayer.src = URL.createObjectURL(blob);
  })
  .catch(error => {
    console.error(error);
  });


}

videroLink();
   

function ComentData(){
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    const accesstoken= localStorage.getItem('access_token'); 
const URl = `http://localhost:3000/api/Comment/getComment/${itemId}`;

fetch(URl,{
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
fetch(URl,{
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
    console.log(data)
const group=document.querySelector('.group'); 
   data.comments.forEach((element,i) => {
    console.log(element)

const comment_card=document.createElement('div');
comment_card.classList.add('comment-card')

const card_text=document.createElement('p');
card_text.classList.add('card-text');
card_text.textContent=element.description;

const adress1=document.createElement('div');
adress1.classList.add('adress1')

const profile_banner=document.createElement('div');
profile_banner.classList.add('profile-banner');
const img = document.createElement('img');
img.src=`http:\\\\localhost:3000\\${element.user.userImage}`;
console.log(img)
profile_banner.appendChild(img);
adress1.appendChild(profile_banner);
const der=document.createElement('div');
der.classList.add('der');

const card_title=document.createElement('p');
card_title.classList.add('card-title');

const tr=document.createElement('span');
tr.classList.add('tr');
tr.textContent=element.user.firstName;
card_title.appendChild(tr);
const ts=document.createElement('span');
ts.classList.add('ts');
ts.textContent=element.user.lastName;
card_title.appendChild(ts);

const jara=document.createElement('div');
jara.classList.add('jara')

const replay = document.createElement("a");
    replay.classList.add('replay')
 
replay.innerHTML = "replay";
replay.href =`replay.html?id=${element.id}&word=${itemId}` ;


// const icon=document.createElement('i');
// icon.classList.add('fa','fa-thumbs-up');
// icon.setAttribute('aria-hidden','true');

localStorage.setItem("id",element.id);
der.appendChild(card_title);
// jara.appendChild(icon)
jara.appendChild(replay)
der.appendChild(jara)
adress1.appendChild(der);

comment_card.appendChild(card_text);
comment_card.appendChild(adress1);
const far =document.createElement('div');
far.classList.add('add');
far.innerHTML=`
<div  style="margin:10px 0 15px; display: flex;justify-content: space-between;text-align: center;">
<span id="btn-edit" style="border-radius:6px ; width:50px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729;cursor: pointer; "  onclick="deleteData(${element.id})"> dele</span>
<a href="updateComment.html?id=${element.id}" style="border-radius:6px ; width:50px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729;cursor: pointer;" >Edit</a>
</div>
`
comment_card.appendChild(far);
group.appendChild(comment_card)
   });
})
}
ComentData()



function addCommet(){


    const token = localStorage.getItem('access_token');

    const desc = document.getElementById('comment').value;
  
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
const apiUrl = `http://localhost:3000/api/Comment/${itemId}/addComment`;   


fetch(apiUrl,{
method:"POST",
headers:{
    "Authorization":`Bearer ${token}`,
    "Content-Type":"application/json",
},
body:JSON.stringify({desc:desc})
}).then(response =>{
if(response.status === 500)
{
const refreshToken=localStorage.getItem('refresh_token');
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
}else
{
    console.erorr('refresh token is invalid or expired.');
}
}).then(data =>{
localStorage.setItem("access_token",data.accessToken);
const newAccessToken = localStorage.getItem("access_token");
fetch(apiUrl,{
headers:{
                    Authorization:`Bearer ${newAccessToken}`,
                    "Content-Type":"application/json",
                    
                },
                body:JSON.stringify({desc:desc})
}).then(newResponse =>{
return newResponse.json();
}).then(newData =>{
console.log(newData)
console.log('User added:', newData);

})
})
}else{
   return response.json();
}

}).then(data =>{
console.log(data);
    let socket=io();
    socket.on('addComment',(msg)=>{
        console.log(msg)
    })
console.log('User added:', data);

}).catch(erorr =>{
console.erorr(erorr)
});




location.reload();
}


function deleteData(id)
{


    const accesstoken= localStorage.getItem('access_token'); 
    fetch(`http://localhost:3000/api/Comment/deleteComment/${id}`,{
        method:"DELETE",
    headers:{
        'Authorization':`Bearer ${accesstoken}`,
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
    fetch(`http://localhost:3000/api/admin/material/deleteMaterial/${id}`,{
        method:"DELETE",
                headers:{
                    Authorization:`Bearer ${newAccessToken}`,
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
        console.log('the delete is delete')
    console.log("Data fetched SuccessFully:", data);
    location.reload();
    })
}
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

const likeButton = document.querySelector('#likeButton');
let isLiked = 0;

function toggleLike() {
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    console.log(itemId);
    const accesstoken= localStorage.getItem('access_token'); 
    const urlapu=`http://localhost:3000/api/getData/like/${itemId}/Lesson`
const apiUrl = `http://localhost:3000/api/getData/unLike/${itemId}/Lesson`;
  if (isLiked) {
    // Unlike the post
    // $.ajax({
    //   url: apiUrl,
    //   type: 'POST',
    //   headers:{
    //             'Authorization':`Bearer ${accesstoken}`,
    //             "Content-Type":"application/json",
    //         },
    //   success: function(response) {
    //     isLiked = 0;
    //     likeButton.style.color = 'white';
    //     console.log(response);
    //   },
    //   error: function(jqXHR, status, error) {
    //     console.error(error);
    //   }
    // });
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
    // Like the post
    // $.ajax({
    //   url: urlapu,
    //   type: 'POST',
    //   headers:{
    //             'Authorization':`Bearer ${accesstoken}`,
    //             "Content-Type":"application/json",
    //         },
    //   success: function(response) {
    //     isLiked = 1;
    //     likeButton.style.color = 'blue';
    //     console.log(response);
    //   },
    //   error: function(jqXHR, status, error) {
    //     console.error(error);
    //   }
    // });
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

/*********************************************************************************************** */
// const Likeirten= localStorage.getItem('id'); 
// console.log(typeof Likeirten)
// // const like = document.getElementById();
// // console.log(like)
// let LikeIS = 0;

// function likeComment() {
//     // const params = getQueryStringParams(window.location.search);
//     // const itemId = params.id;
//     // console.log(itemId);
//     const accesstoken= localStorage.getItem('access_token'); 

//     const urlapu=`http://localhost:3000/api/getData/like/${Likeirten}/Comment`
// const apiUrl = `http://localhost:3000/api/getData/unLike/${Likeirten}/Comment`;
//   if (LikeIS) {
   
//     fetch(apiUrl,{
//         method:"POST",
//         headers:{
//                         'Authorization':`Bearer ${accesstoken}`,
//                         "Content-Type":"application/json",
//                     },

//     }).then(response =>{
//         return response.json();
//     }).then(data =>{
//         LikeIS = 0;
//         likeButton.style.color = 'white';
//         console.log(data);
//     }).catch(error=>{
//         console.error(error)
//     })
//   } else {
    
//     fetch(urlapu,{
//         method:"POST",
//         headers:{
//                         'Authorization':`Bearer ${accesstoken}`,
//                         "Content-Type":"application/json",
//                     },

//     }).then(response =>{
//         return response.json();
//     }).then(data =>{
//         LikeIS = 1;
//             likeButton.style.color = 'blue';
//         //     console.log(response);
//         console.log(data);
//     }).catch(error=>{
//         console.error(error)
//     })
//   }
// }

// like.addEventListener('click', likeComment);


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