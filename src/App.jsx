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
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.2-4 3.8-6 8-6s6.8 2 8 6" />
      </>
    ),
  };
  return (
    <svg className="icon" {...common} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Shell({ children }) {
  const { pathname } = useLocation();
  return (
    <div className="stage">
      <div className="poster-glow" aria-hidden="true" />
      <div className="app-shell">
        <nav className="tabbar" aria-label="Main">
          <div className="nav-brand">
            <div className="logo-line">
              <strong>SMH</strong> <em>CONNECT</em>
            </div>
            <small>Sindiso Magaqa Heights</small>
          </div>
          <Tab to="/" icon="home" label="Home" active={pathname === "/"} />
          <Tab to="/notices" icon="bell" label="Notices" active={pathname.startsWith("/notices") || pathname.startsWith("/announcements")} />
          <Tab to="/requests" icon="wrench" label="Requests" active={pathname.startsWith("/requests") || pathname.startsWith("/maintenance")} />
          <Tab to="/profile" icon="user" label="Profile" active={pathname.startsWith("/profile")} />
        </nav>
        <main className="app-main">{children}</main>
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

function ScreenHeader({ title, subtitle, back = true }) {
  const navigate = useNavigate();
  return (
    <header className="screen-head">
      {back ? (
        <button className="back" onClick={() => navigate(-1)} aria-label="Back">
          <Icon name="back" />
        </button>
      ) : null}
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </header>
  );
}

function Home() {
  return (
    <div className="screen home">
      <section className="hero">
        <img src="/hero.jpg" alt="SMH residents together" />
        <div className="hero-copy">
          <p className="hero-kicker">SMH CONNECT</p>
          <h1>Welcome, SMH Family</h1>
          <p className="hero-sub">People · Purpose · Progress</p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>This week</h2>
          <Link to="/events">See all</Link>
        </div>
        <div className="carousel" role="list">
          {events.map((event) => (
            <article key={event.id} className="slide" role="listitem">
              <img src={event.image} alt="" />
              <div className="slide-copy">
                <span className="slide-date">{event.date}</span>
                <h3>{event.title}</h3>
                <p>
                  {event.time} · {event.place}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Jump in</h2>
        </div>
        <div className="shortcuts">
          <Shortcut to="/notices" icon="bell" tone="rust" label="Notices" />
          <Shortcut to="/requests" icon="wrench" tone="gold" label="Log issue" />
          <Shortcut to="/gallery" icon="camera" tone="green" label="Gallery" />
          <Shortcut to="/academic" icon="book" tone="leaf" label="Study" />
          <Shortcut to="/interviews" icon="mic" tone="rust" label="Voices" />
          <Shortcut to="/platforms" icon="share" tone="gold" label="Chat" />
        </div>
      </section>

      <section className="pulse">
        <p>Your voice builds a better SMH</p>
        <Link to="/feedback">Share an idea</Link>
      </section>
    </div>
  );
}

function Shortcut({ to, icon, tone, label }) {
  return (
    <Link className={`shortcut ${tone}`} to={to}>
      <span className="shortcut-icon">
        <Icon name={icon} />
      </span>
      {label}
    </Link>
  );
}

function Notices() {
  return (
    <div className="screen">
      <ScreenHeader title="Notices" subtitle="House + campus" back={false} />
      <div className="chips">
        <Link className="chip" to="/announcements">
          Announcements
        </Link>
      </div>
      <ul className="cards">
        {notices.map((n) => (
          <li key={n.id} className="card">
            <div className="card-meta">
              <span className={`chip ${n.tag === "Urgent" ? "warn" : ""}`}>{n.tag}</span>
              <small>{n.date}</small>
            </div>
            <h3>{n.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Announcements() {
  return (
    <div className="screen">
      <ScreenHeader title="Announcements" />
      <ul className="cards">
        {announcements.map((a) => (
          <li key={a.id} className="card">
            <div className="card-meta">
              <small className="from">{a.from}</small>
              <small>{a.date}</small>
            </div>
            <h3>{a.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Events() {
  return (
    <div className="screen">
      <ScreenHeader title="Events" />
      <div className="carousel stacked" role="list">
        {events.map((event) => (
          <article key={event.id} className="slide" role="listitem">
            <img src={event.image} alt="" />
            <div className="slide-copy">
              <span className="slide-date">{event.date}</span>
              <h3>{event.title}</h3>
              <p>
                {event.time} · {event.place}
              </p>
            </div>
          </article>
        ))}
      </div>
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
        name: name.trim() || "Anonymous",
        text: text.trim(),
        at: new Date().toISOString(),
      })
    );
    setText("");
    setName("");
  }

  return (
    <div className="screen">
      <ScreenHeader title="Reviews" />
      <form className="form" onSubmit={submit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="How is res this month?" rows={3} />
        <button type="submit">Send</button>
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
      <ScreenHeader title="Voices" />
      <form className="form" onSubmit={submit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <textarea value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Share a story..." rows={3} />
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
      <ScreenHeader title="Gallery" />
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

function Requests() {
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
      <ScreenHeader title="Requests" subtitle="Wi-Fi · Laundry · Access" back={false} />
      <form className="form" onSubmit={submit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Maintenance</option>
          <option>Wi-Fi</option>
          <option>Laundry</option>
          <option>Access</option>
        </select>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What’s broken?" />
        <button type="submit">Submit</button>
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

function Laundry() {
  return (
    <div className="screen">
      <ScreenHeader title="Laundry" />
      <ul className="cards">
        {laundrySchedule.map((d) => (
          <li key={d.day} className="card row">
            <strong className="day">{d.day}</strong>
            <p>{d.slots}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Academic() {
  return (
    <div className="screen">
      <ScreenHeader title="Study" />
      <ul className="cards">
        {academic.map((a) => (
          <li key={a.id} className="card">
            <h3>{a.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Platforms() {
  return (
    <div className="screen">
      <ScreenHeader title="Stay connected" />
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
      <ScreenHeader title="Your voice" />
      <form className="form" onSubmit={submit}>
        <textarea value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="Idea or challenge..." rows={3} />
        <button type="submit">Send</button>
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

function Profile() {
  return (
    <div className="screen">
      <ScreenHeader title="Profile" back={false} />
      <article className="profile-card">
        <div className="avatar">TL</div>
        <div>
          <h2>SMH Student</h2>
          <p>Sindiso Magaqa Heights</p>
        </div>
      </article>
      <div className="shortcuts four">
        <Shortcut to="/reviews" icon="star" tone="gold" label="Reviews" />
        <Shortcut to="/laundry" icon="shirt" tone="green" label="Laundry" />
        <Shortcut to="/feedback" icon="heart" tone="rust" label="Ideas" />
        <Shortcut to="/platforms" icon="share" tone="leaf" label="Socials" />
      </div>
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
        <Route path="/maintenance" element={<Navigate to="/requests" replace />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/laundry" element={<Laundry />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}
