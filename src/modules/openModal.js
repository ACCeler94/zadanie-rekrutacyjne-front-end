const openModal = ({ src, alt, id }) => {
  const modal = document.getElementById('product__modal');
  const modalImg = modal.querySelector('.modal__image');
  const productId = modal.querySelector('.modal__product--id');

  modalImg.src = src;
  modalImg.alt = alt;
  productId.textContent = `ID: ${id}`;

  modal.showModal();
}

export default openModal