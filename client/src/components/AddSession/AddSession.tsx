import { useState } from "react";
import type { Forecast } from "../types/models";
import { apiClient } from "../../utils/apiClient";

export default function AddSession() {
  const [spotName, setSpotName] = useState("");
  const [startTimeSession, setStartTimeSession] = useState("06:00");
  const [forecast, setForecast] = useState<Forecast | null>();

  const handlerGetForecast = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams({
        spotName,
        startTimeSession,
      });
      const data = await apiClient(`/forecast?${params.toString()}`);
      setForecast(data.report);
    } catch (err) {
      console.error("Error fetching forecast:", err);
    }
  };

  if (!forecast) {
    return (
      <div>
        <div>
          <label htmlFor="spotName">Spot Name</label>
          <input
            type="text"
            placeholder="e.g. Trestles"
            value={spotName}
            onChange={(e) => setSpotName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startTimeSession">
            What time did you start your session?
          </label>
          <select
            name="startTimeSession"
            id="startTimeSession"
            value={startTimeSession}
            onChange={(e) => setStartTimeSession(e.target.value)}
          >
            <option value="06:00">06:00am</option>
            <option value="07:00">07:00am</option>
            <option value="08:00">08:00am</option>
            <option value="09:00">09:00am</option>
            <option value="10:00">10:00am</option>
            <option value="11:00">11:00am</option>
            <option value="12:00">12:00pm</option>
            <option value="13:00">01:00pm</option>
            <option value="14:00">02:00pm</option>
            <option value="15:00">03:00pm</option>
            <option value="16:00">04:00pm</option>
            <option value="17:00">05:00pm</option>
            <option value="18:00">06:00pm</option>
            <option value="19:00">07:00pm</option>
            <option value="20:00">08:00pm</option>
          </select>
        </div>
        <div>
          <button onClick={handlerGetForecast}>Get Forecast</button>
        </div>
      </div>
    );
  }

  return <div>Add Session</div>;
}

// - Add start time of session
// - Type in spot name
//     - Fetch forecast

// - Display spot name
// - Display forecast
// - Did session match forecast?
// - Describe your session
// - Choose board
// - Upload image if you want
// - Disabled button to connect with watch
// - Share in public feed toggle
