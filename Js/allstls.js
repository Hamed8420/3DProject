const StlData = ()=>
{

const accesstoken= localStorage.getItem('access_token'); 
  fetch('http://localhost:3000/api/getData/STL?page=1&size=12',{
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
fetch('http://localhost:3000/api/getData/STL?page=1&size=12',{
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
data.stls.forEach((element,i)=>{
// const header=document.createElement('h4');
// header.textContent=element.serviceName;
const card=document.createElement('div');
card.classList.add('card')

const img = document.createElement('img');
img.src=  `http://localhost:3000/${element.stlImage}`;
img.classList.add('img-cover1');

card.appendChild(img);

const card_last=document.createElement('div');
card_last.classList.add('card-last')

const header=document.createElement('h2');
header.textContent=element.stlName;

// const price=document.createElement('h2');
// price.textContent=element.price;

card_last.appendChild(header);
// card_last.appendChild(price);

card.appendChild(card_last);


// const description= document.createElement('h4');
// description.textContent=element.description;

// card.appendChild(description);

// const profile_card=document.createElement('div');
// profile_card.classList.add('profile-card');

// const imge = document.createElement('img');
// imge.src=  `http://localhost:3000/${element.userImage}`;
// imge.classList.add('profile-banner');

// profile_card.appendChild(imge);

// const prof=document.createElement('div');
// prof.classList.add('prof');

// const card_title= document.createElement('p');
// card_title.classList.add('card-title')
// card_title.textContent=element.user.firstName;
// prof.appendChild(card_title);

// profile_card.appendChild(prof);

// card.appendChild(profile_card);

const myButton = document.createElement("button");
myButton.classList.add('btn')
const myLink = document.createElement("a");
myLink.innerHTML = "See More";
// myLink.href =`onestl.html?id=${element.id}` ;
myLink.href =`stl.html?id=${element.id}` 
myButton.appendChild(myLink);
card.appendChild(myButton);
list.appendChild(card);


})

})
}

function main(){
StlData();
}       
main()

const searchInput = document.getElementById('search');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function() {
  const searchTerm = searchInput.value.toLowerCase();

  fetch('http://localhost:3000/api/getData/STL?page=1&size=12')
    .then(response => response.json())
    .then(data => {
      const matchingItems = data.stls.filter(item => item.stlName.toLowerCase().includes(searchTerm));
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
  const tbody = document.querySelector('.list');
  tbody.style.display='none';
  const list = document.createElement('div');

  items.forEach((element,i)=>{

    const der=document.createElement('div');
    der.classList.add('der')
    
    
    const card=document.createElement('div');
card.classList.add('card')

const img = document.createElement('img');
img.src=  `http://localhost:3000/${element.stlImage}`;
img.classList.add('img-cover1');

card.appendChild(img);

const card_last=document.createElement('div');
card_last.classList.add('card-last')

const header=document.createElement('h2');
header.textContent=element.stlName;

card_last.appendChild(header);

card.appendChild(card_last);



const myButton = document.createElement("button");
myButton.classList.add('btn')
const myLink = document.createElement("a");
myLink.innerHTML = "See More";

myLink.href = `stl.html?id=${element.id}` 
myButton.appendChild(myLink);
card.appendChild(myButton);
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



