// check if colors in local storage
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {

    document.documentElement.style.setProperty('--main-color' , mainColors);

    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove('active');

        if(element.dataset.color === mainColors){
            element.classList.add('active');
        }
    })
}

// check if background images in local storage

let backgroundOption = true;
let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background-option");
if(backgroundLocalItem !== null){

    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }

    document.querySelectorAll(".random-background span").forEach(element =>{
        element.classList.remove("active");
    })

    if(backgroundLocalItem === 'true'){
        document.querySelector(".random-background .yes").classList.add("active")
    }else{
        document.querySelector(".random-background .no").classList.add("active")
    }
}


//start setting open and close
let setting = document.querySelector(".setting-box");
let settingGear = document.querySelector(".gear");
let toggleGear = document.querySelector(".toggle-gear");
toggleGear.onclick = function(){
    settingGear.classList.toggle('fa-spin');
    setting.classList.toggle('open');
}
// end setting open and close

// switch colors
const colorLi = document.querySelectorAll(".colors-list li");

colorLi.forEach(li => {
    li.addEventListener("click" , (e) =>{
        document.documentElement.style.setProperty('--main-color' , e.target.dataset.color)

        localStorage.setItem('color-option' , e.target.dataset.color);

        handleActive(e);
    })
})
// end switch colors

// start switch random back ground
const randomBg = document.querySelectorAll(".random-background span");

randomBg.forEach(span => {
    span.addEventListener("click" , (e) =>{
       
        handleActive(e);

        if(e.target.dataset.background === 'yes'){
            backgroundOption === true;
            randomizeBackground()
            localStorage.setItem("background-option" , true);
        }else{
            clearInterval(backgroundInterval);
            landingPage.style.backgroundImage = 'url("image/04.jpg")';
            localStorage.setItem("background-option" , false);
        }
    })
})

// start change landing background
let landingPage = document.querySelector(".landing-page");

let img = ["01.jpg" , "02.jpg" , "03.jpg" , "04.jpg" , "05.jpg"];

function randomizeBackground(){
    if (backgroundOption === true){
        backgroundInterval = setInterval ( () =>{
            let randomNum = Math.floor(Math.random() * img.length)
            landingPage.style.backgroundImage = 'url("image/' +img[randomNum]+ '")'
            } , 1000)
    }
}
randomizeBackground();

// end change landing background

// start our skills
let ourSkills = document.querySelector('.skills');

window.onscroll = function(){

    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight){

        let allSkills = document.querySelectorAll('.skill-box span');
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })
    }
}
// end our skills

// start popup to gallery 
let ourImages = document.querySelectorAll('.gallery img');
ourImages.forEach(image =>{
    image.addEventListener('click' , (e) =>{

        let popupOverlay = document.createElement('div');
        popupOverlay.className ='popup-overlay';
        document.body.appendChild(popupOverlay);

        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';

        if (image.alt !== null){

            let imgHeading = document.createElement('h3');
            let headingText = document.createTextNode(image.alt);
 
            imgHeading.appendChild(headingText);
            popupBox.appendChild(imgHeading);
 
         }

        let imgs = document.createElement('img');
        imgs.src = image.src;

        popupBox.appendChild(imgs);
        document.body.appendChild(popupBox);

       let close = document.createElement('span');
       close.className ='close';

       let closeText = document.createTextNode('X');

       close.appendChild(closeText);
       popupBox.appendChild(close);
    })
})

document.addEventListener('click', (e) =>{
    if(e.target.className == 'close'){
        e.target.parentElement.remove()
        document.querySelector('.popup-overlay').remove();
    }
})

// end popup to gallery 

// start nav bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');

const allLinks = document.querySelectorAll('.navbar a');

function scrollToSection (elements){
    elements.forEach(ele =>{
        ele.addEventListener('click' , (e) =>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior : 'smooth'
            });
        })
    })
}
scrollToSection(allBullets);
scrollToSection(allLinks);

// end nav bullets

// handle active state
function handleActive (ev){
 
    ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    })
    ev.target.classList.add("active");

}
// end handle active state

// start show and hide bullets
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletsSpan = document.querySelectorAll('.bullets-option span');
let localBulletItem = localStorage.getItem('bullet-option');

if(localBulletItem !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    })
    if(localBulletItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add('active');
    }else{
        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add('active');
    }
}

bulletsSpan.forEach(span =>{
    span.addEventListener('click' , (e) =>{
        if(span.dataset.show == 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullet-option' , 'block')
        }else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullet-option' , 'none')
        }
        handleActive(e);
    })
})// end show and hide bullets.

// start reset button 
document.querySelector('.reset-option').onclick = function(){
    localStorage.clear();
    window.location.reload();
}
// end reset button 

// start toggle button
let toggleButton = document.querySelector('.toggle-button');
let links = document.querySelector('.links');

toggleButton.onclick = function(e){
    e.stopPropagation();
    this.classList.toggle('active-button');
    links.classList.toggle('open');
}

document.addEventListener('click' , (e) =>{
    if(e.target !== toggleButton && e.target !== links ){
        if(links.classList.contains('open')){
            toggleButton.classList.toggle('active-button');
            links.classList.toggle('open');
        }
    }
})

links.onclick = function(e){
    e.stopPropagation();
}
