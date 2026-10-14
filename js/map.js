const closeModalBtn = document.querySelector('.modal__close');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal__image');
const modalTitle = document.querySelector('.modal__info-title > h1');
const modalDescription = document.querySelector('.modal__info-description > p');
const modalLink = document.querySelector('.modal__info-button');
const container = document.querySelector('.container__marker');
const btnSearch = document.querySelector('.search__btn');
const search = document.querySelector('.search');
const select = document.querySelector('.custom-select');



createMarker(villages);

closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.classList.add('hide');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    modal.classList.add('hide');
  }
});


window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('show');
    modal.classList.add('hide');
  }
});



document.addEventListener('click', (e) => {
  const targetId = e.target.getAttribute('data-id');
  if (!targetId) return;

  const item = villages.find((village) => village.id === +targetId);
  if (!item) return;

  modalImage.style.backgroundImage = `url(${item.img})`;
  modalImage.style.backgroundSize = 'cover';
  modalImage.style.backgroundRepeat = 'no-repeat';
  modalImage.style.backgroundPosition = 'center center';
  modalTitle.innerHTML = item.title;
  modalDescription.innerHTML = item.desc;
  item.link ? (modalLink.href = item.link) : modalLink.remove();

  modal.classList.remove('hide');
  modal.classList.add('show');
});

btnSearch.addEventListener('click', () => {
  let searchValue = search.value;
  if (searchValue) {
    filterVillages(searchValue);
  }
});

function createMarker(data) {
  if (!data) {
    return null;
  }
  container.innerHTML = '';
  data.forEach((item) => {
    let classArray = item.class.split(' ');
    let circle = document.createElement('div');
    circle.classList.add(...classArray);
    circle.setAttribute('data-id', item.dataId);
    circle.setAttribute('data-tooltip', item.dataTooltip);
    container.append(circle);
  });
}

window.toggleMobileMenu = function (e) {
  e.preventDefault();
  document.querySelector('header').classList.toggle('is-mobile-menu-open');
  document.querySelector('body').classList.toggle('is-fixed');
};

search.addEventListener('keypress', function (event) {
  const charCode = event.charCode;
  let searchValue = search.value;
  if (charCode == 13) {
    filterVillages(searchValue);
  }
});


function filterVillages(searchValue) {
  let filterData = villages.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue) ||
      item.title.includes(searchValue) ||
      item.title.toUpperCase().includes(searchValue),
  );
  createMarker(filterData);
}

function createOptionsSelect(data) {
  if (!data) {
    return null;
  }

  for (let key in data) {
    let option = document.createElement('option');
    option.setAttribute('value', key);
    option.innerHTML = data[key];
    select.append(option);
  }
}
