const API_KEY = `36426923-d50d914c234d512aa184679c7`;
const URL = `https://pixabay.com/api/`;



export default class newGallery {
  constructor() {
    this.page = 1;
    this.searchQuery = "";
  }

  async getNews() {
    const { data } = await axios.get(`${URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`);
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



