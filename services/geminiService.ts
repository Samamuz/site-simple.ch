
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { getSystemPrompt } from "../lib/ai-prompt";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

export const initializeChat = async (): Promise<Chat> => {
  if (chatSession) return chatSession;

  // On récupère le prompt système configuré pour l'agence
  const systemInstruction = getSystemPrompt();

  // Using gemini-3-flash-preview as recommended for Basic Text Tasks
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    },
  });

  chatSession = chat;
  return chat;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const session = await initializeChat();
    const result: GenerateContentResponse = await session.sendMessage({
      message: message
    });
    
    return result.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Extraction sécurisée des informations d'erreur pour détecter le code 429
    const errorCode = error?.code || error?.error?.code || error?.status;
    const errorMessage = error?.message || error?.error?.message || JSON.stringify(error);
    const errorStatus = error?.status || error?.error?.status;

    // Détection de l'erreur de quota (429 RESOURCE_EXHAUSTED)
    if (
      errorCode === 429 || 
      errorStatus === 'RESOURCE_EXHAUSTED' || 
      errorMessage?.includes('429') || 
      errorMessage?.includes('quota') ||
      errorMessage?.includes('RESOURCE_EXHAUSTED')
    ) {
      return "⚠️ **Quota atteint**\n\nLe quota gratuit de l'API Gemini est temporairement épuisé. Veuillez réessayer dans quelques instants ou me contacter directement via la page **Contact**.";
    }

    // Gestion des autres erreurs (ex: clé API invalide)
    if (errorMessage?.includes('API key')) {
        return "⚠️ **Erreur de configuration**\n\nLa clé API semble invalide ou manquante.";
    }

    // En cas d'erreur générique
    return "Désolé, une erreur technique est survenue lors de la communication avec l'assistant. Veuillez réessayer.";
  }
};

export const resetChat = () => {
  chatSession = null;
};
