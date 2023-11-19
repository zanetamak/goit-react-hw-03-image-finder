import axios from 'axios';

const apiKey = '39827668-13c2fa0efedd451aadbb8d885';
const pageUrl = 'https://pixabay.com/api/';

 
export const fetchPicturesByQuery = async (query, perPage) => {
    const response = await axios.get(pageUrl, {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 12,
        per_page: perPage,
      },
    });

    return response.data;
  } 

  // nie uzywam tutaj try /get bo nie zakładam występowania błędów
