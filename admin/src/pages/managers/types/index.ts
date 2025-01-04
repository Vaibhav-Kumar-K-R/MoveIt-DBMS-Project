export interface ManagerType {
  _id: string;
  name: string;
  profile_img: {
    profile_img_url: string;
    public_id: string;
  };
  email: string;
  password: string;
  phone: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  dob: string;
  salary: number;
  work_status: string;
}
export type UpdateManagerResponseType = {
  message: string;
  warehouse_id: string;
};
