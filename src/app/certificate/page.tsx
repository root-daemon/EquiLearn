import React from "react";
import img from "@/app/images/Certificate.png";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold">Congrats!</h1>
      <p className="text-md mb-8 opacity-40">
        Congrats on completing on the quiz!
      </p>
      <Image
        src={img}
        alt="Certificate"
        className="max-w-[600px] select-none object-cover"
      />
      <div className="absolute -bottom-12 h-32 w-screen -rotate-2 bg-clr" />
    </main>
  );
}
