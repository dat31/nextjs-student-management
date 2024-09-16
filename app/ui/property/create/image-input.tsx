"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React, { ChangeEvent, useRef } from "react";
import { ControllerRenderProps, SetFieldValue } from "react-hook-form";

type Props = { setValue: SetFieldValue<any> } & ControllerRenderProps;

function ImageInput({ setValue, value }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  function updateImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const [file] = event.target.files;
      setValue("imageUrl", file, { shouldValidate: true });
    }
  }

  return (
    <>
      <div
        style={
          value
            ? {
                background: `url("${URL.createObjectURL(
                  value as any
                )}") 0% 0% / cover no-repeat`,
              }
            : {}
        }
        className={clsx(
          `image-input gap-2 aspect-video col-span-6 flex items-center justify-center`,
          !value && "border-dashed border-2 border-border",
          value && "[&>button]:hover:inline-flex [&>button]:hidden "
        )}
      >
        <Button
          type="button"
          variant={"secondary"}
          onClick={handleImageUploadClick}
        >
          <UploadIcon className="mr-2" />
          Click to upload image
        </Button>
      </div>
      <input
        value={""}
        ref={fileInputRef}
        type="file"
        accept={"image/*"}
        className="hidden"
        onChange={updateImage}
      />
    </>
  );
}

export default React.memo(ImageInput);
