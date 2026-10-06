const KEY = "smh-connect-store";

const defaults = {
  reviews: [],
  interviews: [],
  requests: [],
  feedback: [],
};

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

function write(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function loadStore() {
  return read();
}

export function saveStore(partial) {
  const next = { ...read(), ...partial };
  write(next);
  return next;
}

export function addItem(listKey, item) {
  const store = read();
  const next = { ...store, [listKey]: [item, ...store[listKey]] };
  write(next);
  return next;
}
