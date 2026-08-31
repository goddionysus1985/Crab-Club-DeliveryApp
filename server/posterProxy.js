import http from 'http';

const PORT = 3005;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const subPath = req.url.replace(/^\/api\/poster/, '');
  const targetUrl = `https://joinposter.com/api${subPath}`;

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;

    const fetchRes = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Accept': 'application/json',
        ...(req.headers['content-type'] ? { 'Content-Type': req.headers['content-type'] } : {})
      },
      body
    });

    const data = await fetchRes.arrayBuffer();
    res.writeHead(fetchRes.status, { 'Content-Type': 'application/json' });
    res.end(Buffer.from(data));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(PORT, () => {
  console.log(`🦀 Poster POS CORS Proxy running on http://localhost:${PORT}`);
});
