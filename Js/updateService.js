function updateAdat()
{
    
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
//   console.log(itemId);
const newAccessToken = localStorage.getItem("access_token");
  const apiUrl = `http://localhost:3000/api/admin/service/updateService/${itemId}`;
  const serviceName = document.getElementById('namedata').value;
  const  description = document.getElementById('explaindata').value;

const  image =document.getElementById('file-input').files[0];

const formData = new FormData();
formData.append('image',image);
formData.append('serviceName',serviceName);
formData.append('description',description);

            fetch(apiUrl,{
      method:'POST',
      headers:{
                        Authorization:`Bearer ${newAccessToken}`,
                        // "Content-Type":"application/json",
                    },
                    body: formData
    })
                .then(response => {
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
fetch(`http://localhost:3000/api/admin/service/updateService/${itemId}`,{
    headers:{
                        Authorization:`Bearer ${newAccessToken}`,
                        
                    },
                    body: formData
}).then(newResponse =>{
    return newResponse.json();
}).then(newData =>{
    // window.location.href='./index.html';
    console.log(data,'data is update');

console.log(newData)
})
})

                    }else
                    {
                        return response.json();
                    }
                })
                .then(data => {
                    console.log(data,'data is update');
                    // window.location.href='./allService.html';
                })
                .catch(error => console.error('data is fall',error));

}        

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

    
