export type AIProvider = 'Gemini' | 'Grok' | 'Hugging Face' | 'Mock';

export interface AIResponse {
  text: string;
  provider: AIProvider;
}

/**
 * Cascading AI Router for Edu Arena
 * Implements a strict fallback sequence: Gemini -> Grok -> Hugging Face -> Mock
 */
export async function askNigerianTutor(prompt: string, context: string = ""): Promise<AIResponse> {
  const geminiKey = import.meta.env.VITE_GEMINI_KEY;
  const grokKey = import.meta.env.VITE_GROK_KEY;
  const hfKey = import.meta.env.VITE_HF_KEY;

  const systemPrompt = `You are a strict but humorous Nigerian Tutor. Context: ${context}`;
  const fullPrompt = `${systemPrompt}\n\nStudent asks: ${prompt}\n\nTutor:`;

  // 1. Try Gemini API
  if (geminiKey) {
    try {
      const gRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }]
        })
      });
      
      if (!gRes.ok) {
        if (gRes.status === 429 || gRes.status >= 500) throw new Error(`Gemini Error: ${gRes.status}`);
      } else {
        const data = await gRes.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return { text, provider: 'Gemini' };
      }
    } catch (e) {
      console.warn("Gemini API failed, falling back to Grok...", e);
    }
  }

  // 2. Try Grok API (xAI)
  if (grokKey) {
    try {
      const xRes = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${grokKey}`
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a strict but humorous Nigerian Tutor." },
            { role: "user", content: `Context: ${context}\n\nQuestion: ${prompt}` }
          ],
          model: "grok-beta",
          stream: false,
          temperature: 0.7
        })
      });

      if (!xRes.ok) {
        throw new Error(`Grok Error: ${xRes.status}`);
      } else {
        const data = await xRes.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) return { text, provider: 'Grok' };
      }
    } catch (e) {
      console.warn("Grok API failed, falling back to Hugging Face...", e);
    }
  }

  // 3. Try Hugging Face Inference API
  if (hfKey) {
    try {
      const hfRes = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hfKey}`
        },
        body: JSON.stringify({
          inputs: `[INST] You are a strict but humorous Nigerian Tutor.\nContext: ${context}\n\nQuestion: ${prompt} [/INST]`,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7
          }
        })
      });

      if (!hfRes.ok) {
        throw new Error(`HF Error: ${hfRes.status}`);
      } else {
        const data = await hfRes.json();
        let text = data[0]?.generated_text;
        if (text) {
          // Clean up the prompt from the response if it's there
          text = text.split('[/INST]').pop()?.trim() || text;
          return { text, provider: 'Hugging Face' };
        }
      }
    } catch (e) {
      console.warn("Hugging Face API failed, falling back to Mock...", e);
    }
  }

  // 4. Mock Fallback (Crucial so UI doesn't break during dev)
  return {
    text: "Ah ah! Your API keys are missing or offline, my friend. Are you trying to write an exam with no pen? (Mock Response: Please add VITE_GEMINI_KEY, VITE_GROK_KEY, or VITE_HF_KEY to your environment to access real AI nodes.)",
    provider: 'Mock'
  };
}
