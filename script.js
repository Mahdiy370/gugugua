"use strict";

/* 1. Qorong'i / yorug' rejim */
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* 2. Telefon menyusi */
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

function closeMenu() {
  menu.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Menyuni ochish");
}

burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Menyuni yopish" : "Menyuni ochish");
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

/* 3. Ko'nikmalar chiziqlari ekranga kelganda to'ladi */
const skills = document.querySelector(".skills");
if ("IntersectionObserver" in window) {
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skills.classList.add("show");
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  skillObserver.observe(skills);
} else {
  skills.classList.add("show");
}

/* 4. Menyuda hozirgi bo'limni ajratib ko'rsatish */
const links = [...document.querySelectorAll(".nav a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => s && navObserver.observe(s));
}

/* 5. Pastki qismdagi yil avtomatik */
document.getElementById("year").textContent = new Date().getFullYear();
