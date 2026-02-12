import { GoogleGenAI } from "@google/genai";
import { GeoStats, LayerType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeGeoData = async (
  regionName: string,
  layerType: LayerType,
  stats: GeoStats[],
  lang: 'id' | 'en' = 'id',
  userQuery?: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    return lang === 'id' 
      ? "Kunci API tidak ditemukan. Harap konfigurasi process.env.API_KEY." 
      : "API Key not found. Please configure process.env.API_KEY.";
  }

  const model = "gemini-3-flash-preview";
  const dataSummary = stats.map(s => `${s.date}: ${s.value.toFixed(2)}`).join('\n');
  
  const systemInstruction = lang === 'id' 
    ? "Anda adalah pakar Analis Geospasial. Berikan analisis dalam Bahasa Indonesia yang profesional, teknis, dan padat."
    : "You are a Geospatial Analysis expert. Provide professional, technical, and concise analysis in English.";

  const prompt = lang === 'id' 
    ? `Konteks:
    - Wilayah: ${regionName}
    - Lapisan Analisis: ${layerType}
    - Deret Data:
    ${dataSummary}

    ${userQuery ? `Pertanyaan Pengguna: ${userQuery}` : `Tugas: Berikan ringkasan eksekutif tentang tren lahan, anomali data, dan rekomendasi strategis.`}
    
    PENTING: Berikan respons HANYA dalam Bahasa Indonesia.`
    : `Context:
    - Region: ${regionName}
    - Analysis Layer: ${layerType}
    - Data Series:
    ${dataSummary}

    ${userQuery ? `User Question: ${userQuery}` : `Task: Provide an executive summary of land trends, data anomalies, and strategic recommendations.`}
    
    IMPORTANT: Provide the response ONLY in English.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: { systemInstruction }
    });
    return response.text || (lang === 'id' ? "Tidak ada analisis yang tersedia." : "No analysis available.");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return lang === 'id' 
      ? "Terjadi kesalahan saat menganalisis data geospasial."
      : "An error occurred while analyzing geospatial data.";
  }
};
