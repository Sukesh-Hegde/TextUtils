import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("converted to UpperCase", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleLoClick = (event) => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("converted to LowerCase", "success");
  };
  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  const clear = () => {
    setText("");
    props.showAlert("Message Cleared", "success");
  };

  const handleLoCopy = () => {

    navigator.clipboard.writeText(text);
    props.showAlert("Text copied", "success");
  };

  const [text, setText] = useState("");
  return (
    <>
      <div
        className="container"
        style={{
          color: props.mode == "light" ? "#3a275c" : "white",
        }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            style={{
              backgroundColor: props.mode == "dark" ? "#3a275c" : "white",
              color: props.mode == "light" ? "#3a275c" : "white",
            }}
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
          <button
            disabled={text.length === 0}
            className="btn btn-primary my-2 mx-2"
            onClick={handleUpClick}
          >
            Conver to uppercase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary "
            onClick={handleLoClick}
          >
            Conver to lowercase
          </button>
          <button
            disabled={text.length === 0}
            type="submit"
            onClick={speak}
            className="btn btn-warning mx-2 my-2"
          >
            Speak
          </button>
          <button
            disabled={text.length === 0}
            type="submit"
            onClick={clear}
            className="btn btn btn-danger mx-2 my-2"
          >
            Clear
          </button>

          <button
            disabled={text.length === 0}
            className="btn btn-primary "
            onClick={handleLoCopy}
          >
            Copy
          </button>
        </div>
      </div>
      <div
        className="container my-2"
        style={{
          color: props.mode == "light" ? "#3a275c" : "white",
        }}
      >
        <h2>Your text summary</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.length} characters
        </p>
        <p>
          {0.08 *
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes to read
        </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview"}</p>
      </div>
    </>
  );
}
