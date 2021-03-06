import React, {useState} from 'react';
import './App.scss';
import PhoneField from './components/PhoneField/PhoneField';
import CountriesList, {CountryType} from './components/CountriesList/CountriesList';
import ListOfCountries from './components/CountriesList/listOfCountries.json';

function App() {
  const [isPhoneFieldFocused, setIsPhoneFieldFocused] =  useState<boolean>(false);
  const [clickWithinWidget, setClickWithinWidget] =  useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(ListOfCountries[0]);

  return (
      <div className='Container'>
        <h1 className='Phone-label'>Phone</h1>
        <PhoneField
            toggleCountriesList={setIsPhoneFieldFocused}
            countryCode={selectedCountry.code}
        />
        {(isPhoneFieldFocused || clickWithinWidget) &&
            <CountriesList
              setShowCountriesList={setClickWithinWidget}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
        }
      </div>
  );
}

export default App;
