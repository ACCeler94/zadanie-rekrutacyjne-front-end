import renderProducts from './renderProducts';


const fetchProducts = async ({ pageSize, pageToFetch, isFetching, isError, allPages }) => {
  if (pageToFetch > allPages) return

  isFetching = true
  try {
    const res = await fetch(`https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageToFetch}&pageSize=${pageSize}`);
    const { data: products, totalPages, currentPage } = await res.json();

    isFetching = false
    allPages = totalPages
    renderProducts(products)
    pageToFetch = currentPage + 1
  } catch (error) {
    isError = true
    isFetching = false
  }
}

export default fetchProducts;