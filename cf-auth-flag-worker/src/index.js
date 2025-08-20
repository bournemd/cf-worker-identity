export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === "/secure") {
      return handleSecure(request, env);
    } else if (pathname.startsWith("/secure/")) {
      const country = decodeURIComponent(pathname.replace("/secure/", ""));
      return handleFlagRequest(country, env);
    }

    return new Response("Not Found", { status: 404 });
  },
};

async function handleSecure(request, env) {
  const cf = request.cf || {};
  const email = request.headers.get("cf-access-authenticated-user-email") || "unknown@bournemd.com";
  const country = cf.country || "US";
  const timestamp = new Date().toISOString();

  const html = `
    <html>
      <body>
        <p><strong>${email}</strong> authenticated at <strong>${timestamp}</strong> from 
        <a href="/secure/${country}">${country}</a></p>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

async function handleFlagRequest(country, env) {
  try {
    const object = await env.FLAGS_BUCKET.get(`${country}.png`);
    if (!object) {
      return new Response("Flag not found", { status: 404 });
    }

    return new Response(object.body, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new Response("Error fetching flag", { status: 500 });
  }
}

