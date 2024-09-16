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
import { TransactionType } from "@prisma/client";
import clsx from "clsx";

export default function TransactionTypeSelection({
  form,
  className,
}: {
  form: UseFormReturn<ICreateProperty>;
  className: string;
}) {
  return (
    <FormField
      control={form.control}
      name="transactionType"
      render={({ field }) => (
        <FormItem id="type" className={className}>
          <FormLabel>Transaction type</FormLabel>
          <Select
            name="transactionType"
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl className="shadow-none ">
              <SelectTrigger
                className={clsx(!field.value && "text-muted-foreground")}
              >
                <SelectValue placeholder="Select a transaction type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={TransactionType.RENT}>Rent</SelectItem>
              <SelectItem value={TransactionType.SELL}>Sell</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
