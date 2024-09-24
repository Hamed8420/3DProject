var selectedValues = [];

function showSelected(select) {
  var selectedValue = select.value;
  var selectedValuesDiv = document.getElementById("selected-values");
  if (selectedValue !== "") {
    if (selectedValues.includes(selectedValue)) {
      return;
    }
    selectedValues.push(selectedValue);
    selectedValuesDiv.innerHTML = "";
    for (var i = 0; i < selectedValues.length; i++) {
      var selectedValueSpan = document.createElement("span");
      selectedValueSpan.innerHTML = selectedValues[i];
      selectedValuesDiv.appendChild(selectedValueSpan);
    }
  }
}

const fetchSTL = ()=>{

    const accesstoken= localStorage.getItem('access_token'); 
      fetch('http://localhost:3000/api/getData/STL?page=1&size=9',{
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
    fetch('http://localhost:3000/api/getData/STL?page=1&size=9',{
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
        
        const select = document.getElementById("select");    

    
    data.stls.forEach((element,i)=>{
        const option = document.createElement("option");
        option.value = element.id;
        option.text = element.stlName;
        select.appendChild(option);

    })
    
    
    })
    
    
    }
    function main(){
        fetchSTL();
    }       
    main()

    /*======================================================================================================= */


    const btn = document.getElementById('btn');


btn .addEventListener('click',()=>{
    const token = localStorage.getItem('access_token');



      const formData = new FormData();
   
   const  file =document.getElementById('file-input');

Array.from(file.files).forEach(files =>{
    formData.append('file',files)
})
  console.log(document.getElementById('file1').files);
  const  image =document.getElementById('file1').files[0];

  formData.append('image',image);


  const  imageSTL =document.getElementById('file2');
  console.log(imageSTL)

Array.from(imageSTL.files).forEach(el =>{
    formData.append('imageSTL',el)
})


 const projectName = document.getElementById('title').value;
formData.append('projectName',projectName);

     const  description = document.getElementById('explain').value;
      formData.append('description',description);

      const  length = document.getElementById('length').value;
      formData.append('length',length);
      const  width = document.getElementById('width').value;
      formData.append('width',width);

      const  height = document.getElementById('height').value;
      formData.append('height',height);


    //   const optionSelcte=[];
    //   for (let i = 0; i < mySelect.options.length; i++) {
    //     if (mySelect.options[i].selected) {
        
    //       optionSelcte.push(mySelect.options[i].value);
    //       console.log(optionSelcte)
    //     }
    // }
    const select = document.getElementById('select');
    const selectedOptions = Array.from(select.options).filter(option => option.selected);

    const selectedValues = selectedOptions.map(option => option.value);
    console.log(selectedValues)
   const Selectmap=JSON.stringify(selectedValues)
    formData.append("stlId",Selectmap);

    // selectedValues.forEach(value => {
    // });
    // formData.append("stlId", optionSelcte);
   
    // getSelectValue();
   
fetch('http://localhost:3000/api/admin/Project/addProject',{
    method:"POST",
    headers:{
        "Authorization":`Bearer ${token}`
    },
    body:formData
}).then(response =>{
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
fetch('http://localhost:3000/api/admin/Project/addProject',{
    headers:{
                        Authorization:`Bearer ${newAccessToken}`,
                        
                    },
                    body:formData
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
    console.log(data,'تم ارسال البيانات');
}).catch(erorr =>{
    console.erorr(erorr,'الرجاء التحقق من صحة العمل')
});
// window.location.href='./allproject.html'

})


// function filterItemsByRating(minRating) {
//     const filteredItems = items.filter(item => item.rating >= minRating);
//     const itemList = document.getElementById('item-list');
//     itemList.innerHTML = '';
//     filteredItems.forEach(item => {
//       const itemElement = document.createElement('div');
//       itemElement.textContent = ${item.name} (${item.rating});
//       itemList.appendChild(itemElement);
//     });
//   }
  
//   const ratingFilter = document.getElementById('rating-filter');
//   ratingFilter.addEventListener('change', () => {
//     const minRating = parseInt(ratingFilter.value);
//     filterItemsByRating(minRating);
//   });