export const notices = [
  {
    id: "n1",
    title: "Water interruption — Block C",
    body: "Scheduled maintenance on Saturday 08:00–12:00. Please store water in advance.",
    date: "2 Oct 2026",
    tag: "Urgent",
  },
  {
    id: "n2",
    title: "Quiet hours reminder",
    body: "Quiet hours are 22:00–06:00 during the exam period. Keep corridors clear.",
    date: "1 Oct 2026",
    tag: "House",
  },
  {
    id: "n3",
    title: "Visitor sign-in",
    body: "All visitors must sign in at reception. Student cards are required after 20:00.",
    date: "28 Sep 2026",
    tag: "Access",
  },
];

export const announcements = [
  {
    id: "a1",
    from: "SMH House Committee",
    title: "Women’s Month Event — 27 Mar",
    body: "Join us in the courtyard for speakers, music, and a community picnic.",
    date: "Today",
  },
  {
    id: "a2",
    from: "NMU Residence Life",
    title: "Sports Planning Meeting",
    body: "Captains and floor reps: 20 Mar, Rec Hall. Bring your block’s team lists.",
    date: "Yesterday",
  },
  {
    id: "a3",
    from: "SMH House Committee",
    title: "SMH Walk & Talk",
    body: "15 Mar — morning walk from the res to the amphitheatre. All welcome.",
    date: "3 days ago",
  },
];

export const events = [
  { id: "e1", date: "15 Mar", title: "SMH Walk & Talk", place: "Main Gate", time: "07:30" },
  { id: "e2", date: "20 Mar", title: "Sports Planning", place: "Rec Hall", time: "18:00" },
  { id: "e3", date: "27 Mar", title: "Women’s Month Event", place: "Courtyard", time: "16:00" },
  { id: "e4", date: "5 Apr", title: "Floor Braai", place: "Back Lawn", time: "17:00" },
];

export const interviews = [
  {
    id: "i1",
    name: "Lerato M.",
    year: "2nd year, BCom",
    quote: "SMH is more than a residence — the people on my floor made this campus feel like home.",
  },
  {
    id: "i2",
    name: "Sipho K.",
    year: "1st year, Engineering",
    quote: "House committee actually listens. We reported laundry delays and they posted a schedule the next week.",
  },
  {
    id: "i3",
    name: "Aisha N.",
    year: "3rd year, Education",
    quote: "Study groups in the lounge got me through exams. That’s the SMH family.",
  },
];

export const gallery = [
  {
    id: "g1",
    title: "SMH Family Always",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  },
  {
    id: "g2",
    title: "Residence at dusk",
    src: "https://images.unsplash.com/photo-1541339908198-c2e7bb2a8ba3?w=800&q=80",
  },
  {
    id: "g3",
    title: "Campus walk",
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
  },
  {
    id: "g4",
    title: "Together on the lawn",
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
  },
];

export const academic = [
  { id: "ac1", title: "Past Exam Papers", detail: "Faculty repositories and shared SMH study packs." },
  { id: "ac2", title: "Library Links", detail: "NMU library catalogue, e-journals, and booking." },
  { id: "ac3", title: "Study Spaces on Campus", detail: "Quiet rooms, 24-hour lab, and SMH lounge hours." },
  { id: "ac4", title: "Academic Support Contacts", detail: "Tutors, writing centre, and faculty advisors." },
];

export const platforms = [
  { id: "p1", name: "WhatsApp", handle: "SMH House Chat", color: "#25D366" },
  { id: "p2", name: "Instagram", handle: "@smh.family", color: "#E1306C" },
  { id: "p3", name: "TikTok", handle: "@smhconnect", color: "#111111" },
  { id: "p4", name: "YouTube", handle: "SMH Stories", color: "#FF0000" },
  { id: "p5", name: "Email", handle: "smh@nmu.ac.za", color: "#1a6b32" },
];

export const laundrySchedule = [
  { day: "Mon", slots: "06:00–22:00 · Block A & B" },
  { day: "Tue", slots: "06:00–22:00 · Block C & D" },
  { day: "Wed", slots: "06:00–22:00 · All blocks" },
  { day: "Thu", slots: "06:00–22:00 · Block A & B" },
  { day: "Fri", slots: "06:00–22:00 · Block C & D" },
  { day: "Sat", slots: "08:00–18:00 · Open" },
  { day: "Sun", slots: "10:00–16:00 · Open" },
];

export const seedRequests = [
  { id: "r1", type: "Wi-Fi", title: "Slow connection, 3rd floor C", status: "In Progress" },
  { id: "r2", type: "Laundry", title: "Dryer 2 out of service", status: "Reported" },
  { id: "r3", type: "Access", title: "Student card not scanning", status: "Resolved" },
];
