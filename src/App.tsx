import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "./components/shared/BaseLayout/BaseLayout";
import SearchScreen from "./screens/search";
import WeatherInfoScreen from "./screens/weather/WeatherInfoScreen";
import { Provider } from "react-redux";
import {store} from "./store/store";
import './styles/main.scss';
function App() {
  return (
    <BaseLayout>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchScreen />} />
            <Route path="/weather" element={<WeatherInfoScreen />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </BaseLayout>
  );
}

export default App;
