import { Order } from "./order";

type Warehouse = {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export type Tracking = {
  _id: string;
  order: string;
  warehouse: Warehouse;
  driver_id: string;
  vehicle: string;
  isVerified: boolean;
  status: "arrived" | "departed" | "out_for_delivery";
  createdAt: Date;
  updatedAt: Date;
};

export type CustomerOrderDetail = {
  order: Order;
  tracking: Tracking[];
};
