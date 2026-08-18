import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

function Stars({ rating = 0 }) {
  const r = Number(rating) || 0;
  return (
    <div className="flex items-center" aria-hidden>
      {[1,2,3,4,5].map((i) => (
        <Star key={i} className={`h-4 w-4 ${i <= r ? "text-amber-400" : "text-gray-300"}`} />
      ))}
      <span className="sr-only">{r} von 5 Sternen</span>
    </div>
  );
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
  } catch (e) { return iso || ''; }
}

export default function GoogleReviewsCarousel() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);
    fetch('/api/google-reviews?sort=rating_desc&limit=20&page=1', { signal: ac.signal })
      .then((r) => r.json())
      .then((data) => {
        const arr = Array.isArray(data.reviews) ? data.reviews : (Array.isArray(data) ? data : []);
        // Defensive filter: only 5 or 4 stars
        const filtered = arr.filter((rv) => {
          const rating = Number(rv.rating || rv.starRating || 0);
          return rating === 5 || rating === 4;
        });
        // Prefer higher rating first
        filtered.sort((a,b) => (Number(b.rating || b.starRating || 0) - Number(a.rating || a.starRating || 0)) || (new Date(b.createTime) - new Date(a.createTime)));
        setReviews(filtered);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Failed to load reviews', err);
        setError('Fehler beim Laden der Bewertungen.');
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 10);
    };
    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [reviews]);

  const scrollBy = (direction = 1) => {
    const el = containerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-review-card]');
    const step = card ? card.clientWidth * (direction) * 2 : el.clientWidth * direction * 0.8;
    el.scrollBy({ left: step, behavior: 'smooth' });
  };

  // basic pointer drag for touch
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeftStart = 0;
    const onDown = (e) => {
      isDown = true;
      startX = e.pageX || (e.touches && e.touches[0].pageX) || 0;
      scrollLeftStart = el.scrollLeft;
      el.classList.add('cursor-grabbing');
    };
    const onMove = (e) => {
      if (!isDown) return;
      const x = e.pageX || (e.touches && e.touches[0].pageX) || 0;
      const dx = startX - x;
      el.scrollLeft = scrollLeftStart + dx;
    };
    const onUp = () => { isDown = false; el.classList.remove('cursor-grabbing'); };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl overflow-x-clip px-4 py-14 md:px-6">
      <h3 className="text-2xl font-bold">Was unsere Kunden sagen</h3>
      <p className="mt-2 text-slate-600">Echte Google-Bewertungen von Kundinnen und Kunden.</p>

      <div className="mt-6 relative overflow-hidden">
        {/* nav buttons */}
        <button
          aria-label="Vorherige Bewertungen"
          onClick={() => scrollBy(-1)}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border shadow ${canScrollLeft ? '' : 'opacity-40 pointer-events-none'}`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div ref={containerRef} className="flex w-full max-w-full min-w-0 gap-4 overflow-x-auto overscroll-x-contain scrollbar-none py-2 px-2">
          {loading && (
            Array.from({ length: 3 }).map((_,i) => (
              <div key={i} className="flex-none w-[320px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl p-5 shadow h-40 animate-pulse" />
            ))
          )}

          {!loading && error && (
            <div className="p-6 bg-yellow-50 border border-yellow-100 rounded-lg">{error}</div>
          )}

          {!loading && !error && reviews.length === 0 && (
            <div className="p-6 bg-white rounded-lg border text-slate-700">Noch keine 4–5-Sterne-Bewertungen verfügbar.</div>
          )}

          {!loading && reviews.map((r) => (
            <article key={r.reviewId} data-review-card className="flex-none w-[320px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl p-5 shadow flex flex-col" aria-label={`Bewertung von ${r.reviewerName}`}>
              <div className="flex items-center justify-between">
                <Stars rating={r.rating || r.starRating} />
                <div className="text-xs text-gray-500">{formatDate(r.createTime)}</div>
              </div>
              <p className="mt-3 text-sm text-slate-700 flex-1">{r.comment}</p>
              <div className="mt-4 text-sm font-semibold">{r.reviewerName}</div>
              <div className="mt-1 text-xs text-gray-500">Google Bewertung</div>
            </article>
          ))}
        </div>

        <button
          aria-label="Nächste Bewertungen"
          onClick={() => scrollBy(1)}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border shadow ${canScrollRight ? '' : 'opacity-40 pointer-events-none'}`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="mt-3 text-xs text-gray-500">Bewertungen via Google</div>
      </div>
    </section>
  );
}
