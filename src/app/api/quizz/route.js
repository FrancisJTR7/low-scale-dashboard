// app/api/test/route.js
export async function GET(request) {
  return new Response(
    JSON.stringify({ message: 'Hello from a test API route!' }),
    { status: 200 }
  );
}
