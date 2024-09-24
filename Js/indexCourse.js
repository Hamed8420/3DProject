
const allCourse = ()=>{

    const accesstoken= localStorage.getItem('access_token'); 
      fetch('http://localhost:3000/api/getData/Course?page=1&size=12',{
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
    fetch('http://localhost:3000/api/getData/Course?page=1&size=12',{
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
        const list = document.querySelector('.list');
    data.courses.forEach((element,i)=>{
    
    const card=document.createElement('div');
    card.classList.add('card')
    
    const img = document.createElement('img');
    img.src=  `http://localhost:3000/${element.courseImage}`;
    img.classList.add('img-cover1');
    
    card.appendChild(img);

    
    const card_last=document.createElement('div');
card_last.classList.add('card-last')


const header=document.createElement('h2');
header.textContent=element.courseName;

const leveler=document.createElement('h3');
leveler.textContent=element.level;

card_last.appendChild(header);
card_last.appendChild(leveler);

card.appendChild(card_last);


const profile_card=document.createElement('div');
profile_card.classList.add('profile-card');

// const imge = document.createElement('img');
// imge.src=  `http://localhost:3000/${element.userImage}`;
// imge.classList.add('profile-banner');

// profile_card.appendChild(imge);

const prof=document.createElement('div');
prof.classList.add('prof');

const card_title= document.createElement('p');
card_title.classList.add('card-title')
card_title.textContent=element.user.firstName;

const timer=document.createElement('span');
timer.textContent=element.totalTime ;
card_title.classList.add('card-title')
const minut=document.createElement('span');
minut.textContent='min' ;
timer.appendChild(minut)

prof.appendChild(card_title);
prof.appendChild(timer)

profile_card.appendChild(prof);

card.appendChild(profile_card);

    
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
    card.appendChild(view);
    
    
    // const far =document.createElement('div');
    // far.classList.add('add');
    const moving =document.createElement('div');
    moving.classList.add('add');
    moving.innerHTML=`
    <a href="indexlesson.html?id=${element.id}" style="border-radius:6px ;display:block;width:100%;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729; margin-top:10px 0; cursor: pointer; ">Show lesson</a>
    `
    // far.innerHTML=`
    
    // <div style="margin-top:10px;display: flex; justify-content: space-between;align-items: center;">
    // <span id="btn-edit" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729;cursor: pointer; margin-top:10px 0; "  onclick="deleteData(${element.id})"> delete</span>
    // <a href="updateCourses.html?id=${element.id}" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729; margin-top:10px 0; cursor: pointer; ">Edit</a>
    // </div>
    // `
    card.appendChild(moving);
    
    // der.appendChild(far);
    list.appendChild(card);
    
    
    
    
    })
    
    })
    
    }
    
    function main(){
        allCourse();
    }       
    main()














    /*========================================================================= */

    const searchInput = document.getElementById('search');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();

      fetch('http://localhost:3000/api/getData/Course?page=1&size=12')
        .then(response => response.json())
        .then(data => {
          const matchingItems = data.courses.filter(item => item.courseName.toLowerCase().includes(searchTerm));
          displayResults(matchingItems);
        })
        .catch(error => console.error(error));
    });

    function displayResults(items) {
      searchResults.innerHTML = '';

      if (items.length === 0) {
        searchResults.textContent = 'No results found.';
        searchResults.style.color='white'
        return;
      }
      const tbody = document.querySelector('.list');
      tbody.style.display='none';
      const list = document.createElement('div');
      // items.forEach(item => {
      //   const listItem = document.createElement('li');
      //   listItem.textContent = item.courseName;
      //   list.appendChild(listItem);
      // });
      items.forEach((element,i)=>{

        const der=document.createElement('div');
        der.classList.add('der')
        
        
        const card=document.createElement('div');
        card.classList.add('card')
        
        const img = document.createElement('img');
        img.src=  `http://localhost:3000/${element.courseImage}`;
        img.classList.add('img-cover1');
        
        card.appendChild(img);
    
        
        const card_last=document.createElement('div');
    card_last.classList.add('card-last')
    
    
    const header=document.createElement('h2');
    header.textContent=element.courseName;
    
    const leveler=document.createElement('h2');
    leveler.textContent=element.level;
    
    card_last.appendChild(header);
    card_last.appendChild(leveler);
    
    card.appendChild(card_last);
    
    
    const profile_card=document.createElement('div');
    profile_card.classList.add('profile-card');
    
    const imge = document.createElement('img');
    imge.src=  `http://localhost:3000/${element.userImage}`;
    imge.classList.add('profile-banner');
    
    profile_card.appendChild(imge);
    
    const prof=document.createElement('div');
    prof.classList.add('prof');
    
    const card_title= document.createElement('p');
    card_title.classList.add('card-title')
    card_title.textContent=element.user.firstName;
    
    const timer=document.createElement('p');
    timer.textContent=element.totalTime ;
    card_title.classList.add('card-title')
    const minut=document.createElement('span');
    minut.textContent='min' ;
    timer.appendChild(minut)
    
    prof.appendChild(card_title);
    prof.appendChild(timer)
    
    profile_card.appendChild(prof);
    
    card.appendChild(profile_card);
    
        
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
        card.appendChild(view);
        
        
        // const far =document.createElement('div');
        // far.classList.add('add');
        const moving =document.createElement('div');
        moving.classList.add('add');
        moving.innerHTML=`
        <a href="indexlesson.html?id=${element.id}" style="border-radius:6px ;display:block;width:100%;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729; margin-top:10px 0; cursor: pointer; ">Show lesson</a>
        `
        // far.innerHTML=`
        
        // <div style="margin-top:10px;display: flex; justify-content: space-between;align-items: center;">
        // <span id="btn-edit" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729;cursor: pointer; margin-top:10px 0; "  onclick="deleteData(${element.id})"> delete</span>
        // <a href="updateCourses.html?id=${element.id}" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729; margin-top:10px 0; cursor: pointer; ">Edit</a>
        // </div>
        // `
        card.appendChild(moving);
        
        // der.appendChild(far);
        list.appendChild(card);
        
        
         
        
        })
        
      
        searchResults.appendChild(list);
    }


    /*======================================================================== */
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
    
    