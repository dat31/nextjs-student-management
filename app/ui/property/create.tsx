"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { createProperty } from "@/app/lib/actions";
import { CreatePropertySchema, ICreateProperty } from "@/app/lib/schemas";
import Steps from "./steps";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PropertyTypeSelection from "./property-type-selection";
import { ReloadIcon } from "@radix-ui/react-icons";

const ContentInput = dynamic(() => import("./content-input"), {
  loading: () => (
    <div>
      <div className="h-10 bg-neutral-100" />
      <div className="bg-neutral-100 mt-4 h-104 overflow-y-scroll" />
    </div>
  ),
  ssr: false,
});

export default function CreateForm() {
  const [step, setStep] = useState(0);
  const form = useForm<ICreateProperty>({
    resolver: zodResolver(CreatePropertySchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting, isLoading },
    control,
  } = form;
  const ref = useRef<MDXEditorMethods>(null);

  function submit(data: ICreateProperty) {
    return createProperty({
      ...data,
      contentUrl: ref.current?.getMarkdown() as string,
    });
  }

  return (
    <>
      <Steps activeStep={step} onStepClick={setStep} />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(submit)}
          className="w-full grid grid-cols-6 gap-4 lg:gap-6"
        >
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-6 md:col-span-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Input name of property" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-6 md:col-span-4">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Input address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <PropertyTypeSelection
            form={form}
            className="col-span-6 md:col-span-3"
          />

          <FormField
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="col-span-6 md:col-span-3">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(evt) => {
                      const [img] = evt.target.files || [];
                      form.setValue("imageUrl", img);
                    }}
                    value={form.getValues("imageUrl")?.value}
                    placeholder="Choose image for property"
                    type="file"
                    accept="image/*"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={control}
            name="noBeds"
            render={({ field }) => (
              <FormItem className="col-span-3 md:col-span-1">
                <FormLabel>No. Beds</FormLabel>
                <FormControl>
                  <Input placeholder="Input number of beds" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={control}
            name="noBathrooms"
            render={({ field }) => (
              <FormItem className="col-span-3 md:col-span-1">
                <FormLabel>No. Bathrooms</FormLabel>
                <FormControl>
                  <Input placeholder="Input number of bath rooms" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={control}
            name="width"
            render={({ field }) => (
              <FormItem className="col-span-3 md:col-span-1">
                <FormLabel>Width(m)</FormLabel>
                <FormControl>
                  <Input placeholder="Input width" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={control}
            name="height"
            render={({ field }) => (
              <FormItem className="col-span-3 md:col-span-1">
                <FormLabel>Height(m)</FormLabel>
                <FormControl>
                  <Input placeholder="Input height" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem className="col-span-6 md:col-span-2">
                <FormLabel>Price($)</FormLabel>
                <FormControl>
                  <Input placeholder="Input price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={control}
            name="contentUrl"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <ContentInput {...field} ref={ref} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <div className="flex justify-end col-span-6">
            <Button size="lg" type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
