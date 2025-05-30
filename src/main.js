import { featuredProductsData } from './modules/featuredProductsData';
import { initFeaturedProductsSwiper } from './modules/featuredProductsSwiper';
import fetchProducts from './modules/fetchProducts';
import openModal from './modules/openModal';
import { initCustomDropdown } from './modules/pageSizeMenu';
import { productsState } from './modules/productsState';

const productList = document.getElementById('productGrid');
const sideMenu = document.getElementById('sideMenu')

// Initialize swiper and side menu styling to prevent animation from playing on load
document.addEventListener('DOMContentLoaded', () => {
  sideMenu.classList.add('side__menu--ready')
  initFeaturedProductsSwiper(featuredProductsData);
})

// Initialize page size menu
const dropdownEl = document.getElementById("pageSizeDropdown");

initCustomDropdown(dropdownEl, async (value) => {
  if (value === productsState.pageSize) return;

  // Reset
  productsState.pageSize = value;
  productsState.pageToFetch = 1;
  productsState.bannerInserted = false;
  productList.innerHTML = '';

  fetchProducts();
});

// Initial fetch
fetchProducts()

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
const modal = document.getElementById('productModal');
document.querySelector('.modal__close').addEventListener('click', () => modal.close())


// Add event listener to load products when scrolled to the bottom (infinite scroll)
window.addEventListener("scroll", async () => {
  // Do not run if currently fetching
  if (productsState.isFetching) return;

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    fetchProducts();
  }
});

const overlay = document.getElementById('overlay')
// Add event listener to hamburger menu
document.getElementById('hamburger').addEventListener('click', () => {
  sideMenu.classList.add('open');
  overlay.classList.add('active');
})

const closeMenu = () => {
  sideMenu.classList.remove('open');
  overlay.classList.remove('active');
}

// Add event listener to close side menu button
document.getElementById('closeSideMenuBtn').addEventListener('click', closeMenu)

// Add event listener to close menu on overlay click
overlay.addEventListener('click', closeMenu)

// Close menu if a element is clicked - event delegated to nav
const mobileNav = document.querySelector('.mobile__nav')
mobileNav.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    closeMenu();
  }
});