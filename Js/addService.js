const btn = document.getElementById('btn');

btn .addEventListener('click',()=>{
    const token = localStorage.getItem('access_token');

        const serviceName = document.getElementById('title').value;
       const  description = document.getElementById('explain').value;

   const  image =document.getElementById('file-input').files[0];

    const formData = new FormData();
    formData.append('image',image);
    formData.append('serviceName',serviceName);
    formData.append('description',description);


fetch('http://localhost:3000/api/admin/service/addService',{
    method:"POST",
    headers:{
        "Authorization":`Bearer ${token}`
    },
    body:formData
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
fetch('http://localhost:3000/api/admin/service/addService',{
    headers:{
                        Authorization:`Bearer ${newAccessToken}`,
                        
                    },
                    body:formData
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

// window.location.href='./allService.html'
})



/* input explain */
const explain = document.getElementById('explain');
explain.addEventListener("keyup",(e)=>{
    explain.style.height = "63px";
let scHeight = e.target.scrollHeight;
explain.style.height=`${scHeight}px`;
})