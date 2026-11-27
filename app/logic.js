// logic.js — price maths, verdict labels, filtering and sorting.
// Pure functions over the deal list; no DOM work lives here.

export const VERDICTS = {
  "new-low": { label: "NEW LOW", rank: 0, note: "Lowest price seen for this product" },
  "strong": { label: "STRONG DEAL", rank: 1, note: "Well below the usual sale price" },
  "fair": { label: "FAIR", rank: 2, note: "A real cut, but nothing special" },
  "weak": { label: "THIN DEAL", rank: 3, note: "Small or inflated discount — shop carefully" },
};

export function discountPct(deal) {
  return Math.round((1 - deal.price / deal.was) * 100);
}

export function savingUsd(deal) {
  return Math.round((deal.was - deal.price) * 100) / 100;
}

export function formatUsd(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
}

export function categoriesOf(deals) {
  return [...new Set(deals.map((d) => d.cat))];
}

export function storesOf(deals) {
  return [...new Set(deals.map((d) => d.store))].sort();
}

export function filterDeals(deals, f) {
  const q = (f.query || "").trim().toLowerCase();
  return deals.filter((d) => {
    if (q && !(d.name + " " + d.store + " " + d.cat).toLowerCase().includes(q)) return false;
    if (f.category && f.category !== "All" && d.cat !== f.category) return false;
    if (f.store && f.store !== "All" && d.store !== f.store) return false;
    if (f.minDiscount && discountPct(d) < f.minDiscount) return false;
    if (f.verdict && f.verdict !== "All" && d.verdict !== f.verdict) return false;
    return true;
  });
}

export function sortDeals(deals, mode) {
  const by = {
    discount: (a, b) => discountPct(b) - discountPct(a),
    saving: (a, b) => savingUsd(b) - savingUsd(a),
    priceLow: (a, b) => a.price - b.price,
    verdict: (a, b) => VERDICTS[a.verdict].rank - VERDICTS[b.verdict].rank || discountPct(b) - discountPct(a),
  };
  return [...deals].sort(by[mode] || by.discount);
}

export function summarise(deals) {
  const total = deals.length;
  const avg = total ? Math.round(deals.reduce((s, d) => s + discountPct(d), 0) / total) : 0;
  const newLows = deals.filter((d) => d.verdict === "new-low").length;
  const best = deals.reduce((m, d) => Math.max(m, discountPct(d)), 0);
  return { total, avg, newLows, best };
}
