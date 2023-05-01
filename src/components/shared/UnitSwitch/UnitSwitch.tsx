import { ChangeEvent, ReactElement } from "react";
import { UnitType } from "types/unit.type";
import { Unit } from "../../../enums/Unit";
import "./styles.scss";

type UnitSwitchProps = {
  isOn: boolean;
  handleToggle?: (unit: UnitType) => void;
};
const UnitSwitch: React.FC<UnitSwitchProps> = ({ isOn, handleToggle }) => {
  const label: ReactElement = isOn ? <>&#8451;</> : <>&#8457;</>;

  const onToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked) {
      handleToggle && handleToggle(Unit.CELCIUS);
    } else {
      handleToggle && handleToggle(Unit.FAHRENHITE);
    }
    
  }
  return (
    <div className="switch">
      <input
        checked={isOn}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onToggleChange(event)}
        className="switch-checkbox"
        id="switch-unit"
        type="checkbox"
      />
      <label className="switch-label" htmlFor="switch-unit">
        <div className={`switch-label-text ${isOn ? "on" : "off"}`}>
          <span>{label}</span>
        </div>
        <span className="switch-button" />
      </label>
    </div>
  );
};

export default UnitSwitch;
