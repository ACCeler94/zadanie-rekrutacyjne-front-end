import { featuredProductsData } from './modules/featuredProductsData';
import { initFeaturedProductsSwiper } from './modules/featuredProductsSwiper';

// Initialize swiper
document.addEventListener('DOMContentLoaded', () => initFeaturedProductsSwiper(featuredProductsData))