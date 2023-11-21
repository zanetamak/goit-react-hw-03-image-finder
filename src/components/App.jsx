import { Component } from 'react';
import { Notify } from 'notiflix';

import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchPicturesByQuery } from './Api';
// Bez klamr, np. import Searchbar from './Searchbar/Searchbar';, zaimportowana byłaby cała zawartość modułu jako pojedyncza zmienna 
// (jeśli taka składnia byłaby poprawna w danym kontekście, co w przypadku komponentów React jest raczej rzadko stosowane)
export class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      query: '',
      page: 1,
      isLoading: false,
      showBtn: false,
      showModal: false,
      largeImageURL: '',
    };
  }
onSubmit = e => {
  e.preventDefault();
  const query = e.target.search.value;

  this.setState({
    query, // Aktualizacja stanu query na wartość, która została pobrana z formularza 
    isLoading: true,
    images: [],
  });

  this.fetchGallery(query, this.state.page); // wywolanie funkcji
};

onNextPage = () => { // wywoływana po naciśnięciu Load More
  const { query, page } = this.state;

  this.setState({
    page: page + 1,
    isLoading: true,
  });

  this.fetchGallery(query, page + 1);
};

onClickImage = (url) => { // wywoływana po naciśnięciu na zdjecie
  this.setState({ showModal: true, largeImageURL: url });
};

onModalClose = () => { // po zamknięciu
  this.setState({ showModal: false, largeImageURL: '' });
};

fetchGallery = (query, page) => { // uywanie fetchP... do pobrania danych
  fetchPicturesByQuery(query, page)
    .then((response) => {
      this.setState((prevState) => ({ // setState jako aktualizacja stanu komponentu
        images: [...prevState.images, ...response], // Aktualizacja images przez dodanie nowych obrazów do istniejącej kolekcji. Operator ... służy do rozpakowywania tablic i umożliwia dodanie nowych elementów do istniejącej tablicy.
        showBtn: response.length === 12,
      }));

      if (response.length === 0) {
        Notify.failure('No matches found!');
      }
    })
    .catch((error) => {
      this.setState({ error });
    })
    .finally(() => { // wykonany niezależnie od tego, czy operacja zakończyła się sukcesem, czy błędem. stan isLoading na false czyli operacja asynchroniczna została zakończona,
      this.setState({ isLoading: false });
    });
};
    
  render() {
    const { images, isLoading, showBtn, showModal, largeImageURL } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} onClickImage={this.onClickImage} />
        {isLoading && <Loader />} 
            {showBtn && <Button onNextPage={this.onNextPage} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    );
  }
}
// jeśli isLoading = true to renderuje sie Loader
// jeśli showBtn jest prawdzia to renderuje sie Button z funkcją on NextPage
//  pozwala na dynamiczne dodawanie lub usuwanie komponentu w zależności od warunku.