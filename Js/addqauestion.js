function addquestion()
{
    const params = getQueryStringParams(window.location.search);
    const itemId = params.id;
  console.log(itemId);
  
  const url=`http://localhost:3000/api/question/addQuestion/${itemId}`

    const newAccessToken = localStorage.getItem("access_token");
 
      
   
      const text = document.getElementById('title').value;
       const  rightAnswer = document.getElementById('right').value;
       const inputValues=[];
       const inputs=document.querySelectorAll('form .wrong');
       for(let i=0;i<inputs.length;i++){
        if(inputs[i].type ='text'){
            inputValues.push(inputs[i].value);
        }
       }
       console.log(inputValues);


  fetch(url,{
    method:'POST',
    headers:{
                      Authorization:`Bearer ${newAccessToken}`,
                      "Content-Type":"application/json",
                  },
               body:JSON.stringify({ text: text, rightAnswer: rightAnswer,answers:inputValues })
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
fetch(url,{
  headers:{
                      Authorization:`Bearer ${newAccessToken}`,
                      "Content-Type":"application/json",
                  },
                  body:JSON.stringify({ text: text, rightAnswer: rightAnswer,answers:inputValues })
}).then(newResponse =>{
  return newResponse.json();
}).then(newData =>{
  // window.location.href='./index.html';
  console.log(data,'data is add');

console.log(newData)
})
})

                  }else
                  {
                      if(response.status === 200){
						console.log(response,'jsadfnjsd')
					  }
					  else if(response.status === 403){
						return response.json()
					  }
                  }
              })
              .then(data => {
				const gtr=document.querySelector('.gtr');
			
					gtr.style.display='block'
					gtr.innerHTML=data.message;
				

                //   console.log(data,'data is add');
                  // window.location.href='./quastion1.html';
              })
              .catch(error => console.error('data is fall',error));
}
/*
<!DOCTYPE html>
<html>
<head>
	<title>إرسال الإجابات إلى قاعدة البيانات باستخدام JavaScript</title>
</head>
<body>
	<h2>أجب على الأسئلة التالية:</h2>
	<div id="questions"></div>

	<button type="button" onclick="submitAnswers()">إرسال الإجابات</button>

	<script>
		var answers = {};

		// احضر الأسئلة والخيارات من قاعدة البيانات

		.then(data => {
			var questionsDiv = document.getElementById("questions");

			data.forEach(question => {
				// إنشاء عناصر HTML للسؤال والخيارات
				var questionElement = document.createElement("p");
				questionElement.textContent = question.question_text;
				questionsDiv.appendChild(questionElement);

				var option1 = document.createElement("input");
				option1.type = "radio";
				option1.name = "q" + question.id;
				option1.value = question.option1;
				option1.onclick = function() { saveAnswer(this); };
				questionsDiv.appendChild(option1);

				var label1 = document.createElement("label");
				label1.textContent = question.option1;
				questionsDiv.appendChild(label1);

				var option2 = document.createElement("input");
				option2.type = "radio";
				option2.name = "q" + question.id;
				option2.value = question.option2;
				option2.onclick = function() { saveAnswer(this); };
				questionsDiv.appendChild(option2);

				var label2 = document.createElement("label");
				label2.textContent = question.option2;
				questionsDiv.appendChild(label2);

				var option3 = document.createElement("input");
				option3.type = "radio";
				option3.name = "q" + question.id;
				option3.value = question.option3;
				option3.onclick = function() { saveAnswer(this); };
				questionsDiv.appendChild(option3);

				var label3 = document.createElement("label");
				label3.textContent = question.option3;
				questionsDiv.appendChild(label3);
			});
		})
		.catch(error => {
			console.error(error);
		});

		function saveAnswer(input) {
			answers[input.name] = input.value;
		}

		function submitAnswers() {
			// تحقق من اختيار الإجابات
			if (Object.keys(answers).length < 3) {
				alert("يجب الإجابة على جميع الأسئلة.");
				return;
			}

			fetch("process.php", {
				method: "POST",
				body: JSON.stringify(answers),
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.error(error);
			});
		}
	</script>
</body>
</html>
*/

	function submitAnswers() {
			// تحقق من اختيار الإجابات
			if (Object.keys(answers).length < 3) {
				alert("يجب الإجابة على جميع الأسئلة.");
				return;
			}

			fetch("process.php", {
				method: "POST",
				body: JSON.stringify(answers),
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.error(error);
			});
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