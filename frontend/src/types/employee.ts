export type EmployeeType = {
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
  role: string;
  driving_experience: number;
  salary: number;
  curr_status: string;
  work_status: string;
};
