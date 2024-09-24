const fetchIdMetral = ()=>{

  const accesstoken= localStorage.getItem('access_token'); 
    fetch('http://localhost:3000/api/getData/material?page=1&size=9',{
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
  fetch('http://localhost:3000/api/getData/material?page=1&size=9',{
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

  data.materials.forEach((element)=>{
      const option = document.createElement("option");
      option.value = element.id;
      option.text = element.materialName;
      select.appendChild(option);

  })
  
  
  })
  
  
  }
  function main(){
      fetchIdMetral();
  }       
  main()


  /*============================================================================ */
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
  
    function getId(){
        const params = getQueryStringParams(window.location.search);
        const itemId = params.id;
        const itemword=params.word;
      console.log(itemId);
      console.log(itemword)
      const accesstoken= localStorage.getItem('access_token'); 
      
      const url=`http://localhost:3000/api/getData/STL/${itemId}`
      
      fetch(url,{
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
      fetch(url,{
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
        const num=document.getElementById('num');
      num.value=data.stl.user.id;
      console.log(num.value)
      // data.lessons.forEach(element => {
      
      // });
      })
      }
    //   getId();


   

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
    /*============================================================================ */
    // var selectedValues = [];

    // function showSelected(select) {
    //   var selectedValue = select.value;
    //   var selectedValuesDiv = document.getElementById("selected-values");
    //   if (selectedValue !== "") {
    //     if (selectedValues.includes(selectedValue)) {
    //       return;
    //     }
    //     selectedValues.push(selectedValue);
    //     selectedValuesDiv.innerHTML = "";
    //     for (var i = 0; i < selectedValues.length; i++) {
    //       var selectedValueSpan = document.createElement("span");
    //       selectedValueSpan.innerHTML = selectedValues[i];
    //       selectedValuesDiv.appendChild(selectedValueSpan);
    //     }
    //   }
    // }
    

    /*============================================================================*/

    /*============================================================================== */
    // const fetchfeature = ()=>{

    //     const accesstoken= localStorage.getItem('access_token'); 
    //       fetch('http://localhost:3000/api/getData/Feature',{
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
    //     fetch('http://localhost:3000/api/getData/Feature',{
    //                     headers:{
    //                         Authorization:`Bearer ${newAccessToken}`,
    //                         "Content-Type":"application/json",
    //                     },
    //             }).then(newResponse=>{
    //                 return newResponse.json();
    //             }).then(newData=>{
    //                 console.log('Data Fetsh Successfully:',newData);
                   
        
    //             })
              
    //     })
        
    //     }else{
    //         return response.json();
    //     }
    //     }).then(data =>{
            
    //         const select = document.getElementById("test");    
    
        
    //     data.feature.forEach((element,i)=>{
    //         const option = document.createElement("option");
    //         option.value = element.id;
    //         option.text = element.featureName;
    //         select.appendChild(option);
    
    //     })
        
        
    //     })
        
        
    //     }
    //     function main1(){
    //         fetchfeature();
    //     }       
    //     main1()

//         var selectoption = [];
// function Selected(sle) {
//   var  slectValution= sle.value;/*selectedValue
//   selectedValues
//   */
//   var selectedValuesDiv = document.getElementById("selecte-value");
//   if (slectValution !== "") {
//     if (selectoption.includes(slectValution)) {
//       return;
//     }
//     selectoption.push(slectValution);
//     selectedValuesDiv.innerHTML = "";
//     for (var i = 0; i < selectoption.length; i++) {
//       var selectedValueSpan = document.createElement("span");
//       selectedValueSpan.innerHTML = selectoption[i];
//       selectedValuesDiv.appendChild(selectedValueSpan);
//     }
//   }
// }



/*=========================================================================================== */
/*=========================================================================================== */
/*=========================================================================================== */
const btn = document.getElementById('btn');
function addStl(){

    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
    const itemword=params.word;
    console.log(itemId);
    console.log(itemword)
    
const item=localStorage.getItem('usernum');
console.log(item);

const select = document.getElementById('select').value
console.log(select)

// const se = Array.from(select.options).filter(option => option.selected);

// const selectedValues = se.map(option => option.value);
// console.log(selectedValues)
// const Selectmap=JSON.stringify(selectedValues)

  const token = localStorage.getItem('access_token');
//   const formData = new FormData();
  const data={
    color: document.getElementById('color').value,
    width:document.getElementById('width').value,
    height:document.getElementById('hight').value,
    length:document.getElementById('lenght').value,
    ownerId:item,
    material:document.getElementById('select').value,
    address:document.getElementById('adress').value,

  }
  console.log(data)
 
  
//   formData.append('color',color);

//   const  width = document.getElementById('width').value;
//   formData.append('width',width);

//   const  height = document.getElementById('hight').value;
//   formData.append('height',height);

//   const  length = document.getElementById('lenght').value;
//   formData.append('length',length);


  // const num=document.getElementById('num');
  // num.value=data.stl.user.id;


  
//   formData.append('ownerId',item);

 
    // formData.append("material",Selectmap);




    

//     const  adress = document.getElementById('adress').value;
//   formData.append('address',adress);



    
     
    //   const tesr = document.getElementById('test');
    //   const tr = Array.from(tesr.options).filter(option => option.selected);
  
    //   const Selecttest = tr.map(option => option.value);
    //   console.log(Selecttest)
    //  const Selctma=JSON.stringify(Selecttest)
    //   formData.append("featureId",Selctma);


    
      
fetch(`http://localhost:3000/api/payment/addOrder/${itemId}/${itemword}`,{
    method:"POST",
    headers:{
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json",
    },
    body:JSON.stringify(data)
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
fetch(`http://localhost:3000/api/payment/addOrder/${itemId}/${itemword}`,{
    method:"POST",
    headers:{
                        Authorization:`Bearer ${newAccessToken}`,
                        // 'Content-Type':'multipart/form-data', 
                        "Content-Type":"application/json", 
                    },
                    body:JSON.stringify({data})
}).then(newResponse =>{
    return newResponse.json();
}).then(newData =>{
console.log(newData)
})
})
    }else{
       return response.json();
    }
    
}).then(dat =>{
    console.log(dat,'تم ارسال البيانات');
}).catch(erorr =>{
    console.erorr(erorr,'الرجاء التحقق من صحة العمل')
});

// window.location.href='./allStl.html'
}
