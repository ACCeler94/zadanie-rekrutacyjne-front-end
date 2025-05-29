import { productsState } from './productsState';

const productList = document.getElementById('product__grid');

const renderProducts = (products) => {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const id = product.id.toString().padStart(2, '0');

    const card = document.createElement('div');
    card.className = 'product__card';
    card.dataset.id = id;
    card.dataset.alt = product.text;
    card.dataset.src = product.image;
    card.style.order = product.id // product.id used instead of i to keep items ordered in case of refetch on infinite scroll

    card.innerHTML = `
      <div class="product__image--wrapper">
        <span class="product__id">ID: ${id}</span>
        <img src="${product.image}" alt="${product.text}" loading="lazy">
      </div>
    `;

    productList.appendChild(card);

    if (i === 4 && !productsState.bannerInserted) {
      const banner = document.createElement('div');
      banner.className = 'product__banner';
      banner.style.order = 6;

      banner.innerHTML = `
        <div class="banner__content">
          <div>
            <p class="banner__logo">FORMA’SINT.</p>
            <h2 class="banner__title">You'll look and feel like the champion.</h2>
          </div>
          <a href="#">
              CHECK THIS OUT
              <img src="/src/assets/icons/chevron_right.svg" alt="Chevron pointing right">
          </a>
        </div>
      `;

      productList.appendChild(banner);
      productsState.bannerInserted = true;
    }
  }
};

export default renderProducts;