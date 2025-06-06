import './style.css'
import Alpine from 'alpinejs'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'

window.Alpine = Alpine

// Add Alpine.js data models
document.addEventListener('alpine:init', () => {
  // Header nav model
  Alpine.data('headerNav', () => ({
    scrolled: false,
    navItems: [
      { name: 'start', href: '#start' },
      { name: 'service', href: '#service' },
      { name: 'kontakt', href: '#kontakt' },
    ],
    init() {
      window.addEventListener('scroll', () => {
        this.scrolled = window.pageYOffset > 20
      })
    },
  }))

  // Services card model
  Alpine.data('serviceCards', () => ({
    cards: [
      {
        title: 'Reinigungen',
        description:
          'Treppenhäuser, Fenster und Photo-Voltaik-Anlagen — Lassen Sie Ihre Immobilie in neuem Licht erstrahlen.',
        images: [
          '/images/1.jpg',
          '/images/2.jpg',
          '/images/3.jpg',
          '/images/4.jpg',
          '/images/5.jpg',
          '/images/6.jpg',
        ],
      },
      {
        title: 'Instandhaltung und Reparaturen',
        description:
          'Unkomplizierte Reparatur und laufende Pflege für Langlebigkeit und Funktionalität.',
        images: [
          '/images/3.jpg',
          '/images/1.jpg',
          '/images/5.jpg',
          '/images/2.jpg',
          '/images/6.jpg',
          '/images/4.jpg',
        ],
      },
      {
        title: 'Carports, Wintergarten und Möbel',
        description:
          'Manchmal sind es kreative Details, die Ihre Immobilie erst abrunden. Lassen Sie Ihren Ideen freien Lauf.',
        images: [
          '/images/5.jpg',
          '/images/4.jpg',
          '/images/1.jpg',
          '/images/6.jpg',
          '/images/2.jpg',
          '/images/3.jpg',
        ],
      },
      {
        title: 'Sonstiger Betrieb Ihrer Immobilie',
        description:
          'Vom Rolldienst über Winterdienst bis zum Wechsel von Leuchtmitteln unterstützen wir Sie beim reibungslosen Betrieb Ihrer Immobilie',
        images: [
          '/images/6.jpg',
          '/images/3.jpg',
          '/images/2.jpg',
          '/images/5.jpg',
          '/images/1.jpg',
          '/images/4.jpg',
        ],
      },
    ],
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
    navItems: [
      { name: 'start', href: '#start' },
      { name: 'service', href: '#service' },
      { name: 'kontakt', href: '#kontakt' },
    ],
    copywriteText: `© ${new Date().getFullYear()} Alle Rechte vorbehalten.`,
  }))

  // Slider images
  Alpine.data('sliderImages', () => ({
    sliderImages: [
      { src: '/images/1.jpg', alt: '1' },
      { src: '/images/2.jpg', alt: '2' },
      { src: '/images/3.jpg', alt: '3' },
      { src: '/images/4.jpg', alt: '4' },
      { src: '/images/5.jpg', alt: '5' },
      { src: '/images/6.jpg', alt: '6' },
    ],
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
