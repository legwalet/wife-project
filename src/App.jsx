import { useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  academic,
  announcements,
  events,
  gallery,
  interviews as seedInterviews,
  laundrySchedule,
  notices,
  platforms,
  seedRequests,
} from "./data";
import { addItem, loadStore } from "./storage";

function Icon({ name }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" };
  const paths = {
    home: <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
    bell: (
      <>
        <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9" />
        <path d="M10 21a2 2 0 0 0 4 0" />
      </>
    ),
    megaphone: <path d="M3 11v2a4 4 0 0 0 4 4h1l3 3V6L8 9H7a4 4 0 0 0-4 2zM17 8c1.5 1.2 2.5 3 2.5 5s-1 3.8-2.5 5" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
    star: <path d="M12 3l2.6 5.4L20 9.2l-4 3.9.9 5.9L12 16.5 7.1 19l.9-5.9-4-3.9 5.4-.8z" />,
    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </>
    ),
    camera: (
      <>
        <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
    wrench: <path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 0 0 5.6-5.6L15 12z" />,
    list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
    shirt: <path d="M4 7l4-3h8l4 3v4h-3v9H7V11H4z" />,
    book: <path d="M4 19a2 2 0 0 1 2-2h14v4H6a2 2 0 0 1-2-2zM4 5h14v12H6a2 2 0 0 0-2 2z" />,
    share: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.6 13.5 15.4 17.5M15.4 6.5 8.6 10.5" />
      </>
    ),
    heart: <path d="M12 21s-7-4.4-9.5-8.8C.6 8.8 3.2 5 7 5c2.1 0 3.5 1.2 5 3 1.5-1.8 2.9-3 5-3 3.8 0 6.4 3.8 4.5 7.2C19 16.6 12 21 12 21z" />,
    back: <path d="M15 6 9 12l6 6" />,
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c.6-3.5 3-5 6-5s5.4 1.5 6 5" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M16 20c.4-2.4 1.8-3.6 4-3.8" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </>
    ),
    chart: <path d="M4 20h16M7 16V9M12 16V5M17 16v-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return (
    <svg className="icon" {...common} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Shell({ children }) {
  const { pathname } = useLocation();
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <div className="stage">
      <div className="poster-glow" />
      <div className="phone">
        <div className="status-bar">
          <span>{time}</span>
          <span className="notch" />
          <span>5G ▮▮▮▮</span>
        </div>
        {children}
        <nav className="tabbar">
          <Tab to="/" icon="home" label="Home" active={pathname === "/"} />
          <Tab to="/notices" icon="bell" label="Notices" active={pathname.startsWith("/notices")} />
          <Tab to="/events" icon="calendar" label="Events" active={pathname.startsWith("/events")} />
          <Tab to="/requests" icon="list" label="Requests" active={pathname.startsWith("/requests")} />
          <Tab to="/feedback" icon="heart" label="Voice" active={pathname.startsWith("/feedback")} />
        </nav>
      </div>
    </div>
  );
}

function Tab({ to, icon, label, active }) {
  return (
    <Link className={`tab ${active ? "active" : ""}`} to={to}>
      <Icon name={icon} />
      <span>{label}</span>
    </Link>
  );
}

function ScreenHeader({ title, subtitle }) {
  const navigate = useNavigate();
  return (
    <header className="screen-head">
      <button className="back" onClick={() => navigate(-1)} aria-label="Back">
        <Icon name="back" />
      </button>
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </header>
  );
}

function BrandHeader() {
  return (
    <header className="brand">
      <div className="brand-row">
        <span className="houses">⌂⌂</span>
        <div>
          <div className="logo-line">
            <strong>SMH</strong> <em>CONNECT</em>
          </div>
          <small>SINDISO MAGAQA HEIGHTS</small>
        </div>
        <span className="houses">⌂</span>
      </div>
      <p className="tagline">Our Home. Our People. Our Platform.</p>
    </header>
  );
}

function Home() {
  return (
    <div className="screen home">
      <BrandHeader />
      <section className="welcome-row">
        <article className="welcome">
          <div className="welcome-icon">⌂</div>
          <div>
            <h2>Welcome, SMH Family!</h2>
            <p>A stronger residence. A brighter tomorrow.</p>
          </div>
        </article>
        <div className="pillars">
          <span>
            <Icon name="people" /> People
          </span>
          <span>
            <Icon name="target" /> Purpose
          </span>
          <span>
            <Icon name="chart" /> Progress
          </span>
        </div>
      </section>
      <div className="tiles">
        <Tile to="/notices" icon="bell" color="red" title="Notice Board" body="View all important notices, updates and reminders." cta="View Notices" />
        <Tile to="/announcements" icon="megaphone" color="green" title="Announcements" body="Latest news from SMH House Committee and NMU." cta="View Announcements" />
        <Tile to="/events" icon="calendar" color="blue" title="Upcoming Events" body="15 Mar Walk & Talk · 20 Mar Sports · 27 Mar Women’s Month." cta="View Calendar" />
        <Tile to="/reviews" icon="star" color="gold" title="Monthly Student Reviews" body="Share your experience through monthly hallway interviews." cta="Give Feedback" />
        <Tile to="/interviews" icon="mic" color="teal" title="Student Interview Capture" body="Real student voices. Real stories. Real change." cta="Watch & Contribute" />
        <Tile to="/gallery" icon="camera" color="green" title="Event Gallery" body="Photos and highlights from residence life." cta="Open Gallery" />
        <Tile to="/maintenance" icon="wrench" color="red" title="Maintenance Concerns" body="Log and track maintenance requests around SMH." cta="Submit a Request" />
        <Tile to="/requests" icon="list" color="blue" title="Pending Requests" body="Track your submitted requests." cta="View My Requests" />
        <Tile to="/laundry" icon="shirt" color="navy" title="Laundry & Access Updates" body="Stay informed on laundry schedules and residence access." cta="View Updates" />
        <Tile to="/academic" icon="book" color="green" title="Academic Resources" body="Study tips, resources and academic support." cta="View Resources" />
        <Tile to="/platforms" icon="share" color="mix" title="Platforms" body="Stay connected with SMH across all platforms." cta="Stay Connected" />
        <Tile to="/feedback" icon="heart" color="gold" title="Community Feedback" body="Share ideas, report challenges, help us improve." cta="Be Part of the Change" />
      </div>
      <p className="voice-banner">“Your Voice Builds A Better SMH”</p>
    </div>
  );
}

function Tile({ to, icon, color, title, body, cta }) {
  return (
    <Link className={`tile ${color}`} to={to}>
      <div className="tile-top">
        <span className="tile-icon">
          <Icon name={icon} />
        </span>
        <h3>{title}</h3>
      </div>
      <p>{body}</p>
      <span className="cta">{cta} →</span>
    </Link>
  );
}

function Notices() {
  return (
    <div className="screen">
      <ScreenHeader title="Notice Board" subtitle="Updates and reminders" />
      <ul className="cards">
        {notices.map((n) => (
          <li key={n.id} className="card">
            <span className={`chip ${n.tag === "Urgent" ? "warn" : ""}`}>{n.tag}</span>
            <h3>{n.title}</h3>
            <p>{n.body}</p>
            <small>{n.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Announcements() {
  return (
    <div className="screen">
      <ScreenHeader title="Announcements" subtitle="House Committee & NMU" />
      <ul className="cards">
        {announcements.map((a) => (
          <li key={a.id} className="card">
            <small className="from">{a.from}</small>
            <h3>{a.title}</h3>
            <p>{a.body}</p>
            <small>{a.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Events() {
  return (
    <div className="screen">
      <ScreenHeader title="Upcoming Events" subtitle="Residence calendar" />
      <ul className="cards">
        {events.map((e) => (
          <li key={e.id} className="card event">
            <div className="date-badge">
              <strong>{e.date.split(" ")[0]}</strong>
              <span>{e.date.split(" ")[1]}</span>
            </div>
            <div>
              <h3>{e.title}</h3>
              <p>
                {e.place} · {e.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Reviews() {
  const [store, setStore] = useState(loadStore);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setStore(
      addItem("reviews", {
        id: crypto.randomUUID(),
        name: name.trim() || "Anonymous SMH student",
        text: text.trim(),
        at: new Date().toISOString(),
      })
    );
    setText("");
    setName("");
  }

  return (
    <div className="screen">
      <ScreenHeader title="Monthly Student Reviews" subtitle="Hallway interviews & feedback" />
      <form className="form" onSubmit={submit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="How is residence life this month?" rows={4} />
        <button type="submit">Give Feedback</button>
      </form>
      <ul className="cards">
        {store.reviews.map((r) => (
          <li key={r.id} className="card">
            <h3>{r.name}</h3>
            <p>{r.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Interviews() {
  const [store, setStore] = useState(loadStore);
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const all = useMemo(() => [...store.interviews, ...seedInterviews], [store.interviews]);

  function submit(e) {
    e.preventDefault();
    if (!quote.trim()) return;
    setStore(
      addItem("interviews", {
        id: crypto.randomUUID(),
        name: name.trim() || "SMH student",
        year: "Resident",
        quote: quote.trim(),
      })
    );
    setQuote("");
    setName("");
  }

  return (
    <div className="screen">
      <ScreenHeader title="Student Voices" subtitle="Watch & contribute" />
      <form className="form" onSubmit={submit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <textarea value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Share a real story from SMH..." rows={3} />
        <button type="submit">Contribute</button>
      </form>
      <ul className="cards">
        {all.map((i) => (
          <li key={i.id} className="card quote">
            <p>“{i.quote}”</p>
            <small>
              {i.name} · {i.year}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Gallery() {
  const [open, setOpen] = useState(null);
  return (
    <div className="screen">
      <ScreenHeader title="Event Gallery" subtitle="Residence life highlights" />
      <div className="gallery">
        {gallery.map((g) => (
          <button key={g.id} className="shot" onClick={() => setOpen(g)}>
            <img src={g.src} alt={g.title} />
            <span>{g.title}</span>
          </button>
        ))}
      </div>
      {open ? (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <img src={open.src} alt={open.title} />
          <p>{open.title}</p>
        </div>
      ) : null}
    </div>
  );
}

function Maintenance() {
  const [store, setStore] = useState(loadStore);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Maintenance");
  const all = [...store.requests, ...seedRequests];

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setStore(
      addItem("requests", {
        id: crypto.randomUUID(),
        type,
        title: title.trim(),
        status: "Reported",
      })
    );
    setTitle("");
  }

  return (
    <div className="screen">
      <ScreenHeader title="Maintenance Concerns" subtitle="Log and track requests" />
      <div className="status-row">
        <span>Reported</span>
        <span>In Progress</span>
        <span>Resolved</span>
      </div>
      <form className="form" onSubmit={submit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Maintenance</option>
          <option>Wi-Fi</option>
          <option>Laundry</option>
          <option>Access</option>
        </select>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Describe the issue" />
        <button type="submit">Submit a Request</button>
      </form>
      <ul className="cards">
        {all.map((r) => (
          <li key={r.id} className="card row">
            <div>
              <small>{r.type}</small>
              <h3>{r.title}</h3>
            </div>
            <span className={`chip ${r.status.replace(/\s/g, "").toLowerCase()}`}>{r.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Requests() {
  const store = loadStore();
  const all = [...store.requests, ...seedRequests];
  return (
    <div className="screen">
      <ScreenHeader title="Pending Requests" subtitle="Wi-Fi · Laundry · Access" />
      <ul className="cards">
        {all.map((r) => (
          <li key={r.id} className="card row">
            <div>
              <small>{r.type}</small>
              <h3>{r.title}</h3>
            </div>
            <span className={`chip ${r.status.replace(/\s/g, "").toLowerCase()}`}>{r.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Laundry() {
  return (
    <div className="screen">
      <ScreenHeader title="Laundry & Access" subtitle="Schedules and notices" />
      <div className="chips">
        <span className="chip">Wi-Fi</span>
        <span className="chip">Laundry</span>
        <span className="chip">Access</span>
      </div>
      <ul className="cards">
        {laundrySchedule.map((d) => (
          <li key={d.day} className="card row">
            <strong className="day">{d.day}</strong>
            <p>{d.slots}</p>
          </li>
        ))}
      </ul>
      <article className="card">
        <h3>Access hours</h3>
        <p>Main gate 24/7 with student card. Visitors until 20:00. After-hours sign-in at reception.</p>
      </article>
    </div>
  );
}

function Academic() {
  return (
    <div className="screen">
      <ScreenHeader title="Academic Resources" subtitle="Study support at SMH" />
      <ul className="cards">
        {academic.map((a) => (
          <li key={a.id} className="card">
            <h3>{a.title}</h3>
            <p>{a.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Platforms() {
  return (
    <div className="screen">
      <ScreenHeader title="Platforms" subtitle="Stay connected with SMH" />
      <ul className="cards">
        {platforms.map((p) => (
          <li key={p.id} className="card row">
            <span className="dot" style={{ background: p.color }} />
            <div>
              <h3>{p.name}</h3>
              <p>{p.handle}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Feedback() {
  const [store, setStore] = useState(loadStore);
  const [idea, setIdea] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!idea.trim()) return;
    setStore(addItem("feedback", { id: crypto.randomUUID(), idea: idea.trim() }));
    setIdea("");
  }

  return (
    <div className="screen">
      <ScreenHeader title="Community Feedback" subtitle="Your voice builds a better SMH" />
      <form className="form" onSubmit={submit}>
        <textarea value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="Share an idea, suggestion, or challenge..." rows={4} />
        <button type="submit">Send to House Committee</button>
      </form>
      <ul className="cards">
        {store.feedback.map((f) => (
          <li key={f.id} className="card">
            <p>{f.idea}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/events" element={<Events />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/laundry" element={<Laundry />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}
