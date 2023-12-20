const closeBtn = document.querySelector(".close-btn");
const header = document.querySelector("header");
const discountCodeSection = document.querySelector(".discount-code-section");
const mobileMenuBtn = document.querySelector(".fa-bars");
const mobileMenu = document.querySelector(".mobile-menu");
const layers = document.querySelectorAll(".layer");
const buttons = [...document.querySelectorAll(".add-btn")];
const notifications = document.querySelectorAll(".added-to-cart");
const items = [...document.querySelectorAll(".grid-item")];
const checkboxes = [...document.querySelectorAll("input")];
const gridContainer = document.querySelector(".grid-container");
const shoppingCartSection = document.querySelector(".shopping-cart-section");
const shoppingBagIcon = document.querySelector(".fa-shopping-bag");
const noScrollLayer = document.querySelector(".no-scroll-layer");
const cartItemsContainer = document.querySelector(".cart-items-container");
const itemNames = [...document.querySelectorAll(".grid-item > p")].map(
  (item) => item.innerText
);
const itemPrices = [...document.querySelectorAll(".grid-item span.price")].map(
  (item) => item.innerText
);
const itemImages = [...document.querySelectorAll(".grid-item img")].map(
  (item) => item.attributes.src.textContent
);
const itemImagesAltText = [...document.querySelectorAll(".grid-item img")].map(
  (item) => item.alt
);
const cartStatus = document.querySelector(".cart-status");
let subTotal = document.querySelector(".subtotal-amount");
let bagItems = document.querySelector(".bag-items");

// Open shopping cart
shoppingBagIcon.addEventListener("click", () => {
  shoppingCartSection.style.display = "flex";
  document.body.style.position = "fixed";
  noScrollLayer.style.display = "block";
});

// close discount
closeBtn.addEventListener("click", () => {
  header.removeChild(discountCodeSection);
});

// open mobile menu
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("visible-menu");
});

window.addEventListener("resize", () => {
  mobileMenu.classList.remove("visible-menu");
  shoppingCartSection.style.display = "none";
  noScrollLayer.style.display = "none";
  document.body.style.position = "unset";
});

let itemID = 0;

// Add items to cart
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    btn.style.display = "none";
    notifications[index].style.visibility = "visible";

    cartStatus.textContent = "Your cart";

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.setAttribute("id", `${itemID}`);

    const itemButtonsIdentifier = `item-buttons-${itemID}`;
    const addedItemPrice = parseFloat(itemPrices[index].slice(1));
    const prevSubTotal = parseFloat(subTotal.textContent.slice(1));
    const newSubTotal = (addedItemPrice + prevSubTotal).toFixed(2);

    bagItems.textContent = parseInt(bagItems.textContent) + 1;

    subTotal.textContent = "$" + newSubTotal;

    itemDiv.innerHTML = `
            <img src=${itemImages[index]} alt=${itemImagesAltText[index]}/>
            <div class="item-info">
                <p>${itemNames[index]}</p>
                <span class="item-price">${itemPrices[index]}</span>
                <div class="count-container" id=${itemButtonsIdentifier}>
                    <button class="decrease-amount">-</button>
                    <span>1</span>
                    <button class="increase-amount">+</button>
                </div>
            </div>
        `;

    cartItemsContainer.appendChild(itemDiv);
    itemID++;

    const itemButtonsContainer = document.getElementById(itemButtonsIdentifier);
    const minusBtn = itemButtonsContainer.querySelector(".decrease-amount");
    const addBtn = itemButtonsContainer.querySelector(".increase-amount");

    // Decrease amount
    minusBtn.addEventListener("click", (e) => {
      const currentSpan1 = itemButtonsContainer.querySelector("span");

      if (currentSpan1.textContent === "0") {
        return;
      }

      let count1 = parseInt(currentSpan1.textContent);
      count1 -= 1;

      const currentItemPrice1 =
        itemDiv.querySelector(".item-price").textContent;

      const slicedPrice1 = currentItemPrice1.slice(1);

      let newTotal1 = (
        parseFloat(subTotal.textContent.slice(1)) - parseFloat(slicedPrice1)
      ).toFixed(2);

      subTotal.textContent = "$" + newTotal1;
      currentSpan1.textContent = count1.toString();
      bagItems.textContent = parseInt(bagItems.textContent) - 1;
    });

    // Increase amount
    addBtn.addEventListener("click", (e) => {
      const currentSpan2 = itemButtonsContainer.querySelector("span");

      let count2 = parseInt(currentSpan2.textContent);
      count2 += 1;
      const currentItemPrice2 =
        itemDiv.querySelector(".item-price").textContent;

      const slicedPrice2 = currentItemPrice2.slice(1);

      let newTotal2 = (
        parseFloat(slicedPrice2) + parseFloat(subTotal.textContent.slice(1))
      ).toFixed(2);

      subTotal.textContent = "$" + newTotal2;
      currentSpan2.textContent = count2.toString();
      bagItems.textContent = parseInt(bagItems.textContent) + 1;
    });
  });
});

window.onclick = function (e) {
  if (e.target !== mobileMenu && e.target !== mobileMenuBtn) {
    mobileMenu.classList.remove("visible-menu");
  }

  if (
    !e.target.closest(".shopping-cart-section") &&
    e.target !== shoppingBagIcon
  ) {
    shoppingCartSection.style.display = "none";
    document.body.style.position = "unset";
    noScrollLayer.style.display = "none";
  }
};

// Filter items
checkboxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    gridContainer.innerHTML = "";

    checkboxes.forEach((checkbox, i) => {
      items.forEach((item) => {
        if (checkbox.checked && item.classList.contains(checkbox.value)) {
          gridContainer.appendChild(item);
        } else if (!checkboxes.some((checkbox) => checkbox.checked)) {
          gridContainer.appendChild(item);
        }
      });
    });
  });
});