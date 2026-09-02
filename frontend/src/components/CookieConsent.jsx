import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { getLocaleFromPathname, getLocalizedPath } from "../lib/localeRoutes";
import { readConsent, writeConsent } from "../lib/consent";

export default function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [state, setState] = useState(() => readConsent());

  useEffect(() => {
    const has = readConsent();

    // Show banner if no recorded consent time
    if (!has.time) setVisible(true);

    function onOpenSettings() {
      setShowSettings(true);
    }

    window.addEventListener("openCookieSettings", onOpenSettings);

    return () => window.removeEventListener("openCookieSettings", onOpenSettings);
  }, []);

  const applyConsent = (nextState) => {
    setState(nextState);
    writeConsent(nextState);
    setVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => applyConsent({ analytics: true, marketing: true });
  const acceptNecessary = () => applyConsent({ analytics: false, marketing: false });
  const openSettings = () => setShowSettings(true);

  return (
    <>
      {/* Initial cookie consent modal (centered, accessible) */}
      {visible && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-heading"
            className="relative z-[9999] w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8"
          >
            <div className="flex gap-4 items-start">
              <div className="shrink-0">
                <div className="rounded-full bg-[#0097b2] text-white w-12 h-12 flex items-center justify-center font-semibold text-lg" aria-hidden>
                  i
                </div>
              </div>

              <div className="flex-1">
                <h2 id="cookie-heading" className="text-lg md:text-xl font-semibold text-gray-900">
                  {t("cookies.heading")}
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  <Trans
                    i18nKey="cookies.msg"
                    components={[
                      <Link to={getLocalizedPath(getLocaleFromPathname(window.location.pathname), "privacy")} className="text-[#0097b2] underline" />,
                    ]}
                  />
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <button
                    id="cookie-decline"
                    type="button"
                    onClick={() => applyConsent({ analytics: false, marketing: false })}
                    aria-label={t("cookies.decline")}
                    className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
                  >
                    {t("cookies.decline")}
                  </button>

                  <button
                    id="cookie-necessary"
                    type="button"
                    onClick={acceptNecessary}
                    aria-label={t("cookies.necessary")}
                    className="inline-flex items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
                  >
                    {t("cookies.necessary")}
                  </button>

                  <button
                    id="cookie-settings"
                    type="button"
                    onClick={openSettings}
                    aria-label={t("cookies.settings")}
                    className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0097b2]"
                  >
                    {t("cookies.settings")}
                  </button>

                  <button
                    id="cookie-accept-all"
                    type="button"
                    onClick={acceptAll}
                    aria-label={t("cookies.acceptAll")}
                    className="inline-flex items-center justify-center rounded-md bg-[#0097b2] px-4 py-2 text-sm text-white shadow-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#007b8a]"
                  >
                    {t("cookies.acceptAll")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie settings modal (high z-index so it overlays all pages) */}
      {showSettings && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl p-6 shadow-2xl overflow-auto">
            <h3 className="text-xl font-semibold mb-2">{t("cookies.preferencesTitle")}</h3>
            <p className="text-sm text-gray-600 mb-4">{t("cookies.preferencesIntro")}</p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="font-medium">{t("cookies.necessaryTitle")}</div>
                  <div className="text-sm text-gray-600">{t("cookies.necessaryDesc")}</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">{t("cookies.alwaysOn")}</div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t("cookies.analyticsTitle")}</div>
                  <div className="text-sm text-gray-600">{t("cookies.analyticsDesc")}</div>
                </div>
                <div>
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="cookie-analytics"
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300"
                      checked={!!state.analytics}
                      onChange={(e) => setState((s) => ({ ...s, analytics: e.target.checked }))}
                    />
                    <span className="text-sm">{t("cookies.enable")}</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t("cookies.marketingTitle")}</div>
                  <div className="text-sm text-gray-600">{t("cookies.marketingDesc")}</div>
                </div>
                <div>
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="cookie-marketing"
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300"
                      checked={!!state.marketing}
                      onChange={(e) => setState((s) => ({ ...s, marketing: e.target.checked }))}
                    />
                    <span className="text-sm">{t("cookies.enable")}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                id="cookie-settings-cancel"
                type="button"
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 rounded-md border text-sm"
              >
                {t("cookies.cancel")}
              </button>

              <button
                id="cookie-settings-save"
                type="button"
                onClick={() => applyConsent(state)}
                className="px-4 py-2 rounded-md bg-[#0097b2] text-white text-sm"
              >
                {t("cookies.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

