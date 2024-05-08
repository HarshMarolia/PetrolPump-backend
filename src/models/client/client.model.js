import Client from "./client.schema";

const getClients = async () => {
  const clients = await Client.find();
  return clients;
};

const getClientById = async (id) => {
  const client = await Client.findById(id);
  return client;
};

const createClient = async (clientData) => {
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
};

const updateClient = async (id, client) => {
  const updatedClient = await Client.findByIdAndUpdate(id, client, {
    new: true,
  });
  return updatedClient;
};

const deleteClient = async (id) => {
  const deletedClient = await Client.findByIdAndDelete(id);
  return deletedClient;
};

export default {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
