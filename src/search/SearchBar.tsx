import { useState } from 'react';
import Style from './SearchBar.module.css';

const SearchBar = (props: any) => {
    const [inputChange, setInputChange] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        props.inputChange(e?.target?.value);
    }

    return (
        <div className={Style.SearchBar}>
            <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChange(e)} />
        </div>
    )
}

export default SearchBar;