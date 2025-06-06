import './style.css'
import Alpine from 'alpinejs'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'

window.Alpine = Alpine

Alpine.start()
new Swiper('#swiper-1', {
  modules: [Navigation],
  slidesPerView: 'auto',
  speed: 1000,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-1-next',
    prevEl: '.swiper-1-prev',
  },
})
new Swiper('.swiper-2', {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  speed: 1000,
  pagination: {
    el: '.swiper-2-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-2-next',
    prevEl: '.swiper-2-prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
})

