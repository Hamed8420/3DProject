
const sideMenu = document.querySelector(".side");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themToggler =document.querySelector(".theme-toggler"); 
const imgr = document.querySelectorAll(".box .go");
const message = document.querySelector(".right a");

message.addEventListener('click', ()=>{
    window.location.href='./message.html';
})



imgr.forEach(e =>{
    e.addEventListener('click', ()=>{
        window.location.href='./showcourse.html';
    })
})

menuBtn.addEventListener("click",()=>{
    sideMenu.style.display="block";
})

closeBtn.addEventListener("click",()=>{
    sideMenu.style.display="none";
})

themToggler.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-variables');


    themToggler.querySelector("i:nth-child(1)").classList.toggle('active');
    themToggler.querySelector("i:nth-child(2)").classList.toggle('active');

})