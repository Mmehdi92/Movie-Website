import React from "react";
import Image from "next/image";

export default function loading() {
  return <div className="flex justify-center m-auto">
    <Image width={200} height={200} src="spinner.svg" alt="loading..." />
  </div>;
}
