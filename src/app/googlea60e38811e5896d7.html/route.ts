export async function GET() {
  return new Response('google-site-verification: googlea60e38811e5896d7.html', {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
