import type { ComponentProps, ReactNode } from "react"
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react"
import { LazyMotion, MotionConfig, m } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { QuotaIllustration } from "@/components/QuotaIllustration"
import { BOOK, BOOK_EMBED, LINKEDIN, getPage, studies, studyUrl, type Study } from "@/content"

const loadMotionFeatures = () => import("./motion-features").then((module) => module.default)

function ExternalLink({ children, ...props }: ComponentProps<"a">) {
  return <a {...props} target="_blank" rel="noopener">{children}<span className="sr-only"> (opens in new tab)</span></a>
}

function CallButton({ short = false, light = false }: { short?: boolean; light?: boolean }) {
  return (
    <Button asChild size="lg" className={`call-button${light ? " call-button-light" : ""}`}>
      <m.a href={BOOK} target="_blank" rel="noopener" whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
        {short ? "Book a call" : "Book a 15-minute call"}
        <ArrowUpRight aria-hidden="true" />
        <span className="sr-only"> (opens in new tab)</span>
      </m.a>
    </Button>
  )
}

function LinkedInLink() {
  return <ExternalLink href={LINKEDIN} className="text-link">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></ExternalLink>
}

function Header({ home }: { home: boolean }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="wordmark" href="/" aria-label="Jason Sant, home">Jason Sant<span className="wordmark-rule" aria-hidden="true" /></a>
        <nav aria-label="Main navigation">
          <a className="nav-work" href={home ? "#work" : "/#work"}>Work</a>
          <CallButton short />
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="mono">© 2026 Jason Sant</p>
        <nav aria-label="Footer navigation">
          <LinkedInLink />
          <ExternalLink className="text-link" href={BOOK}>Book a call<ArrowUpRight size={15} aria-hidden="true" /></ExternalLink>
        </nav>
      </div>
    </footer>
  )
}

function DossierIndex() {
  return (
    <aside className="dossier" aria-labelledby="dossier-heading">
      <div className="dossier-top hero-rule" aria-hidden="true" />
      <h2 id="dossier-heading">Selected work</h2>
      <ol>
        {studies.map((study) => (
          <li key={study.slug}>
            <a href={studyUrl(study)}>
              <span className="index-number mono">{study.number}</span>
              <span className="index-copy"><span className="index-title">{study.title}</span><span className="index-role mono">{study.role}</span></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
      <a href="#work" className="index-explore mono">Explore the work<ArrowDown size={14} aria-hidden="true" /></a>
    </aside>
  )
}

function ProofStrip() {
  return (
    <div className="proof-strip" aria-label="Experience and credentials">
      {[
        ["15 years", "Contract delivery"],
        ["PMP · CSM · CBAP · SAFe", "Certified"],
        ["Public sector", "City and municipal agencies"],
        ["Section 508", "Accessibility-aware delivery"],
      ].map(([label, value], index) => (
        <div className="proof-item" key={label}>
          <span className={`proof-value${index === 1 ? " proof-credentials mono" : ""}`}>{label}</span>
          <span className="proof-label mono">{value}</span>
        </div>
      ))}
    </div>
  )
}

function Home() {
  return (
    <main id="main-content">
      <section className="hero container" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="hero-role mono">Senior Business Analyst · Solution Owner</p>
          <p className="hero-credentials mono">PMP | CSM | CBAP | SAFe</p>
          <h1 id="hero-heading">
            <span className="headline-line">I turn ambiguous</span>{" "}
            <span className="headline-line">mandates into work</span>{" "}
            <span className="headline-line">a team can <em>build</em>.</span>
          </h1>
          <p className="hero-lede">Fifteen years of contract delivery across public-sector and enterprise programs. I own the requirements, the process models and the backlog, and I keep the decisions between policy, operations and engineering moving.</p>
          <div className="hero-actions"><CallButton /><LinkedInLink /></div>
          <p className="availability mono"><span className="availability-dot" aria-hidden="true" />Available for contract · $120–$150/hr · C2C or W-2</p>
        </div>
        <DossierIndex />
      </section>

      <div className="container"><ProofStrip /></div>

      <section id="work" className="work-section container" aria-labelledby="work-heading">
        <div className="section-intro">
          <div><p className="section-label mono">Work</p><h2 id="work-heading">Selected work</h2></div>
          <p>Client names are withheld. Each write-up covers the problem, my role and how the work was run. I'm glad to go deeper on a call.</p>
        </div>
        <div className="work-list">
          {studies.map((study) => (
            <m.a key={study.slug} className="work-row" href={studyUrl(study)} whileHover={{ y: -3 }} whileTap={{ y: 1 }}>
              <span className="work-number mono">{study.number}</span>
              <div className="work-copy">
                <p className="work-meta mono">{study.teaserMeta}</p>
                <h3>{study.title}</h3>
                <p className="work-description">{study.teaser}</p>
              </div>
              <span className="work-arrow"><ArrowUpRight aria-hidden="true" strokeWidth={1.25} /></span>
              <span className="work-hover-rule" aria-hidden="true" />
            </m.a>
          ))}
        </div>
        <p className="also-line">Also: Senior BA and SAFe RTE on a city digital services platform · Senior Technical PM and SAFe RTE on healthcare cloud solutions · data analysis at a global software company · fintech payments.</p>
      </section>

      <section className="about-section container" aria-labelledby="about-heading">
        <Separator />
        <div className="about-grid">
          <div className="about-heading"><p className="section-label mono">About</p><h2 id="about-heading">How I work</h2></div>
          <div className="about-copy prose">
            <p>I work where policy, operations and engineering meet. Most programs I join already have a mandate and a deadline; what they're missing is shared, testable agreement on what the system has to do.</p>
            <p>So I start with the people doing the work today: current-state process maps, the exception paths nobody wrote down, and the rules hidden in spreadsheets. From there I write requirements and acceptance criteria a developer can build and a tester can prove, keep them traceable, and run the backlog so decisions land in the sprint rather than in a meeting.</p>
            <p>I also build my own AI tooling, so I write requirements with a working sense of what engineers are up against.</p>
            <div className="toolkit">
              <h3 className="mono">Toolkit</h3>
              <p className="mono">Requirements &amp; traceability · BPMN process modeling · Backlog ownership · Acceptance criteria · SAFe / Release Train · Stakeholder workshops · UAT planning</p>
            </div>
          </div>
          <div className="portrait-frame">
            <img src="/assets/jason-sant-portrait.webp" srcSet="/assets/jason-sant-portrait-360.webp 360w, /assets/jason-sant-portrait.webp 720w" sizes="(max-width: 600px) 220px, 280px" width="720" height="720" loading="lazy" alt="Jason Sant" />
          </div>
        </div>
      </section>

      <section className="engagement" aria-labelledby="engagement-heading">
        <div className="container engagement-grid">
          <div><p className="section-label mono">Engagement</p><h2 id="engagement-heading">Working<br className="desktop-break" /> together</h2></div>
          <div>
            <dl className="terms">
              {[
                ["Rate", "$120–$150/hr, depending on scope"],
                ["Structure", "C2C or W-2 through Corporate Consulting LLC"],
                ["Eligibility", "US citizen. No sponsorship needed."],
                ["Roles", "Senior Business Analyst, Solution Owner, Lead BA"],
              ].map(([label, value]) => <div key={label}><dt className="mono">{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <CallButton light />
          </div>
        </div>
      </section>
    </main>
  )
}

function CaseSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="case-section"><h2>{title}</h2><div className="case-section-copy prose">{children}</div></section>
}

function CaseStudy({ study }: { study: Study }) {
  const next = studies[(studies.indexOf(study) + 1) % studies.length]
  return (
    <main id="main-content" className="case-page container">
      <a className="back-link text-link" href="/#work">← All work</a>
      <article>
        <header className="case-hero">
          <div className="case-dossier">
            <p className="case-number mono">{study.number}<span className="case-number-rule" aria-hidden="true" /></p>
            <dl>
              <div><dt>Sector</dt><dd>{study.sector}</dd></div>
              <div><dt>Role</dt><dd>{study.role}</dd></div>
              <div><dt>Status</dt><dd><Badge className="status-badge" variant="outline">{study.status}</Badge></dd></div>
              <div className="case-note"><dt>Note</dt><dd>{study.note}</dd></div>
            </dl>
          </div>
          <div className="case-heading"><h1>{study.title}</h1><p className="standfirst">{study.standfirst}</p></div>
        </header>
        <CaseSection title="The problem"><p>{study.problem}</p></CaseSection>
        <CaseSection title="My role and approach"><ul className="approach-list">{study.approach.map((item) => <li key={item}>{item}</li>)}</ul></CaseSection>
        <CaseSection title="Evidence">{study.evidence ? <p>{study.evidence}</p> : <QuotaIllustration />}</CaseSection>
        <CaseSection title="Outcome"><p>{study.outcome}</p></CaseSection>
      </article>
      <section className="case-cta" aria-labelledby="case-cta-heading">
        <h2 id="case-cta-heading">Want this on your program?</h2>
        <div className="case-cta-actions"><CallButton /><LinkedInLink /></div>
      </section>
      <m.a className="next-case" href={studyUrl(next)} whileHover={{ x: 3 }} whileTap={{ x: 0 }}><span>Next: {next.title}</span><ArrowRight aria-hidden="true" /></m.a>
    </main>
  )
}

function Booking() {
  return (
    <main id="main-content" className="booking container">
      <p className="mono booking-kicker">15-minute intro call · Google Meet</p>
      <h1>Book a call</h1>
      <p className="booking-lede">Pick a time that suits you. Each booking adds a Google Meet link to the invite, so you can join straight from your calendar.</p>
      <div className="hero-actions"><CallButton /><LinkedInLink /></div>
      <div className="booking-frame">
        <iframe src={BOOK_EMBED} title="Booking calendar for a 15-minute call with Jason Sant" loading="lazy" />
      </div>
      <p className="booking-note">Calendar not loading? <a className="text-link" href={BOOK} target="_blank" rel="noopener">Open the booking page<span className="sr-only"> (opens in new tab)</span></a></p>
    </main>
  )
}

function NotFound() {
  return <main id="main-content" className="not-found container"><p className="mono">404</p><h1>Page not found</h1><p>That page doesn't exist. Try the home page.</p><div className="hero-actions"><a className="text-link" href="/">Home<ArrowRight size={16} aria-hidden="true" /></a><CallButton short /></div></main>
}

export default function App({ url }: { url: string }) {
  const page = getPage(url)
  const home = page.path === "/"
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header home={home} />
        {home ? <Home /> : page.study ? <CaseStudy study={page.study} /> : page.booking ? <Booking /> : <NotFound />}
        <Footer />
      </LazyMotion>
    </MotionConfig>
  )
}
