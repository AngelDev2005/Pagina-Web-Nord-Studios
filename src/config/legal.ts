export const legal = {
  controller: process.env.LEGAL_CONTROLLER,
  address: process.env.LEGAL_ADDRESS,
  rights: process.env.LEGAL_RIGHTS_EMAIL,
  register: process.env.LEGAL_DATA_REGISTER,
  retention: process.env.LEGAL_RETENTION,
  transfers: process.env.LEGAL_TRANSFERS,
};
export const privacyReady =
  process.env.PRIVACY_APPROVED === "true" &&
  Object.values(legal).every(Boolean);
