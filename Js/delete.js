function deleteData(id)
{


    const accesstoken= localStorage.getItem('access_token'); 
    fetch(`http://localhost:3000/api/admin/service/deleteService/${id}`,{
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
    fetch(`http://localhost:3000/api/admin/service/deleteService/${id}`,{
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
    console.log("Data fetched SuccessFully:", data);
    })
    location.reload();
}