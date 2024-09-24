function updatequestion()
{
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
  console.log(itemId);
  
  const url=`http://localhost:3000/api/question/updateQuestion/${itemId}`

    const newAccessToken = localStorage.getItem("access_token");
 
      
   
      const text = document.getElementById('title').value;
       const  rightAnswer = document.getElementById('right').value;
       const inputValues=[];
       const inputs=document.querySelectorAll('form .wrong');
       for(let i=0;i<inputs.length;i++){
        if(inputs[i].type ='text'){
            inputValues.push(inputs[i].value);
        }
       }
       console.log(inputValues);


  fetch(url,{
    method:'POST',
    headers:{
                      Authorization:`Bearer ${newAccessToken}`,
                      "Content-Type":"application/json",
                  },
               body:JSON.stringify({ text: text, rightAnswer: rightAnswer,answers:inputValues })
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
fetch(url,{
  headers:{
                      Authorization:`Bearer ${newAccessToken}`,
                      "Content-Type":"application/json",
                  },
                  body:JSON.stringify({ text: text, rightAnswer: rightAnswer,answers:inputValues })
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
                  // window.location.href='./quastion1.html';
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