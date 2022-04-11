export function getTimeString(date: string) {
  if (new Date(Date.now()) - new Date(date) > 86400000) {
    return new Date(date).toLocaleDateString();
  }

  return new Date(date).toLocaleTimeString().substring(0, 5);
}
