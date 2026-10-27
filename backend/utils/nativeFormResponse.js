const formResponses = {
  contact: {
    de: {
      successTitle: "Nachricht gesendet",
      successMessage: "Vielen Dank. Ihre Nachricht wurde gesendet.",
      invalidTitle: "Bitte Eingaben prüfen",
      invalidMessage: "Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.",
      errorTitle: "Nachricht konnte nicht gesendet werden",
      errorMessage: "Ihre Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut.",
      backLabel: "Zurück zum Kontaktformular",
      formPath: "/de/kontakt",
    },
    en: {
      successTitle: "Message sent",
      successMessage: "Thank you. Your message has been sent.",
      invalidTitle: "Please check your entries",
      invalidMessage: "Please check your details and try again.",
      errorTitle: "Message could not be sent",
      errorMessage: "Your message could not be sent right now. Please try again later.",
      backLabel: "Back to the contact form",
      formPath: "/en/contact",
    },
  },
  partners: {
    de: {
      successTitle: "Anfrage gesendet",
      successMessage: "Vielen Dank. Ihre Partnerschaftsanfrage wurde gesendet.",
      invalidTitle: "Bitte Eingaben prüfen",
      invalidMessage: "Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.",
      errorTitle: "Anfrage konnte nicht gesendet werden",
      errorMessage: "Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut.",
      backLabel: "Zurück zum Partnerformular",
      formPath: "/de/partner-werden",
    },
    en: {
      successTitle: "Request sent",
      successMessage: "Thank you. Your partnership request has been sent.",
      invalidTitle: "Please check your entries",
      invalidMessage: "Please check your details and try again.",
      errorTitle: "Request could not be sent",
      errorMessage: "Your request could not be sent right now. Please try again later.",
      backLabel: "Back to the partner form",
      formPath: "/en/get-partners",
    },
  },
};

export function sendNativeFormResponse(req, res, { form, outcome }) {
  if (!req.is("application/x-www-form-urlencoded")) return false;

  const locale = req.body?.locale === "en" ? "en" : "de";
  const copy = formResponses[form]?.[locale];
  if (!copy) return false;

  const isSuccess = outcome === "success";
  const isInvalid = outcome === "invalid";
  const title = isSuccess
    ? copy.successTitle
    : isInvalid
      ? copy.invalidTitle
      : copy.errorTitle;
  const message = isSuccess
    ? copy.successMessage
    : isInvalid
      ? copy.invalidMessage
      : copy.errorMessage;
  const statusCode = isSuccess ? 200 : isInvalid ? 400 : 500;

  res.set("Cache-Control", "no-store");
  res.set("Referrer-Policy", "no-referrer");
  res.set("X-Robots-Tag", "noindex, nofollow");
  res.status(statusCode).type("html").send(`<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title} | PutzELF</title>
  </head>
  <body style="margin:0;background:#f5f7f7;color:#0f172a;font-family:system-ui,sans-serif">
    <main style="box-sizing:border-box;max-width:42rem;margin:10vh auto;padding:2rem;background:#fff;border:1px solid #e2e8f0;border-radius:1.5rem">
      <p style="font-size:.75rem;font-weight:700;letter-spacing:.18em;color:#0369a1">PUTZELF</p>
      <h1 style="font-size:1.8rem">${title}</h1>
      <p style="line-height:1.6">${message}</p>
      <a href="${copy.formPath}" style="display:inline-block;margin-top:1rem;color:#0369a1">${copy.backLabel}</a>
    </main>
  </body>
</html>`);
  return true;
}
