// Centralized pricing configuration
export const MIN_HOURS = 2;
export const TAX_RATE = 0.2; // 20%

// Window cleaning: net price per window (EUR)
export const WINDOW_PRICE_NET = 44.9;

// Intensive cleaning: gross price per hour (EUR). Gross means including VAT.
export const INTENSIVE_HOURLY_GROSS = 60;

// Derived values
export const INTENSIVE_HOURLY_NET = Number((INTENSIVE_HOURLY_GROSS / (1 + TAX_RATE)).toFixed(2));

export default {
  MIN_HOURS,
  TAX_RATE,
  WINDOW_PRICE_NET,
  INTENSIVE_HOURLY_GROSS,
  INTENSIVE_HOURLY_NET,
};
