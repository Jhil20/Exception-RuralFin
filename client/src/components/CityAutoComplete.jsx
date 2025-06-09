import React, { useState, useEffect, useRef } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { Building2 } from "lucide-react";

const CityAutocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [validCity, setValidCity] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { setFieldValue, values } = useFormikContext();
  const isCity = values.city;
  const hasSelected = useRef(isCity ? true : false);

  useEffect(() => {
    setQuery(values?.city || "");
  }, [values?.city]);

  useEffect(() => {
    if (hasSelected.current) {
      hasSelected.current = false;
      return; 
    }

    if (query.length <= 1) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
        try {
          setLoading(true);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${query}&format=json&addressdetails=1`
        );
        const data = await response.json();

        const sortedCities = data
          .sort((a, b) => {
            const aStarts = a.display_name
              .toLowerCase()
              .startsWith(query.toLowerCase());
            const bStarts = b.display_name
              .toLowerCase()
              .startsWith(query.toLowerCase());
            if (aStarts === bStarts)
              return a.display_name.localeCompare(b.display_name);
            return aStarts ? -1 : 1;
          })
          .slice(0, 5);

        setSuggestions(sortedCities);
      } catch (error) {
        console.error("Error fetching city data:", error);
        setSuggestions([]);
      } finally {
        setLoading(false); // ✅ hide loader
      }
    }, 2000); // debounce delay: 2s

    return () => clearTimeout(timeoutId); // cleanup
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setLoading(true);
    setValidCity(false);
  };

  const handleSelect = (city) => {
    hasSelected.current = true;
    setFieldValue("city", city?.name || city?.address?.city || "");
    setFieldValue("state", city.address?.state || city.address?.town || "");
    setFieldValue("country", city.address?.country || "");
    setFieldValue("zipCode", city.address?.postcode || "342645");

    setQuery(city?.name || city?.address?.city || "");
    setValidCity(true);
    setSuggestions([]);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!validCity && suggestions.length === 0) {
        setQuery("");
        setFieldValue("city", "");
      }
      setSuggestions([]);
    }, 200);
  };

  return (
    <div className="relative w-full">
      <label
        htmlFor="city"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        City
      </label>
      <div className="absolute inset-y-0 left-0 top-5 pl-3 flex items-center pointer-events-none">
        <Building2 className="h-5 w-5 text-gray-600" />
      </div>
      <input
        type="text"
        name="city"
        id="city"
        value={query}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="Current City*"
        className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
      />
      {/* ✅ Loader when fetching */}
      {loading && (
        <div className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1 px-3 py-2 text-sm text-gray-500">
          Fetching cities... please wait
        </div>
      )}
      {/* ✅ Suggestions after fetch */}
      {!loading && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto mt-1">
          {suggestions.map((city) => (
            <li
              key={city.place_id}
              onClick={(e) => {
                e.stopPropagation();
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
        className="text-sm text-red-600 mt-1"
      />
    </div>
  );
};

export default CityAutocomplete;
