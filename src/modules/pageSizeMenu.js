export function initCustomDropdown(dropdownElement, onChange) {
  const selected = dropdownElement.querySelector(".pageSizeMenu__dropdown--selected");
  const valueSpan = dropdownElement.querySelector(".pageSizeMenu__dropdown--value");
  const options = dropdownElement.querySelectorAll(".pageSizeMenu__dropdown--options li");

  function updateHiddenOption(currentValue) {
    options.forEach((opt) => {
      opt.style.display = opt.dataset.value === currentValue ? "none" : "block";
    });
  }

  selected.addEventListener("click", () => {
    dropdownElement.classList.toggle("open");
    selected.classList.toggle("open");
    updateHiddenOption(valueSpan.textContent);
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      valueSpan.textContent = option.dataset.value;
      dropdownElement.classList.remove("open");
      selected.classList.remove("open");
      updateHiddenOption(option.dataset.value);
      if (onChange) onChange(option.dataset.value);
    });
  });

  document.addEventListener("click", (e) => {
    if (!dropdownElement.contains(e.target)) {
      dropdownElement.classList.remove("open");
      selected.classList.remove("open");
    }
  });

  // Initial setup to hide selected option
  updateHiddenOption(valueSpan.textContent);
}