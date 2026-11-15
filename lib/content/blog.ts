import type { ToolId } from "@/lib/tools";

export interface PostSection {
  h2: string;
  paragraphs: string[];
}

export interface Post {
  slug: string;
  title: string;
  dek: string;
  category: string;
  readTime: string;
  date: string;
  /** ISO date for <time> and Article JSON-LD. */
  iso: string;
  /** The calculator this post deep-links to. */
  tool: ToolId;
  toolSlug: string;
  /** Pull-quote stat rendered in the featured card. */
  stat: string;
  statLabel: string;
  keyword: string;
  sections: PostSection[];
}

export const POSTS: Post[] = [
  {
    slug: "how-to-calculate-concrete-yards-without-over-ordering",
    title: "How to calculate concrete yards without over-ordering",
    dek: "Ready-mix is sold by the cubic yard and short loads carry a surcharge. Here is the arithmetic that gets you to the right number the first time.",
    category: "Construction",
    readTime: "6 min read",
    date: "12 August 2026",
    iso: "2026-08-12",
    tool: "concrete",
    toolSlug: "concrete-calculator",
    stat: "÷ 27",
    statLabel: "cubic feet to cubic yards",
    keyword: "how to calculate concrete yardage",
    sections: [
      {
        h2: "Everything starts in cubic feet",
        paragraphs: [
          "A concrete order is a volume problem wearing a construction hat. Measure the length and width of the pour in feet, measure the depth in inches, and divide that depth by 12 to bring it into the same unit as the other two. Multiply the three together and you have cubic feet.",
          "A 10 ft by 10 ft slab poured 4 inches deep is 10 × 10 × (4 ÷ 12), which is 33.33 cubic feet. Nothing about that number is useful to a dispatcher yet, because ready-mix is not sold by the foot.",
        ],
      },
      {
        h2: "Divide by 27, not by 3",
        paragraphs: [
          "This is where most over-orders begin. A cubic yard is three feet on every side, so it holds 3 × 3 × 3 = 27 cubic feet. Dividing by 3 instead of 27 inflates the order ninefold, and dividing by 9 — a surprisingly common slip — inflates it threefold.",
          "Our 33.33 cubic feet becomes 33.33 ÷ 27 = 1.23 cubic yards. That is the number the supplier needs.",
        ],
      },
      {
        h2: "Footings are a different cross-section",
        paragraphs: [
          "A slab is measured in feet on two axes. A footing is not: you have a run length in feet and a trench cross-section given in inches, because trenches are specified as width by depth in inches on the drawing.",
          "So the footing formula divides twice: run × (trench width ÷ 12) × (footing depth ÷ 12). A 40-foot run of 16-inch-wide, 8-inch-deep footing is 40 × 1.333 × 0.667 = 35.6 cubic feet, or 1.32 cubic yards. Applying the slab formula to a footing — treating that 16 as feet — would produce a number sixteen times too large.",
        ],
      },
      {
        h2: "The 10% buffer is not padding, it is physics",
        paragraphs: [
          "Subgrade is never perfectly level. Forms deflect under the weight of wet concrete. Trench walls slough inward when you step near them. Some concrete stays in the chute and some ends up on the ground.",
          "Ten percent is the conventional allowance for all of that on ground-level work. On a 1.23 yard slab it takes you to 1.36 yards. Apply the buffer to the volume before you convert to bags or cost, so every downstream number carries it.",
        ],
      },
      {
        h2: "Bags versus a truck",
        paragraphs: [
          "Bagged concrete yields are published on the sack: roughly 0.60 cubic feet for an 80 lb bag, 0.45 for a 60 lb and 0.30 for a 40 lb. Divide your cubic feet by the yield and round up, because a partial bag is a whole bag. A full cubic yard needs 45 eighty-pound bags.",
          "The crossover point between bags and ready-mix depends entirely on your local rates, which is why the calculator prices both from figures you enter rather than assuming a national average. Factor in the labour too: mixing 45 bags by hand is a different day from a truck pour.",
        ],
      },
      {
        h2: "Order in the increments your supplier sells",
        paragraphs: [
          "Most yards sell in quarter-yard increments and charge a short-load fee below a minimum — often one yard, sometimes three. Round your buffered figure up to the next increment your supplier actually offers, then confirm the short-load threshold before you book.",
          "Our 1.36 yards becomes a 1.5 yard order. Knowing that before you call is the difference between a confident booking and an expensive guess.",
        ],
      },
    ],
  },
  {
    slug: "weighted-vs-unweighted-gpa-what-admissions-reads",
    title: "Weighted vs unweighted GPA: what admissions actually reads",
    dek: "A 4.6 at one school and a 3.9 at another can describe the same student. Here is how the two scales differ and which one an admissions office recomputes.",
    category: "Academics",
    readTime: "7 min read",
    date: "5 August 2026",
    iso: "2026-08-05",
    tool: "gpa",
    toolSlug: "gpa-calculator",
    stat: "+1.0",
    statLabel: "AP and IB weighting bonus",
    keyword: "how to calculate weighted gpa",
    sections: [
      {
        h2: "Both scales run the same formula",
        paragraphs: [
          "Weighted and unweighted GPA are not different formulas. Both multiply each course's grade point value by its credit hours, sum those quality points, and divide by total credits. The credit weighting is why a 4-credit A moves your average further than a 1-credit A.",
          "The only difference is what grade point value a course is assigned before that arithmetic runs.",
        ],
      },
      {
        h2: "Unweighted is a flat 4.0",
        paragraphs: [
          "On the unweighted scale every course tops out at 4.0 regardless of difficulty. An A in AP Physics and an A in a study-hall elective are both worth exactly 4.0. The scale measures grades, not the difficulty of earning them.",
          "That flatness is the point: it is comparable across schools that offer wildly different course catalogues.",
        ],
      },
      {
        h2: "Weighted adds a difficulty bonus",
        paragraphs: [
          "The common convention adds +0.5 for honors courses and +1.0 for AP or IB, then caps the result at 5.0. An A in an AP course scores 4.0 + 1.0 = 5.0, and nothing scores higher.",
          "This is where comparability breaks down. Some districts weight only AP. Some use a 4.5 ceiling, others a 6.0. Some weight honors at +1.0. A weighted GPA is only interpretable alongside the school profile that explains the scale.",
        ],
      },
      {
        h2: "What admissions offices actually do",
        paragraphs: [
          "Many selective institutions recalculate. They strip your school's weighting, apply their own scale to your academic core courses, and often drop non-academic classes entirely. The number on your transcript is an input, not the figure they compare.",
          "What survives that recalculation is the transcript itself: which courses you took, and how you did in them. The school profile submitted alongside your application tells them whether your 4.6 came from a 5.0 scale or a 6.0 one.",
        ],
      },
      {
        h2: "Rolling a prior GPA into a new term",
        paragraphs: [
          "To project a cumulative GPA you cannot average two GPAs together — that discards the credit weighting. Recover your existing quality points by multiplying your prior GPA by the credits it covers, add this term's points and credits, then divide by the combined credits.",
          "A 3.0 across 10 credits carries 30 quality points. Add a semester of straight A's across 10 more credits — 40 points — and you have 70 points over 20 credits, which is a 3.5 cumulative. That is exactly what a registrar computes.",
        ],
      },
      {
        h2: "An F is heavier than it looks",
        paragraphs: [
          "A failed course contributes zero quality points but its credit hours stay in the denominator. That asymmetry is why one F pulls an average down much further than one A pulls it up.",
          "Retake policies that replace rather than average the grade vary by institution, so check your handbook before assuming a repeat erases it.",
        ],
      },
    ],
  },
  {
    slug: "chronological-age-years-months-days",
    title: "Chronological age: why assessments need years, months and days",
    dek: "Standardised assessments score by age band, and a band boundary can fall between two days. Averaged year lengths are not accurate enough.",
    category: "Measurement",
    readTime: "5 min read",
    date: "29 July 2026",
    iso: "2026-07-29",
    tool: "age",
    toolSlug: "age-calculator",
    stat: "365.25",
    statLabel: "the approximation to avoid",
    keyword: "chronological age calculator",
    sections: [
      {
        h2: "The shortcut that quietly fails",
        paragraphs: [
          "Divide elapsed days by 365.25 and you get a decimal age. It looks precise and it is close, but it is not exact, because no real year is 365.25 days long. The Gregorian calendar approximates the tropical year with an irregular leap rule, and months run 28 to 31 days.",
          "For casual use the drift is invisible. For an assessment that scores by age band, a day of drift can move a child into the wrong norm table.",
        ],
      },
      {
        h2: "Calendar borrowing is the actual method",
        paragraphs: [
          "The correct approach subtracts calendar components and borrows between them, the way you borrow between columns in long subtraction. Take the whole months first: count the difference in years and months, and give one month back if the target date has not yet reached the birth day-of-month.",
          "The leftover days are then the real calendar days from that month anniversary to the target date. Because the anniversary is an actual date rather than an arithmetic remainder, the count is always correct and never negative.",
        ],
      },
      {
        h2: "Where a naive borrow breaks",
        paragraphs: [
          "The tempting version — subtract day from day, and if the result is negative add the length of the previous month — fails at month ends. From 31 January to 1 March, the day difference is 1 − 31 = −30. Borrowing February's 28 days leaves −2, still negative.",
          "Anchoring on the month anniversary avoids this entirely. One month after 31 January is 28 February, and 1 March is one day later: one month, one day.",
        ],
      },
      {
        h2: "February 29 needs a stated convention",
        paragraphs: [
          "A leap-day birth date has no anniversary in three years out of four, so any calculator must pick a rule and apply it consistently. Clamping back to 28 February is the same rule that handles 31 January in a 30-day month, which keeps the whole system coherent.",
          "What matters more than the choice is that the same rule governs both the age computation and the days-to-next-birthday count. A tool that clamps in one place and rolls forward in the other will contradict itself.",
        ],
      },
      {
        h2: "Adjusted age is a separate step",
        paragraphs: [
          "Protocols for premature infants often ask for an adjusted age: chronological age minus the weeks of prematurity. That adjustment is a clinical judgement about which correction applies and for how long, not a calendar operation.",
          "Compute the exact chronological age first, then apply your protocol's adjustment to it. Conflating the two hides which number came from the calendar and which came from the correction.",
        ],
      },
    ],
  },
  {
    slug: "binomial-expansion-shortcuts-find-the-term-you-need",
    title: "Binomial expansion shortcuts: find the term you need and skip the rest",
    dek: "Most exam questions ask for one coefficient, not the whole polynomial. The general term formula gets you there in a single line.",
    category: "Mathematics",
    readTime: "6 min read",
    date: "22 July 2026",
    iso: "2026-07-22",
    tool: "binomial",
    toolSlug: "binomial-expansion-calculator",
    stat: "n + 1",
    statLabel: "terms in every expansion",
    keyword: "nth term of binomial expansion",
    sections: [
      {
        h2: "The theorem in one line",
        paragraphs: [
          "The binomial theorem states that (ax + by)ⁿ expands to the sum, over k from 0 to n, of C(n,k) · aⁿ⁻ᵏ · bᵏ · xⁿ⁻ᵏ · yᵏ. Every expansion has exactly n + 1 terms, and in each one the exponents on x and y sum to n.",
          "That last property is the fastest sanity check you have. If a term's exponents do not add to n, something went wrong.",
        ],
      },
      {
        h2: "Do not expand what you were not asked for",
        paragraphs: [
          "A question asking for the coefficient of x⁵ in (2x + 3)⁸ does not require the other eight terms. Set the exponent on x to 5, which fixes n − k = 5 and therefore k = 3.",
          "Then the term is C(8,3) · 2⁵ · 3³ · x⁵ = 56 · 32 · 27 · x⁵ = 48,384x⁵. One line, no polynomial.",
        ],
      },
      {
        h2: "Term number and k differ by one",
        paragraphs: [
          "This is the most common slip in the whole topic. Term numbering is 1-based and k is 0-based, so the general term is written T(k+1). The 6th term has k = 5, not k = 6.",
          "When a question says 'the fourth term', translate it to k = 3 before you touch the formula.",
        ],
      },
      {
        h2: "Build coefficients iteratively, never from factorials",
        paragraphs: [
          "C(n,k) = n! ÷ (k!(n−k)!) is the definition, not the method. Computing 20! directly overflows exact integer representation in most environments and returns a number that is quietly slightly wrong.",
          "Use the recurrence instead: C(n,0) = 1, and C(n,k) = C(n,k−1) × (n − k + 1) ÷ k. Every step divides exactly, so the running value never leaves the integers. This is also how each row of Pascal's triangle is generated.",
        ],
      },
      {
        h2: "Negative b makes the signs alternate",
        paragraphs: [
          "For (ax − by)ⁿ, the b in the theorem is negative, and bᵏ alternates sign as k increments. Terms with odd k come out negative.",
          "You do not need a separate rule for this case. Enter b as a negative number and read the sign off each computed coefficient — which is exactly what the calculator does rather than pattern-matching on a minus symbol.",
        ],
      },
      {
        h2: "Pascal's triangle is the same recurrence, drawn",
        paragraphs: [
          "Row n of Pascal's triangle is the sequence of C(n,k) for k = 0 to n, and each entry is the sum of the two above it. That addition rule and the multiplicative recurrence describe the same numbers.",
          "For small n, reading the row off the triangle is faster than any formula. For n beyond about 10 the rows get too wide to be useful and the general term formula wins.",
        ],
      },
    ],
  },
  {
    slug: "scientific-vs-graphing-calculator",
    title: "Scientific vs graphing calculator: which one do you actually need?",
    dek: "One evaluates expressions, the other draws them. The right answer usually comes down to what your exam board permits.",
    category: "Tools",
    readTime: "5 min read",
    date: "15 July 2026",
    iso: "2026-07-15",
    tool: "scientific",
    toolSlug: "scientific-calculator",
    stat: "12",
    statLabel: "significant digits returned",
    keyword: "scientific calculator vs graphing calculator",
    sections: [
      {
        h2: "The functional difference",
        paragraphs: [
          "A scientific calculator evaluates an expression and returns a number. It handles arithmetic, trigonometry, logarithms, powers, roots and usually a statistics mode. A graphing calculator does all of that and adds a screen that plots functions, solves systems visually, and runs stored programs.",
          "For arithmetic, trig, logs and most statistics coursework, the scientific model does the entire job.",
        ],
      },
      {
        h2: "Exam rules decide more often than features",
        paragraphs: [
          "Many exam boards permit scientific calculators and bar graphing models outright, because a graphing calculator's memory can store notes and its solver can shortcut the reasoning being assessed.",
          "Check the specification for your specific paper rather than the subject in general — the permitted list often varies between components of the same qualification.",
        ],
      },
      {
        h2: "Precedence is the thing to get right",
        paragraphs: [
          "The single most consequential behaviour in any calculator is operator precedence. Parentheses first, then functions, then exponentiation, then multiplication and division, then addition and subtraction. 2 + 3 × 4 is 14, never 20.",
          "A calculator that parses properly enforces this. One that evaluates left to right as you type — as some basic models do — will disagree with your working, and the calculator will be wrong.",
        ],
      },
      {
        h2: "Degrees and radians catch everyone",
        paragraphs: [
          "The angle mode applies to sin, cos and tan only. It has no effect on logs, roots, powers or arithmetic. If a trig answer is wildly off, the mode is the first thing to check: sin(30) is 0.5 in degrees and about −0.988 in radians.",
          "Keep the current mode visible rather than buried in a settings menu — a mode you cannot see is a mode you will forget.",
        ],
      },
      {
        h2: "What a browser calculator adds",
        paragraphs: [
          "An online calculator has one structural advantage over the handheld: screen space. It can show the expression and the running result at the same time, keep a scrollable history of previous calculations, and let you click an earlier result to reuse it.",
          "The trade-off is that it is not permitted in an exam hall. Use it for homework, checking working and quick calculations at a desk; own a physical model for anything invigilated.",
        ],
      },
    ],
  },
];

export const POST_BY_SLUG = Object.fromEntries(
  POSTS.map((post) => [post.slug, post])
) as Record<string, Post>;

export function relatedPosts(slug: string, count = 3): Post[] {
  const index = POSTS.findIndex((p) => p.slug === slug);
  const rest = POSTS.filter((p) => p.slug !== slug);
  // Rotate so each post surfaces a different set rather than always the first three.
  const start = index < 0 ? 0 : index % rest.length;
  return [...rest.slice(start), ...rest.slice(0, start)].slice(0, count);
}
