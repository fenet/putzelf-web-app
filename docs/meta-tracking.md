# Meta Ads Tracking Setup

This project now ships with coordinated Meta Pixel and Conversions API tracking. Follow the steps below to enable it in your environments.

## 1. Frontend configuration

1. In `frontend/.env`, supply the pixel ID that Meta created for your dataset:
   ```ini
   VITE_FB_PIXEL_ID=123456789012345
   ```
2. Rebuild or restart Vite so the environment variable is injected.
3. The landing and order flows already emit the following analytics events:
   - `Order_Submit_Click` (pre-submit intent)
   - `Booking_Confirmed` (fires only after a confirmed booking; mapped to Meta `Lead`)
   - `Confirmation_View`

The confirmation event exposes `event_id`, `value`, and `currency`, aligning the browser pixel with the server-side Conversions API event for deduplication.

## 2. Backend configuration

Set the following environment variables in `backend/.env`:

```ini
META_PIXEL_ID=123456789012345
META_CONVERSIONS_TOKEN=your_conversions_api_token
META_DATASET_ID=your_dataset_id
META_DATASET_TOKEN=your_dataset_quality_token
# Optional overrides
# META_API_VERSION=v19.0
# META_TEST_EVENT_CODE=TEST1234
```

- `META_CONVERSIONS_TOKEN` authenticates the Conversions API requests.
- `META_DATASET_TOKEN` authorizes Dataset Quality API lookups (recommended).
- `META_TEST_EVENT_CODE` forwards events to Meta's Test Events dashboard without affecting production reporting.

## 3. How it works

- When a booking is confirmed, the backend hashes the customer fields (email, phone, first/last name) and posts a `Lead` event to `https://graph.facebook.com/{version}/{pixelId}/events`.
- The frontend sends the same `event_id` to Meta Pixel, enabling deduplication between browser and server deliveries.
- The backend periodically fetches Dataset Quality metrics (`/{DATASET_ID}/stats`) and logs the JSON response to help monitor match rate and warnings. The interval defaults to six hours.

## 4. Testing checklist

1. Use Meta Events Manager → Test Events and set `META_TEST_EVENT_CODE` locally.
2. Trigger a booking confirmation; confirm the Pixel and Conversions API events arrive with identical `event_id` values.
3. After a few events, check the Dataset Quality stats in the backend logs for match rate and warnings.
4. Remove `META_TEST_EVENT_CODE` before going live.

Securely store all tokens. They grant access to ad conversion data and should not be committed to source control.

## 5. Required setup in Meta platform

1. In Meta Events Manager, create/select your dataset and copy:
   - `Pixel ID`
   - `Conversions API access token`
   - `Dataset ID` (+ dataset token if you use dataset quality stats)
2. Add domain in Events Manager and verify domain ownership.
3. Configure Aggregated Event Measurement priority (highest first):
   1. `Lead`
   2. `ViewContent`
   3. `PageView`
4. Use Test Events to validate browser + server deduplication (`event_id` must match).

## 6. Event/page mapping implemented

- Global page visits (`PageView`): sent for all routes through router pageview tracking.
- Landing page booking clicks (`ViewContent`): sent from CTA/button events on landing flows.
- Scheduling page booking intent (`ViewContent`): sent on submit click before confirmation.
- Thank-you/confirmation state (`Lead`): sent only after booking confirmation succeeds.

Implementation notes:
- Browser events are sent via Meta Pixel.
- Server events are sent via Conversions API for improved reliability.
- `Lead` is dispatched server-side from booking confirmation endpoint; browser `Lead` shares the same `event_id` for deduplication.