import React, {useEffect, useRef, useState} from 'react';
import './CountriesList.scss';
import Country from './Country';
import ListOfCountries from './listOfCountries.json';

export interface CountryType {
    id: number;
    name: string;
    iso: string;
    code: number;
}

interface OwnProps {
    setShowCountriesList: (visible: boolean) => void;
    selectedCountry: CountryType;
    setSelectedCountry: (country: CountryType) => void;
}

const CountriesList = (props: OwnProps) => {
    const { setShowCountriesList, selectedCountry, setSelectedCountry } = props;
    const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
    const [filteredCountries, setFilteredCountries] = useState<CountryType[]>(ListOfCountries);
    const [searchParam, setSearchParam] = useState<string>('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!wrapperRef?.current?.contains(event.target as Node)) {
                setShowCountriesList(false);
            } else {
                setShowCountriesList(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        if (searchParam === '') {
            return setFilteredCountries(ListOfCountries);
        }

        const newList = [];
        for (const country of ListOfCountries) {
            if (country.name.toLowerCase().startsWith(searchParam.toLowerCase()) ||
               country.code.toString().startsWith(searchParam)
            ) {
                newList.push(country);
            }
        }

        setFilteredCountries(newList);
    }, [searchParam]);

    return (
        <div className='Countries-List' ref={wrapperRef}>
            <Country {...selectedCountry} />
            <div className='Separator' />
            <input
                className="Search"
                placeholder="Search"
                onFocus={() => {
                    setShowSearchResults(true);
                }}
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
            />
            {showSearchResults && (
                <>
                    <div className='Separator' />
                    <div className='Search-Options'>
                        {  filteredCountries
                            .map((country) => country.id !== selectedCountry.id && (
                                <Country
                                    {...country}
                                    onClick={() => {
                                        setSelectedCountry(country);
                                        setShowSearchResults(false);
                                        setSearchParam('');
                                    }}
                                />
                            ))
                        }
                    </div>
                </>
            )}
        </div>
    )
};

export default CountriesList;
