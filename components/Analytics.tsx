import Script from "next/script";

/** GA4 measurement ID. Mirrored in LEGAL_CONFIG.analyticsId. */
export const GA_MEASUREMENT_ID = "G-GKQMTM1ZYY";

/**
 * Google Analytics 4 (gtag.js).
 *
 * `afterInteractive` keeps the tag off the critical path so it cannot delay
 * first paint or LCP; the tag itself is otherwise the stock snippet.
 *
 * No manual page_view tracking here, deliberately. This app routes on the
 * client, which usually breaks SPA analytics — but GA4's enhanced measurement
 * ("page changes based on browser history events", on by default) does pick up
 * Next.js App Router navigations. That was verified on the wire: one page_view
 * per navigation with the correct path. Adding a manual page_view on top makes
 * every view count twice, which was also verified. Leave this alone unless
 * enhanced measurement is turned off in the GA property.
 *
 * Loading this means the site sets cookies and contacts a third party. The
 * Privacy and Cookie policies describe exactly what it collects and must be
 * kept in step with whatever is configured here.
 */
export function Analytics() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
