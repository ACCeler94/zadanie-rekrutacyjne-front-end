import { featuredProductsData } from './modules/featuredProductsData';
import { initFeaturedProductsSwiper } from './modules/featuredProductsSwiper';
import fetchProducts from './modules/fetchProducts';
import openModal from './modules/openModal';
import { initCustomDropdown } from './modules/pageSizeMenu';
import { productsState } from './modules/productsState';

const productList = document.getElementById('product__grid');


// Initialize swiper
document.addEventListener('DOMContentLoaded', () => initFeaturedProductsSwiper(featuredProductsData))

// Initialize page size menu
const dropdownEl = document.getElementById("pageSizeDropdown");

initCustomDropdown(dropdownEl, async (value) => {
  if (value === productsState.pageSize) return;

  // Reset
  productsState.pageSize = value;
  productsState.pageToFetch = 1;
  productsState.bannerInserted = false;
  productList.innerHTML = '';

  await fetchProducts();
});

// Initial fetch
await fetchProducts()

// Add event listener to open modal
productList.addEventListener('click', (event) => {
  const card = event.target.closest('.product__card');
  if (!card || !productList.contains(card)) return;

  // Get data from the card's dataset
  const src = card.dataset.src;
  const alt = card.dataset.alt;
  const id = card.dataset.id;

  openModal({ src, alt, id });
})

// Add event listener to close modal
const modal = document.getElementById('product__modal');
document.querySelector('.modal__close').addEventListener('click', () => modal.close())


// Add event listener to load products when scrolled to the bottom (infinite scroll)
window.addEventListener("scroll", async () => {
  // Do not run if currently fetching
  if (productsState.isFetching) return;

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    await fetchProducts();
  }
});
