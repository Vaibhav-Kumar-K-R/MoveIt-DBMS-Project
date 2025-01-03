export default interface WarehouseType {
  _id: string;
  name: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  status: string;
  manager: {
    profile_img: {
      profile_img_url: string;
    };
    name: string;
    profile_img_url: string;
    phone: string;
  };
}

export type CreateWarehouseResponseType = {
  message: string;
  warehouse_id: string;
};
export type UpdateWarehouseResponseType = {
  message: string;
  warehouse_id: string;
};

export type ManagerListType = {
  _id: string;
  name: string;
  profile_img: {
    profile_img_url: string;
  };
  email: string;
};
