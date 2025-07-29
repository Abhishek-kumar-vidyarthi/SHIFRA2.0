let apiKey ="AIzaSyDaGF06wgX9DQbK1wSE_nCopz1AfXNcNuE"
import{
  GoogleGenerativeAI,HarmCategory,HarmBlockThreshold,
} from "@google/generative-ai";

// 1️⃣ Initialize Gemini
const genAI = new GoogleGenerativeAI(apiKey);

// 2️⃣ Get the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// 3️⃣ Generation config
const generationConfig = {
  temperature:1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

// 4️⃣ Main function with prompt param
async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "An error occurred.";
  }
}

export default run;