export default function transformAddress(structuredAddress) {
  const { firstName, lastName, city, houseNumber, lat, lon, postcode, street } =
  structuredAddress;
  return {
    city: city || "",
    firstName: firstName || "",
    houseNumber: houseNumber || "",
    id: `${lat || Date.now()}_${lon || Math.random()}`,
    lastName: lastName || "",
    postcode: postcode || "",
    street: street || "",
  };
}
