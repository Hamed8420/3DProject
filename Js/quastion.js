var answer=[]
const StlData = ()=>{
    const params = getQueryStringParams(window.location.search);
const itemId = params.id;
console.log(itemId);
const apiUrl = `http://localhost:3000/api/question/${itemId}`;


const accesstoken= localStorage.getItem('access_token'); 
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

    const addw=document.querySelector('.add');
    
    const button=document.createElement('button');
    const linkre=document.createElement('a');
    linkre.href=`addqauestion.html?id=${itemId}`;
    linkre.textContent='add question';
    // console.log(data.lessons.courseId)
    button.appendChild(linkre);
    addw.appendChild(button);
    
    const header=document.querySelector('.header');
    data.questions.forEach(element =>{
         console.log(shuffle(element.answers))
         shuffle(element.answers);
        const rightAnswer=document.createElement('div');
        rightAnswer.classList.add('rightAnswer');
        const question=document.createElement('h3');
        question.setAttribute('id','question');
        question.textContent=element.text;
        rightAnswer.appendChild(question);
       const realy=document.createElement('div');
       realy.classList.add('realy');
    //    header.appendChild(rightAnswer)
          // استخدام forEach لإنشاء حقول الإدخال بنوع radio وتسميات الخيارات
      element.answers.forEach(function(option) {
    const quaestion1=document.createElement("div");
        quaestion1.classList.add('quaestion1');
        // إنشاء حقل الإدخال
        var input = document.createElement("input");
        input.type = "radio";
        input.name = "question_" + element.id;
        input.value = option.id;
        input.addEventListener('click',()=>{
            console.log(input.value)
            answer.push(input.value)
            // return saveAnswer(input.value)
        })

        // إنشاء تسمية الخيار
        var label = document.createElement("label");
        label.innerHTML = option.content;

        // إضافة الحقل والتسمية إلى عنصر الـ div الخاص بالسؤال
        quaestion1.appendChild(input);
        quaestion1.appendChild(label);
realy.appendChild(quaestion1);

      });

      const far =document.createElement('div');
far.classList.add('add');

far.innerHTML=`

<div style="margin-top:10px;display: flex; justify-content: space-around;align-items: center;">
<span id="btn-edit" style="border-radius:6px ;font-size:13px; width:80px;text-align:center; color:#FFF;padding:3px 5px; background-color:#0F1729;cursor: pointer; margin-top:10px 0; "  onclick="deleteQuestion(${element.id})"> delete</span>
<a href="updatequestion.html?id=${element.id}" style="border-radius:6px ;font-size:13px; width:80px;text-align:center; color:#FFF;padding:3px 5px; background-color:#0F1729;cursor: pointer; margin-top:10px 0; ">Edit</a>
</div>
`

rightAnswer.appendChild(question);
rightAnswer.appendChild(realy);

rightAnswer.appendChild(far);


    header.appendChild(rightAnswer)

     
    })
})
}


function main(){
StlData();
}       
main()
/*====================================================== */

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
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


/*================================================================================== */
function deleteQuestion(id)
{


    const accesstoken= localStorage.getItem('access_token'); 
    fetch(`http://localhost:3000/api/question/deleteQuestion/${id}`,{
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
    fetch(`http://localhost:3000/api/question/deleteQuestion/${id}`,{
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
}

	
		// let answers = [];

		// احضر الأسئلة والخيارات من قاعدة البيانات
		
		// function saveAnswer(input) {
        //     console.log(input)
        //     return answers[input.name] = input;
            
		// }
        const gtr=document.querySelector('.gtr');
		function submitAnswers() {
            console.log(answer)
          let quLength;
            const params = getQueryStringParams(window.location.search);
            const itemId = params.id;
            console.log(itemId);
            const accesstoken= localStorage.getItem('access_token'); 
            fetch ("http://localhost:3000/api/question/answers",{
                method:'POST',
                headers: {
                    'Authorization':`Bearer ${accesstoken}`,
					"Content-Type": "application/json"
				},
                body:JSON.stringify({lessonId:itemId,answerId:answer})
            }).then(res =>{
return res.json();
            }).then(da =>{
quLength=da.questions.length;
console.log(quLength)
            })

            
			// تحقق من اختيار الإجابات
			if (answer.length < quLength) {
				alert("يجب الإجابة على جميع الأسئلة.");
				return;
			}

			fetch("http://localhost:3000/api/question/answers", {
				method: "POST",
				body: JSON.stringify({answerId:answer,lessonId:itemId}),
				headers: {
                    'Authorization':`Bearer ${accesstoken}`,
					"Content-Type": "application/json"
				}
			})
			.then(response => {
				console.log(response);
                return response.json()
			}).then(sda =>{
                console.log(sda)
                gtr.style.display='block';
                gtr.innerHTML=sda.message
               
            })
			.catch(error => {
				console.error(error);
			});
		}
	