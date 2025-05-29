import renderProducts from './renderProducts';
import { productsState } from './productsState';

const fetchProducts = async () => {
  if (productsState.pageToFetch > productsState.allPages || productsState.isFetching) return;

  productsState.isFetching = true;
  try {
    const res = await fetch(`https://brandstestowy.smallhost.pl/api/random?pageNumber=${productsState.pageToFetch}&pageSize=${productsState.pageSize}`);
    const { data: products, totalPages, currentPage } = await res.json();

    renderProducts(products);

    productsState.allPages = totalPages;
    productsState.pageToFetch = currentPage + 1;
  } catch (error) {
    productsState.isError = true;
  } finally {
    productsState.isFetching = false;
  }
};

export default fetchProducts;