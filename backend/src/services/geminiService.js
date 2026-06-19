import {GoogleGenerativeAI}
from "@google/generative-ai";


const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);



const model =
genAI.getGenerativeModel({
model:"gemini-1.5-flash"
});



export const reviewCode =
async(code,language)=>{


const prompt = `

You are an expert code reviewer.

Analyze this ${language} code.

Return ONLY JSON.

Format:

{
"bugs":[],
"improvements":[],
"badPractices":[],
"namingSuggestions":[],
"explanation":"",
"timeComplexity":"",
"spaceComplexity":"",
"score":0
}


Code:

${code}

`;



const response =
await model.generateContent(prompt);



const text =
response.response.text();


return JSON.parse(text);


}