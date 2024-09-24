// function addData(){
//     // إنشاء جسم البيانات التي ستتم إضافتها
// const data = {
//     materialName: document.getElementById('title').value,
//     density: document.getElementById('explain').value,
//   };
  
//   // تحديد خيارات الطلب
//   const token = localStorage.getItem('access_token');

//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization":`Bearer ${token}`
//     },
//     body: JSON.stringify(data)
//   };
  
//   // إرسال الطلب باستخدام fetch
//   fetch('http://localhost:3000/admin/material/addMaterial', options)
//     .then(response => {
//       if (response.ok) {
//         console.log('تمت إضافة البيانات بنجاح');
//         return response.json();
//       }
//       throw new Error('حدث خطأ ما');
//     })
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }

function addDate(){
  const token = localStorage.getItem('access_token');

  const materialName = document.getElementById("title").value;
  const density = document.getElementById("explain").value;
fetch('http://localhost:3000/api/admin/material/addMaterial',{
method:"POST",
headers:{
  "Authorization":`Bearer ${token}`,
  "Content-Type":"application/json",
},
body: JSON.stringify({ materialName: materialName, density: density })
}).then(response =>{
if(response.status === 500)
{
const refreshToken=localStorage.getItem('refresh_token');
fetch('http://localhost:3000/auth/refreshToken',{
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
fetch('http://localhost:3000/api/admin/material/addMaterial',{
headers:{
                  Authorization:`Bearer ${newAccessToken}`,
                  "Content-Type":"application/json",
              },
              body: JSON.stringify({ materialName: materialName, density: density })
}).then(newResponse =>{
return newResponse.json();
}).then(newData =>{
console.log(newData)
})
})
}else{
 return response.json();
}

}).then(data =>{
console.log(data);
}).catch(erorr =>{
console.erorr(erorr)
});

// window.location.href='./allmetrial.html'
}