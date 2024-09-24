var tbody=document.querySelector(".tbody");
var pageUl=document.querySelector(".pagination");
var itemShow = document.querySelector("#intemperate");
// var der = Array.from(document.querySelectorAll(".tbody .der"));
var der = tbody.querySelectorAll(".der");
var click =document.querySelectorAll('.der');


click.forEach(e =>
    {
        e.addEventListener('click', ()=>{
            window.location.href='./listencourse.html';
        })
    })
var emptyBox=[];
var index=1;
var itemParPage=15;
for(let i=0 ; i<der.length;i++)
{
   
    emptyBox.push(der[i]);
}
itemShow.onchange = giveDerPerPage;

function giveDerPerPage()
{
    itemParPage = Number(this.value);
    displayPage(itemParPage);
    pageGenerator(itemParPage);
    getElement(itemParPage)
}
function displayPage(limit)
{
    tbody.innerHTML='';
    for(let i=0; i<limit ; i++)
    {
        tbody.appendChild(emptyBox[i]);
    }
    const pageNum = pageUl.querySelectorAll(".list");
    pageNum.forEach(n=>n.remove());
}
displayPage(itemParPage);

function pageGenerator(getem)
{
const num_of_der=emptyBox.length;
if(num_of_der<=getem)
{
    pageUl.style.display ='none';
}
else
{
    pageUl.style.display='flex';
    const num_of_page=Math.ceil(num_of_der/getem);
    for(let i=1;i<=num_of_page;i++)
    {
        const li =document.createElement('li');
        li.classList='list';
        const a = document.createElement('a');
        a.href="#";
        a.innerText=i;
        a.setAttribute('data-page',i);
        li.appendChild(a);
        pageUl.insertBefore(li ,pageUl.querySelector(".next"));
    }
}
}

pageGenerator(itemParPage);

let pageLink = pageUl.querySelectorAll('a');
let lastPage = pageLink.length - 2;
function pageRunner(page ,items ,lastPage ,active)
{
    for(button of page)
    {
        button.onclick = e=>{
            const page_num=e.target.getAttribute("data-page");
            const page_mover =e.target.getAttribute("id");
            if(page_num !=null)
            {
                index = page_num;
            }else
            {
                if(page_mover === "next")
                {
                    index++;
                    if(index >= lastPage)
                    {
                        index = lastPage;
                    }
                }else
                {
                    index--;
                    if(index<=1)
                    {
                        index = 1;
                    }
                }
            }
            pageMaker(index , items, active);
        }
       
    }
}
var pageLi= pageUl.querySelectorAll(".list");
pageLi[0].classList.add("active");

pageRunner(pageLink ,itemParPage ,lastPage ,pageLi);

function getElement(val)
{
    let pageLink = pageUl.querySelectorAll('a');
    let lastpage = pageLink.length - 2;
    let pageli = pageUl.querySelectorAll(".list");
    pageli[0].classList.add("active");
    pageRunner(pageLink ,val ,lastpage ,pageli);
}


function pageMaker(index , item_per_page , activePage)
{
    const start = item_per_page * index;
    const end = start + item_per_page;
    const current_page = emptyBox.slice((start - item_per_page) , (end - item_per_page));
    tbody .innerHTML='';
    for(let i=0 ; i<current_page.length ; i++)
    {
        let item = current_page[i];
        tbody.appendChild(item);
    }
    Array.from(activePage).forEach((e)=>{
        e.classList.remove("active");
    });
    activePage[index - 1].classList.add("active");
}

