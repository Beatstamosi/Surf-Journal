import axios from 'axios';

export const surflineClient = axios.create({
  baseURL: 'https://services.surfline.com',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.surfline.com/',
    'Origin': 'https://www.surfline.com'
  }
});