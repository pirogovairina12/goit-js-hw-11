import newGallery from './newsPictures.js';
import LoadMoreBtn from './components/LoadMoreBtn.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};


const newsPictures = new newGallery();
const loadMoreBtn = new LoadMoreBtn({
  selector: '#loadMore',
  isHidden: true,
});


const searchQuery = '';

refs.form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchArticles);

function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const value = form.elements.news.value.trim();

  if (value === '') alert('No value!');
  else {
    newsPictures.searchQuery = value;
    newsPictures.resetPage();


    clearNewsList();
    fetchArticles().finally(() => form.reset());
  }


}

async function fetchArticles() {
  loadMoreBtn.disable();

  try {
    const markup = await getArticlesMarkup();
    if (!markup) throw new Error('No data');
    updateNewsList(markup);
  } catch (err) {
    onError(err);
  }

  loadMoreBtn.enable();
}


async function getArticlesMarkup() {
  try {
    const articles = await newsPictures.getNews();
    if(articles.length >= 40){
      loadMoreBtn.show();}


    if(articles.length<40) {
      loadMoreBtn.hide();
    }

    if (newsPictures.page === newsPictures.totalPages + 1){
      loadMoreBtn.hide();
    }

    return articles.reduce(
      (markup, article) => markup + createMarkup(article),
      '',
    );
  } catch (err) {
    onError(err);
  }
}


function createMarkup({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
  return `<a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" title="" data-large="${largeImageURL}" />
    <div class="photo-card">
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views:</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${downloads}
        </p>
      </div>
    </div>
  </a>`;
}

function clearNewsList() {
  refs.gallery.innerHTML = '';
}

function onError(err) {
  console.error(err);
  loadMoreBtn.hide();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function updateNewsList(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  Notiflix.Notify.success('Sol lucet omnibus');
  initializeLightbox();
}

function initializeLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
