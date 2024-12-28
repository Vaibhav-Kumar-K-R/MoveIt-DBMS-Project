export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{5})(\d{5})/, "+91 $1 $2");
};
