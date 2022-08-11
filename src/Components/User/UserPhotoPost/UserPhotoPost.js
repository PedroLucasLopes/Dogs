import React from 'react';
import styles from './UserPhotoPost.module.css';
import useForm from '../../../Hooks/useForm';
import useFetch from '../../../Hooks/useFetch';
import { PHOTO_POST } from '../../../api/api';
import Input from '../../Form/Input/Input';
import Button from '../../Form/Button/Button';
import Error from '../../../Helper/Error';
import { useNavigate } from 'react-router-dom';

const UserPhotoPost = () => {
    const name = useForm();
    const weight = useForm('number');
    const age = useForm('number');
    const [img, setImg] = React.useState({});
    const { data, error, loading, request } = useFetch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (data) navigate('/conta');
    }, [data, navigate]);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('img', img.raw);
        formData.append('name', name.value);
        formData.append('weight', weight.value);
        formData.append('age', age.value);

        const token = window.localStorage.getItem('token');
        const { url, options } = PHOTO_POST(formData, token);
        request(url, options);
    };

    function handleImgChange({ target }) {
        setImg({
            raw: target.files[0],
            preview: URL.createObjectURL(target.files[0])
        });
    };

    return (
        <section className={`${styles.photoPost} animeLeft`}>
            <form onSubmit={handleSubmit}>
                <Input
                    label='Nome'
                    type='text'
                    name='name'
                    {...name}
                />
                <Input
                    label='Peso'
                    type='number'
                    name='weight'
                    {...weight}
                />
                <Input
                    label='Idade'
                    type='number'
                    name='age'
                    {...age}
                />
                <input
                    type='file'
                    name='img'
                    id='img'
                    className={styles.file}
                    onChange={handleImgChange}
                />
                {loading
                    ?
                    <Button disabled>Enviando...</Button>
                    :
                    <Button>Enviar</Button>
                }
                <Error error={error} />
            </form>
            <div>
                {img.preview && <div className={styles.preview} style={{ backgroundImage: `url('${img.preview}')` }}></div>}
            </div>
        </section>
    )
}

export default UserPhotoPost;
