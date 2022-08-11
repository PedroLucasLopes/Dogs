import React from 'react';
import FeedPhotoItem from './FeedPhotoItem/FeedPhotoItem.js';
import useFetch from '../../../Hooks/useFetch';
import { PHOTO_GET } from '../../../api/api';
import Error from '../../../Helper/Error';
import Loading from '../../../Helper/Loading/Loading';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({ user, setModalPhoto, page, setInfinite }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 3;
      const { url, options } = PHOTO_GET({ page, total, user });
      const { response, json } = await request(url, options);
      if (response && response.ok && json.length < total) setInfinite(false);
    }
    fetchPhotos();
  }, [request, user]);

  if (error) return <Error />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map(photo => {
          return <FeedPhotoItem
            photo={photo}
            key={photo.id}
            setModalPhoto={setModalPhoto}
          />
        })}
      </ul>
    )
  else return null;
}

export default FeedPhotos;
