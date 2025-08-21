# Cloudflare Tunnel + Worker + R2 Secure Headers Demo

This project demonstrates a secure, Cloudflare-powered application that integrates Cloudflare Tunnels, Workers, Access (Zero Trust), and R2 object storage to deliver a secure, identity-aware user experience.

## 🔧 Project Features

- **/headers**  
  Public endpoint ([https://bournemd.com/headers](https://bournemd.com/headers)) that returns all HTTP request headers via a proxied origin server.

- **Cloudflare Tunnel (myinstance.bournemd.com)**  
  Exposes a private NGINX service via a secure Cloudflare Tunnel using a private IP. Not directly accessible outside Cloudflare.

- **/secure**  
  Protected endpoint ([https://myinstance.bournemd.com/secure](https://myinstance.bournemd.com/secure)) behind Cloudflare Access. Displays authenticated user’s email, timestamp, and country of access.

- **/secure/{COUNTRY}**  
  Serves a country-specific flag image from a private Cloudflare R2 bucket.

## 🛡️ Security

- Origin secured with Full (Strict) TLS using a non-Cloudflare certificate
- Cloudflare Tunnel prevents direct IP access to origin
- Access restricted to specific users and domains via Cloudflare Access and IdP integration

## 🚀 Technologies Used

- Cloudflare Tunnel (`cloudflared`)
- Cloudflare Workers (via `wrangler`)
- Cloudflare R2 (private object storage)
- Cloudflare Zero Trust Access + SSO
- NGINX + httpbin for origin response

## 📦 Deployment Notes

- Worker deployed with Wrangler CLI
- Route and R2 binding configured manually due to CLI limitations
- Project includes code for HTML response rendering and binary asset retrieval

## 🔗 Demo URLs

- [https://bournemd.com/headers](https://bournemd.com/headers)
- [https://myinstance.bournemd.com/secure](https://myinstance.bournemd.com/secure)

## 📄 License

MIT License

