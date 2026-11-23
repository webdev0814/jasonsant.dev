export const BOOK = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ItADPX-rRox7lVw4h6wjPpYoRnvnXZCncUyGGiRoB7tBGgMw9p4YdAahGxXHfLe66JsuixLDX"
export const BOOK_EMBED = `${BOOK}?gv=true`
export const LINKEDIN = "https://www.linkedin.com/in/jasonsantpmp"
export const ORIGIN = "https://jasonsant.dev"

export const homeMetadata = {
  title: "Jason Sant — Senior Business Analyst & Solution Owner",
  description: "Senior Business Analyst and Solution Owner for public-sector and enterprise programs. PMP, CSM, CBAP, SAFe. Available for contract work.",
}

export const studies = [
  {
    number: "01",
    slug: "public-broadcaster-kpi-pilot",
    title: "Public broadcaster: KPI analytics pilot",
    pageTitle: "Public broadcaster KPI analytics pilot — Jason Sant",
    sector: "Public media",
    role: "Solution Owner",
    status: "Completed",
    note: "Delivered through a technology consulting partner. Client name withheld.",
    teaserMeta: "Media · Solution Owner",
    teaser: "Getting a pilot from loosely agreed measures to definitions, data and a backlog the team could deliver.",
    standfirst: "A pilot to prove that agreed performance measures could be defined, sourced and reported before any wider rollout.",
    problem: "A pilot lives or dies on whether everyone means the same thing by each measure. The organization needed KPI definitions that business owners agreed on, data that could actually support them, and a scope small enough to prove in a pilot.",
    approach: [
      "Owned the pilot backlog and priorities as Solution Owner, between business stakeholders and the delivery team.",
      "Ran working sessions to pin down each KPI: definition, owner, source, refresh and the edge cases.",
      "Wrote user stories and acceptance criteria the engineers and testers could work from directly.",
      "Kept scope honest: what the pilot would prove, and what it would deliberately leave for later.",
    ],
    evidence: "The KPI definitions, backlog and reports belong to the client and aren't shown here. On a call I can walk through how the definitions were structured and how acceptance was run.",
    outcome: "I don't publish client results. What I can say: the work followed the path above, from agreed definitions to a deliverable backlog, and I'm happy to discuss it in more depth.",
  },
  {
    number: "02",
    slug: "municipal-systems-modernization",
    title: "Municipal agency: systems modernization",
    pageTitle: "Municipal agency systems modernization — Jason Sant",
    sector: "Public sector",
    role: "Lead Business Analyst",
    status: "Ongoing",
    note: "Delivered through a consulting partner. Agency name withheld.",
    teaserMeta: "Public sector · Lead Business Analyst · Ongoing",
    teaser: "Requirements and process models for a multi-year modernization of agency systems.",
    standfirst: "Lead business analysis for a multi-year program to modernize a city agency's enterprise systems.",
    problem: "Public agencies run on rules set by law and policy, plus years of workarounds. Modernizing the systems means capturing both, so the new platform handles the real cases and not only the documented ones.",
    approach: [
      "Lead Business Analyst on the program team.",
      "Current- and future-state process models in BPMN, including exception paths.",
      "Requirements and user stories with acceptance criteria, kept traceable back to the source rules.",
      "Workshops with agency program staff and technical teams to settle open questions and record the decisions.",
      "Section 508 accessibility kept in the requirements from the start rather than tested in at the end.",
    ],
    evidence: "Program artifacts are confidential to the agency and aren't shown here. I can describe the methods and artifact types on a call.",
    outcome: "The work is ongoing, so there are no results to report yet, and I won't publish agency details.",
  },
  {
    number: "03",
    slug: "ai-quota-hud",
    title: "AI quota HUD",
    pageTitle: "AI quota HUD — Jason Sant",
    sector: "Personal build",
    role: "Designer and builder",
    status: "In daily use",
    note: "Private tool. Visuals below are illustrative; real values and hosts are removed.",
    teaserMeta: "Personal build · Designer and builder",
    teaser: "An always-on dashboard I designed and built to see AI tool limits before starting long jobs.",
    standfirst: "An always-on dashboard I designed and built to see how much AI tool capacity is left before starting long jobs.",
    problem: "I run several AI coding and research tools across more than one account, each with its own limits and reset times. Finding out you're out of capacity halfway through a long job is expensive. I wanted one place that showed the state of every tool at a glance.",
    approach: [
      "Designed it graphics-first: gauges and cards you can read from across the room, not tables.",
      "Honest states: when a value can't be read, the card says so instead of guessing a number.",
      "Built it like a product: versioned releases, and a one-command rollback to the last good version.",
      "Kept it private: it runs on a private network with no public exposure.",
    ],
    evidence: null,
    outcome: "It's in daily use for my own work, which is the point: I check it before starting anything long. It's also where I practice what I ask of teams as a BA: clear states, no invented numbers.",
  },
] as const

export type Study = (typeof studies)[number]
export const studyUrl = (study: Study) => `/work/${study.slug}/`

export function normalizePath(url: string) {
  const pathname = new URL(url, ORIGIN).pathname
  return `${pathname.replace(/\/+$/, "")}/`
}

export function getPage(url: string) {
  const path = normalizePath(url)
  const study = studies.find((item) => studyUrl(item) === path)
  if (path === "/") return { path, study: undefined, booking: false, ...homeMetadata, type: "website" }
  if (path === "/calendar/") return { path, study: undefined, booking: true, title: "Book a call | Jason Sant", description: "Book a 15-minute intro call with Jason Sant. Every booking includes a Google Meet link.", type: "website" }
  if (study) return { path, study, booking: false, title: study.pageTitle, description: study.standfirst, type: "article" }
  return { path, study: undefined, booking: false, title: "Page not found — Jason Sant", description: "That page doesn't exist. Try the home page.", type: "website" }
}
