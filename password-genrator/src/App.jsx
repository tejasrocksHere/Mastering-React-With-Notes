import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [Password, setPassword] = useState("");
  const [Char, setChar] = useState(true);
  const [Number, setNumber] = useState(true);
  const [Symbol, setSymbol] = useState(true);
  const [Length, setLength] = useState(8);

  const generatePassword = useCallback(() => {
    let str = "";
    if (Char) str = "ABCDEFGHIJKLMNOPQRSTUVWXVZabcdefghijklmnopqrstuvwxyz";
    if (Number) str += "0123456789";
    if (Symbol) str += "-=[';./@!#$%^&*";

    let pass = "";
    for (let i = 0; i < Length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [Char, Number, Symbol, Length]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(Password);
    alert("Password copied to clipboard!");
  };

  useEffect(() => {
    generatePassword();
  }, [Length, Char, Number, Symbol, generatePassword]);

  return (
    <>
      <label>Password: </label>
      <input type="text" value={Password} readOnly />

      <button onClick={copyToClipboard}>Copy</button>

      <label htmlFor="lengthRange">Length: {Length}</label>
      <input
        id="lengthRange"
        type="range"
        min={6}
        max={100}
        value={Length}
        onChange={(e) => setLength(parseInt(e.target.value))}
      />

      <label htmlFor="charCheckbox">Include Letters</label>
      <input
        id="charCheckbox"
        type="checkbox"
        checked={Char}
        onChange={() => setChar(!Char)}
      />

      <label htmlFor="numberCheckbox">Include Numbers</label>
      <input
        id="numberCheckbox"
        type="checkbox"
        checked={Number}
        onChange={() => setNumber(!Number)}
      />

      <label htmlFor="symbolCheckbox">Include Symbols</label>
      <input
        id="symbolCheckbox"
        type="checkbox"
        checked={Symbol}
        onChange={() => setSymbol(!Symbol)}
      />
    </>
  );
}

export default App;
  