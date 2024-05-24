/** Get a localStorage value */
export function get(key) {
  try {
    return localStorage[key];
  } catch (e) {
  }
}

/** Get a localStorage value as json */
export function getJSON(key) {
  const json = get(key);
  if (!json) {
    return;
  }
  try {
    return JSON.parse(json)
  } catch (e) { }
}

/** Set a localStorage value */
export function set(key, value) {
  try {
    localStorage[key] = value;
  } catch (e) {
  }
}

/** Set a localStorage value as JSON */
export function setJSON(key, value) {
  return set(key, JSON.stringify(value));
}