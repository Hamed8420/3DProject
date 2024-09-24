function addDat(){
    const token = localStorage.getItem('access_token');
  
    const featureName = document.getElementById("title").value;
  fetch('http://localhost:3000/api/feature/addFeature',{
  method:"POST",
  headers:{
    "Authorization":`Bearer ${token}`,
    "Content-Type":"application/json",
  },
  body: JSON.stringify({ featureName: featureName})
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
  fetch('http://localhost:3000/api/feature/addFeature',{
  headers:{
                    Authorization:`Bearer ${newAccessToken}`,
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({ featureName: featureName})
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
  
  // window.location.href='./addFeature.html'
  }