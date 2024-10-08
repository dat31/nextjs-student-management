"use client";

import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICreateProperty } from "@/app/lib/schemas";
import { PropertyType } from "@prisma/client";
import clsx from "clsx";

export default function PropertyTypeSelection({
  form,
  className,
}: {
  form: UseFormReturn<ICreateProperty>;
  className: string;
}) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem id="type" className={className}>
          <FormLabel>Property type</FormLabel>
          <Select
            name="type"
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl className="shadow-none">
              <SelectTrigger
                className={clsx(!field.value && "text-muted-foreground")}
              >
                <SelectValue placeholder="Select a property type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={PropertyType.APARTMENT}>Apartment</SelectItem>
              <SelectItem value={PropertyType.HOTEL}>Hotel</SelectItem>
              <SelectItem value={PropertyType.REAL_ESTATE}>
                Real estate
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
