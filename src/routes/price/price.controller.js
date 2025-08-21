import {
  createPriceIndicator,
  getPriceIndicator,
  updatePetrolPriceIndicator,
  updateDeieselPriceIndicator,
} from "../../models/price/price.model.js";

const httpCreatePriceIndicator = async (req, res) => {
  try {
    const createPrice = await createPriceIndicator();
    res.status(200).json(createPrice);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating price indicator", details: error });
  }
};

const httpGetPriceIndicator = async (req, res) => {
  try {
    const indicator = await getPriceIndicator();
    res.status(200).json(indicator);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting price indicator", details: error });
  }
};

const httpUpdatePetrolPriceIndicator = async (req, res) => {
  try {
    const indicator = await updatePetrolPriceIndicator(req.body.price);
    res.status(200).json(indicator);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating petrol indicator", details: error });
  }
};

const httpUpdateDeieselPriceIndicator = async (req, res) => {
  try {
    const indicator = await updateDeieselPriceIndicator(req.body.price);
    res.status(200).json(indicator);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating diesel indicator", details: error });
  }
};

export {
  httpCreatePriceIndicator,
  httpGetPriceIndicator,
  httpUpdatePetrolPriceIndicator,
  httpUpdateDeieselPriceIndicator,
};
