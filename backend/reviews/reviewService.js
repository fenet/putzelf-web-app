import mockProvider from "./providers/mockProvider.js";
import googleProvider from "./providers/googleProvider.js";

const PROVIDER = (process.env.GOOGLE_REVIEWS_PROVIDER || "mock").toLowerCase();

function getProvider() {
  if (PROVIDER === "google") return googleProvider;
  return mockProvider;
}

export async function getReviews(options = {}) {
  const provider = getProvider();
  return provider.getReviews(options);
}

export default { getReviews };
