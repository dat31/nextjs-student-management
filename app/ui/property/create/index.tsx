"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { CreatePropertySchema, ICreateProperty } from "@/app/lib/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import ImageInput from "./image-input";
import Steps from "./steps";
import PropertyTypeSelection from "./property-type-selection";
import TransactionTypeSelection from "./transaction-type-selection";
import { Checkbox } from "@/components/ui/checkbox";
import { Property, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import PropertyDetail from "../detail";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteProps } from "next-mdx-remote";
import { createProperty } from "@/app/lib/actions";

const ContentInput = dynamic(() => import("./content-input"), {
  loading: () => (
    <div>
      <div className="h-10 bg-neutral-100" />
      <div className="bg-neutral-100 mt-4 h-104 overflow-y-scroll" />
    </div>
  ),
  ssr: false,
});

const items = [
  {
    id: "air_conditioner",
    label: "Air conditioner",
  },
  {
    id: "tv",
    label: "TV",
  },
  {
    id: "refrigerator",
    label: "Refrigerator",
  },
  {
    id: "desk",
    label: "Desk",
  },
  {
    id: "sofa",
    label: "Sofa",
  },
  {
    id: "kitchen",
    label: "Kitchen",
  },
] as const;

export default function CreateForm() {
  const [step, setStep] = useState(0);
  const [mdx, setMdx] = useState<MDXRemoteProps>();
  const prevStep = useRef(0);
  const form = useForm<ICreateProperty>({
    resolver: zodResolver(CreatePropertySchema),
    defaultValues: {
      name: "",
      address: "",
      noBathrooms: "1",
      noBeds: "1",
      interiors: [],
      petFriendly: false,
      contentUrl: "Content goes here...",
      parkingSlots: "1",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
    getValues,
  } = form;
  const ref = useRef<MDXEditorMethods>(null);

  function submit(data: ICreateProperty) {
    if (step !== 2) {
      setStep((prev) => prev + 1);
      return;
    }
    return createProperty(data);
  }

  useEffect(() => {
    prevStep.current = step;
  }, [step]);

  useEffect(() => {
    if (step === 2) {
      serialize(getValues().contentUrl as string).then(setMdx);
    }
  }, [step, getValues]);

  const { data } = useSession();

  return (
    <>
      <Steps activeStep={step} onStepClick={setStep} />
      <Form {...form}>
        <form
          className="w-full grid grid-cols-6 gap-4 lg:gap-6"
          onSubmit={handleSubmit(submit)}
        >
          {step === 0 && (
            <>
              <FormField
                control={control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="col-span-6 ">
                    <FormControl>
                      <ImageInput setValue={setValue} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

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

              <TransactionTypeSelection
                form={form}
                className="col-span-6 md:col-span-3"
              />

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
                      <Input
                        placeholder="Input number of bath rooms"
                        {...field}
                      />
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
            </>
          )}

          {step === 1 && (
            <>
              <FormField
                control={control}
                name="waterCharge"
                render={({ field }) => (
                  <FormItem className="col-span-6 md:col-span-2">
                    <FormLabel>Water charges ($/month)</FormLabel>
                    <FormControl>
                      <Input placeholder="Input water charges" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={control}
                name="electricCharge"
                render={({ field }) => (
                  <FormItem className="col-span-6 md:col-span-2">
                    <FormLabel>Electric charges ($/month)</FormLabel>
                    <FormControl>
                      <Input placeholder="Input electric charges" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={control}
                name="internetCharge"
                render={({ field }) => (
                  <FormItem className="col-span-6 md:col-span-2">
                    <FormLabel>Internet ($/month)</FormLabel>
                    <FormControl>
                      <Input placeholder="Input internet charges" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={control}
                name="otherCharge"
                render={({ field }) => (
                  <FormItem className="col-span-6 md:col-span-2">
                    <FormLabel>Others ($/month)</FormLabel>
                    <FormControl>
                      <Input placeholder="Input others charges" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={control}
                name="parkingSlots"
                render={({ field }) => (
                  <FormItem className="col-span-6 md:col-span-2">
                    <FormLabel>Parking slots</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input number of parking slots"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="petFriendly"
                render={({ field }) => (
                  <FormItem className="col-span-6 md:col-span-2 flex flex-row items-start space-x-3 space-y-0 md:py-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Pet-friendly</FormLabel>
                      <FormDescription>
                        Check if renter be allow to have pet
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="col-span-6">
                <FormField
                  name="interiors"
                  control={form.control}
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Interiors</FormLabel>
                        <FormDescription>
                          Select the available interiors.
                        </FormDescription>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-4">
                        {items.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="interiors"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...(field.value as unknown as string),
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="contentUrl"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormControl>
                      <ContentInput
                        {...field}
                        ref={ref}
                        onBlur={() => {
                          setValue("contentUrl", ref.current?.getMarkdown());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </>
          )}

          {step === 2 && (
            <div className="col-span-6">
              <PropertyDetail
                mdx={mdx as MDXRemoteProps}
                imageUrl={
                  getValues().imageUrl &&
                  URL.createObjectURL(getValues().imageUrl)
                }
                property={
                  {
                    ...getValues(),
                    creator: data?.user as User,
                  } as unknown as Property & { creator: User }
                }
              />
            </div>
          )}

          <div className="flex justify-end col-span-6 mt-4 lg:mt-6">
            <Button size="lg" type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              {step === 2 ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
