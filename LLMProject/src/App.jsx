import React, { useState } from "react";
import axios from "axios";

function AIChat() {
  const [inputText, setInputText] = useState(""); // State for user input
  const [responseText, setResponseText] = useState(""); // State for LLM response

  async function generateAnswer() {
    try {
      console.log("Generating answer...");
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCsks3qEQGEr1QvNEQDwNJqq-hu-xWslAE",
        method: "post",
        headers: {
          "contents":[{"parts":[{"text":"Explain how AI works"}]}]
        },
        data: { contents: [{ parts: [{ text: inputText }] }] },
      });

      // Extract the LLM response
      const generatedText =
        response.data?.contents?.[0]?.parts?.[0]?.text ||
        "No response received.";
      setResponseText(generatedText);
    } catch (error) {
      console.error("Error generating answer:", error);
      setResponseText("Failed to generate answer. Please try again.");
    }
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>AI Chat</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your question here..."
        rows={4}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={generateAnswer}>Generate Answer</button>
      <div style={{ marginTop: "1rem" }}>
        <h3>Response:</h3>
        <textarea
          value={responseText}
          readOnly
          rows={6}
          style={{ width: "100%", backgroundColor: "#f3f3f3" }}
        />
      </div>
    </div>
  );
}

export default AIChat;
