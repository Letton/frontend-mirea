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
  console.log(likeButton.style.color);
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

let observer = new IntersectionObserver(callback);
observer.observe(target);

const menu = document.getElementById("menu");
const navbar = document.querySelector(".navbar");
menu.addEventListener("change", (e) => {
  if (e.currentTarget.checked) {
    navbar.classList.add("visible");
  } else {
    navbar.classList.remove("visible");
  }
});
