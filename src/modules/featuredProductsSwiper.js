import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';



export function initFeaturedProductsSwiper(products) {
  const container = document.querySelector('.swiper-wrapper');

  products.forEach((product) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    // Set Limited Edition or Bestseller label
    let label = '';
    if (product.isLimited) {
      label = '<span class="product__label limited">LIMITED EDITION</span>';
    } else if (product.isBestseller) {
      label = '<span class="product__label bestseller">BESTSELLER</span>';
    }


    slide.innerHTML = `
    <div class="image__wrapper">
      ${label}
      <div class="heart-wrapper">
        <img src="/src/assets/icons/icon_favorite.svg" alt="Add to favorites" class="heart-icon outline" />
        <img src="/src/assets/icons/icon_favorite-filled.svg" alt="Added to favorites" class="heart-icon filled" />
      </div>
      <picture>
        <source srcset="${product.photoUrl}.webp" type="image/webp">
        <img src="${product.photoUrl}.jpg" class="featured__photo" alt="${product.name}" loading="lazy"/>
      </picture>
    </div>
    <h2>${product.name}</h2>
    <p>€${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(product.price)}</p>`;
    container.appendChild(slide);
  });


  new Swiper('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 24,
    loop: false,
    modules: [Navigation, Scrollbar],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
    },
  });
}