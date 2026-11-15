/**
 * Legal page content.
 *
 * Every factual claim here was checked against the codebase. As of the last
 * review the site: makes no network calls of its own (calculations are local),
 * stores one localStorage key (the theme), and loads Google Analytics 4, which
 * sets its own cookies and contacts Google. If any of that changes — a tag
 * removed, an embed added, consent handling introduced — these documents have
 * to change with it.
 */

/**
 * The two values that depend on the operator rather than the code.
 * Set both before publishing.
 */
export const LEGAL_CONFIG = {
  /** Address published on all three pages. Create this alias or change it. */
  contactEmail: "privacy@monstercalc.com",
  /** Governing law for the Terms. Set this to your own country/state. */
  jurisdiction: "England and Wales",
  updated: "26 August 2026",
  updatedIso: "2026-08-26",
  /** Kept in step with components/Analytics.tsx. */
  analyticsId: "G-GKQMTM1ZYY",
} as const;

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export interface LegalSection {
  id: string;
  h2: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  slug: string;
  /** On-page H1. */
  title: string;
  /** <title> for the route. */
  metaTitle: string;
  description: string;
  dek: string;
  sections: LegalSection[];
}

const p = (text: string): LegalBlock => ({ type: "p", text });
const ul = (items: string[]): LegalBlock => ({ type: "ul", items });

const { contactEmail, jurisdiction, analyticsId } = LEGAL_CONFIG;

export const PRIVACY_POLICY: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy",
  description:
    "MonsterCalc has no accounts and no advertising. Your calculations never leave your browser. Google Analytics is used to measure page traffic.",
  dek: "MonsterCalc has no accounts, no advertising and no contact forms, and the numbers you type never leave your browser. The one exception to “we collect nothing” is Google Analytics, which measures page traffic — this page explains exactly what it does.",
  sections: [
    {
      id: "summary",
      h2: "The short version",
      blocks: [
        p(
          "You can use every calculator on this site without giving us anything. There is no sign-up, no login, no contact form and no advertising."
        ),
        p(
          "The numbers you type into a calculator are processed by JavaScript running in your own browser and are never transmitted to us, because nothing on this site transmits them."
        ),
        p(
          "We do use Google Analytics to see how many people visit which pages. It records the page you viewed, roughly where in the world you are, and what kind of device and browser you used. It does not, and cannot, see what you type into a calculator."
        ),
      ],
    },
    {
      id: "what-we-collect",
      h2: "What we collect",
      blocks: [
        p(
          "We ask you for nothing and hold no records that identify you by name. Specifically, MonsterCalc does not operate any of the following:"
        ),
        ul([
          "User accounts, profiles or logins.",
          "Advertising networks, ad scripts or advertising identifiers.",
          "Marketing pixels, conversion tags or social media trackers.",
          "Contact forms, newsletters or mailing lists.",
          "Heatmaps, session recording or any tool that captures what you type.",
        ]),
        p(
          "The site loads one third-party script — Google Analytics — described in the next section. Web fonts are served from this domain rather than from a font CDN, so no font provider sees your visit."
        ),
      ],
    },
    {
      id: "calculations",
      h2: "Your calculations stay on your device",
      blocks: [
        p(
          "Concrete dimensions, course grades, dates of birth, expressions and every other value you enter are held in your browser's memory for as long as the page is open, and are used only to compute the result shown on screen."
        ),
        p(
          "They are not saved to our servers, not written to a database and not logged, because the site has no server-side code to receive them. Closing or reloading the tab discards them. The scientific calculator's history panel is held in memory only and is cleared when you leave the page."
        ),
      ],
    },
    {
      id: "analytics",
      h2: "Analytics",
      blocks: [
        p(
          `This site uses Google Analytics 4 (measurement ID ${analyticsId}), a service provided by Google. It tells us which pages are visited and how often, so we know which calculators are worth improving.`
        ),
        p("To do that, Google Analytics collects:"),
        ul([
          "The page you viewed, when, and the page or search that referred you.",
          "An approximate location — usually country or city level — derived from your IP address.",
          "Your device type, operating system, browser and screen size.",
          "A randomly generated identifier stored in cookies, which lets Google tell a returning visit from a new one. It is not linked to your name or to any account.",
        ]),
        p(
          "It does not collect anything you enter into a calculator. Concrete dimensions, grades, dates of birth and expressions are never passed to the analytics tag, because the calculators do not report their inputs to anything."
        ),
        p(
          "Google acts as our data processor for this, and processes the data on its own infrastructure, which may involve transfers outside your country under Google's own safeguards. Google Analytics 4 anonymises IP addresses by default and we have not enabled Google Signals, advertising personalisation or data sharing with Google advertising products. Google's own privacy policy at policies.google.com/privacy explains what it does with the data it receives."
        ),
        p(
          "If you would rather not be counted, see the opt-out options in the Cookie Policy. Opting out has no effect on how the calculators work."
        ),
      ],
    },
    {
      id: "local-storage",
      h2: "Local storage",
      blocks: [
        p(
          "The site stores one value in your browser's local storage: your light or dark theme preference, saved under the key monstercalc-theme. It is written only when you press the theme toggle, and read on later visits so the site opens in the theme you chose."
        ),
        p(
          "This value stays on your device. It is not a cookie, it is never sent in a network request, and it contains nothing beyond the word light or dark. You can remove it at any time by clearing site data for this domain in your browser settings."
        ),
      ],
    },
    {
      id: "cookies",
      h2: "Cookies",
      blocks: [
        p(
          "Google Analytics sets cookies on this site. We set none of our own, and there are no advertising cookies. The Cookie Policy lists exactly which cookies are set, what they are for, how long they last and how to refuse them."
        ),
      ],
    },
    {
      id: "server-logs",
      h2: "Server logs",
      blocks: [
        p(
          "Like any website, MonsterCalc is delivered by a hosting provider whose web server keeps standard access logs. These typically record the IP address making the request, the page requested, a timestamp, and the browser's user-agent string."
        ),
        p(
          "These logs are generated by the hosting infrastructure, not by anything on the page, and are used only to keep the site running and to investigate abuse or technical faults. We do not use them to build profiles, we do not combine them with anything else, and we do not sell or share them. They are retained for the period set by the hosting provider and then discarded."
        ),
      ],
    },
    {
      id: "clipboard",
      h2: "Clipboard",
      blocks: [
        p(
          "The copy buttons write a result to your clipboard when you press them. The site never reads your clipboard, and a copy only ever happens in response to your click."
        ),
      ],
    },
    {
      id: "children",
      h2: "Children",
      blocks: [
        p(
          "MonsterCalc is a general-audience utility and is safe for students to use. Because we collect no personal data from anyone, we collect none from children either."
        ),
      ],
    },
    {
      id: "your-rights",
      h2: "Your rights",
      blocks: [
        p(
          "Data protection laws such as the UK GDPR, the EU GDPR and the CCPA give you rights to access, correct, delete and port your personal data, and to object to its processing."
        ),
        p(
          "We hold no database of our own, so there is no account, profile or record here to access, correct, export or erase — and we do not sell or share personal information."
        ),
        p(
          "The one set of data connected to your visit is the analytics described above, which Google processes on our behalf. You can stop it being collected at any time using the opt-out options in the Cookie Policy, and you can clear the identifier already stored by clearing this site's cookies."
        ),
        p(
          `To exercise a right, or if you think we hold something about you, write to ${contactEmail}. If you are in the UK or EU and are unhappy with our response, you can complain to your national data protection authority.`
        ),
      ],
    },
    {
      id: "changes",
      h2: "Changes to this policy",
      blocks: [
        p(
          "If we ever add something that changes the picture above — another third-party service, an embed, a contact form — we will update this page and change the date at the top before that feature goes live."
        ),
      ],
    },
    {
      id: "contact",
      h2: "Contact",
      blocks: [
        p(`Questions about this policy can be sent to ${contactEmail}.`),
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  slug: "terms-and-conditions",
  title: "Terms and Conditions",
  metaTitle: "Terms and Conditions",
  description:
    "The terms governing use of the MonsterCalc calculators: free access, results are estimates, and the limits of our liability.",
  dek: "These terms govern your use of MonsterCalc. The important part is short: the calculators are free, the results are estimates, and you should verify anything that carries real cost or consequence.",
  sections: [
    {
      id: "agreement",
      h2: "Agreement to these terms",
      blocks: [
        p(
          "By using MonsterCalc you agree to these terms. If you do not agree with them, please do not use the site."
        ),
      ],
    },
    {
      id: "the-service",
      h2: "What MonsterCalc is",
      blocks: [
        p(
          "MonsterCalc provides five free calculators — concrete volume and cost, grade point average, chronological age, binomial expansion and a scientific calculator — together with articles explaining the methods behind them."
        ),
        p(
          "The calculators run entirely in your browser. No account is required and no charge is made."
        ),
      ],
    },
    {
      id: "estimates",
      h2: "Results are estimates, not professional advice",
      blocks: [
        p(
          "This is the most important term on this page. The calculators implement the standard published formulas for their subjects, and we document each formula on the calculator's own page so you can check the working. They are still tools, and their output depends entirely on the values you enter."
        ),
        ul([
          "Concrete quantities are estimates. Site conditions, subgrade variation, form deflection, waste and supplier batching all affect what you actually need. Confirm quantities with your supplier and, where the work is structural, with a qualified engineer before ordering or pouring.",
          "GPA results are estimates. Grading scales, weighting rules, credit values, rounding and retake policies vary between institutions. Your school or registrar's published policy governs your actual transcript, not this calculator.",
          "Age results are calendar calculations. Where an age is used for a clinical, educational or legal assessment, confirm it against the protocol you are working to. This site does not apply prematurity adjustment or any other correction.",
          "Mathematical and scientific results are computed with standard double-precision floating-point arithmetic and are subject to its limits. Binomial expansion is restricted to powers where exact integer coefficients can be guaranteed, and the calculator warns you rather than returning a value it cannot stand behind.",
        ]),
        p(
          "Nothing on this site is engineering, financial, academic, legal or medical advice. Do not rely on it as a substitute for a qualified professional."
        ),
      ],
    },
    {
      id: "acceptable-use",
      h2: "Acceptable use",
      blocks: [
        p("You agree not to:"),
        ul([
          "Use the site in any way that breaks applicable law.",
          "Attempt to gain unauthorised access to the site, its hosting or any connected system.",
          "Interfere with the site's operation, including by overloading it with automated requests.",
          "Republish substantial portions of the site's content as your own.",
        ]),
        p(
          "You are welcome to use the calculators for personal, educational and commercial work, to link to any page, and to quote short passages with attribution."
        ),
      ],
    },
    {
      id: "intellectual-property",
      h2: "Intellectual property",
      blocks: [
        p(
          "The MonsterCalc name, logo, page design, written articles and source code are owned by the site operator and protected by copyright and trade mark law."
        ),
        p(
          "The underlying mathematics is not. Formulas such as the binomial theorem, the GPA average and the conversion of cubic feet to cubic yards are public knowledge, and nothing here restricts your use of them. The results you generate are yours to use freely."
        ),
      ],
    },
    {
      id: "no-warranty",
      h2: "No warranty",
      blocks: [
        p(
          "The site is provided “as is” and “as available”, without warranties of any kind, whether express or implied, including any implied warranties of merchantability, fitness for a particular purpose and non-infringement."
        ),
        p(
          "We do not warrant that the site will be uninterrupted, error-free or available at any particular time, or that every result will be free of defects. We take accuracy seriously and test the calculation engines, but we cannot guarantee correctness in every case."
        ),
      ],
    },
    {
      id: "liability",
      h2: "Limitation of liability",
      blocks: [
        p(
          "To the fullest extent permitted by law, the site operator is not liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits, revenue, data, materials or goodwill, arising out of your use of or inability to use the site — including any loss arising from reliance on a calculated result."
        ),
        p(
          "Nothing in these terms excludes or limits liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot lawfully be excluded."
        ),
      ],
    },
    {
      id: "availability",
      h2: "Availability and changes",
      blocks: [
        p(
          "We may change, suspend or discontinue any part of the site at any time without notice. We may also update these terms; the date at the top of this page shows when they were last changed, and continuing to use the site after a change means you accept the revised terms."
        ),
      ],
    },
    {
      id: "external-links",
      h2: "External links",
      blocks: [
        p(
          "Where the site links to another website, that site is outside our control. We are not responsible for its content, its accuracy or its privacy practices."
        ),
      ],
    },
    {
      id: "governing-law",
      h2: "Governing law",
      blocks: [
        p(
          `These terms are governed by the laws of ${jurisdiction}, and the courts of ${jurisdiction} have exclusive jurisdiction over any dispute arising from them. If you are a consumer, this does not deprive you of the protection of the mandatory laws of your country of residence.`
        ),
        p(
          "If any provision of these terms is found unenforceable, the remaining provisions stay in force."
        ),
      ],
    },
    {
      id: "contact",
      h2: "Contact",
      blocks: [p(`Questions about these terms can be sent to ${contactEmail}.`)],
    },
  ],
};

export const COOKIE_POLICY: LegalDoc = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  metaTitle: "Cookie Policy",
  description:
    "Which cookies MonsterCalc sets, what each one does, how long it lasts, and how to refuse them. No advertising cookies are used.",
  dek: "MonsterCalc sets no cookies of its own and runs no advertising. Google Analytics, which we use to count page visits, sets two. This page lists them and shows how to refuse them.",
  sections: [
    {
      id: "summary",
      h2: "The short version",
      blocks: [
        p(
          "There are no advertising cookies on this site and no social media trackers. We set no cookies ourselves."
        ),
        p(
          "Google Analytics, which we use to see how many people visit which pages, sets two cookies. Both are listed below with what they do and how long they last."
        ),
        p(
          "Separately, your light or dark theme choice is saved in local storage — a different mechanism that never travels with a network request."
        ),
      ],
    },
    {
      id: "what-cookies-are",
      h2: "What cookies are",
      blocks: [
        p(
          "A cookie is a small text file a website asks your browser to store and then send back on every subsequent request. Because cookies travel with each request, they can be used to recognise a returning visitor and, when set by third parties, to follow that visitor across different sites."
        ),
        p(
          "The two cookies on this site are used only to tell a returning visit from a new one in our visitor counts. They are not used to build an advertising profile."
        ),
      ],
    },
    {
      id: "cookies-we-set",
      h2: "The cookies on this site",
      blocks: [
        p(
          `Both are set by Google Analytics 4 (measurement ID ${analyticsId}). They are first-party cookies, meaning they are stored under this domain rather than Google's, and they are only read by the analytics tag.`
        ),
        ul([
          "_ga — distinguishes one visitor from another so repeat visits are not counted as new people. Contains a randomly generated number, not your name. Expires 2 years after it is set.",
          `_ga_${analyticsId.replace("G-", "")} — used by Google Analytics 4 to keep track of a single browsing session on this site. Expires 2 years after it is set.`,
        ]),
        p(
          "Neither cookie carries anything you typed into a calculator, and neither is used for advertising. We have not enabled Google Signals, ad personalisation or data sharing with Google's advertising products."
        ),
      ],
    },
    {
      id: "local-storage",
      h2: "Local storage: your theme",
      blocks: [
        p(
          "The theme toggle saves your choice using local storage, a browser feature that keeps a value on your device and — unlike a cookie — never attaches it to a network request."
        ),
        ul([
          "Key: monstercalc-theme",
          "Value: the single word light or dark",
          "Set: only when you press the theme toggle",
          "Purpose: to open the site in the theme you picked last time",
          "Expires: never automatically; it stays until you clear it",
          "Shared with anyone: no. It cannot leave your browser.",
        ]),
        p(
          "If you never touch the theme toggle, nothing is written at all, and the site simply follows your operating system's light or dark setting for that visit."
        ),
      ],
    },
    {
      id: "your-choices",
      h2: "How to refuse these cookies",
      blocks: [
        p(
          "The analytics cookies are currently set when you load the site. If you would rather not be counted, any of the following works, and none of them affects how the calculators behave:"
        ),
        ul([
          "Install Google's official browser opt-out add-on from tools.google.com/dlpage/gaoptout, which blocks Google Analytics on every site you visit.",
          "Block third-party or tracking scripts using your browser's built-in protection — Firefox's Enhanced Tracking Protection, Safari's Intelligent Tracking Prevention and Brave's shields all stop this tag.",
          "Use a content blocker such as uBlock Origin.",
          "Turn on Do Not Track or Global Privacy Control in your browser.",
          "Block or clear cookies for this domain in your browser settings.",
        ]),
        p(
          "The calculators run entirely in your browser and need no cookies at all, so blocking every cookie on this domain leaves the site fully working — you will simply lose the saved theme preference too."
        ),
      ],
    },
    {
      id: "third-party",
      h2: "Third-party cookies",
      blocks: [
        p(
          "Google Analytics is the only third-party service on the site, and the two cookies above are the only cookies it sets. There are no advertising networks, no embedded video, no social media widgets and no external font CDN — the web fonts are served from this domain. No other outside company is in a position to set a cookie here."
        ),
      ],
    },
    {
      id: "how-to-clear",
      h2: "Clearing what is stored",
      blocks: [
        p(
          "Clearing site data for this domain in your browser settings removes both the analytics cookies and the stored theme. In Chrome, Edge, Firefox and Safari this is usually found under Privacy and security, then site settings or stored data. Browsing in a private or incognito window also discards everything when the window closes."
        ),
        p(
          "Removing it has no downside. The site works exactly the same and simply falls back to your system theme."
        ),
      ],
    },
    {
      id: "changes",
      h2: "Changes to this policy",
      blocks: [
        p(
          "If we add or remove a cookie, this page will be updated to match before the change goes live, along with the date at the top."
        ),
      ],
    },
    {
      id: "contact",
      h2: "Contact",
      blocks: [p(`Questions about this policy can be sent to ${contactEmail}.`)],
    },
  ],
};

export const LEGAL_DOCS: LegalDoc[] = [PRIVACY_POLICY, TERMS, COOKIE_POLICY];
