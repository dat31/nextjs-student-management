import { z } from "zod";

export const CreatePropertySchema = z.object({
  type: requireWithMessage(),
  transactionType: requireWithMessage(),
  name: requireWithMessage(),
  address: z.string().min(10),
  imageUrl: z
    .any()
    .refine((image) => !!image, {
      message: "Image is required",
    })
    .refine(
      (image: File) => {
        console.log("size", image);
        return image?.size / 1024 < 2 * 1024;
      },
      {
        message: "Image size must < 2mb",
      }
    ),
  noBeds: z.string(),
  noBathrooms: z.string(),
  width: requireWithMessage(),
  height: requireWithMessage(),
  price: requireWithMessage(),
  contentUrl: z.string().optional(),
  waterCharge: z.string().optional(),
  electricCharge: z.string().optional(),
  internetCharge: z.string().optional(),
  otherCharge: z.string().optional(),
  parkingSlots: requireWithMessage(),
  petFriendly: z.boolean().optional(),
  interiors: z.array(z.string()).optional(),
});

function requireWithMessage() {
  return z.string().min(1, "Required");
}

export type ICreateProperty = z.infer<typeof CreatePropertySchema>;
