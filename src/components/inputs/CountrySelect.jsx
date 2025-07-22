import Select from 'react-select'
import useCountries from '../../hooks/useCountries';

function CountrySelect({
  value,
  onChange
}) {
   const { getAll } = useCountries();

  return (
    <div>
      <Select

        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={onChange}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNamePrefix="react-select"
className=" border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
        menuPlacement="bottom" 
      />
    </div>
    
  )
}

export default CountrySelect
