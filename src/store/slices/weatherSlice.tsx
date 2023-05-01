import { createSlice } from "@reduxjs/toolkit";
import { IWeatherData } from "../../interfaces/IWeatherData";
import { Unit } from "../../enums/Unit";
import { UnitType } from "../../types/unit.type";

export interface WeatherState {
  city: string;
  weatherData: IWeatherData | null;
  unit: UnitType;
  loading: boolean;
  error: any;
}
const weatherInitialState: WeatherState = {
  city: "",
  weatherData: null,
  unit: Unit.CELCIUS,
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState: weatherInitialState,
  reducers: {
    setUnit: (state: WeatherState, action: {payload: UnitType}) => {
      state.unit = action.payload;
    },
  },
});


export const { setUnit } = weatherSlice.actions;

export default weatherSlice.reducer;
