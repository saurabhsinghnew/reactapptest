import { useState } from "react";

function CreateExample() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    if (!inputValue.trim()) return; // avoid empty entries

    // Add new item to state
    setItems([...items, inputValue]);
    setInputValue(""); // clear input after submit
  };

  return (
    <div>
      <h2>Create Operation Example</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter item"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default CreateExample;
