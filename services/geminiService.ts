import { GoogleGenAI } from "@google/genai";
import { GeoStats, LayerType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeGeoData = async (
  regionName: string,
  layerType: LayerType,
  stats: GeoStats[],
  userQuery?: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is missing. Please configure process.env.API_KEY.";
  }

  const model = "gemini-3-flash-preview";
  
  // Format the data for the model
  const dataSummary = stats.map(s => `${s.date}: ${s.value.toFixed(2)}`).join('\n');
  
  const prompt = `
    You are an expert Geospatial Analyst working with Google Earth Engine data.
    
    Context:
    - Region: ${regionName}
    - Analysis Layer: ${layerType}
    - Data Series (Time vs Value):
    ${dataSummary}

    ${userQuery ? `User Question: ${userQuery}` : `Task: Provide a concise executive summary of the environmental trends observed in this data. specific anomalies (peaks/drops). Mention potential real-world causes (e.g., seasonal drought, deforestation, urbanization) based on the layer type.`}
    
    Keep the response professional, scientific, but accessible. Format with clear paragraphs.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "An error occurred while analyzing the geospatial data. Please try again.";
  }
};

export const chatWithData = async (
  history: { role: string; text: string }[],
  currentMessage: string
): Promise<string> => {
   if (!process.env.API_KEY) return "API Key missing.";

   // Simple chat interface for follow-up questions
   const model = "gemini-3-flash-preview";
   const chat = ai.chats.create({
      model: model,
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      })),
   });

   const result = await chat.sendMessage({ message: currentMessage });
   return result.text || "No response.";
  }
