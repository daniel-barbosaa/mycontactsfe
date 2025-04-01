import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  async listCategories() {
    const categories = await this.httpClient.get(`/categories`);
    return categories.map(categorie => CategoryMapper.toDomain(categorie));
  }
}

export default new CategoriesService();
