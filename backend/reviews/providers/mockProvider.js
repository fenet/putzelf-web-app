// Mock provider returns realistic sample reviews and supports filtering/pagination
function makeId(i) {
  return `rvw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}_${i}`;
}

function makeSampleReviews() {
  const now = Date.now();
  const locations = ["accounts/123/locations/1", "accounts/123/locations/2", "accounts/456/locations/7"];
  const names = ["Anna Müller", "Peter Schmidt", "Sara Lee", "John Doe", "Elena Rossi"];
  const comments = [
    "Fantastic cleaning, very thorough!",
    "Good job, but missed some corners.",
    "Average service, expected better.",
    "Not satisfied, arrived late and left early.",
    "Excellent! Highly recommended."
  ];

  const reviews = [];
  // create 25 mock reviews
  for (let i = 0; i < 25; i++) {
    const rating = [5,5,5,4,4,3,3,2,1][Math.floor(Math.random()*9)];
    const reviewer = names[Math.floor(Math.random()*names.length)];
    const text = comments[Math.floor(Math.random()*comments.length)];
    const location = locations[i % locations.length];
    const created = new Date(now - (i * 86400000)).toISOString();
    const hasReply = Math.random() > 0.6;

    reviews.push({
      reviewId: makeId(i),
      reviewerName: reviewer,
      rating,
      comment: text,
      createTime: created,
      location,
      replied: hasReply,
      reply: hasReply ? { text: "Danke für Ihr Feedback!", updateTime: new Date(now - (i * 800000)).toISOString() } : null,
    });
  }
  return reviews;
}

const ALL_REVIEWS = makeSampleReviews();

function filterReviews(reviews, { location, rating }) {
  let out = reviews.slice();
  if (location) {
    out = out.filter(r => String(r.location || "").includes(location));
  }
  if (rating) {
    const num = Number(rating);
    if (!Number.isNaN(num)) out = out.filter(r => Number(r.rating) === num);
  }
  return out;
}

function sortReviews(reviews, sort) {
  if (!sort) return reviews;
  const s = sort.toLowerCase();
  if (s === "newest") return reviews.sort((a,b) => new Date(b.createTime) - new Date(a.createTime));
  if (s === "oldest") return reviews.sort((a,b) => new Date(a.createTime) - new Date(b.createTime));
  if (s === "rating_desc") return reviews.sort((a,b) => b.rating - a.rating || new Date(b.createTime) - new Date(a.createTime));
  if (s === "rating_asc") return reviews.sort((a,b) => a.rating - b.rating || new Date(b.createTime) - new Date(a.createTime));
  return reviews;
}

export async function getReviews({ location, rating, sort, limit = 10, page = 1 } = {}) {
  // Ensure no Google API calls are made here.
  const filtered = filterReviews(ALL_REVIEWS, { location, rating });
  const sorted = sortReviews(filtered, sort);

  const lim = Math.max(1, Number(limit) || 10);
  const pg = Math.max(1, Number(page) || 1);
  const start = (pg - 1) * lim;
  const paged = sorted.slice(start, start + lim);

  return {
    total: sorted.length,
    page: pg,
    limit: lim,
    reviews: paged,
  };
}

export default { getReviews };
