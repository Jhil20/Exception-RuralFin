import React, { useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";

const CityAutocomplete = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [validCity, setValidCity] = useState(false);
  const { setFieldValue } = useFormikContext();

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setValidCity(false); // Reset selection

    if (value.length > 1) {
      console.log("hello")
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${value}&format=json&addressdetails=1`
      );
      const data = await response.json();

      // Sort: Prioritize cities starting with the input
      const sortedCities = data
        .sort((a, b) => {
          const aStarts = a.display_name
            .toLowerCase()
            .startsWith(value.toLowerCase());
          const bStarts = b.display_name
            .toLowerCase()
            .startsWith(value.toLowerCase());
          if (aStarts === bStarts)
            return a.display_name.localeCompare(b.display_name); // Alphabetical if same match type
          return aStarts ? -1 : 1; // Prioritize exact matches first
        })
        .slice(0, 5); // Limit to 5 results

      setSuggestions(sortedCities);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    // console.log("handleSelect triggered:", city.display_name); // Debug log
    setFieldValue("city", city?.name);
    // console.log("City:", city); // Debug log
    setFieldValue("state", city.address?.state || city.address?.town || "");
    setFieldValue("country", city.address?.country || "");
    setFieldValue(
      "pincode",
      city.address?.postcode || city.address?.["ISO3166-2-lvl4"] || "342645"
    );
    setQuery(city?.name);
    setValidCity(true);
    setSuggestions([]);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!validCity && suggestions.length == 0) {
        console.log("handleBlur triggered", validCity); // Debug log
        setQuery("");
        setFieldValue("city", "");
        setFieldValue("state", "");
        setFieldValue("pincode", "");
      }
      setSuggestions([]);
    }, 1000); // Small delay to allow clicks
  };

  return (
    <div className="relative grid grid-cols-2 gap-2 w-full">
      <div className="flex-auto mr-3">
        <label className="block text-gray-700 mb-1 ml-1">City*</label>
        <input
          type="text"
          name="city"
          value={query}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded shadow-lg">
            {suggestions.map((city) => (
              <li
                key={city.place_id}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Clicked on:", city.display_name);
                  handleSelect(city);
                }}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {city.display_name}
              </li>
            ))}
          </ul>
        )}
        <ErrorMessage
          name="city"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
      <div className="flex-auto mr-3">
        <label className="block text-gray-700 mb-1 ml-1">State*</label>

        <Field
          type="text"
          name="state"
          className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
          disabled
        />
        <ErrorMessage
          name="state"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div className="flex-auto mr-3">
        <label className="block text-gray-700 mb-1 ml-1">Pincode*</label>

        <Field
          type="text"
          name="pincode"
          className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
          disabled
        />
        <ErrorMessage
          name="pincode"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
      {/* {!props.showAgent && ( */}
        <div className="flex-auto mr-3">
          <label className="block text-gray-700 mb-1 ml-1">
            Transaction Pin*
          </label>
          <Field
            type="text"
            name={props?.showAgent?"agent_pin":"user_pin"}
            className="w-full p-2 border hover:ring-[1px] .no-spinner ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
            onInput={(e) => {
              if (e.target.value.length > 4) {
                e.target.value = e.target.value.slice(0, 4); // Limit to 4 digits
              }
            }}
          />
          <ErrorMessage
            name={props?.showAgent?"agent_pin":"user_pin"}
            component="p"
            className="text-red-500 text-sm"
          />
        </div>
      {/* )} */}
    </div>
  );
};

export default CityAutocomplete;
