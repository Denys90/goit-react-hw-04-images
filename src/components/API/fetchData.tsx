import axios from 'axios';
//<------------------------------------------------------------
type Image = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
};
type PixabayResponse = {
  total: number;
  totalHits: number;
  hits: Image[];
};
type FetchResult = {
  fetchedImages: Image[];
  total: number;
};
//<------------------------------------------------------------
async function fetchData(searchQuery: string, page = 1): Promise<FetchResult> {
  const MY_API_KEY = '40227453-3557d8d2139416ae0b447ea7a';
  const URL = 'https://pixabay.com/api/';
  const params = {
    q: searchQuery,
    key: MY_API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
  };

  try {
    const response = await axios<PixabayResponse>(`${URL}`, { params });
    const data = response.data;
    const fetchedImages = data.hits.map(el => ({
      id: el.id,
      webformatURL: el.webformatURL,
      largeImageURL: el.largeImageURL,
    }));

    return { fetchedImages, total: data.total };
  } catch (error) {
    console.error('Ошибка при fetch:', error);
    throw error;
  }
}
export default fetchData;
// ----------------------------------------------->
