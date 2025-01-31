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

    
    data.materials.forEach((element,i)=>{
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
    

    /*============================================================================*/

    /*============================================================================== */
    const fetchfeature = ()=>{

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
            
            const select = document.getElementById("test");    
    
        
        data.feature.forEach((element,i)=>{
            const option = document.createElement("option");
            option.value = element.id;
            option.text = element.featureName;
            select.appendChild(option);
    
        })
        
        
        })
        
        
        }
        function main1(){
            fetchfeature();
        }       
        main1()

        var selectoption = [];
function Selected(sle) {
  var  slectValution= sle.value;/*selectedValue
  selectedValues
  */
  var selectedValuesDiv = document.getElementById("selecte-value");
  if (slectValution !== "") {
    if (selectoption.includes(slectValution)) {
      return;
    }
    selectoption.push(slectValution);
    selectedValuesDiv.innerHTML = "";
    for (var i = 0; i < selectoption.length; i++) {
      var selectedValueSpan = document.createElement("span");
      selectedValueSpan.innerHTML = selectoption[i];
      selectedValuesDiv.appendChild(selectedValueSpan);
    }
  }
}



/*=========================================================================================== */
/*=========================================================================================== */
/*=========================================================================================== */
const btn = document.getElementById('btn');
function addStl(){
  const token = localStorage.getItem('access_token');
  const formData = new FormData();
  const  file =document.getElementById('file-input');
        for (let i = 0; i < file.files.length; i++) {
         formData.append('file', file.files[i]);
       }


       const  stlImg =document.getElementById('file1').files[0];

         formData.append('stlImg',stlImg);


         const  images =document.getElementById('file2');
           for (let i = 0; i < images.files.length; i++) {
            formData.append('images', images.files[i]);
         
          }

           const  image =document.getElementById('file3').files[0];
 formData.append('image',image);


  const stlName = document.getElementById('title').value;
formData.append('stlName',stlName);

     const  description = document.getElementById('explain').value;
      formData.append('description',description);

      const  length = document.getElementById('length').value;
      formData.append('length',length);
      const  width = document.getElementById('width').value;
      formData.append('width',width);

      const  height = document.getElementById('height').value;
      formData.append('height',height);

      const  price = document.getElementById('price').value;
      formData.append('price',price);
            const  color = document.getElementById('color').value;
  
      formData.append('colorName',color);
    //   const select1=document.querySelector('#test')
    //   const selectedOptions = select1.selectedOptions;
    //   for (let i = 0; i < selectedOptions.length; i++) {
    //     formData.append('featureId', selectedOptions[i].value);
    //   }

      const tesr = document.getElementById('test');
      const tr = Array.from(tesr.options).filter(option => option.selected);
  
      const Selecttest = tr.map(option => option.value);
      console.log(Selecttest)
     const Selctma=JSON.stringify(Selecttest)
      formData.append("featureId",Selctma);


    //   const select2=document.querySelector('#select')
    //   const selectedOption = select2.selectedOptions;
    //   for (let i = 0; i < selectedOption.length; i++) {
    //     formData.append('materialId', selectedOption[i].value);
    //   }

    const select = document.getElementById('select');
    const se = Array.from(select.options).filter(option => option.selected);

    const selectedValues = se.map(option => option.value);
    console.log(selectedValues)
   const Selectmap=JSON.stringify(selectedValues)
    formData.append("materialId",Selectmap);
      
fetch('http://localhost:3000/api/admin/STL/addSTL',{
    method:"POST",
    headers:{
        "Authorization":`Bearer ${token}`,
        // "Content-Type":"application/json",
        
    },
    body:formData
}).then(response =>{
    if(response.message === "jwt expired")
    {
const refreshToken=localStorage.getItem('refresh_token');
fetch('http://localhost:3000/api/auth/refreshToken',{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        // 'Content-Type':'multipart/form-data',  
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
fetch('http://localhost:3000/api/admin/STL/addSTL',{
    method:"POST",
    headers:{
                        Authorization:`Bearer ${newAccessToken}`,
                        // 'Content-Type':'multipart/form-data',  
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

// window.location.href='./allStl.html'
}

// btn .addEventListener('click',()=>{
//     const token = localStorage.getItem('access_token');

    
//       const formData = new FormData();
        
//       const  file =document.getElementById('file-input');
//       for (let i = 0; i < file.files.length; i++) {
//        formData.append('file', file.files[i]);
    
//      }


//   const  stlImg =document.getElementById('file1').files[0];

//   formData.append('stlImg',stlImg);

//   const  images =document.getElementById('file2');
//   for (let i = 0; i < images.files.length; i++) {
//    formData.append('images', images.files[i]);

//  }

//  const  image =document.getElementById('file3').files[0];
//  formData.append('image',image);

//  const stlName = document.getElementById('title').value;
// formData.append('stlName',stlName);

//      const  description = document.getElementById('explain').value;
//       formData.append('description',description);

//       const  length = document.getElementById('length').value;
//       formData.append('length',length);
//       const  width = document.getElementById('width').value;
//       formData.append('width',width);

//       const  height = document.getElementById('height').value;
//       formData.append('height',height);

//       const  price = document.getElementById('price').value;
//       formData.append('price',price);
//       const  color = document.getElementById('color').value;
  
//       formData.append('colorName',color);


// const stl1=new Array();
// const test = Array.from(document.getElementById("test").selectedOptions);
// test.forEach(option => {
//     console.log(option.value);
//     stl1.push(option.value);
// });
// const myfeature = JSON.stringify(stl1);
//     console.log(myfeature)
// formData.append('featureId', myfeature);



//  const stl2=new Array();
//       const select = Array.from(document.getElementById("select").selectedOptions);
//       select.forEach(option => {
//           console.log(option.value);
//           stl2.push(option.value);
//       });
//       console.log(stl2)
//       const myMatrail = JSON.stringify(stl2);
//       console.log(myMatrail)
//       formData.append('materialId', myMatrail);



// fetch('http://localhost:3000/api/admin/STL/addSTL',{
//     method:"POST",
//     headers:{
//         "Authorization":`Bearer ${token}`,
//     },
//     body:formData
// }).then(response =>{
//     if(response.status === 500)
//     {
// const refreshToken=localStorage.getItem('refresh_token');
// fetch('http://localhost:3000/api/auth/refreshToken',{
//     method:"POST",
//     headers:{
//         "Content-Type":"application/json",
//     },
//     body:JSON.stringify({
//         token:refreshToken
//         }),
// }).then(refreshResponse =>{
//     if(refreshResponse.ok)
//     {
//         return refreshResponse.json();
//     }else
//     {
//         console.erorr('refresh token is invalid or expired.');
//     }
// }).then(data =>{
//     localStorage.setItem("access_token",data.accessToken);
// const newAccessToken = localStorage.getItem("access_token");
// fetch('http://localhost:3000/api/admin/STL/addSTL',{
//     method:"POST",
//     headers:{
//                         Authorization:`Bearer ${newAccessToken}`,
//                         // 'Content-Type':'multipart/form-data',  
//                     },
//                     body:formData
// }).then(newResponse =>{
//     return newResponse.json();
// }).then(newData =>{
// console.log(newData)
// })
// })
//     }else{
//        return response.json();
//     }
    
// }).then(data =>{
//     console.log(data,'تم ارسال البيانات');
// }).catch(erorr =>{
//     console.erorr(erorr,'الرجاء التحقق من صحة العمل')
// });

// })



/* input explain */
const explain = document.getElementById('explain');
explain.addEventListener("keyup",(e)=>{
    explain.style.height = "63px";
let scHeight = e.target.scrollHeight;
explain.style.height=`${scHeight}px`;
})

/*======================================================================================= */

