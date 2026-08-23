import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// Temporary static fallback data until the Google Reviews API is connected.
const placeholderReviews = [
  {
    reviewId: "nhp-wien",
    reviewerName: "NHP Wien",
    relativeDate: "a week ago",
    rating: 5,
    comment:
      "Für die dreiwöchige Urlaubsvertretung unserer Reinigungskraft wurde uns über Putzelf eine nette und zuverlässige Mitarbeiterin vermittelt. Sie arbeitet selbstständig und sorgfältig und versteht ihre Aufgaben schnell. Besonders positiv finden wir, dass sie mitdenkt und aufmerksam auf Dinge hinweist. Wir sind sehr zufrieden und können Putzelf absolut weiterempfehlen!",
    reviewUrl:
      "https://www.google.com/search?sa=X&sca_esv=c01d00c7c27b7017&hl=en-GB&authuser=0&biw=1296&bih=654&sxsrf=APpeQnuDl8aLAKyatGWp4_khekMJspvlxQ:1787480182109&q=PutzELF%20Reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxK2NDQzszAGkoaWZiamRqZGxhYbGBlfMfIHlJZUufq4KQSllmWmlhcvYkUXAQCg_bs7PgAAAA&rldimm=9166839161964525238&tbm=lcl&ved=0CA4Q5foLahcKEwiYwL_LwraWAxUAAAAAHQAAAAAQBQ#lkt=LocalPoiReviews&arid=Ci9DQUlRQUNvZENodHljRjlvT2w4elNuTmZTVk5FWjJzNVEyc3RhV1EwYTFoWFZrRRAB"
  },
  {
    reviewId: "sophia-volpini",
    reviewerName: "Sophia Volpini",
    relativeDate: "a month ago",
    rating: 5,
    comment:
      "Putzelf liefert sehr professionellen und zuvorkommenden Service! Ich war begeistert von Koordination, Qualität der Reinigungskraft und der einfachen Kommunikation. Preisleistungsverhältnis ist Top und man fühlt sich rundum wohl aufgehoben! Werde 100% wieder dort den Service in Anspruch nehmen.",
    reviewUrl:
      "https://www.google.com/search?sa=X&sca_esv=c01d00c7c27b7017&hl=en-GB&authuser=0&biw=1296&bih=654&sxsrf=APpeQnuDl8aLAKyatGWp4_khekMJspvlxQ:1787480182109&q=PutzELF%20Reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxK2NDQzszAGkoaWZiamRqZGxhYbGBlfMfIHlJZUufq4KQSllmWmlhcvYkUXAQCg_bs7PgAAAA&rldimm=9166839161964525238&tbm=lcl&ved=0CA4Q5foLahcKEwiYwL_LwraWAxUAAAAAHQAAAAAQBQ#lkt=LocalPoiReviews&arid=Ci9DQUlRQUNvZENodHljRjlvT2w4elNuTmZTVk5FWjJzNVEyc3RhV1EwYTFoWFZrRRAB"
  },
  {
    reviewId: "stadtkino-buero",
    reviewerName: "Stadtkino Büro",
    relativeDate: "2 months ago",
    rating: 5,
    comment:
      "Wir waren sehr zufrieden mit dem Service - freundlich, zuverlässig und gründlich. Vielen Dank und bis bald im Kino!",
    reviewUrl:
      "https://www.google.com/search?sa=X&sca_esv=c01d00c7c27b7017&hl=en-GB&authuser=0&biw=1296&bih=654&sxsrf=APpeQnuDl8aLAKyatGWp4_khekMJspvlxQ:1787480182109&q=PutzELF%20Reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxK2NDQzszAGkoaWZiamRqZGxhYbGBlfMfIHlJZUufq4KQSllmWmlhcvYkUXAQCg_bs7PgAAAA&rldimm=9166839161964525238&tbm=lcl&ved=0CA4Q5foLahcKEwiYwL_LwraWAxUAAAAAHQAAAAAQBQ#lkt=LocalPoiReviews&arid=Ci9DQUlRQUNvZENodHljRjlvT2w4elNuTmZTVk5FWjJzNVEyc3RhV1EwYTFoWFZrRRAB"
  }
];

function Stars({ rating = 0, label }) {
  const safeRating = Number(rating) || 0;

  return (
    <div className="flex items-center gap-0.5" aria-label={label || `${safeRating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= safeRating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}

function normalizeReview(review) {
  return {
    reviewId: review.reviewId || `${review.reviewerName || "review"}-${review.relativeDate || "unknown"}`,
    reviewerName: review.reviewerName || "Google Reviewer",
    relativeDate: review.relativeDate || review.date || "Recently",
    rating: Number(review.rating || review.starRating || 5),
    comment: review.comment || review.text || "",
    reviewUrl: review.reviewUrl || review.url || "#"
  };
}

export default function GoogleReviewsCarousel() {
  const { t, i18n } = useTranslation();
  const reviews = useMemo(() => placeholderReviews.map(normalizeReview), []);
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeGroup, setActiveGroup] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const groupedReviews = useMemo(() => {
    if (!reviews.length) return [];
    const size = Math.max(visibleCount, 1);
    const groups = [];
    for (let index = 0; index < reviews.length; index += size) {
      groups.push(reviews.slice(index, index + size));
    }
    return groups;
  }, [reviews, visibleCount]);

  useEffect(() => {
    setActiveGroup(0);
  }, [visibleCount]);

  useEffect(() => {
    if (isPaused || groupedReviews.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveGroup((current) => (current + 1) % groupedReviews.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [groupedReviews.length, isPaused]);

  const goToPrevious = () => {
    if (!groupedReviews.length) return;
    setActiveGroup((current) => (current - 1 + groupedReviews.length) % groupedReviews.length);
  };

  const goToNext = () => {
    if (!groupedReviews.length) return;
    setActiveGroup((current) => (current + 1) % groupedReviews.length);
  };

  return (
    <section className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-14 md:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700/80">
            {t("reviews.kicker", "Google")}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {t("reviews.sectionTitle", "Google Reviews")}
          </h3>
        </div>

        {groupedReviews.length > 1 && (
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              aria-label={t("reviews.previous", "Previous reviews")}
              onClick={goToPrevious}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={t("reviews.next", "Next reviews")}
              onClick={goToNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
        {t("reviews.subtitle", "Customer reviews from satisfied clients.")}
      </p>

      <div
        className="relative mt-7 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div className="overflow-hidden rounded-[28px] bg-slate-50/70 px-1 py-1 md:bg-transparent md:px-0">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: groupedReviews.length ? `translateX(-${activeGroup * 100}%)` : "translateX(0%)" }}
          >
            {groupedReviews.map((group, groupIndex) => (
              <div key={`${groupIndex}-${group.map((review) => review.reviewId).join("-")}`} className="w-full flex-shrink-0 px-0.5">
                <div
                  className="grid gap-4 md:gap-5"
                  style={{ gridTemplateColumns: `repeat(${Math.min(visibleCount, group.length)}, minmax(0, 1fr))` }}
                >
                  {group.map((review) => (
                    <article
                      key={review.reviewId}
                      className="group rounded-[24px] border border-slate-200/70 bg-white/80 p-5 shadow-[0_14px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm md:p-6"
                      aria-label={t("reviews.reviewBy", { name: review.reviewerName })}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Stars
                            rating={review.rating}
                            label={t("reviews.ratingLabel", { rating: review.rating })}
                          />
                        </div>
                        <span className="text-[11px] font-medium text-slate-500">{review.relativeDate}</span>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-700 md:text-[15px]">
                        “{review.comment}”
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{review.reviewerName}</div>
                          <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-slate-500">
                            {t("reviews.googleBadge", "Google review")}
                          </div>
                        </div>

                        <a
                          href={review.reviewUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 transition hover:border-sky-200 hover:text-sky-700"
                          aria-label={`${t("reviews.googleBadge", "Google review")} - ${review.reviewerName}`}
                        >
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span>Google</span>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {groupedReviews.length > 1 && (
          <div className="mt-5 flex justify-center gap-2" aria-label={t("reviews.paginationLabel", "Review carousel")}> 
            {groupedReviews.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`${t("reviews.slide", "Review slide")} ${index + 1}`}
                onClick={() => setActiveGroup(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeGroup === index ? "w-8 bg-sky-700" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
