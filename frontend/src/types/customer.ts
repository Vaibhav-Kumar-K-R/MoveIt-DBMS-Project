import { EmployeeType } from "./employee";
import { Order } from "./order";
import { Vehicle } from "./vehicle";
import { Warehouse } from "./warehouse";

export type Tracking = {
  _id: string;
  order: Order;
  employee: EmployeeType;
  warehouse: Warehouse;
  vehicle: Vehicle;
  status: "arrived" | "departed" | "out_for_delivery";
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CustomerOrderDetail = {
  order: Order;
  tracking: Tracking[];
};
