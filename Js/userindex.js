let move= document.querySelector('.move');
const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener(type, callback);
      }
    } else {
      elem.addEventListener(type, callback);
    }
  }
  
  
  
  /**
   * navbar toogle
   */
  move.addEventListener('click',()=>{
    window.location.href='./profil.html';
  })
  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const overlay = document.querySelector("[data-overlay]");
  const nad=document.querySelector('.nad');
  const searsh=document.querySelector('.input-wrapper');
  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    nad.classList.toggle('delelte');
   
  }
  
  addEventOnElem(navTogglers, "click", toggleNavbar);


/*===============================start Service============================= */
const fetchData = ()=>{

  const accesstoken= localStorage.getItem('access_token'); 
    fetch('http://localhost:3000/api/getData/Services?page=1&size=9',{
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
  fetch('http://localhost:3000/api/getData/Services?page=1&size=9',{
                  headers:{
                      Authorization:`Bearer ${newAccessToken}`,
                      "Content-Type":"application/json",
                  },
          }).then(newResponse=>{
              return newResponse.json();
          }).then(newData=>{
              console.log('Data Fetsh Successfully:',newData);
              // console.log("Data fetched SuccessFully:", data);
              // console.log(data.services[0].serviceImage);
              // const featuer = document.querySelector('.featuer');
              // const feat = document.querySelector('.feat-box')
              // data.services.forEach((element,i)=>{
              //     console.log(element)
              //     const img = document.createElement('img');
              //     img.src=  `http://localhost:3000/${element.serviceImage}`;
              //     const header=document.createElement('h4');
              //     header.textContent=element.serviceName;
              //     const description= document.createElement('p');
              //     description.textContent=element.description;
              //     const feat=document.createElement('div');
              //     feat.classList.add('feat-box')
              //     feat.appendChild(img);
              //     feat.appendChild(header);
              //     feat.appendChild(description);
              //     featuer.appendChild(feat);
              
               
              // })
  
          })
        
  })
  
  }else{
      return response.json();
  }
  }).then(data =>{
  const grid_list = document.querySelector('.grid-list1');

  data.services.forEach((element,i)=>{
  const img = document.createElement('img');
  img.classList.add('img-cover');
  img.src=  `http://localhost:3000/${element.serviceImage}`;
  const header=document.createElement('h3');
  header.textContent=element.serviceName;
  header.classList.add('card-title');
  header.classList.add('h3');

  const description= document.createElement('p');
  description.classList.add('card-price');
  description.textContent=element.description;

  
  const product_card=document.createElement('div');
  product_card.classList.add('product-card')//الاب


  const card_banne=document.createElement('div');
  card_banne.classList.add('card-banne')
  card_banne.classList.add('img-holder')

  card_banne.appendChild(img);
  product_card.appendChild( card_banne);

  const card_content=document.createElement('div');
  card_content.classList.add('card-content');

  card_content.appendChild(header);


  card_content.appendChild(description);
  product_card.appendChild(card_content);
  grid_list.appendChild( product_card)
  
  })
  
  })
  
  
  }
  function main(){
  fetchData();
  }       
  main()
/*============================== end sservice============================= */
/*jksdf skdjf============================================================== */


function logout(){
  const logoutt=localStorage.getItem('refresh_token')
    // const date ={
    //   token:
    //       };
          fetch('http://localhost:3000/api/auth/logout',{
            method:'DELETE',
            body:JSON.stringify({token:logoutt}),
        headers:{
          'Content-Type':'application/json'
        }
          }).then(response =>{
  if(response.status==200){
  return response.json();
  }else{
  console.log(`this is a wrong`)
  }
          }).then(data =>{
          console.log(data)
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');

            window.location.href='./login1.html';
          })
  
  }

/*======================================================================== */
  