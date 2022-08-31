import React, { useState } from "react";

export default function Operation() {
  const btn = [
    ["C", "%", "+-", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "+"],
    [1, 2, 3, "-"],
    [".", 0, "="],
  ];

  let [num, setNum] = useState(0);
  let [res, setRes] = useState(0);
  let [sign, setSign] = useState("");
  let [equ, setEqu] = useState([]);

  const math = (a, b, sign) =>
    sign === "+"
      ? setRes(a + b)
      : sign === "-"
      ? setRes(a - b)
      : sign === "X"
      ? setRes(a * b)
      : setRes(a / b);

  const resetHandler = (e) => {
    setNum(0);
    setRes(0);
    setSign("");
    setEqu("");
  };
  const invertHandler = (e) => {
    if (num) {
      setNum(num * -1);
      if (num) equ.pop();
      setEqu([...equ, num * -1]);
    }
  };
  const percentHandler = () => {
    if (num && sign) math(num / 100, res, sign);

    if (num) {
      setNum(num / 100);
      setSign("");
      setEqu([...equ, " ", "%"]);
    }
  };
  const signHandler = (e) => {
    const value = e.target.value;
    if (sign && num === "") {
      // to handle operator sign double clicked
      setEqu(equ.pop());
    }
    setSign(value);
    setRes(!res && num ? num : res);
    if (num && sign) {
      math(res, num, sign);
    }
    setEqu([...equ, value]);
    setNum("");
  };
  const dotHandler = (e) => {
    setNum(!num.toString().includes(".") ? num + e.target.value : num);
  };
  const equalsHandler = () => {
    if (sign && num) {
      math(Number(res), Number(num), sign);
      setSign("");
      setNum(0);
    }
  };
  const numHandler = (e) => {
    const value = e.target.value;
    setNum(
      num === 0 && value === "0"
        ? "0"
        : num % 1 === 0
        ? Number(num + value)
        : num + value
    );
    setEqu(
      num === 0 || !num
        ? [...equ, value]
        : num
        ? (equ.pop(), [...equ, Number(num + value)])
        : ""
    );
    console.log(equ);
    // setEqu([...equ, value]);
  };
  return (
    <>
      <div className="result">
        <div className="equation">{equ}</div>
        <div>{res ? res : num}</div>
      </div>
      <div id="buttons">
        {btn.flat().map((btn, i) => {
          return (
            <button
              key={i}
              value={btn}
              className={btn === "=" ? "equal" : ""}
              onClick={
                btn === "C"
                  ? resetHandler
                  : btn === "+-"
                  ? invertHandler
                  : btn === "%"
                  ? percentHandler
                  : btn === "="
                  ? equalsHandler
                  : btn === "+" || btn === "-" || btn === "X" || btn === "/"
                  ? signHandler
                  : btn === "."
                  ? dotHandler
                  : numHandler
              }
            >
              {btn}
            </button>
          );
        })}
      </div>
    </>
  );
}
