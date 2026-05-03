import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  Accessibility,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  FileText,
  HeartPulse,
  Hotel,
  MessageCircle,
  Plane,
  ShieldCheck,
  Utensils,
  Users,
} from 'lucide-react'
import './styles.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // The app still works if registration fails in local development.
    })
  })
}

const destinations = [
  {
    name: 'Orlando',
    tag: 'Family logistics',
    note: 'Theme parks, strollers, heat, accessibility lines, picky eaters, and senior-friendly pacing.',
  },
  {
    name: 'New York City',
    tag: 'Urban coordination',
    note: 'Transit, walking load, elevators, food variety, crowds, and emergency meeting points.',
  },
  {
    name: 'Yellowstone',
    tag: 'Remote safety',
    note: 'Weather shifts, long drives, limited urgent care, offline maps, and layered packing.',
  },
  {
    name: 'Cancun',
    tag: 'International readiness',
    note: 'Passport validity, consulate guidance, travel insurance, customs, safety, and official sources.',
  },
]

const summaryCards = [
  {
    icon: AlertTriangle,
    title: 'Emergency',
    body: 'Offline emergency card with local numbers, urgent care guidance, embassy info for international trips, and separation plans.',
  },
  {
    icon: HeartPulse,
    title: 'Medical Contacts',
    body: 'Private medical team and pharmacy phone numbers. No prescription images, passport numbers, or sensitive uploads in MVP.',
  },
  {
    icon: Accessibility,
    title: 'Accessibility',
    body: 'Profiles capture wheelchair, stroller, limited walking, sensory, vision, hearing, dietary, and custom needs.',
  },
  {
    icon: Utensils,
    title: 'Food',
    body: 'Destination guidance uses age groups, allergies, dietary restrictions, picky eater notes, and accessibility needs.',
  },
]

const workflow = [
  'Sign in with Google or Apple',
  'Create trip with fixed or flexible dates',
  'Add adults, family units, minors, and responsible adults',
  'Generate checklist, emergency plan, daily summaries, and summary cards',
  'Ask private AI questions and approve any non-sensitive shared notes',
]

function App() {
  return (
    <main>
      <section className="hero">
        <nav aria-label="Primary navigation">
          <div className="brand">
            <span className="brandMark">L</span>
            <span>Ternwise</span>
          </div>
          <div className="navActions">
            <button type="button" aria-label="View trip assistant">
              <MessageCircle size={19} />
            </button>
            <button type="button" aria-label="View trip checklist">
              <CheckCircle2 size={19} />
            </button>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">SPA and installable PWA MVP</p>
            <h1>Travel planning for the details people remember too late.</h1>
            <p>
              Create a shared trip, collect privacy-aware traveler profiles, and generate
              emergency, accessibility, document, food, packing, and daily summary guidance.
            </p>
            <div className="heroButtons">
              <button type="button" className="primary">
                <Plane size={18} />
                Start trip
              </button>
              <button type="button" className="secondary">
                <ShieldCheck size={18} />
                View MVP scope
              </button>
            </div>
          </div>

          <div className="phoneShell" aria-label="Trip summary preview">
            <div className="phoneHeader">
              <span>Yellowstone Family Trip</span>
              <span className="status">Offline ready</span>
            </div>
            <div className="quickCards">
              <article>
                <AlertTriangle size={20} />
                <div>
                  <strong>Emergency</strong>
                  <p>Save urgent care, park safety, and separation steps.</p>
                </div>
              </article>
              <article>
                <Users size={20} />
                <div>
                  <strong>Travelers</strong>
                  <p>2 adults, 1 senior, 2 children, stroller need noted.</p>
                </div>
              </article>
              <article>
                <CalendarDays size={20} />
                <div>
                  <strong>Flexible dates</strong>
                  <p>5 days in July, price-search ready for later.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="sectionTitle">
          <p className="eyebrow">First release destinations</p>
          <h2>Four places that stress-test the app.</h2>
        </div>
        <div className="destinationGrid">
          {destinations.map((destination) => (
            <article key={destination.name} className="destinationCard">
              <span>{destination.tag}</span>
              <h3>{destination.name}</h3>
              <p>{destination.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split">
        <div>
          <p className="eyebrow">Trip flow</p>
          <h2>Simple enough for friends and family testing.</h2>
          <ol className="workflow">
            {workflow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="featureList">
          {summaryCards.map((card) => {
            const Icon = card.icon
            return (
              <article key={card.title}>
                <Icon size={22} />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="panel">
        <div className="sectionTitle">
          <p className="eyebrow">Architecture direction</p>
          <h2>Free-first, store-ready, privacy-aware.</h2>
        </div>
        <div className="stackGrid">
          <article>
            <FileText size={22} />
            <h3>Frontend</h3>
            <p>React/Vite SPA with PWA manifest, offline emergency plan, and future Capacitor wrapper.</p>
          </article>
          <article>
            <ShieldCheck size={22} />
            <h3>Backend</h3>
            <p>Supabase Auth and Postgres with row-level security for private traveler data.</p>
          </article>
          <article>
            <Hotel size={22} />
            <h3>Future search</h3>
            <p>Structured trip data leaves room for AI-assisted hotel, flight, restaurant, and price guidance.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
