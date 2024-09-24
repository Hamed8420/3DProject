
console.log(20)

function getId(){
  const params = getQueryStringParams(window.location.search);
  const itemId = params.id;
console.log(itemId);
const accesstoken= localStorage.getItem('access_token'); 

const url=`http://localhost:3000/api/admin/Lesson/courseLessons/${itemId}`

fetch(url,{
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
fetch(url,{
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
  const num=document.getElementById('num');
num.value=itemId;
console.log(num.value)
// data.lessons.forEach(element => {

// });
})
}
getId();

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

// function addlesson()
// {

//     const newAccessToken = localStorage.getItem("access_token");
//       const apiUrl = 'http://localhost:3000/api/admin/Lesson/addLesson';   
      
   
//       const lessonName = document.getElementById('title').value;
//        const  description = document.getElementById('explain').value;
// const courseId=document.getElementById('num').value;


//       const formData = new FormData();
//       const  lessonImage =document.getElementById('file-input').files[0];
    
//       formData.append('lessonImage',lessonImage);
    
//       const  Link =document.getElementById('file2').files[0];
//     // console.log(Link)
//       formData.append('Link',Link);
      
//       formData.append('lessonName',lessonName);
//       formData.append('description',description);
//       formData.append('courseId',courseId);

// console.log(Link)

//   fetch(apiUrl,{
//     method:'POST',
//     headers:{
//                       Authorization:`Bearer ${newAccessToken}`,
//                       // "Content-Type":"application/json",
//                   },
//                   body: formData
//   })
//               .then(response => {
//                   if(response.message === "jwt expired")
//                   {
//                       const refreshToken=localStorage.getItem('refresh_token');
// fetch('http://localhost:3000/api/auth/refreshToken',{
//   method:"POST",
//   headers:{
//       "Content-Type":"application/json",
//   },
//   body:JSON.stringify({
//       token:refreshToken
//       }),
// }).then(refreshResponse =>{
//   if(refreshResponse.ok)
//   {
//       return refreshResponse.json();
//   }else
//   {
//       console.erorr('refresh token is invalid or expired.');
//   }
// }).then(data =>{
//   localStorage.setItem("access_token",data.accessToken);
// const newAccessToken = localStorage.getItem("access_token");
// fetch(apiUrl,{
//   headers:{
//                       Authorization:`Bearer ${newAccessToken}`,
//                       // "Content-Type":"application/json",
//                   },
//                   body: formData
// }).then(newResponse =>{
//   return newResponse.json();
// }).then(newData =>{
//   // window.location.href='./index.html';
//   console.log(data,'data is add');

// console.log(newData)
// })
// })

//                   }else
//                   {
//                       return response.json();
//                   }
//               })
//               .then(data => {
//                   console.log(data,'data is add');
//                 //   window.location.href='./allproject.html';
//               })
//               .catch(error => console.error('data is fall',error));
// }

function addles(){
  
  const newAccessToken = localStorage.getItem("access_token");
  const apiUrl = 'http://localhost:3000/api/admin/Lesson/addLesson';   
  

  const lessonName = document.getElementById('title').value;
   const  description = document.getElementById('explain').value;
const courseId=document.getElementById('num').value;


  const formData = new FormData();
  const  lessonImage =document.getElementById('file-input').files[0];

  formData.append('image',lessonImage);

  const  Link =document.getElementById('file2').files[0];
// console.log(Link)
  formData.append('vedio',Link);
  
  formData.append('lessonName',lessonName);
  formData.append('description',description);
  formData.append('courseId',courseId);

console.log(Link)
fetch(apiUrl,
  {
    method:"POST",
    headers:{
      Authorization:`Bearer ${newAccessToken}`,
    },
    body:formData
  }).then(res =>{
    console.log(`kdlfsdf slkdjfs dfklsdf skdlfjsdfksdlf`)
    return res.json()
  }).then(data =>{
    console.log(data);
  })

  // window.location.href='./alllesson.html'
}

