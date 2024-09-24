// const fetchData = ()=>{

//     const accesstoken= localStorage.getItem('access_token'); 
//       fetch('http://localhost:3000/api/getData/Services?page=1&size=9',{
//         headers:{
//             'Authorization':`Bearer ${accesstoken}`,
//             "Content-Type":"application/json",
//         },
//     }).then(response =>{
//         if(response.status === 500)
//         {
//         const refreshToken=localStorage.getItem("refresh_token");
//     fetch('http://localhost:3000/api/auth/refreshToken',{
//     method:"POST",
//     headers:{
//     "Content-Type":"application/json",
//     },
//     body:JSON.stringify({
//     token:refreshToken
//     }),
//     }).then(refreshResponse =>{
//     if(refreshResponse.ok)
//     {
//     return refreshResponse.json();
    
    
//     }else{
//     console.erorr('refresh token is invalid or expired.');
//     }
//     }).then(data=>{
//     localStorage.setItem("access_token",data.accessToken);
//     const newAccessToken = localStorage.getItem("access_token");
//     fetch('http://localhost:3000/api/getData/Services?page=1&size=9',{
//                     headers:{
//                         Authorization:`Bearer ${newAccessToken}`,
//                         "Content-Type":"application/json",
//                     },
//             }).then(newResponse=>{
//                 return newResponse.json();
//             }).then(newData=>{
//                 console.log('Data Fetsh Successfully:',newData);
//                 // console.log("Data fetched SuccessFully:", data);
//                 // console.log(data.services[0].serviceImage);
//                 // const featuer = document.querySelector('.featuer');
//                 // const feat = document.querySelector('.feat-box')
//                 // data.services.forEach((element,i)=>{
//                 //     console.log(element)
//                 //     const img = document.createElement('img');
//                 //     img.src=  `http://localhost:3000/${element.serviceImage}`;
//                 //     const header=document.createElement('h4');
//                 //     header.textContent=element.serviceName;
//                 //     const description= document.createElement('p');
//                 //     description.textContent=element.description;
//                 //     const feat=document.createElement('div');
//                 //     feat.classList.add('feat-box')
//                 //     feat.appendChild(img);
//                 //     feat.appendChild(header);
//                 //     feat.appendChild(description);
//                 //     featuer.appendChild(feat);
                
                 
//                 // })
    
//             })
          
//     })
    
//     }else{
//         return response.json();
//     }
//     }).then(data =>{
//     const featuer = document.querySelector('.grid-list1');
//     const feat = document.querySelector('.product-card')
//     data.services.forEach((element,i)=>{
//         const card_banner=document.createElement('div');
//         card_banner.classList.add('card-banner')
//         card_banner.classList.add('img-holder')

//     const img = document.createElement('img');
//     img.src=  `http://localhost:3000/${element.serviceImage}`;
//     img.classList.add('img-cover')
//     card_banner.appendChild(img)
//     const card_content=document.createElement('div');
//     card_content.classList.add('card-content')

//     const header=document.createElement('h3');
//     header.classList.add('card-title')
//     header.classList.add('h3')
//     header.textContent=element.serviceName;

//     const description= document.createElement('p');
//     description.classList.add('card-price')
//     description.textContent=element.description;

//     card_content.appendChild(header);
//     card_content.appendChild(description);


//     const feat=document.createElement('div');
//     feat.classList.add('product-card')
//     feat.appendChild(card_banner);
//     feat.appendChild(card_content);
    
//     // const far =document.createElement('div');
//     // far.classList.add('add');
//     // far.innerHTML=`
    
//     // <span id="btn-edit" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729;cursor: pointer; "  onclick="deleteData(${element.id})"> delete</span>
//     // <a href="updateService.html?id=${element.id}" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729;cursor: pointer; ">Edit</a>
    
//     // `
//     // feat.appendChild(far);
//     featuer.appendChild(feat);
    
    
//     })
    
//     })
    
    
//     }
//     function main(){
//     fetchData();
//     }       
//     main()


const fetchOrder = ()=>{

    const accesstoken= localStorage.getItem('access_token'); 
      fetch('http://localhost:3000/api/payment/getOrder?page=1&size=6',{
        headers:{
            'Authorization':`Bearer ${accesstoken}`,
            "Content-Type":"application/json",
        },
    }).then(response =>{
        if(response.status === 500)
        {
        const refreshToken=localStorage.getItem("refresh_token");
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
    
    
    }else{
    console.erorr('refresh token is invalid or expired.');
    }
    }).then(data=>{
    localStorage.setItem("access_token",data.accessToken);
    const newAccessToken = localStorage.getItem("access_token");
    fetch('http://localhost:3000/api/payment/getOrder?page=1&size=5',{
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
    const tbody = document.querySelector('tbody');
    
    data.orders.forEach((element,i)=>{
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        const cell3 = document.createElement('td');
        const cell4 = document.createElement('td');
        const cell5 = document.createElement('td');
        const cell6 = document.createElement('td');
        const cell7 = document.createElement('td');
        const cell8 = document.createElement('td');
        const cell9 = document.createElement('td');

        cell1.textContent = i
        cell2.textContent = element.orderId;
        cell3.textContent = element.orderType; 
        cell4.textContent = element.color;
        cell5.textContent = element.width; 
        cell6.textContent = element.length;
        cell7.textContent = element.height; 
        cell8.textContent = element.material;
        cell9.textContent = element.address;
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell8);
        row.appendChild(cell9);
        tbody.appendChild(row);

    
    
    })
    
    })
    
    
    }
    function main(){
        fetchOrder();
    }       
    main()



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

  
      const fetchcountstl = ()=>{
        const count=document.querySelector('.sales .left h1')
        fetch('http://localhost:3000/api/getData/getCountSTL',{
          headers:{
            "Content-Type":"application/json",
          }
                }).then(response =>{
                  return response.json()
                }).then(data =>{
                  console.log(data)
                  count.textContent=data.count
                })

      }
      fetchcountstl()


      const fetchcountproject = ()=>{
        const count=document.querySelector('.stl .left h1')
        fetch('http://localhost:3000/api/getData/getCountProject',{
          headers:{
            "Content-Type":"application/json",
          }
                }).then(response =>{
                  return response.json()
                }).then(data =>{
                  console.log(data)
                  count.textContent=data.count
                })

      }
      fetchcountproject()


      const fetchcountcourse = ()=>{
        const count=document.querySelector('.expenses .left h1')
        fetch('http://localhost:3000/api/getData/getCountCourse',{
          headers:{
            "Content-Type":"application/json",
          }
                }).then(response =>{
                  return response.json()
                }).then(data =>{
                  console.log(data)
                  count.textContent=data.count
                })

      }
      fetchcountcourse()



      const bar=document.querySelector('.bar .fa-bars');
const navbar=document.querySelector('.side');
const sidebar=document.querySelector('.sidebar');
const bars=document.querySelector('.bars .fa-times');
const term=document.querySelector('.bars');




bar.addEventListener('click',()=>{
    console.log(`klsfgjdfklgj`)
navbar.style.display="block"
sidebar.style.width="230px"
term.style.display='block'

})

bars.addEventListener('click',()=>{
    console.log(`klsfgjdfklgj`)
    navbar.style.display="none"
sidebar.style.width="0"

})