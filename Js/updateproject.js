

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



const fetchProject = ()=>{

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
        console.log(option)

    })
    
    
    })
    
    
    }
    function main(){
        fetchProject();
    }       
    main()
function updateproject()
{
    const params = getQueryStringParams(window.location.search);
        const itemId = params.id;
      console.log(itemId);
    const newAccessToken = localStorage.getItem("access_token");
      const apiUrl = `http://localhost:3000/api/admin/Project/updateProject/${itemId}`;   
      
      const formData = new FormData();
   
   const  file =document.getElementById('file-input');
   Array.from(file.files).forEach(files =>{
    formData.append('file',files)
})
  console.log(document.getElementById('file1').files);
  const  image =document.getElementById('file1').files[0];

  formData.append('imageSTL',image);


  const  imageSTL =document.getElementById('file2');
  Array.from(imageSTL.files).forEach(el =>{
    formData.append('image',el)
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

      const select = document.getElementById('select');
      const selectedOptions = Array.from(select.options).filter(option => option.selected);
  
      const selectedValues = selectedOptions.map(option => option.value);
      console.log(selectedValues)
     const Selectmap=JSON.stringify(selectedValues)
      formData.append("stlId",Selectmap);

      /*




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
 */

   
  fetch(apiUrl,{
    method:'POST',
    headers:{
                      Authorization:`Bearer ${newAccessToken}`,
                      // "Content-Type":"application/json",
                  },
                  body: formData
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
fetch(apiUrl,{
  headers:{
                      Authorization:`Bearer ${newAccessToken}`,
                      
                  },
                  body: formData
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
                  // window.location.href='./allproject.html';
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
