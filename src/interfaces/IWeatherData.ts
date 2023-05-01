import { IWeather } from "./IWeather";

export interface IWeatherData {
  lat: number;
  lon: number;
  timezone: string;
  current: {
    dt: number;
    temp: number;
    weather: IWeather[]
  },
  daily: {
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    weather: IWeather[];
  }[];
  unit: "metric" | "imperial";
}
