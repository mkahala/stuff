import React from 'react';

interface OwnProps {
    name: string;
    code: number;
    iso: string;
    onClick?: () => void;
}

const Country = ({
     name, code, iso, onClick,
} : OwnProps) => (
    <div className='Country' onClick={onClick}>
        <img
            src={`./flags/${iso}.png`}
            alt='flag'
            className='Country-Flag'
        />
        {`${name} +(${code})`}
    </div>
);

export default Country;
