const productList = document.getElementById('product__grid');


const renderProducts = (products) => {
  for (const product of products) {
    const id = product.id.toString().padStart(2, '0');
    const card = document.createElement('div');
    card.className = 'product__card'
    card.dataset.id = id
    card.dataset.alt = product.text
    card.dataset.src = product.image

    card.innerHTML = `
      <div class="product__image--wrapper">
        <span class="product__id">ID: ${id}</span>
        <img src=${product.image} alt=${product.text} loading="lazy">
      </div>
    `

    productList.appendChild(card)
  }
}

export default renderProducts;