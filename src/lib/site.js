// Central site config — later some of these move to the admin "Settings" table.
export const site = {
  name: "CH Power Solutions",
  short: "CH Power",
  // Small quality tagline shown under the wordmark (edit freely).
  slogan: "[ name of quality ]",
  tagline: "Solar Inverters & Power Solutions",
  description:
    "CH Power Solutions supplies high-efficiency solar inverters, hybrid inverters and power circuits — 6kW to 20kW and beyond. Reliable energy solutions with nationwide delivery.",
  url: "https://chpowersolutions.com",
  email: "sales@chpowersolutions.com",
  phone: "+92 300 1234567",
  whatsapp: "+92 300 1234567",
  address: "Lahore, Pakistan",
  currency: "PKR",
  currencySymbol: "Rs",
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
};

export function formatPrice(amount) {
  return `${site.currencySymbol} ${Number(amount).toLocaleString("en-PK")}`;
}
