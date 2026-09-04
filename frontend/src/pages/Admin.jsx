import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import { getLocalizedPath, getLocaleFromPathname, getLocalizedAlternates } from "../lib/localeRoutes";
import { createBlogPost, deleteBlogPost, getBlogPosts, updateBlogPost } from "../lib/blog";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  category: "Blog",
  author: "PutzELF Team",
};

export default function Admin() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const [blogForm, setBlogForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [blogMessage, setBlogMessage] = useState("");
  const [blogPosts, setBlogPosts] = useState(() => getBlogPosts());

  const sortedBlogPosts = useMemo(() => [...blogPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)), [blogPosts]);

  const resetForm = () => {
    setBlogForm(emptyForm);
    setEditingId(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setBlogMessage("Bitte wähle nur Bilddateien aus.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setBlogForm((current) => ({ ...current, image: String(reader.result || "") }));
      setBlogMessage("Bild ausgewählt.");
    };
    reader.readAsDataURL(file);
  };

  const submitBlog = (event) => {
    event.preventDefault();

    try {
      if (editingId) {
        const updated = updateBlogPost(editingId, blogForm);
        setBlogPosts((current) => current.map((post) => (post.id === updated.id ? updated : post)));
        setBlogMessage("Der Beitrag wurde aktualisiert.");
      } else {
        const post = createBlogPost(blogForm);
        setBlogPosts((current) => [post, ...current]);
        setBlogMessage("Der Beitrag wurde veröffentlicht.");
      }
      resetForm();
    } catch (err) {
      setBlogMessage(err.message || "Bitte prüfe deine Eingaben.");
    }
  };

  const startEditing = (post) => {
    setEditingId(post.id);
    setBlogForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      category: post.category,
      author: post.author,
    });
    setBlogMessage("Beitrag wird bearbeitet.");
  };

  const removePost = (postId) => {
    const next = deleteBlogPost(postId);
    setBlogPosts(next);
    if (editingId === postId) {
      resetForm();
    }
    setBlogMessage("Der Beitrag wurde gelöscht.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo title="Admin-Bereich" description="Admin-Bereich" path={getLocalizedPath(locale, "admin")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "admin")} noindex />
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Blog-Admin</h1>
          <Link to={getLocalizedPath(locale, "booking")} className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Zur Startseite
          </Link>
        </header>

        <div className="space-y-8">
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{editingId ? "Blog-Beitrag bearbeiten" : "Blog-Beitrag veröffentlichen"}</h2>
                <p className="mt-1 text-sm text-gray-600">Bild aus dem Gerät hochladen oder direkt einen externen Link verwenden.</p>
              </div>
              {editingId && (
                <button type="button" onClick={resetForm} className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Neuer Beitrag
                </button>
              )}
            </div>

            <form onSubmit={submitBlog} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-medium text-gray-700">
                  Titel
                  <input
                    value={blogForm.title}
                    onChange={(event) => setBlogForm((current) => ({ ...current, title: event.target.value }))}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Titel"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-gray-700">
                  Kategorie
                  <input
                    value={blogForm.category}
                    onChange={(event) => setBlogForm((current) => ({ ...current, category: event.target.value }))}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Tipps"
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-gray-700">
                Vorschau / Excerpt
                <textarea
                  value={blogForm.excerpt}
                  onChange={(event) => setBlogForm((current) => ({ ...current, excerpt: event.target.value }))}
                  rows={3}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Kurze Vorschau für die Blog-Karten"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-medium text-gray-700">
                  Bild-Link
                  <input
                    value={blogForm.image}
                    onChange={(event) => setBlogForm((current) => ({ ...current, image: event.target.value }))}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="https://..."
                  />
                </label>

                <label className="block text-sm font-medium text-gray-700">
                  Bild hochladen
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 file:mr-3 file:rounded file:border-0 file:bg-cyan-700 file:px-3 file:py-2 file:text-white"
                  />
                </label>
              </div>

              {blogForm.image && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                  <img src={blogForm.image} alt="Preview" className="h-44 w-full object-cover" />
                </div>
              )}

              <label className="block text-sm font-medium text-gray-700">
                Inhalt
                <textarea
                  value={blogForm.content}
                  onChange={(event) => setBlogForm((current) => ({ ...current, content: event.target.value }))}
                  rows={8}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Text des Blog-Posts"
                  required
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="rounded-md bg-[#0097b2] px-4 py-2 text-sm font-semibold text-white hover:bg-[#007f95]">
                  {editingId ? "Änderungen speichern" : "Beitrag veröffentlichen"}
                </button>
                {blogMessage && <span className="text-sm text-green-600">{blogMessage}</span>}
              </div>
            </form>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Veröffentlichte Beiträge</h3>
            <ul className="mt-4 space-y-3">
              {sortedBlogPosts.map((post) => (
                <li key={post.id} className="rounded-lg border border-gray-200 p-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.image} alt={post.title} className="h-14 w-14 rounded-lg object-cover" />
                      <div>
                        <div className="font-medium text-gray-900">{post.title}</div>
                        <div className="text-xs text-gray-500">{post.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link to={getLocalizedPath(locale, "blogPost", { slug: post.slug })} className="text-sm text-cyan-700 hover:underline">
                        Öffnen
                      </Link>
                      <button type="button" onClick={() => startEditing(post)} className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Bearbeiten
                      </button>
                      <button type="button" onClick={() => removePost(post.id)} className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100">
                        Löschen
                      </button>
                    </div>
                  </div>
                </li>
              ))}

              {sortedBlogPosts.length === 0 && (
                <li className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
                  Noch keine veröffentlichten Blogbeiträge.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}




