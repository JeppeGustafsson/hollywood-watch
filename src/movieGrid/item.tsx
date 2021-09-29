import { useState, useRef, useEffect } from 'react';
import Style from './Item.module.css';
import { Movie } from '../models/interface';

const Item = (props: any) => {
    const desc = useRef<HTMLParagraphElement>(null);
    const [height, setHeight] = useState<number | undefined>(0);
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props?.description);

    const handleChange = () => {
        const item: Movie = {
            title: props?.title,
            image: props?.image,
            description: value,
            genre: props?.genre,
            date: props?.date,
            id: props?.id
        };
        props.update(item);
        setEdit(false);
    }

    useEffect(() => {
        const num: number | undefined = desc.current?.clientHeight;
        setHeight(num);
    }, []);

    return (
        <article className={Style.Item}>
            <img src={props?.image} alt={props?.title + '-image'} />
            <h2>{props?.title}</h2>
            { edit ? <textarea value={value} style={{height: height}} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setValue(e?.target?.value)}></textarea> :
            <p onClick={() => setEdit(true)} ref={desc}>{value}</p> }
            <p className="bold">{props?.genre}</p>
            { edit ? <button className="button" onClick={() => handleChange()}>Done</button> : null }
        </article>
    )
}

export default Item;