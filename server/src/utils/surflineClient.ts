import axios from "axios";

const surflineClient = axios.create({
  baseURL: "https://services.surfline.com",
  timeout: 10000, // Crucial for production
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
  },
});

export { surflineClient };
