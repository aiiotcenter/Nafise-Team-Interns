export async function POST(req: Request) {
 
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
 
 
 try{
 
  const { contents } = await req.json();
    
  if (!contents || !Array.isArray(contents)) {
    return new Response(JSON.stringify({ error: "Invalid request format" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  // Existing Gemini API call logic...
  
} catch (error) {
  // Error handling with CORS headers
  return new Response(JSON.stringify({ 
    error: { message: (error as Error).message } 
  }), { 
    status: 500,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
}
  /*
  if (!process.env.GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: { message: "API key not configured" } }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "API request failed");
    }

    return new Response(JSON.stringify(data), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: { message: (error as Error).message } }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}*/