import * as z from "zod";


export const ImageSchema = z.object({
    "asset_id": z.string(),
    "public_id": z.string(),
    "url": z.string(),
    "secure_url": z.string(),
    "_id": z.string(),
});
export type Image = z.infer<typeof ImageSchema>;

export const AddressSchema = z.object({
    "street": z.string(),
    "city": z.string(),
    "state": z.string(),
    "postalCode": z.number(),
    "country": z.string(),
    "_id": z.string(),
});
export type Address = z.infer<typeof AddressSchema>;

export const ShopSchema = z.object({
    "owner": z.string(),
    "name": z.string(),
    "address": AddressSchema,
    "_id": z.string(),
});
export type Shop = z.infer<typeof ShopSchema>;

export const ShopOwnerSchema = z.object({
    "_id": z.string(),
    "shop": ShopSchema,
});
export type ShopOwner = z.infer<typeof ShopOwnerSchema>;

export const ProductElementSchema = z.object({
    "_id": z.string(),
    "name": z.string(),
    "description": z.string(),
    "price": z.number(),
    "category": z.string(),
    "brand": z.string(),
    "stock": z.number(),
    "images": z.array(ImageSchema),
    "shopOwner": ShopOwnerSchema,
});
export type ProductElement = z.infer<typeof ProductElementSchema>;

export const ProductSchema = z.object({
    "count": z.number(),
    "products": z.array(ProductElementSchema),
});
export type Product = z.infer<typeof ProductSchema>;
