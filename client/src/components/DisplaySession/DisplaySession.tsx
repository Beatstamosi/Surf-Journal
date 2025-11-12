import { useState } from "react";
import type { Session } from "../types/models";
import style from "./DisplaySession.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface DisplaySessionProps {
  session: Session;
}

export default function DisplaySession({ session }: DisplaySessionProps) {
  const [isShared, setIsShared] = useState(session.shared);
  const forecast = session.forecast;
  const board = session.board;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Extract wave height from size string
  const getWaveHeight = (size: string) => {
    return size?.replace("Surf: ", "") || "N/A";
  };

  return (
    <div className={style.sessionContainer}>
      {/* Session Header */}
      <div className={style.sessionHeader}>
        <div className={style.sessionInfo}>
          <h2 className={style.spotName}>{forecast?.spotName}</h2>
          <div className={style.sessionMeta}>
            <span className={style.date}>{forecast?.region}</span>
          </div>
          <div className={style.sessionMeta}>
            <span className={style.date}>{formatDate(session.startTime)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={style.actionButtons}>
          <div className={style.toggleItem}>
            <label
              htmlFor={`share-${session.id}`}
              className={style.toggleLabel}
            >
              <span>Share</span>
              <div className={style.toggleContainer}>
                <input
                  type="checkbox"
                  id={`share-${session.id}`}
                  checked={isShared}
                  onChange={(e) => setIsShared(e.target.checked)}
                  className={style.toggleInput}
                />
                <span className={style.toggleSlider}></span>
              </div>
            </label>
          </div>
          <div className={style.iconButtons}>
            <button className={style.iconButton} title="Edit session">
              <FaEdit />
            </button>
            <button className={style.iconButton} title="Delete session">
              <MdDelete />
            </button>
          </div>
        </div>
      </div>

      {/* Session Content */}
      <div className={style.sessionContent}>
        {/* Session Image */}
        {session.image && (
          <div className={style.sessionImage}>
            <img src={session.image} alt="Session" />
          </div>
        )}

        {/* Forecast Summary with Swells Integrated */}
        {forecast && (
          <div className={style.forecastSummary}>
            <div className={style.forecastGrid}>
              <div className={style.forecastItem}>
                <span className={style.forecastLabel}>Wave Height</span>
                <span className={style.forecastValue}>
                  {getWaveHeight(forecast.size)}
                </span>
              </div>
              <div className={style.forecastItem}>
                <span className={style.forecastLabel}>Conditions</span>
                <span className={style.forecastValue}>
                  {forecast.description}
                </span>
              </div>
              <div className={style.forecastItem}>
                <span className={style.forecastLabel}>Wind</span>
                <span className={style.forecastValue}>
                  {forecast.windSpeed} {forecast.windDirection}
                </span>
              </div>
              <div className={style.forecastItem}>
                <span className={style.forecastLabel}>Tide</span>
                <span className={style.forecastValue}>
                  {forecast.tideHeight} {forecast.tideType}
                </span>
              </div>
            </div>

            {/* Swells Integrated */}
            {forecast?.swells && forecast.swells.length > 0 && (
              <div className={style.forecastGrid}>
                {forecast.swells.slice(0, 2).map((swell, index) => (
                  <div key={index} className={style.swellItem}>
                    <span className={style.swellName}>{swell.name}</span>
                    <span className={style.swellDetails}>
                      {parseFloat(swell.height?.split(":")[1] || "0").toFixed(
                        1
                      )}
                      m • {swell.period?.split(":")[1]?.trim()} •{" "}
                      {parseFloat(
                        swell.direction?.split(":")[1] || "0"
                      ).toFixed(0)}
                      °
                    </span>
                  </div>
                ))}
              </div>
            )}
            <h4 className={style.forecastMatchTitle}>
              Did Waves match Forecast?
            </h4>
            <p className={style.notesForecast}>
              {session.sessionMatchForecast || "No notes about wave match"}
            </p>
          </div>
        )}

        {/* Session Notes */}
        <div className={style.sessionNotes}>
          <div className={style.notesSection}>
            <h4 className={style.notesTitle}>Session Notes</h4>
            <p className={style.notesText}>
              {session.description || "No session notes"}
            </p>
          </div>
        </div>

        {/* Board Info */}
        {board && (
          <div className={style.boardDisplay}>
            <span className={style.boardIcon}>🏄</span>
            <span className={style.boardDetails}>
              {board.brand} {board.name} • {board.size} • {board.volume}L
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
