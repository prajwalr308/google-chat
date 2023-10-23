'use client'
import { getProviders } from "next-auth/react";
import Image from "next/image";
import React from "react";
import SignInComponent from "./SignInComponent";

const SigninPage = async () => {
  const providers = await getProviders();
  console.log(providers);
  return (
    <div >
      <div className="flex justify-center align-middle mt-10">
        <Image
          className="rounded-full mx-2 object-cover"
          width={200}
          height={400}
          src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
          alt="Profile picture"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
};

export default SigninPage;
