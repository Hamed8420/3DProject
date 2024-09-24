
/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

/**
 * NEXT SLIDE
 */

const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;

  if (slideEnd) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

/**
 * PREVIOUS SLIDE
 */

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = totalSlidableItems;
  } else {
    currentSlidePos--;
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

/**
 * RESPONSIVE
 */
window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});




/**============================================================================================== */

/*project */

const role= localStorage.getItem('role'); 
const card =document.querySelector('.card ');
const feature=document.querySelectorAll('.feature');

if(role === 'student'){
    card.style.display='none';
   feature.forEach(e =>{
    e.style.display='none'
   })

}
const allopject= ()=>
{

    const accesstoken= localStorage.getItem('access_token'); 
  fetch('http://localhost:3000/api/admin/Project/myProject?page=1&size=5',{
    headers:{
            'Authorization':`Bearer ${accesstoken}`,
        "Content-Type":"application/json",
        }
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
fetch('http://localhost:3000/api/getData/Project?page=1&size=5',{
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
    console.log(data)
        const menu_container =document.querySelector('.feature-list');
        data.projects.forEach(element => {
            const menu=document.createElement('li');

const box=document.createElement('div');
box.classList.add('card');
box.classList.add('feature-card');

const figure=document.createElement('figure');
figure.classList.add('card-banner');
figure.classList.add('img-holder');


const img = document.createElement('img');
img.src=  `http://localhost:3000/${element.projectImage}`;
img.classList.add('img-cover');

figure.appendChild(img);
box.appendChild(figure);



// box.appendChild(description);

const show=document.createElement('div');
show.classList.add('show');

const header=document.createElement('h4');
header.textContent=element.projectName;

const myButton = document.createElement("button");
const myLink = document.createElement("a");
myLink.innerHTML = "Show Project";
myLink.href = `project.html?id=${element.id}`;
myButton.appendChild(myLink);
show.appendChild(header)
show.appendChild(myButton);
box.appendChild(show);


const far =document.createElement('div');
far.classList.add('add');
far.innerHTML=`

<span id="btn-edit" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729;cursor: pointer; margin-top:10px 0; "  onclick="deleteProject(${element.id})"> delete</span>
<a href="updateProject.html?id=${element.id}" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729; margin-top:10px 0; cursor: pointer; ">Edit</a>

`
box.appendChild(far);
menu.appendChild(box)
menu_container.appendChild(menu);


        });

})
}
allopject();

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

/*=====================================================================*/
function deleteProject(id)
{


    const accesstoken= localStorage.getItem('access_token'); 
    fetch(`http://localhost:3000/api/admin/Project/deleteProject/${id}`,{
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
    fetch(`http://localhost:3000/api/admin/Project/deleteProject/${id}`,{
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
   
  
/*end project */

/*==================== stl */


const StlData = ()=>
{

const accesstoken= localStorage.getItem('access_token'); 
  fetch('http://localhost:3000/api/admin/STL/mySTL?page=1&size=5',{
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
fetch('http://localhost:3000/api/getData/STL?page=1&size=5',{
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

  const menu_container =document.querySelector('.fer-list');
data.stls.forEach((element)=>{

  const menu=document.createElement('li');

  const box=document.createElement('div');
  box.classList.add('card');
  box.classList.add('feature-card');
  
  const figure=document.createElement('figure');
  figure.classList.add('card-banner');
  figure.classList.add('img-holder');

const img = document.createElement('img');
img.src=  `http://localhost:3000/${element.image}`;

img.classList.add('img-cover');

figure.appendChild(img);
box.appendChild(figure);



const show=document.createElement('div');
show.classList.add('show');

const header=document.createElement('h4');
header.textContent=element.stlName;

const myButton = document.createElement("button");
const myLink = document.createElement("a");
myLink.innerHTML = "Show STL";
myLink.href =`stl.html?id=${element.id}` ;

myButton.appendChild(myLink);
show.appendChild(header)
show.appendChild(myButton);
box.appendChild(show);


const far =document.createElement('div');
far.classList.add('add');
far.innerHTML=`

<span id="btn-edit" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729;cursor: pointer; margin-top:10px 0; "  onclick="deleteData(${element.id})"> delete</span>
<a href="updateStl.html?id=${element.id}" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729; margin-top:10px 0; cursor: pointer; ">Edit</a>

`
box.appendChild(far);
menu.appendChild(box)
menu_container.appendChild(menu);


})

})
}

function main(){
StlData();
}       
main()
// لا يلزم استخدام هذا التابع في هذه الصفحة
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
/*========================================================================*/
function deleteData(id)
{


    const accesstoken= localStorage.getItem('access_token'); 
    fetch(`http://localhost:3000/api/admin/STL/deleteSTL/${id}`,{
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
    fetch(`http://localhost:3000/api/admin/STL/deleteSTL/${id}`,{
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
   
   
/*===================end stl */


/*============================================course */


const allCourse = ()=>{

  const accesstoken= localStorage.getItem('access_token'); 
    fetch('http://localhost:3000/api/admin/Course/myCourses?page=1&size=5',{
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
  fetch('http://localhost:3000/api/getData/Course?page=1&size=5',{
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
 
  const tbody = document.querySelector('.ger-list');
  data.courses.forEach((element)=>{
  
    const menu=document.createElement('li');

    const box=document.createElement('div');
    box.classList.add('card');
    box.classList.add('feature-card');
    
    const figure=document.createElement('figure');
    figure.classList.add('card-banner');
    figure.classList.add('img-holder');
  
     
    
    const img = document.createElement('img');
    img.src=  `http://localhost:3000/${element.courseImage}`;
    img.classList.add('img-cover');
   
    figure.appendChild(img)


  box.appendChild(figure);

  const der=document.createElement('div');
  der.classList.add('der')
  
  
  
  const name=document.createElement('div');
  name.classList.add('name');

  const levele=document.createElement('div');
  levele.classList.add('level');

  const header=document.createElement('h3');
  header.textContent=element.courseName;

  const leveler=document.createElement('h4');
  leveler.textContent=element.level;
  
  levele.appendChild(header);
  levele.appendChild(leveler);
  name.appendChild(levele);
  const time=document.createElement('div');
  time.classList.add('time');
  
  const person=document.createElement('p');
  const span1=document.createElement('span');
  const span2=document.createElement('span');
  
  span1.textContent=element.user.firstName;
  span2.textContent=element.user.lastName;
  const timer=document.createElement('span');
  timer.textContent=element.totalTime ;
  const minut=document.createElement('span');
  minut.textContent='min' ;
  timer.appendChild(minut)
  person.appendChild(span1);
  person.appendChild(span2);
  time.appendChild(person);
  time.appendChild(timer);
  name.appendChild(time);
  der.appendChild(name);
  
  const view=document.createElement('div');
  view.classList.add('view');
  
  const icon=document.createElement('div');
  icon.classList.add('icon');
  
  const rate=document.createElement('span');
  rate.textContent=element.rate;
  
  
  const link = document.createElement('i');
  
  link.classList.add('fa', 'fa-star');
  link.setAttribute('aria-hidden', 'true');
  icon.appendChild(rate);
  icon.appendChild(link);
  view.appendChild(icon);
  
  const price=document.createElement('h3');
  const dollar=document.createElement('span');
  dollar.textContent='$';
  price.textContent=element.price;
  price.appendChild(dollar);
  
  view.appendChild(price);
  der.appendChild(view);
  
  
  const far =document.createElement('div');
  far.classList.add('add');
  const moving =document.createElement('div');
  moving.classList.add('add');
  moving.innerHTML=`
  <a href="alllesson.html?id=${element.id}" style="border-radius:6px ;display:block;width:100%;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729; margin-top:10px 0; cursor: pointer; ">Show lesson</a>
  `
  far.innerHTML=`
  
  
  <span id="btn-edit" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729;cursor: pointer; margin-top:10px 0; "  onclick="deleteData(${element.id})"> delete</span>
  <a href="updateCourses.html?id=${element.id}" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729; margin-top:10px 0; cursor: pointer; ">Edit</a>
  `
  der.appendChild(moving);
  
  der.appendChild(far);
  box.appendChild(der);
  menu.appendChild(box)
  tbody.appendChild(menu);
  
  
  
  
  })
  
  })
  
  }
  
  function mer(){
      allCourse();
  }       
  mer()
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
  
  

    function addDat(){
        const token = localStorage.getItem('access_token');
      
        const file = document.getElementById('file').files[0];
        const formData = new FormData();
        formData.append('image',file);
      fetch('http://localhost:3000/api/user/changeImage',{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${token}`,
        // "Content-Type":"application/json",
      },
      body: formData
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
      fetch('http://localhost:3000/api/user/changeImage',{
      headers:{
                        Authorization:`Bearer ${newAccessToken}`,
                        // "Content-Type":"application/json",
                    },
                    body: formData
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

      /*==================================================================== */
      const fetchFeature = ()=>{

        const accesstoken= localStorage.getItem('access_token'); 
          fetch('http://localhost:3000/api/getData/Feature',{
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
        fetch('http://localhost:3000/api/getData/Feature',{
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
            
       
        })
        
        
        }
        function ner(){
            fetchFeature();
        }       
        ner()


        
/*kalsdfskdf sjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */
const profilebar=document.querySelector('.nav-open-btn');
const tri=document.querySelector('.tri');
const aer=document.querySelectorAll('.card .add')

function profilecheck(){
  const params = getQueryStringParams(window.location.search);
const ites = params.id;
console.log(ites);
const accesstoken= localStorage.getItem('access_token'); 
const apiUrl = `http://localhost:3000/api/user/Profile/${ites}`;  
fetch(apiUrl,{
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
fetch(apiUrl,{
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
    // const span=document.querySelector('span');
    // span.innerHTML=data.user.firstName
    console.log(data)

console.log(data,ites)
 if(data.fileOwner === true){
  profilebar.style.display='none';
  tri.style.display='none';
 }
})
}

profilecheck()

/*llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll */
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
  
   const ter=document.querySelector('.w-100');
   const allprofile= ()=>
{

    const accesstoken= localStorage.getItem('access_token'); 
  fetch('http://localhost:3000/api/user/Profile/1',{
    headers:{
            'Authorization':`Bearer ${accesstoken}`,
        "Content-Type":"application/json",
        }
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
fetch('http://localhost:3000/api/user/Profile/1',{
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
    ter.src=`http://localhost:3000/${data.user.userImage}`

})
}
allprofile();