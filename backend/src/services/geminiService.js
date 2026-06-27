export const reviewCode = async (code, language) => {

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
You are an expert code reviewer.

Return ONLY valid JSON. No markdown. No explanation.

Schema:
{
"bugs": [],
"improvements": [],
"badPractices": [],
"namingSuggestions": [],
"explanation": "",
"timeComplexity": "",
"spaceComplexity": "",
"score": 0
}

Code:
${code}
                `
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  console.log("RAW GEMINI RESPONSE:", JSON.stringify(data, null, 2));

  if (!data.candidates?.[0]) {
    throw new Error(JSON.stringify(data));
  }

  let text = data.candidates[0].content.parts[0].text;

  // 🔥 REMOVE markdown if Gemini adds ```json
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.log("FAILED TO PARSE:", text);
    throw new Error("Gemini returned invalid JSON");
  }
};