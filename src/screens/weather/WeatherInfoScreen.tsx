import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetWeatherByLatLngQuery } from "../../api/weatherApi";
import { ReactElement, useEffect, useState } from "react";
import { formatDate, getDayOfWeek } from "../../utils";
import Switch from "../../components/shared/UnitSwitch/UnitSwitch";
import { Unit } from "../../enums/Unit";
import DailyWeatherItem from "../../components/DailyWeatherItem/DailyWeatherItem";
import { setUnit } from "../../store/slices/weatherSlice";
import { UnitType } from "types/unit.type";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store/hooks";
import { RootState } from "store/store";

const WeatherInfoScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const unit: UnitType = useAppSelector((state: RootState) => state.weather.unit);
  const unitSymbol: ReactElement = unit === Unit.FAHRENHITE ? <>&#8457;</> : <>&#8451;</>;
  const [searchParams, {}] = useSearchParams();
  const { data, refetch } =
    useGetWeatherByLatLngQuery({
      location: { lat: searchParams.get("lat"), lon: searchParams.get("lon") },
      unit: unit,
    });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [switchState, setSwitchState] = useState<boolean>(
    unit === Unit.CELCIUS ? true : false
  );
  const handleSwitch = (unit: UnitType): void => {
    dispatch(setUnit(unit));
    setSwitchState(!switchState);
  };
  return (
    <div className="weather-info-screen__container">
      <div className="weather-info__header">
        <div className="weather-info__header__backTitle">
          <img
            src="img/arrow_back_black_24dp.svg"
            onClick={() => navigate(-1)}
          />
          <h1>{data?.timezone.split("/")[1]}</h1>
        </div>
        <div className="weather-info__header__unit">
          <Switch isOn={switchState} handleToggle={handleSwitch} />
        </div>
      </div>
      <h2 className="font f-400 pt-md">
        {data && formatDate(data?.current.dt)}
      </h2>
      <h3 className="font f-400 pt-xs">{data?.current.weather[0].main}</h3>
      <div className="weather-info__today__info">
        <h1 className="weather-info__current-temp">
          {data && Math.round(data?.current.temp)} {unitSymbol}
        </h1>
        <i
          className={`wi wi-owm-${data?.current.weather[0].id} weather-info__current-temp`}
        ></i>
        <div className="weather-info__today__times">
          <div className="time__period">
            <h5>Morning</h5>
            <h5>
              {data && Math.round(data.daily[0].temp.morn)} {unitSymbol}
            </h5>
          </div>
          <div className="time__period">
            <h5>Day</h5>
            <h5>
              {data && Math.round(data.daily[0].temp.day)} {unitSymbol}
            </h5>
          </div>
          <div className="time__period">
            <h5>Evening</h5>
            <h5>
              {data && Math.round(data.daily[0].temp.eve)} {unitSymbol}
            </h5>
          </div>
          <div className="time__period">
            <h5>Night</h5>
            <h5>
              {data && Math.round(data.daily[0].temp.night)} {unitSymbol}
            </h5>
          </div>
        </div>
      </div>
      <div className="mt-md weather-info__daily__list">
        {data?.daily.slice(1).map((weatherData, index) => {
          const dayOfWeek: string = getDayOfWeek(weatherData.dt);
          return (
            <DailyWeatherItem
              key={index}
              temp={Math.round(weatherData.temp.day)}
              icon={weatherData.weather[0].id}
              unitSymbol={unitSymbol}
              dayOfWeek={dayOfWeek}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeatherInfoScreen;
