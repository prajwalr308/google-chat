"use client";

import React from "react";

function LogoutButton({
  clickHandler,
}: {
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button onClick={clickHandler} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Logout
    </button>
  );
}

export default LogoutButton;
