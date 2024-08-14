"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { SetFieldValue, UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn & { setValue: SetFieldValue<any> };

function ImageInput({ setValue, ...props }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  function updateImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const [file] = event.target.files;
      setImageFile(file);
      setValue("imageUrl", file, { shouldValidate: true });
    }
  }

  return (
    <div
      className={
        "w-full h-64 lg:h-136 bg-primary-light-2 flex items-center justify-center relative "
      }
    >
      {imageFile ? (
        <Image
          src={URL.createObjectURL(imageFile)}
          fill
          alt="Image"
          className="object-cover"
        />
      ) : (
        <div
          className="text-primary  px-8 py-4 font-bold cursor-pointer"
          onClick={handleImageUploadClick}
        >
          <span>Upload image</span>
        </div>
      )}
      <input
        {...props}
        ref={fileInputRef}
        type="file"
        accept={"image/*"}
        className="hidden"
        onChange={updateImage}
      />
    </div>
  );
}

export default ImageInput;
