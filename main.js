import "./style.scss";

const target = document.querySelector("footer");
const scrollToTopBtn = document.querySelector(".scrollTopBtn");

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
