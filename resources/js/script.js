"use strict";
const navList = document.querySelector(".nav-list");
const mediaList = document.querySelector(".media-list");

navList.addEventListener("click", function (e) {
  e.preventDefault();

  if (!e.target.classList.contains("nav-link")) return;
  const id = e.target.getAttribute("href");

  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

mediaList.addEventListener("click", function (e) {
  e.preventDefault();

  if (!e.target.classList.contains("media-link")) return;
  const id = e.target.getAttribute("href");

  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

const initMap = function () {
  const map = L.map("map").setView([35.76727, -5.79975], 13);

  http: L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([35.76727, -5.79975]).addTo(map);
};

window.addEventListener("load", initMap);

const header = document.querySelector("header");
const nav = document.querySelector(".nav");
const headerCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerOptions = {
  root: null,
  threshold: 0,
  rootMargin: "-70px",
};

const headerObserving = new IntersectionObserver(headerCallback, headerOptions);
headerObserving.observe(header);

const sectionPhotos = document.querySelector(".section-photos");

const photosCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  const allImgs = entry.target.querySelectorAll("img");

  allImgs.forEach((img) => {
    img.src = img.dataset.src;
    img.addEventListener("load", function () {
      this.classList.remove("lazy-img");
    });
  });
};

const photosOptions = {
  root: null,
  threshold: 0.2,
};

const photosObserver = new IntersectionObserver(photosCallback, photosOptions);

photosObserver.observe(sectionPhotos);

const allMainPhotos = document.querySelectorAll(".main-photos");

const mainPhotosCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    this.classList.remove("lazy-img");
  });
};

const mainPhotosOptions = {
  root: null,
  threshold: 0.2,
};

const mainPhotosObserver = new IntersectionObserver(
  mainPhotosCallback,
  mainPhotosOptions
);

allMainPhotos.forEach((img) => {
  mainPhotosObserver.observe(img);
});

const allBoxes = document.querySelectorAll(".box");

const boxCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  const allCon = entry.target.querySelectorAll(".fade");
  console.log(allCon);
  allCon.forEach((el) => {
    el.classList.remove("fade");
  });
};

const boxOptions = {
  root: null,
  threshold: 0.3,
};
const boxObserver = new IntersectionObserver(boxCallback, boxOptions);

allBoxes.forEach((con) => {
  boxObserver.observe(con);
});

document.querySelector(".media-close").addEventListener("click", function () {
  document.querySelector(".section-media").style.transform = "translateX(100%)";
});
document.querySelector(".media-open").addEventListener("click", function () {
  document.querySelector(".section-media").style.transform = "translateX(0%)";
});
