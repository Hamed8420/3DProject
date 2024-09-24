
const login = async ()=>{
    const date ={
              email:document.getElementById('email').value,
              password:document.getElementById('password').value
          };
          fetch('http://localhost:3000/api/auth/login',{
            method:'POST',
            body:JSON.stringify(date),
        headers:{
          'Content-Type':'application/json'
        }
          }).then(response =>{
if(response.status==200){
  return response.json();
}else{
  console.log(`this is a wrong`)
  return response.json();

  
}
          }).then(data =>{
         
            localStorage.setItem('role',data.role);
            
          console.log(data.statusCode)
          if(data.statusCode === 422){
            const error_text=document.querySelector('.error-text');
            error_text.style.display='block'
            error_text.innerHTML=data.message
              console.log(data)

          }else{
            console.log(data.token);
            console.log(data.refreshToken);
            localStorage.setItem('access_token', data.token);
            localStorage.setItem('refresh_token',data.refreshToken);
          
            // window.location.href='./index.html';
          }

          if(data.role ==='student'){
         
            window.location.href='./userindex.html';

          }else{
            if(data.role ==='engineer'){
            
              window.location.href='./userindex.html';
            }else{
              if(data.role ==='admin'){
                window.location.href='./index.html';
              }else{
                console.log(`we have a wrong`)
              }
            }
          }
            

          })
 
  }
// function login(){
//     const data={
//         email:document.getElementById('email').value,
//                       password:document.getElementById('password').value
//     }
//     fetch('http://localhost:3000/api/auth/login',{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },

//         body:JSON.stringify(data),
//     }).then(response =>{
//         window.location.href='./index.html';
//         return response.json()
//     }).then(data =>{
//         console.log(data);
//             console.log(data.token);
//     console.log(data.refreshToken);
//     localStorage.setItem('access_token', data.token);
//     localStorage.setItem('refresh_token',data.refreshToken);
//     }).catch(erorr =>{
//         console.error(erorr);
//     })
// }

