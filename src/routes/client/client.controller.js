import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../../models/client/client.model.js";

const httpGetClients = async (req, res) => {
  try {
    const clients = await getClients();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: "Error getting clients", details: error });
  }
};

const httpGetClientById = async (req, res) => {
  try {
    const client = await getClientById(req.params.id);
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: "Error getting client", details: error });
  }
};

const httpCreateClient = async (req, res) => {
  try {
    const client = await createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message || "Error creating client",
      details: error.details || null,
    });
  }
};

const httpUpdateClient = async (req, res) => {
  try {
    const client = await updateClient(req.params.id, req.body);
    res.status(200).json(client);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message || "Error updating client",
      details: error.details || null,
    });
  }
};

const httpDeleteClient = async (req, res) => {
  try {
    const client = await deleteClient(req.params.id);
    res.status(200).json(client);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message || "Error deleting client",
      details: error.details || null,
    });
  }
};

export {
  httpGetClients,
  httpGetClientById,
  httpCreateClient,
  httpUpdateClient,
  httpDeleteClient,
};
