// Backend pricing/config constants
export const MIN_HOURS = 2;
export const TAX_RATE = 0.2;
export const WINDOW_PRICE_NET = 44.9; // per window, net
export const INTENSIVE_HOURLY_GROSS = 60; // gross per hour
export const INTENSIVE_HOURLY_NET = Number((INTENSIVE_HOURLY_GROSS / (1 + TAX_RATE)).toFixed(2));

export default {
  MIN_HOURS,
  TAX_RATE,
  WINDOW_PRICE_NET,
  INTENSIVE_HOURLY_GROSS,
  INTENSIVE_HOURLY_NET,
};
