"use strict";

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handdle scrolling when tapping on the "Contact me" button on home
const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", (event) => {
  scrollIntoView("#contact");
});

// Home & contact me btn fades to transparent as the window scroll down
const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;
const homeContainer = document.querySelector(".home__container");
document.addEventListener("scroll", () => {
  homeContainer.style.opacity = 1 - window.scrollY / homeHeight;
  contactBtn.style.opacity = 1 - window.scrollY / homeHeight;
});

// when mouse on Contact me btn -> recover opacity
contactBtn.addEventListener("mouseenter", (e) => {
  contactBtn.style.opacity = 1;
});

// when mouse off Contact me btn -> lose opacity again
contactBtn.addEventListener("mouseleave", (e) => {
  contactBtn.style.opacity = 1 - window.scrollY / homeHeight;
});

// Go-to-top button pops up when Home is gone
const homeBtn = document.querySelector(".top-btn");
document.addEventListener("scroll", () => {
  if (window.scrollY >= homeHeight) {
    homeBtn.classList.add("top-btn--appear");
  } else {
    homeBtn.classList.remove("top-btn--appear");
  }
});

// Click top button -> go to home
homeBtn.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  if (active != null) {
    active.classList.remove("selected");
  }

  e.target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// Define funciton for easy scrolling
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
