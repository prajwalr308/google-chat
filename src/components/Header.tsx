"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logout from "./LogoutButton";
import AuthButton from "./LogoutButton";
import SigninButton from "./SigninButton";
import LogoutButton from "./LogoutButton";
import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  console.log(session);
  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2  justify-between">
          <Image
            className="rounded-full mx-2 object-contain"
            src={session?.user?.image || "/logo.png"}
            alt="user logo"
            width={72}
            height={12}
          />
          <div className="my-2">
            <p className="text-blue-400 font-bold">logged in as</p>
            <p>{session?.user?.name}</p>
          </div>
        </div>

        <LogoutButton
          clickHandler={() => {
            signOut();
            console.log("logout");
          }}
        />
      </header>
    );

  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image src="/logo.png" alt="Meta logo" width={72} height={12} />
          <p className="text-blue-400 font-bold">Welcome to google chat</p>
        </div>
        <SigninButton
          clickHandler={() => {
            signIn("google");
            console.log("signin");
          }}
        />
      </div>
    </header>
  );
}

export default Header;
