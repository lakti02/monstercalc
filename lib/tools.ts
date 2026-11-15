export type ToolId = "concrete" | "gpa" | "age" | "binomial" | "scientific";

export interface Formula {
  title: string;
  formula: string;
  note: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Tool {
  id: ToolId;
  slug: string;
  num: string;
  /** Full product name, used as the H1 / card title. */
  name: string;
  /** Compact label for the segmented header nav. */
  short: string;
  /** Hero pill label + the mono hint printed beside it. */
  pill: string;
  pillHint: string;
  /** <title> and meta description for the tool's own route. */
  title: string;
  description: string;
  /** Primary keyword set — also the corpus the instant search filters on. */
  keywords: string[];
  seoH2: string;
  seoIntro: string;
  seoBullets: string[];
  seoRelated: string[];
  formulas: Formula[];
  faqs: Faq[];
}

export const TOOLS: Tool[] = [
  {
    id: "concrete",
    slug: "concrete-calculator",
    num: "01",
    name: "Concrete Calculator",
    short: "Concrete",
    pill: "Concrete",
    pillHint: "yd³",
    title: "Concrete Calculator — Yards, Bags & Cost",
    description:
      "Calculate concrete volume in cubic yards, 40/60/80 lb bag counts and ready-mix cost for slabs, pads and footings. Free, instant, no sign-up.",
    keywords: [
      "concrete yards calculator",
      "concrete volume calculator",
      "concrete cost calculator",
      "concrete pad cost calculator",
      "concrete footing calculator",
      "bags of concrete calculator",
      "how to calculate concrete yardage",
      "slab",
      "footing",
      "cubic yards",
      "ready mix",
    ],
    seoH2: "Concrete yards, bags and cost — worked out before you order",
    seoIntro:
      "Enter the slab or footing dimensions and the calculator converts them to cubic feet, then to cubic yards by dividing by 27. It sizes the pour for 40, 60 and 80 lb bags at their published yields, adds an optional 10% wastage buffer, and prices the job against both a ready-mix yard rate and a bag rate so you can see which delivery method is cheaper at your volume.",
    seoBullets: [
      "Slab and footing modes — footings switch the volume math to run length × trench width × footing depth.",
      "Bag counts for 40, 60 and 80 lb sizes at 0.30 / 0.45 / 0.60 ft³ yields, always rounded up to whole bags.",
      "Optional 10% wastage buffer covers spillage, uneven subgrade and over-excavated trench walls.",
      "Side-by-side ready-mix and bag pricing from your own $/yd³ and $/bag rates.",
    ],
    seoRelated: [
      "concrete yards calculator",
      "bags of concrete calculator",
      "concrete cost calculator",
      "concrete footing calculator",
      "concrete pad cost calculator",
      "how to calculate concrete yardage",
      "cubic yards of concrete",
      "80 lb bag coverage",
    ],
    formulas: [
      {
        title: "Slab volume",
        formula: "ft³ = length(ft) × width(ft) × (depth_in ÷ 12) × quantity",
        note: "Depth is entered in inches and divided by 12 to reach feet before multiplying.",
      },
      {
        title: "Footing volume",
        formula:
          "ft³ = run(ft) × (trench_width_in ÷ 12) × (depth_in ÷ 12) × footings",
        note: "Both cross-section dimensions come in as inches, so both are divided by 12.",
      },
      {
        title: "Cubic yards",
        formula: "yd³ = ft³ ÷ 27",
        note: "A cubic yard is 3 ft × 3 ft × 3 ft = 27 ft³. Ready-mix is sold by the yard.",
      },
      {
        title: "Bag count",
        formula: "bags = ⌈ ft³ ÷ yield ⌉   (0.30 / 0.45 / 0.60 ft³)",
        note: "Yields are the published values for 40, 60 and 80 lb bags. Always rounded up — a partial bag is a whole bag.",
      },
      {
        title: "Wastage buffer",
        formula: "ft³_ordered = ft³ × 1.10",
        note: "Ten percent is the common allowance for spillage, uneven subgrade and trench over-dig.",
      },
      {
        title: "Cost",
        formula: "ready-mix = yd³ × $/yd³      bags = bag_count(80 lb) × $/bag",
        note: "Bag pricing uses the 80 lb count because that is the size most yards stock by the pallet.",
      },
    ],
    faqs: [
      {
        q: "How many cubic yards is a 10 × 10 slab at 4 inches?",
        a: "10 × 10 × (4 ÷ 12) = 33.33 ft³, and 33.33 ÷ 27 = 1.23 cubic yards. With the 10% buffer on, order 1.36 cubic yards — most suppliers sell in quarter-yard increments, so you would order 1.5.",
      },
      {
        q: "How many 80 lb bags are in a cubic yard?",
        a: "An 80 lb bag yields about 0.60 ft³, and a cubic yard is 27 ft³, so 27 ÷ 0.60 = 45 bags. At 60 lb (0.45 ft³) it is 60 bags, and at 40 lb (0.30 ft³) it is 90 bags.",
      },
      {
        q: "When should I switch from bags to ready-mix?",
        a: "There is no fixed threshold — it depends on your local rates, which is why both prices are shown. Enter your actual $/yd³ and $/bag and compare the two cost cards directly. Bagged concrete also has a labour cost the calculator does not model: mixing 45 bags by hand is a different job from a truck pour.",
      },
      {
        q: "Should I leave the 10% wastage buffer on?",
        a: "For most ground-level pours, yes. Subgrade is rarely perfectly level, forms deflect slightly under load, and trench walls slough. The buffer is applied to the volume before bags and cost are derived, so every downstream number reflects it.",
      },
      {
        q: "Does the calculator account for rebar or mesh displacement?",
        a: "No. Reinforcement displaces a fraction of a percent of the volume and is well inside the wastage buffer, so it is ignored. The same applies to vapour barriers and form-release film.",
      },
    ],
  },
  {
    id: "gpa",
    slug: "gpa-calculator",
    num: "02",
    name: "GPA Calculator",
    short: "GPA",
    pill: "GPA",
    pillHint: "4.0",
    title: "GPA Calculator — Weighted & Unweighted, High School and College",
    description:
      "Calculate weighted and unweighted GPA on the 4.0 and 5.0 scales, roll in a prior cumulative GPA, and see your grade distribution. Free and instant.",
    keywords: [
      "gpa calculator high school",
      "middle school gpa calculator",
      "how to calculate cumulative gpa",
      "how to calculate weighted gpa",
      "calculate new gpa with current gpa",
      "science gpa calculator",
      "unweighted gpa",
      "honors",
      "ap ib",
      "grade point average",
      "credits",
    ],
    seoH2: "Weighted and unweighted GPA, on the scale your school actually uses",
    seoIntro:
      "Each course contributes its grade point value multiplied by its credit hours. Sum those quality points, divide by total credits, and you have a GPA. High School mode adds the standard bonuses — +0.5 for honors, +1.0 for AP or IB — and caps the weighted result at 5.0. College mode uses the straight 4.0 scale and ignores course-type bonuses entirely.",
    seoBullets: [
      "Weighted and unweighted GPA computed side by side from the same course list.",
      "Roll in a prior cumulative GPA and credit total to project a new cumulative figure.",
      "Honors +0.5 and AP/IB +1.0 bonuses on the high school 5.0 scale; college mode holds to 4.0.",
      "Grade distribution chart shows how your A-through-F spread is driving the average.",
    ],
    seoRelated: [
      "gpa calculator high school",
      "how to calculate weighted gpa",
      "how to calculate cumulative gpa",
      "calculate new gpa with current gpa",
      "middle school gpa calculator",
      "science gpa calculator",
      "unweighted gpa scale",
      "grade point average formula",
    ],
    formulas: [
      {
        title: "Grade point average",
        formula: "GPA = Σ(grade_points × credits) ÷ Σ(credits)",
        note: "Credit-weighted, so a 4-credit A moves the average more than a 1-credit A.",
      },
      {
        title: "Weighted grade points",
        formula: "weighted = min(base + bonus, 5.0)",
        note: "Bonus is +0.5 for honors and +1.0 for AP/IB. College mode sets the bonus to zero.",
      },
      {
        title: "Cumulative GPA",
        formula:
          "cumulative = (prior_GPA × prior_credits + Σ new points) ÷ (prior_credits + Σ new credits)",
        note: "Prior work re-enters as a block of quality points and credits, which is exactly how a registrar recomputes it.",
      },
      {
        title: "Grade point scale",
        formula: "A 4.0 · A- 3.7 · B+ 3.3 · B 3.0 · B- 2.7 · C+ 2.3 · C 2.0 · C- 1.7 · D+ 1.3 · D 1.0 · F 0",
        note: "The standard US letter scale. F earns zero points but its credits still count in the denominator.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between weighted and unweighted GPA?",
        a: "Unweighted GPA puts every course on the same 4.0 scale regardless of difficulty. Weighted GPA adds a bonus for harder coursework — typically +0.5 for honors and +1.0 for AP or IB — which is why weighted figures can exceed 4.0 and are usually capped at 5.0.",
      },
      {
        q: "How do I calculate a new cumulative GPA with my current GPA?",
        a: "Open the 'Already have a GPA? Roll it in' panel and enter your prior cumulative GPA and the credits it covers. The calculator multiplies those together to recover your existing quality points, adds this term's points and credits, then divides. That is the same arithmetic a registrar performs.",
      },
      {
        q: "Does an F still count toward my GPA?",
        a: "Yes. An F contributes zero grade points but its credit hours remain in the denominator, which is why a single failed course pulls an average down sharply. Retake policies that replace the grade vary by institution and are not modelled here.",
      },
      {
        q: "Can I use this as a science GPA calculator?",
        a: "Yes — enter only your science and mathematics coursework. A science GPA (often called BCPM for pre-health applications) is the same credit-weighted formula applied to a filtered course list, so restricting the rows to those courses gives you the figure.",
      },
      {
        q: "Why is my weighted GPA capped at 5.0?",
        a: "The 5.0 ceiling is the most common high school convention: an A in an AP course earns 4.0 + 1.0 = 5.0 and nothing scores higher. Some districts use a 4.5 or 6.0 scale instead, so check your handbook if your transcript disagrees.",
      },
    ],
  },
  {
    id: "age",
    slug: "age-calculator",
    num: "03",
    name: "Age Calculator",
    short: "Age",
    pill: "Age",
    pillHint: "y/m/d",
    title: "Chronological Age Calculator — Years, Months, Days",
    description:
      "Exact chronological age in years, months and days, plus a date gap calculator. Calendar-accurate across leap years and Feb 29 birthdays.",
    keywords: [
      "chronological age calculator",
      "age difference calculator",
      "age gap calculator",
      "adjusted age calculator",
      "pearson chronological age calculator",
      "asq chronological age calculator",
      "calculate age in excel",
      "date gap",
      "days between dates",
      "birthday",
    ],
    seoH2: "Chronological age in years, months and days — calendar-exact",
    seoIntro:
      "Age is computed by calendar borrowing, not by dividing days by 365.25. The calculator takes the whole months first — borrowing a month when the target date has not yet reached the birth day-of-month, and 12 from years if that goes negative — then counts the real days from that month anniversary to the target date. That is the method assessment protocols require, and it is exact across leap years and February 29 birthdays.",
    seoBullets: [
      "Years, months and days by calendar borrowing — the method Pearson and ASQ scoring require.",
      "Exact across leap years, month-length changes and February 29 dates of birth.",
      "Days lived and days remaining to the next birthday, alongside weeks and minutes.",
      "Date Gap mode measures the interval between any two dates entered in either order.",
    ],
    seoRelated: [
      "chronological age calculator",
      "age difference calculator",
      "age gap calculator",
      "adjusted age calculator",
      "pearson chronological age calculator",
      "asq chronological age calculator",
      "calculate age in excel",
      "days between two dates",
    ],
    formulas: [
      {
        title: "Calendar borrowing",
        formula: "m −= 1 if d₂ < d₁ ;  then days = date₂ − (date₁ + y years + m months)",
        note: "Leftover days are counted from the real month anniversary, so a short February can never push the remainder negative.",
      },
      {
        title: "Month and year carry",
        formula: "m = m₂ − m₁ ;  if m < 0 → m += 12, y −= 1",
        note: "Resolved before the day count, so the month anniversary is always on or before the target date.",
      },
      {
        title: "Total days",
        formula: "days = ⌊ (date₂ − date₁) ÷ 86 400 000 ⌋",
        note: "Computed from UTC timestamps so daylight-saving shifts cannot add or drop a day.",
      },
      {
        title: "Days to next birthday",
        formula: "next = birth + ⌈years⌉ years, rolled forward one year if already past",
        note: "A February 29 anniversary clamps to February 28 in non-leap years, the same rule the years/months/days borrow uses.",
      },
    ],
    faqs: [
      {
        q: "Why not just divide the number of days by 365.25?",
        a: "Because it is wrong at the day level. Months are 28 to 31 days long and leap years are irregular, so an average-length year drifts by a day or more. Assessment protocols that score by age band need the exact years-months-days figure, which only calendar borrowing produces.",
      },
      {
        q: "How does this handle a February 29 birthday?",
        a: "The leftover days are counted from the real month anniversary rather than by subtracting day numbers, so a Feb 29 birth date resolves correctly in every year. In a non-leap year the anniversary clamps to February 28, which is the same rule applied to every other month-end date such as January 31.",
      },
      {
        q: "Is this the right calculator for Pearson or ASQ chronological age?",
        a: "Yes for the chronological age itself — those protocols use exactly this years-months-days subtraction, with the test date as the second date. The calculator does not apply prematurity adjustment; if your protocol requires an adjusted age, subtract the weeks of prematurity from the result yourself.",
      },
      {
        q: "How do I calculate age in Excel?",
        a: "Excel's DATEDIF does the same borrowing: =DATEDIF(birth, today, \"y\") for years, then \"ym\" for leftover months and \"md\" for leftover days. This calculator gives you all three at once and shows the total days alongside them.",
      },
      {
        q: "Can Date Gap take the dates in either order?",
        a: "Yes. The calculator sorts the two dates before subtracting, so the interval is always reported as a positive span no matter which field holds the earlier date.",
      },
    ],
  },
  {
    id: "binomial",
    slug: "binomial-expansion-calculator",
    num: "04",
    name: "Binomial Expansion Calculator",
    short: "Binomial",
    pill: "Binomial",
    pillHint: "(a+b)ⁿ",
    title: "Binomial Expansion Calculator — Theorem, Terms & Pascal's Triangle",
    description:
      "Expand (ax + by)ⁿ with exact integer binomial coefficients, isolate any single term, and read Pascal's triangle. Free binomial theorem calculator.",
    keywords: [
      "binomial expansion calculator",
      "binomial theorem calculator",
      "expand binomial calculator",
      "pascal triangle calculator",
      "binomial coefficient calculator",
      "nth term of binomial expansion",
      "ncr calculator",
      "combinations",
      "polynomial",
    ],
    seoH2: "Binomial theorem expansion with exact integer coefficients",
    seoIntro:
      "The binomial theorem expands (a·x + b·y)ⁿ into a sum of n + 1 terms, each of the form C(n,k) · aⁿ⁻ᵏ · bᵏ · xⁿ⁻ᵏ · yᵏ. Coefficients are built iteratively from the previous one rather than from factorials, so they stay exact integers instead of drifting into floating-point error. The Find-term card isolates a single term when you only need one coefficient.",
    seoBullets: [
      "Exact integer coefficients via the iterative identity — no factorial overflow, no rounding drift.",
      "Isolate term k + 1 to answer 'what is the coefficient of x⁵' without reading the whole polynomial.",
      "Pascal's triangle rendered for rows 0 through n, with your row highlighted.",
      "Custom variable names and coefficients, including negative b for alternating-sign expansions.",
    ],
    seoRelated: [
      "binomial expansion calculator",
      "binomial theorem calculator",
      "pascal triangle calculator",
      "binomial coefficient calculator",
      "nth term of binomial expansion",
      "ncr calculator",
      "expand binomial calculator",
      "combinations formula",
    ],
    formulas: [
      {
        title: "Binomial theorem",
        formula: "(ax + by)ⁿ = Σ (k = 0…n)  C(n,k) · aⁿ⁻ᵏ · bᵏ · xⁿ⁻ᵏ · yᵏ",
        note: "The expansion always has exactly n + 1 terms, and the exponents on x and y sum to n in every one.",
      },
      {
        title: "Binomial coefficient",
        formula: "C(n,k) = n! ÷ (k! · (n−k)!)",
        note: "Also written nCk or ⁿCₖ — the number of ways to choose k items from n.",
      },
      {
        title: "Iterative coefficient",
        formula: "C(n,k) = C(n,k−1) × (n − k + 1) ÷ k,   C(n,0) = 1",
        note: "Each step divides exactly, so the running value stays an integer. This is why factorials are never formed.",
      },
      {
        title: "General term",
        formula: "T(k+1) = C(n,k) · aⁿ⁻ᵏ · bᵏ · xⁿ⁻ᵏ · yᵏ",
        note: "Term numbering is 1-based while k is 0-based, so the 6th term has k = 5.",
      },
      {
        title: "Pascal's triangle",
        formula: "row n, entry k = C(n,k);  C(n,k) = C(n−1,k−1) + C(n−1,k)",
        note: "Every entry is the sum of the two above it, which is the same recurrence the coefficients follow.",
      },
    ],
    faqs: [
      {
        q: "How do I find the coefficient of a specific term?",
        a: "Use the Find term field. Term numbering is 1-based, so the coefficient of x⁵ in a degree-8 expansion is term 4 (k = 3). The card shows T(k+1), its k, its C(n,k) and the isolated term so you can read the coefficient directly.",
      },
      {
        q: "Why is n limited to 20?",
        a: "Beyond n = 20 the coefficients and the powers of a and b exceed the range where JavaScript numbers represent integers exactly, so results would be silently wrong. The calculator warns instead of returning a value it cannot guarantee.",
      },
      {
        q: "Can b be negative?",
        a: "Yes. Enter a negative b and the signs alternate through the expansion, which is the (ax − by)ⁿ case. The formatter reads the sign of each computed coefficient and emits + or − accordingly.",
      },
      {
        q: "What is nCr and how does it relate to this?",
        a: "nCr — also written C(n,r) or ⁿCᵣ — is the number of ways to choose r items from n, and it is exactly the coefficient of the term with k = r. The term table lists C(n,k) for every k, so it doubles as an nCr table for that n.",
      },
      {
        q: "Why does the Pascal's triangle stop at row 9?",
        a: "Rows past 9 become too wide to read on screen. When n exceeds 9 the triangle shows rows 0 through 9 and notes that it is truncated — the term table still lists every coefficient for your actual n.",
      },
    ],
  },
  {
    id: "scientific",
    slug: "scientific-calculator",
    num: "05",
    name: "Scientific Calculator",
    short: "Scientific",
    pill: "Scientific",
    pillHint: "sin",
    title: "Online Scientific Calculator — Free, No Download",
    description:
      "Free online scientific calculator with trig, logs, powers, roots, memory and history. Runs in the browser, no download and no sign-up.",
    keywords: [
      "online scientific calculator",
      "ti 30x scientific calculator online",
      "realcalc scientific calculator",
      "non graphing scientific calculator",
      "scientific calculator vs graphing calculator",
      "trigonometry",
      "logarithm",
      "square root",
      "memory",
      "degrees radians",
    ],
    seoH2: "A scientific calculator that runs entirely in your browser",
    seoIntro:
      "Expressions are parsed with a tokenizer and a shunting-yard evaluator, not by handing the string to eval — so a partially typed expression renders nothing rather than throwing, and operator precedence is enforced properly. Trigonometric functions respect the DEG/RAD toggle, memory persists across calculations, and the last 40 results stay in the history panel.",
    seoBullets: [
      "Live result under the expression, recomputed on every keystroke — there is no equals-to-see-anything step.",
      "Trig, logs, powers, roots and percentage, with a DEG/RAD toggle that affects sin, cos and tan only.",
      "Memory register (M+, MR, MC) and an ANS key that inserts the previous answer.",
      "Full keyboard support: digits, operators, Enter for equals, Backspace to delete, Escape to clear.",
    ],
    seoRelated: [
      "online scientific calculator",
      "ti 30x scientific calculator online",
      "realcalc scientific calculator",
      "non graphing scientific calculator",
      "scientific calculator vs graphing calculator",
      "calculator with memory function",
      "trig calculator degrees",
      "log and ln calculator",
    ],
    formulas: [
      {
        title: "Evaluation order",
        formula: "( ) → functions → ^ → × ÷ % → + −",
        note: "Enforced by a shunting-yard parser, so 2 + 3 × 4 is 14 and never 20.",
      },
      {
        title: "Degrees to radians",
        formula: "rad = deg × π ÷ 180",
        note: "Applied to the argument of sin, cos and tan when the mode chip reads DEG.",
      },
      {
        title: "Percent",
        formula: "x% = x ÷ 100",
        note: "The % key is a postfix operator: 50% evaluates to 0.5.",
      },
      {
        title: "Logarithms",
        formula: "log(x) = log₁₀(x)      ln(x) = logₑ(x)",
        note: "log is base 10 and ln is base e, matching the labelling on a physical scientific calculator.",
      },
      {
        title: "Output precision",
        formula: "12 significant digits, trailing zeros trimmed",
        note: "Enough to expose real precision without printing floating-point noise like 0.30000000000000004.",
      },
    ],
    faqs: [
      {
        q: "Do I need to press equals to see a result?",
        a: "No. The result line recomputes on every keystroke. Equals commits the expression to the history panel and makes the result available to ANS, but the value is already on screen before you press it.",
      },
      {
        q: "What is the difference between a scientific and a graphing calculator?",
        a: "A scientific calculator evaluates expressions and returns a number. A graphing calculator plots functions, solves systems visually and holds programs. For arithmetic, trig, logs and statistics coursework a scientific calculator is sufficient — and it is what most standardised tests permit when graphing models are barred.",
      },
      {
        q: "Does DEG/RAD affect anything besides trig?",
        a: "No. The toggle converts the argument to sin, cos and tan only. Logs, roots, powers and arithmetic are unaffected by angle mode.",
      },
      {
        q: "How does the memory register work?",
        a: "M+ adds the current result to memory, MR inserts the stored value into the expression, and MC clears it. The current memory value is shown in the header chip so you always know what MR will paste.",
      },
      {
        q: "Is my input sent anywhere?",
        a: "The numbers and expressions you enter do not. The parser and evaluator run in your browser, there are no API calls and there is no account system, so your input never leaves the device. The site does use Google Analytics to count page visits, which records which page was viewed — not anything typed into the calculator.",
      },
    ],
  },
];

export const TOOL_BY_ID = Object.fromEntries(TOOLS.map((t) => [t.id, t])) as Record<
  ToolId,
  Tool
>;

export const TOOL_BY_SLUG = Object.fromEntries(TOOLS.map((t) => [t.slug, t])) as Record<
  string,
  Tool
>;

export const SITE = {
  name: "MonsterCalc",
  url: "https://monstercalc.com",
  tagline: "The high-performance calculation engine for students, builders, and everyday math.",
} as const;

/** Case-insensitive keyword match used by both the header search and hero pills. */
export function matchesQuery(tool: Tool, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (tool.name.toLowerCase().includes(q)) return true;
  if (tool.short.toLowerCase().includes(q)) return true;
  return tool.keywords.some((k) => k.toLowerCase().includes(q));
}
