import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const passwordRef = useRef();
  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isCharAllowed) str += "~!@#$%&*";
    if (isNumAllowed) str += "0123456789";
    for (let index = 0; index < length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isCharAllowed, isNumAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, length, isCharAllowed, isNumAllowed]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-black h-screen w-screen text-orange-500 p-4">
        <h1 className="text-zinc-600">Password Generator </h1>
        <div className="flex-col flex">
          <input
            value={password}
            onClick={passwordGenerator}
            placeholder={password}
            readOnly
            className="bg-gray-400 p-3 m-2 text-3xl outline-none text-black border "
            ref={passwordRef}
          />
          <div className="flex justify-between px-4">
            <label>Length : {length}</label>
            <button
              onClick={copyPassword}
              className="text-white p-2 hover:bg-blue-700 bg-blue-400 rounded-lg"
            >
              Copy
            </button>
          </div>
          <input
            type="range"
            value={length}
            min={8}
            max={24}
            onChange={(e) => setLength(e.target.value)}
          />
          <div className=" flex px-4 p-1 gap-3">
            <input
              type="checkbox"
              defaultChecked={isCharAllowed}
              onClick={() => setIsCharAllowed((prev) => !prev)}
            />
            <label>Character</label>
          </div>
          <div className=" flex px-4 p-1 gap-3">
            <input
              type="checkbox"
              defaultChecked={isNumAllowed}
              onClick={() => setIsNumAllowed((prev) => !prev)}
            />
            <label>Number</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
