// geminiAPI.jsx

export async function getGeminiFeedback(prompt) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ]
        })
      });
  
      const data = await response.json();
  
      console.log('Gemini Response:', data);
  
      if (data.error) {
        return `Gemini Error: ${data.error.message}`;
      }
  
      const geminiOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return geminiOutput || 'No response from Gemini.';
    } catch (error) {
      console.error('Fetch failed:', error);
      return 'Something went wrong while contacting Gemini.';
    }
  }
  