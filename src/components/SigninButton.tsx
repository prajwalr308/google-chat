"use client";

import React from "react";

function SigninButton({
  clickHandler,
}: {
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button onClick={clickHandler} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Signin
    </button>
  );
}

export default SigninButton;
