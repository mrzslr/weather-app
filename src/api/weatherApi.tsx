import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IWeatherData } from "../interfaces/IWeatherData";
import { IWeatherInfoQuery } from "../interfaces/IWeatherInfoQuery";
import { ICityWeatherData } from "../interfaces/ICityWeatherData";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data",
  }),
  endpoints: (builder) => ({
    getWeatherByCityName: builder.query<ICityWeatherData, string>({
      query: (city) =>
        `/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
    }),
    getWeatherByLatLng: builder.query<IWeatherData, IWeatherInfoQuery>({
        query: (query) => 
        `/3.0/onecall?lat=${query.location.lat}&lon=${query.location.lon}&units=${query.unit}&exclude=minutely,hourly&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
    })
  }),
});

export const { useGetWeatherByCityNameQuery, useLazyGetWeatherByCityNameQuery, useGetWeatherByLatLngQuery } = weatherApi;