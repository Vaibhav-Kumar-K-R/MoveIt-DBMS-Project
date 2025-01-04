export type EmployeeType = {
  _id: string;
  name: string;
  licence_number: string;
  profile_img: {
    profile_img_url: string;
    public_id: string;
  };
  email: string;
  phone: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  dob: string;
  role: "driver" | "delivery_boy";
  driving_experience: number;
  salary: number;
  curr_status: string;
  work_status: string;
};

export type Employees = {
  drivers: EmployeeType[];
};
