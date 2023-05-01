import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetWeatherByCityNameQuery } from "../../api/weatherApi";

const SearchCityScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchForCityWeather, {}] = useLazyGetWeatherByCityNameQuery();

  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position: {
        coords: { latitude: number; longitude: number };
        timestamp: number;
      }) => {
        navigate(
          `/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        );
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      alert("Please enter a city name!");
      return;
    }
    searchForCity();
  };

  const searchForCity = async () => {
    searchForCityWeather(searchQuery)
      .then((cityData) => {
        if (cityData.data) {
          navigate(
            `/weather?lat=${cityData.data?.coord?.lat}&lon=${cityData.data?.coord?.lon}`
          );
        } else {
          alert("Location not found!");
        }
      })
      .catch((err) => alert("Something went wrong!"));
  };

  return (
    <div className="search-screen__container">
      <form onSubmit={onFormSubmit}>
        <div className="search__input__container">
          <input
            className="search__input"
            name="search-input"
            id="search-input"
            autoComplete="off"
            data-test-id="search-input"
            placeholder="City"
            type="search"
            required
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src="./img/search_black_24dp.svg" />
        </div>
      </form>
      <p className="pt-sm">or</p>
      <span>
        use my{" "}
        <span
          onClick={useCurrentLocation}
          className="use-current-location__button"
        >
          current location
        </span>
      </span>
    </div>
  );
};
export default SearchCityScreen;
