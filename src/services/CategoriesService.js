import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';
const apiMyContactsUrl = import.meta.env.VITE_APP_API_URL;

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient(apiMyContactsUrl);
  }

  async listCategories() {
    const categories = await this.httpClient.get(`/categories`);
    return categories.map(categorie => CategoryMapper.toDomain(categorie));
  }
}

export default new CategoriesService();
