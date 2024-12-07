/* show menu */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}


if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


function scrollHeader(){
    const header = document.getElementById('header')
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* questions */
const accordionItems = document.querySelectorAll('.questions__item')

accordionItems.forEach((item) =>{
    const accordionHeader = item.querySelector('.questions__header')

    accordionHeader.addEventListener('click', () =>{
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if(openItem && openItem!== item){
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) =>{
    const accordionContent = item.querySelector('.questions__content')

    if(item.classList.contains('accordion-open')){
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    }else{
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }

}

/* scroll sections active link */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* show scroll up */ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')


const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* scroll revel animation */
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})


document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("testimonial-wrapper");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    const cards = document.querySelectorAll(".testimonial__card");
    const totalCards = cards.length;
    const cardsPerView = 3;

    // Clone cards for infinite loop
    for (let i = 0; i < cardsPerView; i++) {
        wrapper.appendChild(cards[i].cloneNode(true));
        wrapper.insertBefore(
            cards[totalCards - 1 - i].cloneNode(true),
            wrapper.firstChild
        );
    }

    let currentIndex = cardsPerView;
    const cardWidth = cards[0].offsetWidth + 32; // Include margin

    // Set initial position
    wrapper.style.transform = `translateX(${-cardWidth * currentIndex}px)`;

    const updatePosition = () => {
        wrapper.style.transition = "transform 0.5s ease-in-out";
        wrapper.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
    };

    const handleNext = () => {
        currentIndex++;
        updatePosition();
        if (currentIndex === totalCards + cardsPerView) {
            setTimeout(() => {
                wrapper.style.transition = "none";
                currentIndex = cardsPerView;
                wrapper.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
            }, 500);
        }
    };

    const handlePrev = () => {
        currentIndex--;
        updatePosition();
        if (currentIndex < cardsPerView) {
            setTimeout(() => {
                wrapper.style.transition = "none";
                currentIndex = totalCards;
                wrapper.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
            }, 500);
        }
    };

    next.addEventListener("click", handleNext);
    prev.addEventListener("click", handlePrev);
});








sr.reveal(`.home__data`)
sr.reveal(`.home__img`, {delay: 500})
sr.reveal(`.home__social`, {delay: 600})
sr.reveal(`.about__img, .contact__box`,{origin: 'left'})
sr.reveal(`.about__data, .contact__form`,{origin: 'right'})
sr.reveal(`.steps__card, .product__card, .questions__group, .footer`,{interval: 100})