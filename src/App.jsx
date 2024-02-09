import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const ref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) {
      str += "0123456789";
    }
    if (charAllow) {
      str += "! @#$%^&*()-_+={}[]|;:<>,./?";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllow, charAllow, setPassword]);

  const copyText = useCallback(() => {
    ref.current?.select();
    // ref.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, charAllow, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-gray-800 shadow-md px-2 text-orange-500 rounded-lg py-3 my-8">
        <h2 className="text-3xl text-white text-center my-3">
          Password Generator
        </h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            name="pass"
            value={password}
            placeholder="Password"
            className="outline-none w-full px-3 py-1"
            id="pass"
            readOnly
            ref={ref}
          />
          <button
            className="outline-none bg-blue-700 text-white shrink-0 px-3 py-0.5"
            onClick={copyText}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              name="range"
              id="range"
              value={length}
              min={6}
              max={16}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="range">Length({length})</label>
            <input
              type="checkbox"
              name="numberInpt"
              id="numberInpt"
              defaultChecked={numberAllow}
              onChange={() => setNumberAllow((prev) => !prev)}
            />
            <label htmlFor="numberInpt">Number</label>
            <input
              type="checkbox"
              name="charInpt"
              id="charInpt"
              defaultChecked={charAllow}
              onChange={() => setCharAllow((prev) => !prev)}
            />
            <label htmlFor="charInpt">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
