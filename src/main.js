import { featuredProductsData } from './modules/featuredProductsData';
import { initFeaturedProductsSwiper } from './modules/featuredProductsSwiper';
import fetchProducts from './modules/fetchProducts';
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
  productList.innerHTML = ''
  fetchProducts({ pageSize, pageToFetch, isFetching, isError, allPages })
});

// Initial fetch
await fetchProducts({ pageSize, pageToFetch, isFetching, isError, allPages })
