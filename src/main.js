import './style.css'
import Alpine from 'alpinejs'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'

window.Alpine = Alpine

Alpine.start()

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.text-nav')

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href')
      if (href === `#${id}`) {
        link.classList.add('text-primary', 'underline')
      } else {
        link.classList.remove('text-primary', 'underline')
      }
    })
  }

  window.addEventListener('scroll', () => {
    let currentSection = ''
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute('id')
      }
    })
    setActiveLink(currentSection)
  })

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1)
      navLinks.forEach((l) => l.classList.remove('text-primary', 'underline'))
      this.classList.add('text-primary', 'underline')
    })
  })
})

new Swiper('#swiper-1', {
  modules: [Navigation],
  slidesPerView: 'auto',
  speed: 1000,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-1-next',
    prevEl: '.swiper-1-prev',
    disabledClass: 'cursor-not-allowed opacity-50',
  },
})

new Swiper('.swiper-2', {
  modules: [Pagination, Autoplay],
  slidesPerView: 1,
  pagination: {
    el: '.swiper-2-pagination',
    clickable: true,
    bulletActiveClass: '!bg-white',
    bulletClass: 'size-2 rounded-full bg-white/50 cursor-pointer',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 1000,
})
