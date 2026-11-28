// render.js — turns deal objects into card markup and header stats.
// All text is built from deals.js data; nothing is fetched.

import { VERDICTS, discountPct, savingUsd, formatUsd } from "./logic.js";
import { CHECKED_AT, CHECKED_AT_V2 } from "./deals.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

export function dealCard(deal) {
  const pct = discountPct(deal);
  const v = VERDICTS[deal.verdict];
  return `<article class="card verdict-${deal.verdict}">
    <div class="card-top">
      <span class="cat">${esc(deal.cat)}</span>
      <span class="off">-${pct}%</span>
    </div>
    <h3 class="name">${esc(deal.name)}</h3>
    <p class="store">at <strong>${esc(deal.store)}</strong></p>
    <p class="prices">
      <span class="now">${formatUsd(deal.price)}</span>
      <span class="was">${formatUsd(deal.was)}</span>
      <span class="save">Save ${formatUsd(savingUsd(deal))}</span>
    </p>
    <p class="verdict"><span class="badge">${v.label}</span> ${esc(deal.why)}</p>
    <p class="meta">Checked ${deal.checked === "v2" ? CHECKED_AT_V2 : CHECKED_AT} · Source: ${esc(deal.source)}</p>
    <a class="go" href="${esc(deal.url)}" target="_blank" rel="noopener">View at ${esc(deal.store)} →</a>
  </article>`;
}

// The three loudest verified cuts, shown as a featured strip above the
// grid so the first screen carries real deals, not just a headline.
export function featuredStrip(deals) {
  const top = deals
    .filter((d) => d.verdict === "new-low" || d.verdict === "strong")
    .sort((a, b) => discountPct(b) - discountPct(a))
    .slice(0, 3);
  return top.map((deal) => `<article class="feat">
    <div class="feat-top"><span class="cat">${esc(deal.cat)} · ${esc(deal.store)}</span><span class="off">-${discountPct(deal)}%</span></div>
    <h3 class="feat-name">${esc(deal.name)}</h3>
    <p class="prices"><span class="now">${formatUsd(deal.price)}</span> <span class="was">${formatUsd(deal.was)}</span></p>
    <a class="go" href="${esc(deal.url)}" target="_blank" rel="noopener">View at ${esc(deal.store)} →</a>
  </article>`).join("");
}

export function statsBar(stats) {
  return `<div class="stat"><strong>${stats.total}</strong><span>deals checked today</span></div>
  <div class="stat"><strong>${stats.avg}%</strong><span>average discount</span></div>
  <div class="stat"><strong>${stats.best}%</strong><span>biggest discount</span></div>
  <div class="stat"><strong>${stats.newLows}</strong><span>all-time lows</span></div>`;
}

export function resultLine(shown, total, filtersActive) {
  if (shown === 0) return "No deals match — clear a filter or try another search.";
  return `Showing ${shown} of ${total} checked deals${filtersActive ? " (filters on)" : ""}, sorted for shoppers first.`;
}
