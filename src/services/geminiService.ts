// geminiService.ts - Integrates Gemini 3 Flash with the Brain Knowledge Base
import { GoogleGenAI } from "@google/genai";
import { BrainService } from "./BrainService";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "" 
});

const SYSTEM_INSTRUCTION = `
You are the Edu Arena AI Study Tutor, a professional educational expert specializing in the Nigerian curriculum (JAMB, WAEC, NECO).
Your goal is to provide accurate, encouraging, and curriculum-specific guidance.

CONTEXTUAL KNOWLEDGE:
You have access to a "Brain" knowledge base consisting of official exam documents, marking schemes, and syllabi.
ALWAYS prioritize information from the provided context when answering questions. 
If the information is not in the context, use your general knowledge but mention that it's based on standard academic principles.

STYLE GUIDELINES:
1. Be encouraging and use "Arena" metaphors (e.g., "Champion", "Ace the Arena", "Victory").
2. Keep explanations clear and concise.
3. Suggest relevant past questions if the student seems stuck.
4. If a question is too complex, break it down into smaller steps.
5. Use Nigerian academic terminology (e.g., "SS3", "Post-UTME", "Curriculum").

DATA INTERPRETATION:
- If context is [CATEGORY: SYLLABUS]: Treat this as the absolute legal requirement for the exam.
- If context is [CATEGORY: PAST_QUESTION]: Use this for practice, showing the year and exact question wording.
- If context is [CATEGORY: TUTORIAL]: Treat this as simplified teaching material for SS1-SS3 students.
`;

export async function askTutor(query: string, chatHistory: any[] = []) {
  try {
    // 1. Fetch relevant context from the local Brain
    const context = await BrainService.getContext(query);
    
    // 2. Prepare the prompt with context
    const contextSection = context 
      ? `\n\n--- RELEVANT KNOWLEDGE FROM BRAIN ---\n${context}\n--- END OF BRAIN CONTEXT ---\n\n`
      : "";

    // 3. Generate response using Gemini 3 Flash
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...chatHistory,
        { role: "user", parts: [{ text: contextSection + query }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a slight neural glitch connecting to the Arena servers. Please try again or check your internet connection.";
  }
}

export async function validateQuestion(questionText: string, options: string[], correctAnswer: string, explanation: string) {
  const prompt = `
    Please review the following academic question and explanation for style and accuracy.
    You must respond in the "Nigerian Tutor" style (encouraging, high-energy, using Nigerian academic terms).
    
    QUESTION: ${questionText}
    OPTIONS: A) ${options[0]}, B) ${options[1]}, C) ${options[2]}, D) ${options[3]}
    CORRECT ANSWER: ${correctAnswer}
    EXPLANATION: ${explanation}
    
    If the question is good, say "ACED IT! This is a perfect Arena challenge." then provide a brief pedagogical tip.
    If it needs improvement, explain why in a helpful, coaching way.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.9,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Review Error:", error);
    return "The AI Reviewer is currently offline. Please manually check the content.";
  }
}
