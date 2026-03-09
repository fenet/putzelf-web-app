import crypto from "crypto";

const META_PIXEL_ID = process.env.META_PIXEL_ID || process.env.FB_PIXEL_ID;
const META_CONVERSIONS_TOKEN =
  process.env.META_CONVERSIONS_TOKEN || process.env.META_ACCESS_TOKEN;
const META_DATASET_ID = process.env.META_DATASET_ID;
const META_DATASET_TOKEN = process.env.META_DATASET_TOKEN;
const META_API_VERSION = process.env.META_API_VERSION || "v19.0";
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

const DATASET_CHECK_INTERVAL_MS = 6 * 60 * 60 * 1000;
let lastDatasetCheck = 0;

function getFetch() {
  if (typeof fetch === "function") {
    return fetch;
  }

  console.warn(
    "Meta Conversions API skipped: global fetch not available. Upgrade Node.js to v18+ or polyfill fetch."
  );
  return null;
}

function hashSha256(value) {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized, "utf8").digest("hex");
}

function hashPhone(value) {
  if (!value) return undefined;
  const numeric = value.replace(/[^0-9+]/g, "");
  if (!numeric) return undefined;
  return crypto.createHash("sha256").update(numeric, "utf8").digest("hex");
}

function extractNameParts(name) {
  if (!name) return { firstName: undefined, lastName: undefined };
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return { firstName: undefined, lastName: undefined };
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: undefined };
  }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function normalizeIp(ip) {
  if (!ip) return undefined;
  const first = ip.split(",")[0]?.trim();
  if (!first) return undefined;
  return first.replace("::ffff:", "");
}

async function maybeLogDatasetQuality(fetchFn) {
  if (!META_DATASET_ID || !META_DATASET_TOKEN) return;
  const now = Date.now();
  if (now - lastDatasetCheck < DATASET_CHECK_INTERVAL_MS) return;
  lastDatasetCheck = now;

  try {
    const params = new URLSearchParams({ access_token: META_DATASET_TOKEN });
    const url = `https://graph.facebook.com/${META_API_VERSION}/${META_DATASET_ID}/stats?${params.toString()}`;
    const response = await fetchFn(url, { method: "GET" });
    if (!response.ok) {
      const text = await response.text();
      console.warn("Meta Dataset Quality fetch failed:", text);
      return;
    }
    const stats = await response.json();
    console.log("Meta Dataset Quality stats:", JSON.stringify(stats));
  } catch (err) {
    console.warn("Meta Dataset Quality fetch error:", err && err.message);
  }
}

export async function sendMetaLeadEvent({
  booking,
  eventId,
  eventSourceUrl,
  clientIp,
  userAgent,
}) {
  if (!META_PIXEL_ID || !META_CONVERSIONS_TOKEN) {
    console.warn(
      "Meta Conversions API disabled: missing META_PIXEL_ID or META_CONVERSIONS_TOKEN env vars."
    );
    return;
  }
  if (!booking) {
    console.warn("Meta Conversions API skipped: booking payload missing.");
    return;
  }

  const fetchFn = getFetch();
  if (!fetchFn) return;

  const { firstName, lastName } = extractNameParts(booking.name);
  const eventTime = Math.floor(Date.now() / 1000);
  const dedupeId = eventId || `srv_${booking.id || "unknown"}_${eventTime}`;
  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: eventTime,
        event_id: dedupeId,
        action_source: "website",
        event_source_url: eventSourceUrl,
        data_processing_options: [],
        data_set_id: META_DATASET_ID,
        user_data: {
          em: hashSha256(booking.email),
          ph: hashPhone(booking.phone),
          fn: hashSha256(firstName),
          ln: hashSha256(lastName),
          client_user_agent: userAgent,
          client_ip_address: normalizeIp(clientIp),
        },
        custom_data: {
          currency: "EUR",
          value: Number(booking.price) || 0,
          booking_id: booking.id,
          service_type: booking.typeOfCleaning,
        },
      },
    ],
  };

  const params = new URLSearchParams({ access_token: META_CONVERSIONS_TOKEN });
  if (META_TEST_EVENT_CODE) params.append("test_event_code", META_TEST_EVENT_CODE);

  const url = `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?${params.toString()}`;

  try {
    const response = await fetchFn(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Meta Conversions API error:", errorText);
    } else if (process.env.NODE_ENV !== "production") {
      const result = await response.json();
      console.log("Meta Conversions API success:", JSON.stringify(result));
    }
  } catch (err) {
    console.warn("Meta Conversions API request failed:", err && err.message);
  }

  await maybeLogDatasetQuality(fetchFn);
}

export async function sendMetaEvent({
  eventName,
  eventId,
  eventSourceUrl,
  clientIp,
  userAgent,
  customData,
}) {
  if (!META_PIXEL_ID || !META_CONVERSIONS_TOKEN) {
    console.warn(
      "Meta Conversions API disabled: missing META_PIXEL_ID or META_CONVERSIONS_TOKEN env vars."
    );
    return;
  }
  if (!eventName) {
    console.warn("Meta Conversions API skipped: eventName missing.");
    return;
  }

  const fetchFn = getFetch();
  if (!fetchFn) return;

  const eventTime = Math.floor(Date.now() / 1000);
  const dedupeId = eventId || `srv_evt_${eventTime}`;
  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        event_id: dedupeId,
        action_source: "website",
        event_source_url: eventSourceUrl,
        data_processing_options: [],
        data_set_id: META_DATASET_ID,
        user_data: {
          client_user_agent: userAgent,
          client_ip_address: normalizeIp(clientIp),
        },
        custom_data: customData || {},
      },
    ],
  };

  const params = new URLSearchParams({ access_token: META_CONVERSIONS_TOKEN });
  if (META_TEST_EVENT_CODE) params.append("test_event_code", META_TEST_EVENT_CODE);

  const url = `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?${params.toString()}`;

  try {
    const response = await fetchFn(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Meta Conversions API error:", errorText);
    } else if (process.env.NODE_ENV !== "production") {
      const result = await response.json();
      console.log("Meta Conversions API success:", JSON.stringify(result));
    }
  } catch (err) {
    console.warn("Meta Conversions API request failed:", err && err.message);
  }

  await maybeLogDatasetQuality(fetchFn);
}
