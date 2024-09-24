

const searchInput = document.getElementById('searchInput');
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
        return;
      }
      const tbody = document.querySelector('.tbody');
      tbody.style.display='none';
      const list = document.createElement('div');
   
      const accesstoken= localStorage.getItem('access_token'); 
      items.forEach((element,i)=>{

        const der=document.createElement('div');
        der.classList.add('der')
        
        
        fetch('http://localhost:3000/api/getData/getCountSTL',{
            headers:{
                'Authorization':`Bearer ${accesstoken}`,
                "Content-Type":"application/json",
            },
        }).then(res=>{
            return res.json()
        }).then(dat =>{
            console.log(dat);
            const click=document.createElement('div');
        click.classList.add('click');
            const overlay=document.createElement('div');
        overlay.classList.add('overlay');
        const span=document.createElement('span');
        span.textContent=dat.count;
        overlay.appendChild(span);
        const image=document.createElement('div');
        image.classList.add('image');
        const img = document.createElement('img');
        img.src=  `http://localhost:3000/${element.courseImage}`;
        image.appendChild(img);
        overlay.appendChild(span);
        image.appendChild(overlay);
        click.appendChild(image);
        der.prepend(click)
        
        })
    
        
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
        console.log(element.rate)
        
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
        
        <div style="margin-top:10px;display: flex; justify-content: space-between;align-items: center;">
        <span id="btn-edit" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729;cursor: pointer; margin-top:10px 0; "  onclick="deleteData(${element.id})"> delete</span>
        <a href="updateCourses.html?id=${element.id}" style="border-radius:6px ; width:80px;text-align:center; color:#FFF;padding:6px 10px; background-color:#0F1729; margin-top:10px 0; cursor: pointer; ">Edit</a>
        </div>
        `
        der.appendChild(moving);
        
        der.appendChild(far);
        list.appendChild(der);
        
        
        })
        
      
        
      searchResults.appendChild(list);
    }

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

let icons=document.querySelectorAll('.sidebar a')
console.log(icons)