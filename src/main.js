import './style.css'
import Alpine from 'alpinejs'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'
import siteData from '../public/data.json'

window.Alpine = Alpine

// Add Alpine.js data models
document.addEventListener('alpine:init', () => {
  // Header nav model
  Alpine.data('headerNav', () => ({
    scrolled: false,
    navItems: siteData.navigation.items,
    init() {
      window.addEventListener('scroll', () => {
        this.scrolled = window.pageYOffset > 20
      })
    },
  }))

  // Services card model
  Alpine.data('serviceCards', () => ({
    cards: siteData.services.cards,
  }))

  // Card content model
  Alpine.data('cardContent', () => ({
    initCardContent() {
      this.$nextTick(() => {
        let maxHeight = 0
        const cardContents = document.querySelectorAll('.card-content')
        cardContents.forEach((content) => {
          const height = content.offsetHeight
          if (height > maxHeight) maxHeight = height
        })
        cardContents.forEach((content) => {
          content.style.height = `${maxHeight}px`
        })
        const swiperSlides = document.querySelectorAll(
          '.swiper-2 .swiper-slide img'
        )
        swiperSlides.forEach((slide) => {
          slide.style.height = `${maxHeight}px`
        })
      })
    },
  }))

  // Footer model
  Alpine.data('footerNav', () => ({
    navItems: siteData.navigation.items,
    copywriteText: siteData.footer.copywrite.replace(
      '{year}',
      new Date().getFullYear()
    ),
  }))

  // Slider images
  Alpine.data('sliderImages', () => ({
    sliderImages: siteData.startSlider.images,
  }))
})

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
