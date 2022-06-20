const elWrapperListParrots = document.querySelector(".parrots-wrapper");
const elParrotTemplet = document.getElementById("parrot-templete").content;
const elFragmentWrapper = document.createDocumentFragment();
const elAddCardData = document.getElementById("add-parrot");
// modal's form start
const modalTitle = document.getElementById("parrot-title");
const modalImg = document.getElementById("parrot-img");
const modalPrice = document.getElementById("price");
const modalBirthDate = document.getElementById("parrot-date");
const modalWidth = document.getElementById("parrot_width");
const modalHeight = document.getElementById("parrot_height");
const modalFeatures = document.getElementById("features");

// start search function
const elSearchForm = document.getElementById("search-parrots");

// start cards buttons
// start edit modals
let elEditData = document.getElementById("add-parrot1");
let modaleditTitle = document.getElementById("parrot-title1");
let modaleditImg = document.getElementById("parrot-img1");
let modaleditPrice = document.getElementById("price1");
let modaleditBirthDate = document.getElementById("parrot-date1");
let modaleditWidth = document.getElementById("parrot_width1");
let modaleditHeight = document.getElementById("parrot_height1");
let modaleditFeatures = document.getElementById("features1");
let parrotsCount = document.getElementById("parrots-count");

parrotsCount.textContent = "counts" + ": " + products.length;

const renderParrots = (products) => {
  elWrapperListParrots.innerHTML = null;
  products.forEach((product) => {
    let elCard = elParrotTemplet.cloneNode(true);
    let elCardBox = elCard.querySelector(".card");
    let elImgCard = elCard.querySelector(".card-img-top");
    let nameParrots = elCard.querySelector(".card-title");
    let cost = elCard.querySelector(".card-text");
    let size = elCard.querySelector(".badge");
    let elYear = elCard.querySelector(".born");
    // let features = elCard.querySelector(".badg") madsjiojoijkjakldjfalk;sj
    let featuresWrapp = elCard.querySelector('.features-wrapp')
    let editBtn = elCard.querySelector(".edit");
    let likedBtn = elCard.querySelector('.liked')

    elCardBox.dataset.id = product.id;
    elImgCard.src = product.img;
    nameParrots.textContent = product.title;
    cost.textContent = "$" + product.price;
    size.textContent = product.sizes.width + " x " + product.sizes.height;
    elYear.textContent = product.birthDate;
    editBtn.dataset.id = product.id;
    likedBtn.dataset.id =product.id;
    console.log(likedBtn.dataset.id);
    let elItem = document.createElement("li");
    elItem.className = "col-6 item";
    elItem.dataset.id = product.id;
    elItem.appendChild(elCard);
    elFragmentWrapper.appendChild(elItem);
    elWrapperListParrots.appendChild(elFragmentWrapper);

    elFeaturesTemp = elCard.querySelector('.features-temp')
    console.log(elFeaturesTemp);

    editBtn.addEventListener("click", (e) => {
      e.preventDefault();
      elEditData.dataset.id = editBtn.dataset.id;

      console.log(elEditData.dataset.id);
    });
  });

 

};
renderParrots(products);
function handleAddCard(evt) {
  evt.preventDefault();
  let data = {
    id: uuid.v4(),
    title: modalTitle.value.trim(),
    img: "https://media.istockphoto.com/photos/amazon-rainforest-parrot-macaw-picture-id1197182594?b=1&k=20&m=1197182594&s=170667a&w=0&h=bBQfSDgofCr_w2DBf79cwQe-JA45i02vCv7Ttx5qcmU=",
    price: modalPrice.value.trim(),
    birthDate: modalBirthDate.value.trim(),
    sizes: {
      width: modalWidth.value.trim(),
      height: modalHeight.value.trim(),
    },
    features: modalFeatures.value.trim(),
  };
  products.push(data);
  renderParrots(products);
}
// start sort function
const sortFunction = {
  lh: (a, b) => {
    if (a.price > b.price) {
      return 1;
    } else {
      return -1;
    }
  },
  hl: (a, b) => {
    if (a.price < b.price) {
      return 1;
    } else {
      return -1;
    }
  },
  bh: (a, b) => {
    if (a.birthDate > b.birthDate) {
      return 1;
    } else {
      return -1;
    }
  },
  hb: (a, b) => {
    if (a.birthDate < b.birthDate) {
      return 1;
    } else {
      return -1;
    }
  },
};

// search function start
function handleSearch(evt) {
  evt.preventDefault();
  const elSearchInput = document.getElementById("search");
  let value = elSearchInput.value.trim();
  const sortSelect = document.querySelector(".sort-select");
  const sort = sortSelect.value;
  let regex = new RegExp(value);
  let foundParrots = products.filter((parrot) => parrot.title.match(regex));
  elWrapperListParrots.innerHTML = "";
  renderParrots(foundParrots);

  products.sort(sortFunction[sort]);
}
let copyCard = [];

function handleChange(evt) {
  if (evt.target.matches(".delete")) {
    let deletedItem = evt.target.closest("li");
    let itemId = deletedItem.dataset.id;
    let deletCard = products.filter((product) => product.id != itemId);
    products = deletCard;
    renderParrots(deletCard);
  }
  if (evt.target.matches(".edit")) {
    copyCard = [];
    let copiedCard = products.find((item) => evt.target.dataset.id == item.id);
    copyCard.push(copiedCard);

    modaleditTitle.value = copiedCard.title;
    modaleditPrice.value = copiedCard.price;
    modaleditBirthDate.value = copiedCard.birthDate;
    modaleditWidth.value = copiedCard.sizes.width;
    modaleditHeight.value = copiedCard.sizes.height;
    modaleditFeatures.value = copiedCard.features;
    console.log(copyCard);
  }
  if (evt.target.matches(".liked")) {
    // likedCard = [];
    let likedCard = products.find((item) => evt.target.dataset.id == item.id);
    let changedCOl = document.querySelector('.changed')
    console.log(changedCOl);
    changedCOl.classList.add('fa-solid')
    changedCOl.classList.add('fa-star')
  }
}

function changeCardContent(evt) {
  evt.preventDefault();
  console.log("ok");

  console.log(copyCard);

  copyCard[0].title = modaleditTitle.value;
  copyCard[0].price = modaleditPrice.value;
  copyCard[0].birthDate = modaleditBirthDate.value;
  copyCard[0].sizes.width = modaleditWidth.value;
  copyCard[0].sizes.width = modaleditHeight.value;
  copyCard[0].features = modaleditFeatures.value;

  renderParrots(products);
}

elEditData.addEventListener("submit", changeCardContent);
elAddCardData.addEventListener("submit", handleAddCard);
elSearchForm.addEventListener("submit", handleSearch);
elWrapperListParrots.addEventListener("click", handleChange);
