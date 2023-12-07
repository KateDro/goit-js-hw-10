function createSelectOptionsMarkup(select, options) {
  return options
    .map(option =>
      select.insertAdjacentHTML(
        'beforeend',
        `<option value="${option.value}">${option.label}</option>`
      )
    )
    .join('');
}

function createInfoCardMarkup(infoCard, data) {
  const { name, description, temperament } = data.breeds[0];

  const url = data.url;

  infoCard.innerHTML = `
      <img src="${url}" alt="${name}"  >
       <div >
      <h2 >${name}</h2>
      <p><span>About:</span>${description}</p>
      <p><span>Temperament:</span> ${temperament}</p>
      </div>`;
}
export { createSelectOptionsMarkup, createInfoCardMarkup };
