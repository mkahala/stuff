import React, {ChangeEvent, useEffect, useState} from 'react';
import './PhoneField.scss';

interface OwnProps {
    toggleCountriesList: (visible: boolean) => void;
    countryCode: number;
}

const PhoneField = (props: OwnProps) => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const setInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const inputNumber = Number(e.target.value);
            if (!isNaN(inputNumber)) {
                setPhoneNumber(e.target.value);
            }
        } else {
            setPhoneNumber('');
        }
    };

    return (
        <div className='Field-Container'>
            <div className='Country-Code'>+{props.countryCode}</div>
            <input
                className='Input-Field'
                value={phoneNumber}
                onChange={setInputValue}
                onFocus={() => props.toggleCountriesList(true)}
                onBlur={() => props.toggleCountriesList(false)}
            />
        </div>
    )
};

export default PhoneField;
