"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Property } from "@prisma/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import PropertyTypeSelection from "./property-type-selection";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const form = useForm({
    defaultValues: Object.fromEntries(searchParams),
  });
  const { control, handleSubmit } = form;

  function handleSearch(data: Partial<Property & any>) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        className="mb-12 w-full grid grid-cols-6 gap-4 lg:gap-6"
        onSubmit={handleSubmit(handleSearch)}
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-6 md:col-span-2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Input name" {...field} />
              </FormControl>
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
            </FormItem>
          )}
        ></FormField>

        <PropertyTypeSelection
          form={form as any}
          className="col-span-6 md:col-span-2"
        />

        <FormField
          control={control}
          name="noBeds"
          render={({ field }) => (
            <FormItem className="col-span-3 md:col-span-1">
              <FormLabel>No. beds</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Input number of beds"
                  {...field}
                />
              </FormControl>
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
                  type="number"
                  placeholder="Input number of bathrooms"
                  {...field}
                />
              </FormControl>
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
                <Input type="number" placeholder="Input width" {...field} />
              </FormControl>
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
                <Input type="number" placeholder="Input height" {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>

        <div className="flex justify-end col-span-6">
          <Button size={"lg"} type="submit">
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}
