import Price from "./price.schema";

const getPetrolindicator = async () => {
  const price = await Price.findOne({ petrolPrice });
  return price;
};
const getDeieselindicator = async () => {
  const price = await Price.findOne({ dieselPrice });
  return price;
};

const updatePetrolPriceIndicator = async (price) => {
  const collection = await Price.find();
  if (collection.length > 0) {
    const updatedPrice = await Price.findOneAndUpdate(
      { petrolPrice: collection[0].petrolPrice },
      { $set: { petrolPrice: price } },
      { new: true }
    );
    return updatedPrice;
  }
};

const updateDeieselPriceIndicator = async (price) => {
  const collection = await Price.find();
  if (collection.length > 0) {
    const updatedPrice = await Price.findOneAndUpdate(
      { dieselPrice: collection[0].dieselPrice },
      { $set: { dieselPrice: price } },
      { new: true }
    );
    return updatedPrice;
  }
};

export default {
  getPetrolindicator,
  getDeieselindicator,
  updatePetrolPriceIndicator,
  updateDeieselPriceIndicator,
};
