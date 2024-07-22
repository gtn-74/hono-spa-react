import { createRoot } from "react-dom/client";
import { useState } from "react";

function App() {
  return (
    <>
      <h1>Hello, Hono with React!</h1>
      <h2>Example of useState()</h2>
      {/* コンポーネント */}
      <Counter />
      <h2>Example of API fetch()</h2>
      <ClockButton />
    </>
  );
}

// 通常のフロントの処理
function Counter() {
  const [count, setCount] = useState(0);
  return (
    // Counterの中身
    <button onClick={() => setCount(count + 1)}>
      You clicked me {count} times
    </button>
  );
}


// API処理
const ClockButton = () => {
  // 状態
  const [response, setResponse] = useState<string | null>(null);

  const handleClick = async () => {
    // API叩く
    const response = await fetch("/api/clock");
    const data = await response.json();
    //　
    console.log(response.headers.entries());


    // 
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );

    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    };
    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    // ClockButtonの中身
    <div>
      <button onClick={handleClick}>Get Server Time</button>
      {response && <pre>{response}</pre>}
    </div>
  );
};

const domNode = document.getElementById("root")!;

const root = createRoot(domNode);
// Reactのmain.tsxに書いてる部分
root.render(<App />);
