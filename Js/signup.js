function sendData(){
    const data ={
        firstName:document.getElementById('first').value,
        lastName:document.getElementById('last').value,
        email:document.getElementById('email').value,
        password:document.getElementById('password').value,
        confirmPassword:document.getElementById('confirmPassword').value,
        role:document.getElementById('select').value
    
    }
    fetch('http://localhost:3000/api/auth/signup',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(response =>{
        console.log(response)
       if(response.status === 200)
       {
           window.location.href= './login1.html'
        console.log(`this is true`)
        }else{
           return response.json();
       

       }
    }).then(dat =>{
      const error_text=document.querySelector('.error-text');
      error_text.style.display='block'
      error_text.innerHTML=dat.data[0].msg
        console.log(dat)
    }).catch(error =>{
        console.error("Erorr Sending data:",error)
    })
}