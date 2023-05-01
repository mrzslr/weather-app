import { UnitType } from "../types/unit.type";

export interface IWeatherInfoQuery {
  location: {
    lat: string | null;
    lon: string | null;
  };
  unit: UnitType
}
