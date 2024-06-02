import Client from "./client.schema.js";

const getClients = async () => {
  try {
    const clients = await Client.find().populate({
      path: "petrol_pumps",
      select: "name email city state -_id",
    });
    return clients;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getClientById = async (id) => {
  try {
    const client = await Client.findOne({ pan_number: id }).populate({
      path: "petrol_pumps",
      select: "name email city state -_id",
    });
    return client;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createClient = async (clientData) => {
  try {
    const { pan_number, name, userId } = clientData;

    let client = await Client.findOne({ pan_number });

    if (client) {
      if (client.petrol_pumps.includes(userId)) {
        return client;
      }

      client.petrol_pumps.push(userId);
      client = await client.save();
    } else {
      client = await Client.create({
        pan_number,
        name,
        petrol_pumps: [userId],
      });
    }

    return client;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateClient = async (id, client) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(id, client, {
      new: true,
    });
    if (!updateClient) {
      throw new Error("Client not found");
    }
    return updatedClient;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteClient = async (id) => {
  const deletedClient = await Client.findByIdAndDelete(id);
  return deletedClient;
};

export { getClients, getClientById, createClient, updateClient, deleteClient };
