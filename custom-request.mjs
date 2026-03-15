export async function customRequest(req) {
  const url = new URL(req.url, "http://localhost");
  req.query = url.searchParams;
  req.pathname = url.pathname;

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString("utf-8");
  req.body = body;

  if (req.headers["content-type"] === "application/json") {
    try {
      req.body = JSON.parse(body);
    } catch (error) {
      console.error("Error parsing JSON body:", error);
    }
  }

  return req;
}
