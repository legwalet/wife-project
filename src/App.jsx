import { createContext, useContext, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  academic,
  announcements,
  departments,
  events,
  faqs,
  gallery,
  interviews as seedInterviews,
  laundrySchedule,
  newsletters,
  notices,
  platforms,
  requestTypes,
  seedRequests,
  venues,
  visionPillars,
} from "./data";
import { addItem, loadStore, patchItem, saveStore } from "./storage";

const Session = createContext(null);
function useSession() {
  return useContext(Session);
}

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
    pin: (
      <>
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  };
  return (
    <svg className="icon" {...common} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function SessionProvider({ children }) {
  const [store, setStore] = useState(loadStore);
  const role = store.role === "staff" ? "staff" : "student";
  const value = {
    store,
    setStore,
    role,
    isStaff: role === "staff",
    setRole(next) {
      setStore(saveStore({ role: next }));
    },
  };
  return <Session.Provider value={value}>{children}</Session.Provider>;
}

function Shell({ children }) {
  const { pathname } = useLocation();
  const { isStaff } = useSession();
  return (
    <div className="stage">
      <div className="poster-glow" aria-hidden="true" />
      <div className="app-shell">
        <nav className="tabbar" aria-label="Main">
          <div className="nav-brand">
            <div className="logo-line">
              <strong>NMU</strong> <em>CONNECT</em>
            </div>
            <small>Nelson Mandela University</small>
          </div>
          <Tab to="/" icon="home" label="Home" active={pathname === "/"} />
          <Tab to="/notices" icon="bell" label="Notices" active={pathname.startsWith("/notices") || pathname.startsWith("/announcements")} />
          <Tab to="/requests" icon="wrench" label="Requests" active={pathname.startsWith("/requests") || pathname.startsWith("/maintenance")} />
          {isStaff ? (
            <Tab to="/manage" icon="list" label="Manage" active={pathname.startsWith("/manage")} />
          ) : (
            <Tab to="/profile" icon="user" label="Profile" active={pathname.startsWith("/profile")} />
          )}
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

function EventSlide({ event }) {
  return (
    <Link to={`/events/${event.id}`} className="slide" role="listitem">
      <img src={event.image} alt="" className={event.poster ? "poster" : undefined} />
      <div className="slide-copy">
        <span className="slide-date">{event.date}</span>
        <h3>{event.title}</h3>
        <p>
          {event.time} · {event.place}
        </p>
      </div>
    </Link>
  );
}

function Home() {
  const { isStaff } = useSession();
  return (
    <div className="screen home">
      <section className="hero">
        <img src="/hero.jpg?v=2" alt="Nelson Mandela University campus community" />
        <div className="hero-copy">
          <p className="hero-kicker">NMU CONNECT · VISION 2030</p>
          <h1>Welcome, Madibaz</h1>
          <p className="hero-sub">People · Purpose · Progress</p>
        </div>
      </section>

      {isStaff ? (
        <section className="pulse staff">
          <p>Management view is on. Action student submissions from the dashboard.</p>
          <Link to="/manage">Open dashboard</Link>
        </section>
      ) : null}

      <section className="section">
        <div className="section-head">
          <h2>This week</h2>
          <Link to="/events">See all</Link>
        </div>
        <div className="carousel" role="list">
          {events.map((event) => (
            <EventSlide key={event.id} event={event} />
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
          <Shortcut to="/directory" icon="pin" tone="leaf" label="Directory" />
          <Shortcut to="/platforms" icon="share" tone="rust" label="Socials" />
          <Shortcut to="/vision" icon="star" tone="gold" label="Vision 2030" />
          <Shortcut to="/feedback" icon="heart" tone="green" label="Your Word" />
          <Shortcut to="/newsletters" icon="megaphone" tone="leaf" label="News" />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Gallery</h2>
          <Link to="/gallery">See all</Link>
        </div>
        <div className="carousel" role="list">
          {gallery.slice(0, 8).map((g) => (
            <Link key={g.id} to="/gallery" className="shot slide-shot" role="listitem">
              <img src={g.src} alt={g.title} />
              <span>{g.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Socials</h2>
          <Link to="/platforms">See all</Link>
        </div>
        <SocialRow group="Campus" />
      </section>

      <section className="pulse">
        <p>Your voice builds a better campus</p>
        <Link to="/feedback">Share an idea</Link>
      </section>
    </div>
  );
}

function SocialRow({ group }) {
  return (
    <div className="social-row">
      {platforms
        .filter((p) => p.group === group && p.url)
        .map((p) => (
          <a
            key={p.id}
            className="social-logo"
            href={p.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${p.name} ${p.handle}`}
            title={p.handle}
          >
            <img src={p.logo} alt="" />
          </a>
        ))}
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
      <ScreenHeader title="Notices" subtitle="Campus + housing" back={false} />
      <div className="chips">
        <Link className="chip" to="/announcements">
          Announcements
        </Link>
        <Link className="chip" to="/newsletters">
          Newsletters
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

function Newsletters() {
  return (
    <div className="screen">
      <ScreenHeader title="Newsletters" />
      <ul className="cards">
        {newsletters.map((n) => (
          <li key={n.id} className="card">
            <div className="card-meta">
              <small>{n.date}</small>
            </div>
            <h3>{n.title}</h3>
            <p>{n.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Events() {
  return (
    <div className="screen">
      <ScreenHeader title="Events" subtitle="Tap an event to book" />
      <div className="carousel stacked" role="list">
        {events.map((event) => (
          <EventSlide key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function EventBook() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const { store, setStore } = useSession();
  const [name, setName] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [sent, setSent] = useState(false);

  if (!event) return <Navigate to="/events" replace />;

  const taken = store.bookings.filter((b) => b.eventId === event.id).length;
  const left = Math.max(0, event.capacity - taken);

  function submit(e) {
    e.preventDefault();
    if (!name.trim() || left < 1) return;
    setStore(
      addItem("bookings", {
        id: crypto.randomUUID(),
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventPlace: event.place,
        department: event.department,
        name: name.trim(),
        studentNo: studentNo.trim(),
        status: "Pending",
        at: new Date().toISOString(),
      })
    );
    setSent(true);
  }

  return (
    <div className="screen">
      <ScreenHeader title="Book event" />
      <article className="card">
        <small className="from">{event.department}</small>
        <h3>{event.title}</h3>
        <p>
          {event.date} · {event.time} · {event.place}
        </p>
        <p>{left} places left of {event.capacity}</p>
      </article>
      {sent ? (
        <p className="form-note">Booked. Details were attached for {event.department}.</p>
      ) : (
        <form className="form" onSubmit={submit}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required />
          <input value={studentNo} onChange={(e) => setStudentNo(e.target.value)} placeholder="Student number" />
          <button type="submit" disabled={left < 1}>
            {left < 1 ? "Full" : "Confirm booking"}
          </button>
        </form>
      )}
    </div>
  );
}

function Directory() {
  const [tab, setTab] = useState("venues");
  return (
    <div className="screen">
      <ScreenHeader title="Directory" subtitle="Venues · departments" />
      <div className="chips">
        <button className={`chip ${tab === "venues" ? "on" : ""}`} onClick={() => setTab("venues")}>
          Venues
        </button>
        <button className={`chip ${tab === "depts" ? "on" : ""}`} onClick={() => setTab("depts")}>
          Departments
        </button>
      </div>
      {tab === "venues" ? (
        <ul className="cards">
          {venues.map((v) => (
            <li key={v.id} className="card">
              <div className="card-meta">
                <span className="chip">{v.campus}</span>
                <small>{v.available} slots open</small>
              </div>
              <h3>{v.name}</h3>
              <p>
                Holds {v.capacity} · {v.hours}
              </p>
              <p className="slot-line">{v.slots.join(" · ")}</p>
              <small className="from">Routes to {v.owner}</small>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="cards">
          {departments.map((d) => (
            <li key={d.id} className="card">
              <h3>{d.name}</h3>
              <p>{d.handles}</p>
              <p>{d.hours}</p>
              <small className="from">{d.email}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Vision() {
  return (
    <div className="screen">
      <ScreenHeader title="Vision 2030" subtitle="Campus information" />
      <ul className="cards">
        {visionPillars.map((p) => (
          <li key={p.id} className="card">
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
      <h2 className="block-title">FAQs</h2>
      <ul className="cards">
        {faqs.map((f) => (
          <li key={f.id} className="card">
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Privacy() {
  return (
    <div className="screen">
      <ScreenHeader title="Privacy" subtitle="POPIA · POC notice" />
      <article className="card">
        <h3>How this demo stores data</h3>
        <p>
          Submissions stay on this device (browser storage). Nothing is sent to Outlook, SharePoint, or Monday.com yet.
          A live pilot would use university systems and Legal Services policy text.
        </p>
      </article>
      <article className="card">
        <h3>Your rights</h3>
        <p>
          You can choose an anonymous Your Word. Staff in this POC can only see what you submit on this same device.
        </p>
      </article>
    </div>
  );
}

function Reviews() {
  const { store, setStore } = useSession();
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
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="How is campus this month?" rows={3} />
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
  const { store, setStore } = useSession();
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const all = useMemo(() => [...store.interviews, ...seedInterviews], [store.interviews]);

  function submit(e) {
    e.preventDefault();
    if (!quote.trim()) return;
    setStore(
      addItem("interviews", {
        id: crypto.randomUUID(),
        name: name.trim() || "NMU student",
        year: "Student",
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
      <ScreenHeader title="Gallery" subtitle="SMH community" />
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
  const { store, setStore } = useSession();
  const [title, setTitle] = useState("");
  const [type, setType] = useState(requestTypes[0].type);
  const route = requestTypes.find((r) => r.type === type) || requestTypes[0];
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
        department: route.department,
        email: route.email,
        at: new Date().toISOString(),
      })
    );
    setTitle("");
  }

  return (
    <div className="screen">
      <ScreenHeader title="Requests" subtitle="Routes to the right department" back={false} />
      <form className="form" onSubmit={submit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {requestTypes.map((r) => (
            <option key={r.type}>{r.type}</option>
          ))}
        </select>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What’s needed?" />
        <p className="form-note">
          Would send to {route.department} · {route.email}
        </p>
        <button type="submit">Submit</button>
      </form>
      <ul className="cards">
        {all.map((r) => (
          <li key={r.id} className="card row">
            <div>
              <small>{r.department || r.type}</small>
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
      <ScreenHeader title="Laundry" subtitle="SMH residence" />
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
            <p>{a.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Platforms() {
  const groups = ["Campus", "SMH"];
  return (
    <div className="screen">
      <ScreenHeader title="Socials" subtitle="Campus + SMH" />
      {groups.map((group) => (
        <section key={group}>
          <h2 className="block-title">{group === "Campus" ? "Nelson Mandela University" : "Sindiso Magaqa Heights"}</h2>
          <SocialRow group={group} />
        </section>
      ))}
    </div>
  );
}

function Feedback() {
  const { store, setStore } = useSession();
  const [idea, setIdea] = useState("");
  const [anon, setAnon] = useState(true);

  function submit(e) {
    e.preventDefault();
    if (!idea.trim()) return;
    setStore(
      addItem("feedback", {
        id: crypto.randomUUID(),
        idea: idea.trim(),
        anonymous: anon,
        name: anon ? "Anonymous" : "Student",
        at: new Date().toISOString(),
        status: "New",
      })
    );
    setIdea("");
  }

  return (
    <div className="screen">
      <ScreenHeader title="Your Word" subtitle="Ideas for Vision 2030" />
      <form className="form" onSubmit={submit}>
        <textarea value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="Idea or challenge..." rows={3} />
        <label className="check">
          <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} />
          Send anonymously
        </label>
        <button type="submit">Send</button>
      </form>
      <ul className="cards">
        {store.feedback.map((f) => (
          <li key={f.id} className="card">
            <small>{f.name || (f.anonymous ? "Anonymous" : "Student")}</small>
            <p>{f.idea}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Manage() {
  const { isStaff, store, setStore } = useSession();
  if (!isStaff) return <Navigate to="/profile" replace />;

  const requests = [...store.requests, ...seedRequests];
  const open = requests.filter((r) => r.status !== "Resolved").length;

  function actionRequest(id, status) {
    if (seedRequests.some((r) => r.id === id)) return;
    setStore(patchItem("requests", id, { status }));
  }

  function actionBooking(id, status) {
    setStore(patchItem("bookings", id, { status }));
  }

  function actionIdea(id, status) {
    setStore(patchItem("feedback", id, { status }));
  }

  return (
    <div className="screen">
      <ScreenHeader title="Management" subtitle="Student submissions" back={false} />
      <div className="stats">
        <div className="stat">
          <strong>{open}</strong>
          <span>Open requests</span>
        </div>
        <div className="stat">
          <strong>{store.bookings.length}</strong>
          <span>Bookings</span>
        </div>
        <div className="stat">
          <strong>{store.feedback.length}</strong>
          <span>Your Word</span>
        </div>
      </div>
      <h2 className="block-title">Requests</h2>
      <ul className="cards">
        {requests.map((r) => (
          <li key={r.id} className="card">
            <div className="card-meta">
              <small>{r.email || r.department || r.type}</small>
              <span className={`chip ${r.status.replace(/\s/g, "").toLowerCase()}`}>{r.status}</span>
            </div>
            <h3>{r.title}</h3>
            {r.status !== "Resolved" && !seedRequests.some((s) => s.id === r.id) ? (
              <div className="row-actions">
                {r.status !== "In Progress" ? (
                  <button type="button" className="ghost" onClick={() => actionRequest(r.id, "In Progress")}>
                    In progress
                  </button>
                ) : null}
                <button type="button" className="ghost" onClick={() => actionRequest(r.id, "Resolved")}>
                  Close
                </button>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <h2 className="block-title">Event bookings</h2>
      <ul className="cards">
        {store.bookings.length === 0 ? (
          <li className="card">
            <p>No bookings yet.</p>
          </li>
        ) : (
          store.bookings.map((b) => (
            <li key={b.id} className="card">
              <div className="card-meta">
                <small>{b.department}</small>
                <span className={`chip ${b.status.replace(/\s/g, "").toLowerCase()}`}>{b.status}</span>
              </div>
              <h3>{b.eventTitle}</h3>
              <p>
                {b.name} · {b.eventDate} {b.eventTime} · {b.eventPlace}
              </p>
              {b.status === "Pending" ? (
                <div className="row-actions">
                  <button type="button" className="ghost" onClick={() => actionBooking(b.id, "Confirmed")}>
                    Confirm
                  </button>
                </div>
              ) : null}
            </li>
          ))
        )}
      </ul>
      <h2 className="block-title">Your Word</h2>
      <ul className="cards">
        {store.feedback.length === 0 ? (
          <li className="card">
            <p>No ideas yet.</p>
          </li>
        ) : (
          store.feedback.map((f) => (
            <li key={f.id} className="card">
              <div className="card-meta">
                <small>{f.name || "Anonymous"}</small>
                <span className="chip">{f.status || "New"}</span>
              </div>
              <p>{f.idea}</p>
              {(f.status || "New") === "New" ? (
                <div className="row-actions">
                  <button type="button" className="ghost" onClick={() => actionIdea(f.id, "Seen")}>
                    Mark seen
                  </button>
                </div>
              ) : null}
            </li>
          ))
        )}
      </ul>
      <p className="form-note">
        <Link to="/profile">Switch to student view</Link>
      </p>
    </div>
  );
}

function Profile() {
  const { role, setRole, isStaff } = useSession();
  return (
    <div className="screen">
      <ScreenHeader title="Profile" back={false} />
      <article className="profile-card">
        <div className="avatar">{isStaff ? "ST" : "MD"}</div>
        <div>
          <h2>{isStaff ? "Staff member" : "Madibaz student"}</h2>
          <p>Nelson Mandela University</p>
        </div>
      </article>
      <div className="role-switch" role="group" aria-label="View">
        <button type="button" className={role === "student" ? "on" : ""} onClick={() => setRole("student")}>
          Student
        </button>
        <button type="button" className={role === "staff" ? "on" : ""} onClick={() => setRole("staff")}>
          Management
        </button>
      </div>
      {isStaff ? (
        <Link className="dash-link" to="/manage">
          Open management dashboard
        </Link>
      ) : null}
      <div className="shortcuts four">
        <Shortcut to="/gallery" icon="camera" tone="gold" label="Gallery" />
        <Shortcut to="/platforms" icon="share" tone="leaf" label="Socials" />
        <Shortcut to="/laundry" icon="shirt" tone="green" label="Laundry" />
        <Shortcut to="/privacy" icon="shield" tone="rust" label="Privacy" />
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/newsletters" element={<Newsletters />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventBook />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/maintenance" element={<Navigate to="/requests" replace />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/laundry" element={<Laundry />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <AppRoutes />
    </SessionProvider>
  );
}
