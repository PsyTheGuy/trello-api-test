import 'dotenv/config'

export const API = {
  url: 'https://api.trello.com',
  key: process.env.API_KEY || '<your-api-key>',
  token: process.env.API_TOKEN || '<your-api-token>',
}
