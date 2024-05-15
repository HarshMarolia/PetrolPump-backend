import News from "./news.schema.js";

const getNews = async () => {
  try {
    const news = await News.find().populate({
      path: "newsWriter",
      select: "name",
    });
    return news;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getNewsByState = async (state) => {
  try {
    const news = await News.find({
      newsFor: { $in: ["state", "country"] },
      state,
    }).populate({
      path: "newsWriter",
      select: "name -_id",
    });
    return news;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getNewsByCity = async (city) => {
  try {
    const news = await News.find({
      newsFor: { $in: ["city", "country"] },
      city,
    }).populate({
      path: "newsWriter",
      select: "name -_id",
    });
    return news;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createNews = async (news) => {
  try {
    const createdNews = await News.create(news);
    return createdNews;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteNews = async (id) => {
  try {
    const deletedNews = await News.findByIdAndDelete(id);
    return deletedNews;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getNews, getNewsByCity, getNewsByState, createNews, deleteNews };
