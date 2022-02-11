export const getGeoLocation = async (val) => {
  const response = await fetch(
    "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + val
  );
  const data = await response.json();
  return [data[0].lat, data[0].lon];
};
