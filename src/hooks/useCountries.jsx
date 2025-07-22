import sub_counties from '../utils/counties.json';

const formattedCountries = sub_counties.map((county) => ({
  value: county.name, // County name as the value
  label: county.name, // If needed for UI components like Select dropdowns
  countyCode: county.countyCode,
  constituencies: county.constituencies,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value) => {
    return formattedCountries.find((item) => item.value === value);
  };

  const getByCountyCode = (code) => {
    return formattedCountries.find((item) => item.countyCode === code);
  };

  return {
    getAll,
    getByValue,
    getByCountyCode, // Added method to fetch by countyCode
  };
};

export default useCountries;
