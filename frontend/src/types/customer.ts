import { Vendor } from "./vendor";

type Warehouse = {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

// Need type out the customer details. Will do when we start working on frontend.
export type Tracking = {
  _id: string;
  order_id: string;
  warehouse_id: Warehouse;
  driver_id: string;
  vehicle_id: string;
  isVerified: boolean;
  status: "arrived" | "departed" | "out_for_delivery";
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  _id: string;
  tracking_id: string;
  shipping_id: string;
  vendor_id: Vendor;
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
  customer_address: string;
  order_placed_date: Date;
  order_delivered_date: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CustomerOrderDetail = {
  order: Order;
  tracking: Tracking[];
};
