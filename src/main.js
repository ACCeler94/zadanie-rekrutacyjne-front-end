import { featuredProductsData } from './modules/featuredProductsData';
import { initFeaturedProductsSwiper } from './modules/featuredProductsSwiper';
import fetchProducts from './modules/fetchProducts';
import openModal from './modules/openModal';
import { initCustomDropdown } from './modules/pageSizeMenu';


let pageToFetch = 1;
let pageSize = 14;
let isFetching = false;
let isError = false
let allPages

const productList = document.getElementById('product__grid');


// Initialize swiper
document.addEventListener('DOMContentLoaded', () => initFeaturedProductsSwiper(featuredProductsData))

// Initialize page size menu
const dropdownEl = document.getElementById("pageSizeDropdown");

initCustomDropdown(dropdownEl, (value) => {
  if (value === pageSize) return
  // Reset page counter and refetch products when page size changes
  pageSize = value
  pageToFetch = 1
  fetchProducts({ pageSize, pageToFetch, isFetching, isError, allPages })
});

// Initial fetch
fetchProducts({ pageSize, pageToFetch, isFetching, isError, allPages })

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

