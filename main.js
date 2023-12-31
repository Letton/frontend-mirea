import "./style.scss";

const target = document.querySelector("footer");
const scrollToTopBtn = document.querySelector(".scrollTopBtn");
const loginButton1 = document.getElementById("loginButton1");
const loginButton2 = document.getElementById("loginButton2");
const likeButton = document.getElementById("likeButton");
const buttonFollow = document.getElementById("buttonFollow");

const buttonFollowParent = document.getElementById("buttonFollowParent");

const svgElement = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "svg"
);

svgElement.setAttribute("stroke", "currentColor");
svgElement.setAttribute("fill", "currentColor");
svgElement.setAttribute("stroke-width", "0");
svgElement.setAttribute("viewBox", "0 0 1024 1024");
svgElement.setAttribute("height", "1em");
svgElement.setAttribute("width", "1em");

const pathElement = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "path"
);
pathElement.setAttribute(
  "d",
  "M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"
);

svgElement.appendChild(pathElement);

loginButton1.addEventListener("click", () => {
  if (confirm("Желаете ли вы прйоти регистрацию на сайте?")) {
    alert("Круто!");
  } else {
    alert("Попробуй ещё раз");
  }
});

loginButton2.addEventListener("click", () => {
  const login = prompt("Введите логин");
  if (login === null || login == "") {
    return alert("Отменено");
  }
  if (login === "Админ") {
    let password = prompt("Введите пароль");
    if (password == null) {
      return alert("Отменено");
    }
    if (password == "Я главный") {
      return alert("Здравствуйте!");
    }
    return alert("Неверный пароль!");
  }
  return alert("Я вас не знаю!");
});

likeButton.addEventListener("click", () => {
  if (likeButton.style.color == "") {
    return (likeButton.style.color = "rgb(233, 30, 99)");
  }
  return (likeButton.style.color = null);
});

let isActivated = false;

buttonFollow.addEventListener("click", () => {
  isActivated = !isActivated;
});

let startTime = Date.now();

buttonFollowParent.addEventListener("mousemove", (e) => {
  if (isActivated) {
    if (Date.now() - startTime > 100) {
      startTime = Date.now();
      const newElement = svgElement.cloneNode(true);
      newElement.style.fontSize = "2rem";
      newElement.style.position = "absolute";
      newElement.style.top = e.layerY + "px";
      newElement.style.left = e.layerX + "px";
      buttonFollowParent.appendChild(newElement);
    }
  }
});

const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      scrollToTopBtn.classList.add("showScrollTopBtn");
    } else {
      scrollToTopBtn.classList.remove("showScrollTopBtn");
    }
  });
};

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

let observer_up = new IntersectionObserver(callback);
observer_up.observe(target);

const menu = document.getElementById("menu");
const navbar = document.querySelector(".navbar");
menu.addEventListener("change", (e) => {
  if (e.currentTarget.checked) {
    navbar.classList.add("visible");
  } else {
    navbar.classList.remove("visible");
  }
});

const captchaText = document.getElementById("captcha-text");

const generateCaptcha = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

captchaText.textContent = generateCaptcha(8);

const captchaForm = document.getElementById("captcha-form");
const captchaInput = document.getElementById("captcha-input");

let attempt = 0;

captchaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (attempt === 1) {
    const values = captchaText.textContent.replaceAll(" ", "").split("+");
    if (
      (parseInt(values[0]) + parseInt(values[1])).toString() ===
      captchaInput.value
    ) {
      return alert("Успешно!");
    } else {
      return alert("Неверная каптча!");
    }
  }
  if (captchaInput.value !== captchaText.textContent && attempt === 0) {
    attempt += 1;
    return (captchaText.textContent =
      Math.floor(Math.random() * 100).toString() +
      " + " +
      Math.floor(Math.random() * 100).toString());
  }
  if (captchaInput.value === captchaText.textContent && attempt === 0) {
    return alert("Успешно!");
  }
});

class Cart {
  read = () => {
    const userInput = parseFloat(prompt("Введите число:"));
    if (!isNaN(userInput)) {
      this.value += userInput;
    } else {
      alert("Вы ввели некорректное число. Попробуйте еще раз.");
    }
  };

  constructor(startingValue) {
    this.value = startingValue;
  }
}

const createCart = document.getElementById("create-cart");
const modifyCart = document.getElementById("modify-cart");
const valueCart = document.getElementById("value-cart");

let cart;

createCart.addEventListener("click", () => {
  cart = new Cart(0);
  valueCart.textContent = cart.value;
});

modifyCart.addEventListener("click", () => {
  cart.read();
  valueCart.textContent = cart.value;
});

const truncateText = document.getElementById("truncateText");

const truncate = (text) => {
  return text.length > 10 ? text.substring(0, 10) + "..." : text;
};

for (let element of truncateText.getElementsByTagName("h3")) {
  element.innerText = truncate(element.innerText);
}

let cartItems = [];

const updateQuantity = (id, quantity) => {
  let itemIndex = cartItems.findIndex(
    ({ productId }) => productId == parseFloat(id)
  );
  cartItems[itemIndex].quantity = quantity;
  if (cartItems[itemIndex].quantity === 0) {
    cartItems.splice(itemIndex, 1);
  }
  updateCart();
};

let sortOption = true;

const sortByPrice = () => {
  cartItems = cartItems.sort((a, b) =>
    sortOption
      ? a.productPrice * a.quantity - b.productPrice * b.quantity
      : b.productPrice * b.quantity - a.productPrice * a.quantity
  );
  sortOption = !sortOption;
  updateCart();
};

const updateCart = () => {
  const shoppingCart = document.querySelector(".shopping-cart");
  if (cartItems.length > 0) {
    shoppingCart.innerHTML = `
    <button class="sort-by-price bg-[#646cff] py-2 px-4 ">Сортировать по цене</button>
    <ul class="mb-2"></ul>
    <div class="total-price text-xl text-right px-4"></div>
    `;
    const sortByPriceButton = shoppingCart.querySelector(".sort-by-price");
    sortByPriceButton.addEventListener("click", sortByPrice);
    let totalPrice = 0;
    const shoppingCartUl = shoppingCart.querySelector("ul");
    cartItems.forEach(({ productId, productTitle, productPrice, quantity }) => {
      const newItem = document.createElement("li");
      newItem.innerHTML = `
        <li class="flex border-b-2 border-[#383838] py-12 px-4 justify-between  ">
          <h4 class="text-xl">${productTitle}</h4>
          <div class="flex gap-2 items-center">
            <button class="btn-minus w-5 h-5 rounded-full bg-[#646cff] leading-[20px]">-</button>
            <span>${quantity}</span>
            <button class="btn-plus w-5 h-5 rounded-full bg-[#646cff] leading-[20px]">+</button>
          </div>
          <span>
            $${quantity * productPrice}
          </span>
          <button class="btn-clear">
            ✕
          </button>
        </li>
      `;
      totalPrice += quantity * productPrice;
      newItem
        .querySelector(".btn-plus")
        .addEventListener("click", () =>
          updateQuantity(productId, quantity + 1)
        );
      newItem
        .querySelector(".btn-minus")
        .addEventListener("click", () =>
          updateQuantity(productId, quantity - 1)
        );
      newItem
        .querySelector(".btn-clear")
        .addEventListener("click", () => updateQuantity(productId, 0));
      shoppingCartUl.appendChild(newItem);
    });
    shoppingCart.querySelector(
      ".total-price"
    ).textContent = `Итого: $${totalPrice}`;
  } else {
    shoppingCart.innerHTML = `
      <div class="text-xl px-4">Ваша корзина пуста</div>
    `;
  }
};

const addToCart = (id, title, price) => {
  let itemIndex = cartItems.findIndex(
    ({ productId }) => productId == parseFloat(id)
  );
  if (itemIndex != -1) cartItems[itemIndex].quantity += 1;
  else
    cartItems.push({
      productId: parseInt(id),
      productTitle: title,
      productPrice: parseFloat(price),
      quantity: 1,
    });
  updateCart();
};

document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product");
  const cartItemsElement = document.getElementById("cart-items");

  products.forEach((product) => {
    const addToCartButton = product.querySelector(".add-to-cart");
    const productId = product.dataset.id;
    const productTitle = product.dataset.title;
    const productPrice = product.dataset.price;
    addToCartButton.addEventListener("click", () => {
      addToCart(productId, productTitle, productPrice);
    });
  });
});

const notificationsCounter = document.querySelector(".notifications-counter");
const notificationsButton = document.querySelector(".notifications-button");

let isCounterRunning = true;

notificationsButton.addEventListener("click", () => {
  isCounterRunning = false;
  let delayTimer = setTimeout(() => (isCounterRunning = true), 2000);
});

const increaseValue = () => {
  notificationsCounter.textContent =
    parseInt(notificationsCounter.textContent) + 1;
};

const increaseValueDecorator = (increaseValue) => {
  if (isCounterRunning) {
    increaseValue();
  }
};

setInterval(increaseValueDecorator, 500, increaseValue);

const itemsList = document.getElementById("items-list");

const addItemToList = document.getElementById("add-item-to-list");

addItemToList.addEventListener("click", async () => {
  let data = prompt("Введите элемент");
  while (data !== "" && data !== null) {
    console.log(data);
    const liNode = document.createElement("li");
    liNode.textContent = data;
    itemsList.appendChild(liNode);
    await new Promise((resolve) => setTimeout(resolve, 0));
    data = prompt("Введите элемент");
  }
});

const showNotification = ({ delay, text }) => {
  let notification = document.querySelector(".notification");

  const timeout = setTimeout(() => {
    notification.classList.remove("show");
  }, delay);

  notification.addEventListener("click", (e) => {
    console.log(e.currentTarget);
    if (e.target.tagName === "BUTTON" && e.target.closest(".notification")) {
      notification.classList.remove("show");
      clearTimeout(timeout);
    }
  });
  notification.classList.add("show");
  notification.children[0].textContent = text;
};

const showNotificationButton = document.getElementById("show-notification");

showNotificationButton.addEventListener("click", () =>
  showNotification({ delay: 6000, text: "Hello!" })
);

const centerImage = () => {
  const image = document.getElementById("centered-image");

  const halfContainerWidth =
    image.parentElement.offsetWidth / 2 - image.offsetWidth / 2;
  const halfContainerHeight =
    image.parentElement.offsetHeight / 2 - image.offsetHeight / 2;

  image.style.left = `${halfContainerWidth}px`;
  image.style.top = `${halfContainerHeight}px`;
};

centerImage();

window.addEventListener("resize", centerImage);

document.addEventListener("click", (e) =>
  console.log(`Координаты нажатия: ${e.pageX}, ${e.pageY}`)
);

window.addEventListener("scroll", (e) => {
  const parallaxImagesContainer = document.querySelector(".parallax");
  Array.from(parallaxImagesContainer.children).forEach((el) => {
    const coords = parallaxImagesContainer.getBoundingClientRect();
    if (el.dataset?.speedx && el.dataset?.speedy && coords.y < 200) {
      el.style.top = `${
        (coords.y - 200) * -1 * parseFloat(el.dataset?.speedy)
      }px`;
      el.style.left = `${
        (coords.y - 200) * -1 * parseFloat(el.dataset?.speedx)
      }px`;
    }
  });
});

const onEntry = (entry) => {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add("show");
    }
  });
};

let options = {
  threshold: [0.5],
};

let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".onscroll");

for (let elm of elements) {
  observer.observe(elm);
}

const contents = document.getElementById("contents");

contents.addEventListener("click", (e) => {
  if (e.target.nodeName === "A") {
    e.preventDefault();
    const flag = confirm("Вы действительно хотите перейти по ссылке?");
    if (flag) {
      window.open(`${e.target.getAttribute("href")}`);
    }
  }
});

const thumbs = document.getElementById("thumbs");

const showThumbnail = (href, title) => {
  largeImg.src = href;
  largeImg.alt = title;
};

thumbs.addEventListener("click", (e) => {
  let thumbnail = e.target.closest("a");

  if (!thumbnail) return;
  showThumbnail(thumbnail.href, thumbnail.title);
  e.preventDefault();
});

const list = document.getElementById("customList");
const listItems = list.getElementsByTagName("li");

list.addEventListener("click", function (e) {
  const target = e.target;
  const isCtrlPressed = e.ctrlKey || e.metaKey;
  e.preventDefault();
  if (!isCtrlPressed) {
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove("selected");
    }
  }
  target.classList.toggle("selected");
});

const slider = document.getElementById("custom-slider");
const thumb = document.getElementById("slider-thumb");
let isDragging = false;

thumb.addEventListener("mousedown", (e) => {
  isDragging = true;
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.removeEventListener("mousemove", handleMouseMove);
  });
});

const handleMouseMove = (e) => {
  if (!isDragging) return;
  const sliderRect = slider.getBoundingClientRect();
  let position = e.clientX - sliderRect.left;
  position = Math.max(0, Math.min(position, sliderRect.width));

  const percentage = (position / sliderRect.width) * 100;
  thumb.style.left = `${percentage}%`;
};

const items = document.querySelectorAll(".product");
const totalElement = document.getElementById("total");
const shoppingCart = document.querySelector(".shopping-cart");

let total = 0;

items.forEach((item) => {
  item.addEventListener("dragstart", handleDragStart);
});

shoppingCart.addEventListener("dragover", handleDragOver);
shoppingCart.addEventListener("drop", handleDrop);

function handleDragStart(event) {
  event.dataTransfer.setData("id", event.target.dataset.price);
  event.dataTransfer.setData("title", event.target.dataset.title);
  event.dataTransfer.setData("price", event.target.dataset.price);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("id");
  const title = event.dataTransfer.getData("title");
  const price = event.dataTransfer.getData("price");
  addToCart(id, title, price);
}

function animate({ duration, draw, timing }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

const firstAnimation = document.getElementById("firstAnimation");
const secondAnimation = document.getElementById("secondAnimation");

firstAnimation.addEventListener("click", () => {
  animate({
    duration: 1000,
    timing(timeFraction) {
      return Math.pow(timeFraction, 5);
    },
    draw(progress) {
      firstAnimation.style.left = progress * 90 + "%";
    },
  });
});

function makeEaseInOut(timing) {
  return function (timeFraction) {
    if (timeFraction < 0.5) return timing(2 * timeFraction) / 2;
    else return (2 - timing(2 * (1 - timeFraction))) / 2;
  };
}

function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return (
        -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      );
    }
  }
}

let bounceEaseInOut = makeEaseInOut(bounce);

secondAnimation.addEventListener("click", () => {
  animate({
    duration: 3000,
    timing: bounceEaseInOut,
    draw(progress) {
      secondAnimation.style.left = progress * 90 + "%";
    },
  });
});
