import { useState } from 'react';
import Style from './SortOptions.module.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SortOptions = (props: any) => {
    const [inputChange, setInputChange] = useState<string>('default / newest');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setInputChange(e?.target?.value);
        props.updateSort(e?.target?.value);
    }

    return (
        <div className={Style.SortOptions}>
            <select name="sort" id="sort" onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => handleChange(e)}>
                <option value="default / newest">default / newest</option>
                <option value="A - Z">A - Z</option>
                <option value="Z - A"> Z - A</option>
            </select>
        </div>
    )
}

export default SortOptions;