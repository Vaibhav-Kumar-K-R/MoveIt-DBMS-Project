export type Vehicle = {
  _id: string;
  number_plate: string;
  curr_status: "available" | "in_use" | "in_maintenance" | "not_available";
  capacity: number;
  vehicle_img: {
    vehicle_img_url: string;
    public_id: string;
  };
  model: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type Vehicles = {
  vehicles: Vehicle[];
};
