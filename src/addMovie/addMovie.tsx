import { useState, useRef, useEffect } from 'react';
import Style from './AddMovie.module.css';
import { Movie } from '../models/interface';

const AddMovie = (props: any) => {
    const [title, setTitle] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [genre, setGenre] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let id = props.movieData.length += 1;
        const item: Movie = {
            title: title,
            image: image,
            description: description,
            genre: genre,
            id: id
        }
        props.add(item);
        props.close(false);
    }

    useEffect(() => {
        console.log(image.slice(12))
    },[image])

    return (
        <div className={Style.AddMovie}>
            <h1>Add movie to list</h1>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>): void => handleSubmit(e)}>
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