// This is a Next.js component that uses the stablehorde API
import { useState } from "react";

export default function Home() {
  // Define state variables for prompt and output
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState([]);

  // Define a function that handles the button click
  const handleClick = async () => {
    // Make sure the prompt is not empty
    if (prompt) {
      // Make a request to the API with the prompt as a query parameter
      const response = await fetch(
        `https://stablehorde.net/api/?prompt=${prompt}`
      );
      // Parse the response as JSON
      const data = await response.json();
      // Set the output state with the data
      setOutput(data);
    }
  };

  return (
    <div className="container">
      <h1>Stablehorde Web App</h1>
      <p>Enter a prompt and get some images!</p>
      <div className="input">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt here"
        />
        <button onClick={handleClick}>Get Images</button>
      </div>
      <div className="output">
        {output.length > 0 && (
          <p>Here are some images based on your prompt:</p>
        )}
        {output.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }
        .input {
          display: flex;
          align-items: center;
          margin: 20px 0;
        }
        input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          margin-left: 10px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .output {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          grid-gap: 10px;
        }
        img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}