// render.js — turns deal objects into card markup and header stats.
// All text is built from deals.js data; nothing is fetched.

import { VERDICTS, discountPct, savingUsd, formatUsd } from "./logic.js";
import { CHECKED_AT } from "./deals.js";

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
    <p class="meta">Checked ${CHECKED_AT} · Source: ${esc(deal.source)}</p>
    <a class="go" href="${esc(deal.url)}" target="_blank" rel="noopener">View at ${esc(deal.store)} →</a>
  </article>`;
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
