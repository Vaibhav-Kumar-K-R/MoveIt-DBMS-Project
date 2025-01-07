/**
 * Formats an Indian PIN code.
 * Ensures it has exactly six digits and groups them properly.
 *
 * @param {string | number} pinCode - The PIN code to format.
 * @returns {string} - The formatted PIN code or an error message if invalid.
 */
export const formatIndianPincode = (pinCode: string): string => {
  // Convert to string for consistent processing
  const pinCodeStr = pinCode.trim();

  // Validate PIN code (should be exactly 6 digits)
  if (!/^\d{6}$/.test(pinCodeStr)) {
    throw new Error("Invalid PIN code. It must be a 6-digit number.");
  }

  // Format the PIN code (optional grouping for better readability, e.g., '123 456')
  return pinCodeStr.replace(/(\d{3})(\d{3})/, "$1 $2");
};
