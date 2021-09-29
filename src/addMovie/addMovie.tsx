import { useState, useRef, useEffect } from 'react';
import Style from './AddMovie.module.css';
import { Movie } from '../models/interface';

const AddMovie = (props: any) => {
    const [title, setTitle] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let id = props.movieData.length += 1;
        const item: Movie = {
            title: title,
            image: image,
            description: description,
            genre: genre,
            date: `${hours}:${minutes}:${seconds}`,
            id: id
        }
        if (title.length < 1 || image.length < 1 || description.length < 1) {
            setError(true);
            return;
        } else {
            props.add(item);
        }
        props.close(false);
    }

    return (
        <div className={Style.AddMovie}>
            <h1>Add movie to list</h1>
            { error ? <p>You need to enter information in all fields to add movie.</p> : null }
            <form className={error ? 'error' : ''} onSubmit={(e: React.FormEvent<HTMLFormElement>): void => handleSubmit(e)}>
                <input type="text" name="title" placeholder="Title" onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTitle(e?.target?.value)} />
                <input type="text" name="image" placeholder="Image URL" onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setImage(e?.target?.value)} />
                <input type="text" name="description" placeholder="Description" onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescription(e?.target?.value)} />
                <input type="text" name="genre" placeholder="Genre" onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setGenre(e?.target?.value)} />
                <button className="button" >Add</button>
            </form>
        </div>
    )
}

export default AddMovie;