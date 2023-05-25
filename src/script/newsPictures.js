import axios from 'axios';

const API_KEY = '36426923-d50d914c234d512aa184679c7';
const URL = 'https://pixabay.com/api/';

export default class newGallery {
  constructor() {
    this.page = 0;
    this.searchQuery = '';
    this.totalPages = 0;
    this.getTotalHits();
  }

  async getTotalHits() {
    const totalHitsUrl = `${URL}?key=${API_KEY}&q=${encodeURIComponent(this.searchQuery)}&image_type=all`;

    try {
      const response = await axios.get(totalHitsUrl);
      const totalHits = response.data.totalHits;
      this.totalPages = Math.ceil(totalHits / 40);
    } catch (error) {
      console.error(error);
    }
  }

  async getNews() {
    const { data } = await axios.get(`${URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
    this.incrementPage();
    return data.hits;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

}



