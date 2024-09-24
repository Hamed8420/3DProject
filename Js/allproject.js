const bar=document.querySelector('.bar .fa-bars');
const navbar=document.querySelector('.side');
const sidebar=document.querySelector('.sidebar');
const bars=document.querySelector('.bars .fa-times');
const term=document.querySelector('.bars');




bar.addEventListener('click',()=>{
    console.log(`klsfgjdfklgj`)
navbar.style.display="block"
sidebar.style.width="230px"
term.style.display='block'

})

bars.addEventListener('click',()=>{
    console.log(`klsfgjdfklgj`)
    navbar.style.display="none"
sidebar.style.width="0"

})


// const aser=document.querySelectorAll('a i');
// aser.forEach(element =>{
//     element.classList.remove('active')
//     element.addEventListener('click',(item)=>{
// item.classList.add('active')
//     })
// })