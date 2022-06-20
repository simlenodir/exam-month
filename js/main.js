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
const elEditData = document.getElementById("add-parrot1");
const modaleditTitle = document.getElementById("parrot-title1");
const modaleditImg = document.getElementById("parrot-img1");
const modaleditPrice = document.getElementById("price1");
const modaleditBirthDate = document.getElementById("parrot-date1");
const modaleditWidth = document.getElementById("parrot_width1");
const modaleditHeight = document.getElementById("parrot_height1");
const modaleditFeatures = document.getElementById("features1");
let   parrotsCount = document.getElementById('parrots-count')

parrotsCount.textContent = 'counts'+ ': ' +products.length

const renderParrots = (products) => {
  elWrapperListParrots.innerHTML = null;
  products.forEach((product) => {
    let elCard = elParrotTemplet.cloneNode(true);
    let elCardBox = elCard.querySelector('.card')
    let elImgCard = elCard.querySelector(".card-img-top");
    let nameParrots = elCard.querySelector(".card-title");
    let cost = elCard.querySelector(".card-text");
    let size = elCard.querySelector(".badge");
    let elYear = elCard.querySelector(".born");
    let editBtn = elCard.querySelector(".edit");
    
    elCardBox.dataset.id = product.id
    elImgCard.src = product.img;
    nameParrots.textContent = product.title;
    cost.textContent = "$" + product.price;
    size.textContent = product.sizes.width + " x " + product.sizes.height;
    elYear.textContent = product.birthDate;
    editBtn.dataset.id = product.id;
    // console.log(editBtn.dataset.id);
    let elItem = document.createElement("li");
    elItem.className = "col-6 item";
    elItem.dataset.id = product.id;
    elItem.appendChild(elCard);
    elFragmentWrapper.appendChild(elItem);
    elWrapperListParrots.appendChild(elFragmentWrapper);

    editBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        elEditData.dataset.id = editBtn.dataset.id
      
        console.log(elEditData.dataset.id );
      })
      
   
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



function handleChange (evt) {
  if (evt.target.matches('.delete')) {
    let deletedItem = evt.target.closest('li')
    let itemId = deletedItem.dataset.id
    let deletCard = products.filter((product)=> product.id !=itemId)
    products = deletCard
    renderParrots (deletCard)
  }
}
//
function changeCardContent(evt) {
  evt.preventDefault();
  // console.log(modaleditTitle.value);
  let findEdite = products.find((e)=> e.id == elEditData.dataset.id )
  // console.log(elEditData);
  let edittitle = modaleditTitle.value.trim();
  let editPrice = modaleditPrice.value.trim();
  let editBrithDate = modaleditBirthDate.value.trim();
  let editWidth = modaleditWidth.value.trim();
  let editHeight = modaleditHeight.value.trim();
  let editFeatures = modaleditFeatures.value.trim();
  
findEdite = [{
title: edittitle,
img: "https://media.istockphoto.com/photos/amazon-rainforest-parrot-macaw-picture-id1197182594?b=1&k=20&m=1197182594&s=170667a&w=0&h=bBQfSDgofCr_w2DBf79cwQe-JA45i02vCv7Ttx5qcmU=",
price: editPrice ? editPrice :price,
// birthDate: editBrithDate ? editBrithDate : birthDate,
sizes: {
  width: editWidth ? editWidth : width,
  height: editHeight ? editHeight : height,
},
features: editFeatures ? editFeatures : features,
}];
products.push(findEdite)
renderParrots(products);
console.log(findEdite);

}
elEditData.addEventListener("submit", changeCardContent);

elAddCardData.addEventListener("submit", handleAddCard);
elSearchForm.addEventListener("submit", handleSearch);
elWrapperListParrots.addEventListener("click", handleChange);

// let edittitle  = modaleditTitle.value.trim();
// let editPrice  = modaleditPrice.value.trim();
// let editBrithDate  = modaleditBirthDate.value.trim();
// let editWidth  = modaleditWidth.value.trim();
// let editHeight  = modaleditHeight.value.trim();
// let editFeatures  = modaleditFeatures.value.trim();
// if (evt.target.dataset.id = product.id) {
//     product.title = edittitle
//     product.price ="$" + editPrice
//     product.birthDate = editBrithDate
//     product.sizes.width = editWidth
//     product.sizes.height = editHeight
//     product.features = editFeatures
//     //   console.log(product.title);
// }
