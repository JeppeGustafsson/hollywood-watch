import { useState, useRef, useEffect } from 'react';
import Style from './Item.module.css';

const Item = (props: any) => {
    const desc = useRef<HTMLParagraphElement>(null);
    const [height, setHeight] = useState<number | undefined>(0);
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props?.description);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setValue(e?.target?.value);
    }

    useEffect(() => {
        const num: number | undefined = desc.current?.clientHeight;
        setHeight(num);
    }, []);

    return (
        <article className={Style.Item}>
            <img src={props?.image} alt={props?.title + '-image'} />
            <h2>{props?.title}</h2>
            { edit ? <textarea value={value} style={{height: height}} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => handleChange(e)}></textarea> :
            <p onClick={() => setEdit(true)} ref={desc}>{value}</p> }
            <p className="bold">{props?.genre}</p>
            { edit ? <button className="button" onClick={() => setEdit(false)}>Done</button> : null }
        </article>
    )
}

export default Item;