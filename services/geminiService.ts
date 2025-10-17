// Fix: Import `Type` for defining the response schema.
import { GoogleGenAI, Type } from "@google/genai";
import { Prospect } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const findProspects = async (icpJson: string): Promise<Prospect[]> => {
  // Fix: Define a response schema to ensure the model returns structured JSON.
  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        company_name: { type: Type.STRING },
        domain: { type: Type.STRING },
        revenue: { type: Type.NUMBER },
        industry: { type: Type.STRING },
        funding_stage: { type: Type.STRING },
        contacts: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              title: { type: Type.STRING },
              email: { type: Type.STRING },
              linkedin: { type: Type.STRING },
            },
            required: ["name", "title", "email", "linkedin"],
          },
        },
        signals: {
          type: Type.OBJECT,
          properties: {
            recent_hiring: { type: Type.BOOLEAN },
            new_funding: { type: Type.BOOLEAN },
          },
          required: ["recent_hiring", "new_funding"],
        },
        source: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
        confidence: { type: Type.NUMBER },
      },
      required: [
        "company_name",
        "domain",
        "revenue",
        "industry",
        "funding_stage",
        "contacts",
        "signals",
        "source",
        "confidence",
      ],
    },
  };

  const prompt = `
    You are an autonomous ProspectSearchAgent. Your task is to discover B2B companies and contacts in the USA that match a given Ideal Customer Profile (ICP).

    Follow these steps precisely:
    1.  **Simulate Data Fetching**: Act as if you are querying data sources like Apollo for company/contact info, Crunchbase for funding, and SerpAPI for hiring signals.
    2.  **Merge & Deduplicate**: Combine the information and remove duplicate companies (by domain) and contacts (by email).
    3.  **Score & Output**: For each prospect, calculate a confidence score using the following heuristic formula:
        score = (0.4 * industry_match) + (0.3 * funding_signal) + (0.2 * hiring_signal) + (0.1 * tech_match)
        - 'industry_match': 1 if the company's industry is a strong match, 0 otherwise.
        - 'funding_signal': 1 if 'new_funding' is true, 0.5 if funding info is positive but not recent, 0 otherwise.
        - 'hiring_signal': 1 if 'recent_hiring' is true, 0 otherwise.
        - 'tech_match': 1 if the tech stack is a strong match, 0.5 for a partial match, 0 otherwise.
    4.  **Format Output**: Return a structured, enriched JSON array of the results.

    Based on the following Ideal Customer Profile (ICP):
    ---
    ${icpJson}
    ---

    Generate a JSON array of 3 to 5 matching companies. The 'confidence' score must be calculated using the formula above.

    IMPORTANT RULES:
    - The 'revenue' must be a number, not a string with 'M' or 'B'. For example, 75000000.
    - The 'contacts' array should contain at least one contact.
    - The 'source' should be an array of 2-3 data sources you 'queried' (e.g., "Apollo", "Crunchbase", "SerpAPI").
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        // Fix: Add config to enforce JSON output based on the defined schema.
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });
    
    // Fix: With responseSchema, the output is guaranteed JSON, so no cleanup is needed.
    const textResponse = response.text;
    
    const prospects: Prospect[] = JSON.parse(textResponse);
    return prospects;
  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    if (error instanceof SyntaxError) {
        throw new Error("Failed to parse the AI's response. The format was invalid.");
    }
    throw new Error("An error occurred while fetching prospect data.");
  }
};