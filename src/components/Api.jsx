import axios from 'axios';

const apiKey = '39827668-13c2fa0efedd451aadbb8d885';
const baseUrl = 'https://pixabay.com/api/';

export const fetchPicturesByQuery = async (query, page) => {
    const { data } = await axios.get(baseUrl, {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page,
      },
    });

    return data.hits;
};