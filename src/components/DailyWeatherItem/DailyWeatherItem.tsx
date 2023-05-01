import { ReactElement } from "react";
import "./styles.scss";

type DailyWeatherItemProps = {
  temp: number;
  dayOfWeek: string;
  icon: number;
  unitSymbol: ReactElement;
};
const DailyWeatherItem: React.FC<DailyWeatherItemProps> = ({
  temp,
  dayOfWeek,
  icon,
  unitSymbol,
}) => {
  return (
    <div className="daily__weather__item">
      <h4>{dayOfWeek}</h4>
      <i className={`wi wi-owm-${icon} daily__weather__icon`}></i>
      <p>
        {temp} {unitSymbol}
      </p>
    </div>
  );
};

export default DailyWeatherItem;
