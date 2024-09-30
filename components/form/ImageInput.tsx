"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { LuUploadCloud, LuUser2 } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";

export default function ImageInput({ image }: { image?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleClick = () => {
    inputRef?.current?.click();
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className="mb-2 flex justify-center">
      <div className="relative ">
        {image || preview ? (
          <Image
            className="rounded-full w-28 h-28 border "
            src={preview || image}
            width={100}
            height={100}
            alt="image"
            priority={true}
          />
        ) : (
          <div className="rounded-full w-28 h-28 border ">
            <LuUser2 className="rounded-full w-28 h-28 " />
          </div>
        )}
        <div className="absolute -bottom-1 right-1">
          <input
            onChange={handleChange}
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            name="image"
          />
          {preview ? (
            <button className="rounded-full  bg-primary p-1">
              <IoMdCheckmark className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="rounded-full p-1 bg-primary text-white"
            >
              <LuUploadCloud className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
