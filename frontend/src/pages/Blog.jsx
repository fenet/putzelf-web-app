import { useMemo } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { getBlogPosts } from "../lib/blog";
import { getLocaleFromPathname, getLocalizedAlternates, getLocalizedPath } from "../lib/localeRoutes";

const PAGE_SIZE = 6;

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

export function BlogPage() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const [searchParams, setSearchParams] = useSearchParams();

  const posts = useMemo(() => {
    return [...getBlogPosts()].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const page = Number(searchParams.get("page") || 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);

  const pagePosts = posts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const updatePage = (nextPage) => {
    setSearchParams({ page: String(nextPage) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canonical = getLocalizedPath(locale, "blog");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f5f4f1] text-slate-900">
        <Seo
          title={locale === "de" ? "Blog | PutzELF" : "Blog | PutzELF"}
          description={locale === "de" ? "Aktuelle Einblicke, Tipps und Praxisbeispiele rund um Reinigung und Betrieb." : "Fresh insights, tips and examples for cleaner spaces and better operations."}
          path={canonical}
          lang={locale}
          alternates={getLocalizedAlternates(location.pathname)}
          xDefaultPath={getLocalizedPath("de", "blog")}
        />

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">Blog</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-5xl">
                {locale === "de" ? "Neuigkeiten & Tipps" : "News & Tips"}
              </h1>
            </div>
          </div>

          {pagePosts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
              {locale === "de" ? "Noch keine Blogbeiträge veröffentlicht." : "No blog posts published yet."}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pagePosts.map((post) => (
                <article key={post.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <img src={post.image} alt={post.title} className="h-56 w-full object-cover" />
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                      <span>{post.category}</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-900">{post.title}</h2>
                    <p className="mt-3 text-base leading-7 text-slate-600">{post.excerpt}</p>
                    <Link
                      to={getLocalizedPath(locale, "blogPost", { slug: post.slug })}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0097b2] hover:text-[#007f95]"
                    >
                      {locale === "de" ? "Weiterlesen" : "Read more"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {posts.length > PAGE_SIZE && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => updatePage(Math.max(1, safePage - 1))}
                disabled={safePage === 1}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {locale === "de" ? "Zurück" : "Previous"}
              </button>
              <span className="text-sm text-slate-600">
                {safePage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => updatePage(Math.min(totalPages, safePage + 1))}
                disabled={safePage === totalPages}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {locale === "de" ? "Weiter" : "Next"}
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export function BlogPostPage() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const { slug } = useParams();
  const post = [...getBlogPosts()].find((entry) => entry.slug === slug);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f5f4f1] px-4 py-16">
          <div className="mx-auto max-w-3xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900">
              {locale === "de" ? "Beitrag nicht gefunden" : "Post not found"}
            </h1>
            <Link to={getLocalizedPath(locale, "blog")} className="mt-5 inline-flex rounded-full bg-[#0097b2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#007f95]">
              {locale === "de" ? "Zurück zum Blog" : "Back to blog"}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const paragraphs = (post.content || "").split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f5f4f1] text-slate-900">
        <Seo
          title={`${post.title} | PutzELF`}
          description={post.excerpt}
          path={getLocalizedPath(locale, "blogPost", { slug: post.slug })}
          lang={locale}
          alternates={getLocalizedAlternates(location.pathname)}
          xDefaultPath={getLocalizedPath("de", "blogPost", { slug: post.slug })}
        />

        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-6">
            <Link to={getLocalizedPath(locale, "blog")} className="text-sm font-semibold text-[#0097b2] hover:text-[#007f95]">
              ← {locale === "de" ? "Zurück zum Blog" : "Back to blog"}
            </Link>
          </div>

          <img src={post.image} alt={post.title} className="h-[280px] w-full rounded-[28px] object-cover shadow-sm sm:h-[420px]" />

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            <span>{post.category}</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{post.excerpt}</p>

          <div className="mt-8 space-y-6 text-lg leading-8 text-slate-700">
            {paragraphs.map((paragraph, index) => (
              <p key={`${paragraph.slice(0, 18)}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
