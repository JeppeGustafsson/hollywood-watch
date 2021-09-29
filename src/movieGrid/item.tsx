import { useState, useRef, useEffect } from 'react';
import Style from './Item.module.css';
import { Movie } from '../models/interface';

const Item = (props: any) => {
    const desc = useRef<HTMLParagraphElement>(null);
    const [height, setHeight] = useState<number | undefined>(0);
    const [edit, setEdit] = useState(false);
    const [descValue, setDescValue] = useState(props?.description);
    const [titleValue, setTitleValue] = useState(props?.title);

    const handleChange = () => {
        const item: Movie = {
            title: titleValue,
            image: props?.image,
            description: descValue,
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
            { edit ? <textarea className="for-h2" value={titleValue} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setTitleValue(e?.target?.value)}></textarea> : <h2 onClick={() => setEdit(true)}>{titleValue}</h2> }
            { edit ? <textarea value={descValue} style={{height: height}} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setDescValue(e?.target?.value)}></textarea> :
            <p onClick={() => setEdit(true)} ref={desc}>{descValue}</p> }
            <p className="bold">{props?.genre}</p>
            { edit ? <button className="button" onClick={() => handleChange()}>Done</button> : null }
        </article>
    )
}

export default Item;