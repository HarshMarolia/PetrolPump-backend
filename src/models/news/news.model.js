import News from "./news.schema";

const getNews = async () => {
  const news = await News.find();
  return news;
};

const getNewsByState = async (state) => {
  const news = await News.find({
    newsFor: { $in: ["state", "country"] },
    state,
  });
  return news;
};

const getNewsByCity = async (city) => {
  const news = await News.find({
    newsFor: { $in: ["city", "country"] },
    city,
  });
  return news;
};

const createNews = async (news) => {
  const createdNews = await News.create(news);
  return createdNews;
};

const deleteNews = async (id) => {
  const deletedNews = await News.findByIdAndDelete(id);
  return deletedNews;
};

export default {
  getNews,
  getNewsByCity,
  getNewsByState,
  createNews,
  deleteNews,
};
