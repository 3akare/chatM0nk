import React from "react";

export default function SendButton({ text }) {
  return (
    <button disabled={text == "" ? true : false} className="btn btn-primary font-mono">
      send
    </button>
  );
}
