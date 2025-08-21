import {
  getNews,
  getNewsByCity,
  getNewsByState,
  createNews,
  deleteNews,
} from "../../models/news/news.model.js";

const httpGetNews = async (req, res) => {
  try {
    const news = await getNews();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: "Error getting news", details: error });
  }
};

const httpGetNewsByCity = async (req, res) => {
  try {
    const news = await getNewsByCity(req.params.city);
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: "Error getting news", details: error });
  }
};

const httpGetNewsByState = async (req, res) => {
  try {
    const news = await getNewsByState(req.params.state);
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: "Error getting news", details: error });
  }
};

const httpCreateNews = async (req, res) => {
  try {
    const news = await createNews(req.body);
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: "Error creating news", details: error });
  }
};

const httpDeleteNews = async (req, res) => {
  try {
    const deletedNews = await deleteNews(req.params.id);
    res.status(200).json(deletedNews);
  } catch (error) {
    res.status(500).json({ error: "Error deleting news", details: error });
  }
};

export {
  httpGetNews,
  httpGetNewsByCity,
  httpGetNewsByState,
  httpCreateNews,
  httpDeleteNews,
};
