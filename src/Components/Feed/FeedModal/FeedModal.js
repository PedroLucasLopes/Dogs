import React from 'react';
import useFetch from '../../../Hooks/useFetch';
import { IMAGE_GET } from '../../../api/api';
import styles from './FeedModal.module.css';
import Error from '../../../Helper/Error';
import Loading from '../../../Helper/Loading/Loading';
import PhotoContent from '../../Photo/PhotoContent/PhotoContent';

const FeedModal = ({ photo, setModalPhoto }) => {
    const { data, error, loading, request } = useFetch();
    React.useEffect(() => {
        const { url, options } = IMAGE_GET(photo.id);
        request(url, options);
    }, [photo, request]);

    function handleOutsideClick({ target, currentTarget }) {
        if (target === currentTarget) setModalPhoto(null);
    }

    return (
        <div className={styles.modal} onClick={handleOutsideClick}>
            {error && <Error error={error} />}
            {loading && <Loading />}
            {data && <PhotoContent data={data} />}
        </div>
    )
}

export default FeedModal;
