import React from "react";
import { useTranslation } from "react-i18next";
import { Search, Tag, UserCheck, Users, Star, Clock } from "lucide-react";

export default function ExpectationsSection({ tBase, locale, bookingHref }) {
  const { t } = useTranslation();

  const parentGroup = (tBase && tBase.split && tBase.split(".")[1]) || "business";

  // Resolve expectations: prefer service-specific array, fallback to group-level array.
  let itemsRaw = t(`${tBase}.expectations`, { returnObjects: true });
  if (!Array.isArray(itemsRaw)) {
    itemsRaw = t(`services.${parentGroup}.expectations`, { returnObjects: true });
  }
  const items = Array.isArray(itemsRaw) ? itemsRaw : [];

  const iconMap = {
    analysis: Search,
    fairPrice: Tag,
    qualifiedStaff: UserCheck,
    fixedTeams: Users,
    excellentQuality: Star,
    desiredTimes: Clock,
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl">{t('services.expectations.title', { defaultValue: locale === 'de' ? 'Was Sie erwartet' : 'What You Can Expect' })}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {items.map((it) => {
            const key = it.key || (typeof it === 'string' ? it : it.title);
            const title = locale === 'de' ? (it.title || it.deTitle || it) : (it.title || it.enTitle || it);
            const desc = locale === 'de' ? (it.desc || it.deDesc || "") : (it.desc || it.enDesc || "");
            const Icon = iconMap[key] || Star;

            return (
              <div key={key} className="flex flex-col items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-50 text-cyan-700">
                    <Icon aria-hidden className="w-10 h-10" />
                  </div>
                </div>
                <div className="text-base font-semibold text-slate-900">{title}</div>
                {desc ? <div className="mt-1 text-sm text-slate-600">{desc}</div> : null}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <a href={bookingHref} className="inline-flex items-center justify-center rounded-full bg-[#0097b2] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#007f95]">
            {t("services.cta", { defaultValue: locale === "de" ? "Jetzt Anfragen" : "Request an Offer" })}
          </a>
        </div>
      </div>
    </section>
  );
}
