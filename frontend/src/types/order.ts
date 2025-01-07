import { Vendor } from "./vendor";

export type Order = {
  _id: string;
  tracking_id: string;
  shipping_id: string;
  vendor: Vendor;
  warehouse: string;
  warehouse_status: string;
  product_name: string;
  product_description: string;
  quantity: number;
  product_img_url: string;
  price_details: {
    product_price: number;
    delivery_charge: number;
    gst: number;
    total_price: number;
  };
  weight: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_city: string;
  customer_state: string;
  customer_address: string;
  order_placed_date: Date;
  order_delivered_date: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};