"use client";
import { getProviders, signIn } from "next-auth/react";
import React from "react";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};
const SignInComponent = ({ providers }: Props) => {
  return (
    <div className="flex justify-center align-middle mt-12">
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
            className="p-3 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL || "http://localhost:3000",
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SignInComponent;
