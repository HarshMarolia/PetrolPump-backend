import Price from "./price.schema.js";

const createPriceIndicator = async () => {
  try {
    const collection = await Price.find();
    if (collection.length > 0) {
      const resetPrice = await Price.findOneAndUpdate(
        { petrolPrice: collection[0].petrolPrice },
        { $set: { dieselPrice: 0, petrolPrice: 0 } },
        { new: true }
      );
      return resetPrice;
    } else {
      const newPrice = await Price.create({
        petrolPrice: 0,
        dieselPrice: 0,
      });
      return newPrice;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getPriceIndicator = async () => {
  try {
    const price = await Price.find().select("petrolPrice dieselPrice -_id");
    return price;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePetrolPriceIndicator = async (price) => {
  try {
    const collection = await Price.find();
    if (collection.length > 0) {
      const updatedPrice = await Price.findOneAndUpdate(
        { petrolPrice: collection[0].petrolPrice },
        {
          $set: { petrolPrice: price, dieselPrice: collection[0].dieselPrice },
        },
        { new: true }
      );
      return updatedPrice;
    } else {
      throw new Error("No price indicator found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDeieselPriceIndicator = async (price) => {
  try {
    const collection = await Price.find();
    if (collection.length > 0) {
      const updatedPrice = await Price.findOneAndUpdate(
        { dieselPrice: collection[0].dieselPrice },
        {
          $set: { dieselPrice: price, petrolPrice: collection[0].petrolPrice },
        },
        { new: true }
      );
      return updatedPrice;
    } else {
      throw new Error("No price indicator found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  createPriceIndicator,
  getPriceIndicator,
  updatePetrolPriceIndicator,
  updateDeieselPriceIndicator,
};
