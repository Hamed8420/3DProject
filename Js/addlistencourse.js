const fileInput =document.getElementById('file-input');
const fileList=document.getElementById('files-list');
const numOfFiles=document.getElementById('num-of-file');
const textarea = document.querySelector("textarea");

fileInput.addEventListener("change",() => {
fileList.innerHTML = "";
numOfFiles.textContent =`${fileInput.files.length}
Files Selected`;

for(i of fileInput.files)
{
    console.log(i);
    let reader= new FileReader();
    let listItem=document.createElement("li");
    let fileName=i.name;
    let fileSize=(i.size/1024).toFixed(1);
    listItem.innerHTML=`
    <p>${fileName}</p>
    <p>${fileSize}KB</p>
    `;

    if(fileSize >= 1024)
    {
        fileSize =(fileSize / 1024).toFixed(1);
        listItem.innerHTML=`<p>${fileName}</p>
        <p>${fileSize}MB</p>
        `
    }

    fileList.appendChild(listItem);
}

})


// Start txetArea
textarea.addEventListener("keyup",(e)=>{
    textarea.style.height = "63px";
let scHeight = e.target.scrollHeight;
console.log(scHeight)
textarea.style.height=`${scHeight}px`;
})