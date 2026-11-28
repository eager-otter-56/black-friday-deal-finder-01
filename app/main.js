// main.js — wires the controls to the deal list and renders the page.
// Initial state can come from the URL (?q=, ?cat=, ?store=, ?min=,
// ?verdict=, ?sort=) so a filtered view can be linked or photographed.

import { DEALS } from "./deals.js";
import { categoriesOf, storesOf, filterDeals, sortDeals, summarise } from "./logic.js";
import { dealCard, statsBar, resultLine, featuredStrip } from "./render.js";

const state = { query: "", category: "All", store: "All", minDiscount: 0, verdict: "All", sort: "discount" };

function readUrlState() {
  const p = new URLSearchParams(location.search);
  if (p.get("q")) state.query = p.get("q");
  if (p.get("cat")) state.category = p.get("cat");
  if (p.get("store")) state.store = p.get("store");
  if (p.get("min")) state.minDiscount = Number(p.get("min")) || 0;
  if (p.get("verdict")) state.verdict = p.get("verdict");
  if (p.get("sort")) state.sort = p.get("sort");
}

function fillSelect(id, values, current) {
  const el = document.getElementById(id);
  el.innerHTML = values.map((v) => `<option ${v === current ? "selected" : ""}>${v}</option>`).join("");
}

function render() {
  const filtered = sortDeals(filterDeals(DEALS, state), state.sort);
  document.getElementById("grid").innerHTML = filtered.map(dealCard).join("");
  document.querySelectorAll("[data-cat]").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.cat === state.category);
  });
  const active = state.query || state.category !== "All" || state.store !== "All" || state.minDiscount > 0 || state.verdict !== "All";
  document.getElementById("result-line").textContent = resultLine(filtered.length, DEALS.length, active);
  document.getElementById("stats").innerHTML = statsBar(summarise(DEALS));
  document.getElementById("featured").innerHTML = featuredStrip(DEALS);
}

function bind() {
  const q = document.getElementById("search");
  q.value = state.query;
  q.addEventListener("input", () => { state.query = q.value; render(); });
  fillSelect("category", ["All", ...categoriesOf(DEALS)], state.category);
  fillSelect("store", ["All", ...storesOf(DEALS)], state.store);
  document.getElementById("category").addEventListener("change", (e) => { state.category = e.target.value; render(); });
  document.getElementById("store").addEventListener("change", (e) => { state.store = e.target.value; render(); });
  document.getElementById("discount").addEventListener("change", (e) => { state.minDiscount = Number(e.target.value); render(); });
  document.getElementById("verdict").addEventListener("change", (e) => { state.verdict = e.target.value; render(); });
  document.getElementById("sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  document.getElementById("discount").value = String(state.minDiscount);
  document.getElementById("verdict").value = state.verdict;
  document.getElementById("sort").value = state.sort;
  document.querySelectorAll("[data-cat]").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.category = chip.dataset.cat;
      document.getElementById("category").value = state.category;
      render();
    });
  });
}

readUrlState();
bind();
render();
