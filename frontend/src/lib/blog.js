const STORAGE_KEY = "putzelf_blog_posts_v1";

const demoPosts = [
  {
    id: "maintenance-cleaning-basics",
    slug: "so-pflegen-sie-buero-und-arbeitsraeume-effektiv",
    title: "So pflegen Sie Büro- und Arbeitsräume effektiv",
    excerpt:
      "Ein kurzer Leitfaden, wie regelmäßige Reinigung das Wohlbefinden steigert und den Eindruck Ihres Unternehmens aufwertet.",
    content:
      "Regelmäßige Reinigung schafft nicht nur ein angenehmes Ambiente, sondern schützt auch hochwertige Möbel, technische Geräte und Böden vor vorzeitiger Abnutzung.\n\nEin gut strukturierter Ablauf beginnt mit klaren Verantwortlichkeiten, festen Reinigungsintervalle und einer verständlichen Priorisierung der Bereiche. Besonders in Büroräumen ist die tägliche Ordnung entscheidend: Flächen, Sanitärbereiche und gemeinsame Nutzungsebenen sollten konsequent gepflegt werden.\n\nWenn Sie die Reinigung in feste Zeitfenster legen, vermeiden Sie Unterbrechungen und schaffen eine nachhaltige, professionell wirkende Atmosphäre für Mitarbeitende und Gäste.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    author: "PutzELF Team",
    publishedAt: "2025-03-12T08:00:00.000Z",
    category: "Tipps",
  },
  {
    id: "green-cleaning",
    slug: "gruenere-arbeitsplaetze-dank-gesunder-reinigungsroutine",
    title: "Grünere Arbeitsplätze dank gesunder Reinigungsroutine",
    excerpt:
      "Frische Luft, weniger Staub und eine angenehmere Atmosphäre sind oft die größten Vorteile einer durchdachten Reinigung.",
    content:
      "Viele Unternehmen unterschätzen, wie stark die Qualität des Innenraums die Konzentration und das allgemeine Wohlbefinden beeinflusst. Regelmäßige Reinigung reduziert Allergene, verbessert die Luftqualität und verhindert unsaubere Ablagerungen an oft berührten Flächen.\n\nEine gute Routine kombiniert sensible Reinigungsprodukte, gezielte Frequenzen und ein klares Vorgehen in den Hauptbereiche. Dadurch bleiben Hygienestandards erhalten und der Raum wirkt zugleich gepflegt und einladend.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    author: "PutzELF Team",
    publishedAt: "2025-04-03T08:00:00.000Z",
    category: "Unternehmen",
  },
  {
    id: "window-care",
    slug: "fensterreinigung-fuer-mehr-licht-und-wohlfuehlen",
    title: "Fensterreinigung für mehr Licht und Wohlgefühl",
    excerpt:
      "Saubere Fenster machen Räume heller, professioneller und insgesamt angenehmer – auch im täglichen Arbeitsalltag.",
    content:
      "Glasflächen sind im Alltag oft mit Spuren, Wasserflecken und Staub belastet. Gerade in gewerblichen Räumen wirkt eine saubere Glasfront sofort hochwertiger und einladender.\n\nEine professionelle Fensterreinigung schafft nicht nur optische Klarheit, sondern unterstützt auch die Lichtdurchlässigkeit und damit ein positives Raumgefühl. Für Unternehmen lohnt sich diese Maßnahme besonders bei regelmäßigen Wartungsintervallen.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    author: "PutzELF Team",
    publishedAt: "2025-05-16T08:00:00.000Z",
    category: "Service",
  },
];

export function getDefaultBlogPosts() {
  return demoPosts.map((post) => ({ ...post }));
}

export function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || `post-${Date.now()}`;
}

export function getBlogPosts() {
  if (typeof window === "undefined") return getDefaultBlogPosts();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultBlogPosts();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return getDefaultBlogPosts();
    return parsed;
  } catch {
    return getDefaultBlogPosts();
  }
}

export function saveBlogPosts(posts) {
  const nextPosts = Array.isArray(posts) ? posts : [];
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosts));
  }
  return nextPosts;
}

export function createBlogPost(payload = {}) {
  const posts = getBlogPosts();
  const safeTitle = String(payload.title || "").trim();
  const safeExcerpt = String(payload.excerpt || "").trim();
  const safeContent = String(payload.content || "").trim();
  const safeImage = String(payload.image || "").trim();

  if (!safeTitle || !safeContent) {
    throw new Error("Title and content are required");
  }

  const slug = slugify(payload.slug || safeTitle);

  const nextPost = {
    id: payload.id || `post-${Date.now()}`,
    slug: posts.some((post) => post.slug === slug) ? `${slug}-${Date.now()}` : slug,
    title: safeTitle,
    excerpt: safeExcerpt || safeContent.slice(0, 180),
    content: safeContent,
    image: safeImage || "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
    author: payload.author || "PutzELF Team",
    publishedAt: payload.publishedAt || new Date().toISOString(),
    category: payload.category || "Blog",
  };

  const updated = [nextPost, ...posts];
  saveBlogPosts(updated);
  return nextPost;
}

export function updateBlogPost(postId, payload = {}) {
  const posts = getBlogPosts();
  const index = posts.findIndex((post) => post.id === postId);
  if (index === -1) {
    throw new Error("Post not found");
  }

  const existing = posts[index];
  const safeTitle = String((payload.title ?? existing.title) || "").trim();
  const safeExcerpt = String((payload.excerpt ?? existing.excerpt) || "").trim();
  const safeContent = String((payload.content ?? existing.content) || "").trim();
  const safeImage = String((payload.image ?? existing.image) || "").trim();

  if (!safeTitle || !safeContent) {
    throw new Error("Title and content are required");
  }

  const nextPost = {
    ...existing,
    title: safeTitle,
    excerpt: safeExcerpt || safeContent.slice(0, 180),
    content: safeContent,
    image: safeImage || existing.image || "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
    author: payload.author || existing.author || "PutzELF Team",
    category: payload.category || existing.category || "Blog",
    publishedAt: payload.publishedAt || existing.publishedAt || new Date().toISOString(),
  };

  const updated = posts.map((post) => (post.id === postId ? nextPost : post));
  saveBlogPosts(updated);
  return nextPost;
}

export function deleteBlogPost(postId) {
  const posts = getBlogPosts();
  const filtered = posts.filter((post) => post.id !== postId);
  saveBlogPosts(filtered);
  return filtered;
}
