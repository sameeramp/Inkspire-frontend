import { LOCATIONS } from "../../../utils";
import "./Style.scss";

export const Dropdown = ({ location, handleLocation }) => {
  return (
    <select
    style={{border:"2px solid", width:"500px"}}
      className="dropdown"
      name="location"
      id="location"
      value={location}
      onChange={handleLocation}
    >
      <option value="">Location</option>
      {LOCATIONS.map((location, idx) => {
        return (
          <option key={idx} value={location}>
            {location}
          </option>
        );
      })}
    </select>
  );
};
