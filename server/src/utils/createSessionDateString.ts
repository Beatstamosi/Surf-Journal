export default function createSessionDateString(time24h: string) {
  // 1. Get today's date components based on the user's local time
  const today = new Date();
  const pad = (num: number) => String(num).padStart(2, "0");

  const year = today.getFullYear();
  const month = pad(today.getMonth() + 1); // getMonth() is 0-indexed
  const day = pad(today.getDate());

  // 2. Construct the final string in the required format
  const sessionStartString = `${year}-${month}-${day} ${time24h}`;

  return sessionStartString;
}
