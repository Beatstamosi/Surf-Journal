import { useEffect, useState } from "react";
import type { Board, Session } from "../types/models";
import { apiClient } from "../../utils/apiClient";
import style from "./EditSession.module.css";
import ForecastDisplay from "../ForecastDisplay/ForecastDisplay";
import { useNavigate } from "react-router-dom";
import uploadImageToSupaBase from "../../utils/uploadImageToSupaBase";
import { useAuth } from "../Authentication/useAuth";
import { transformForecastToReport } from "../../utils/transformForecastToReport";

export default function EditSession({ session }: { session: Session }) {
  const [boards, setBoards] = useState<Board[] | null>();
  const [shareInFeed, setShareInFeed] = useState(session.shared);
  const [sessionUpdatedConfirmation, setsessionUpdatedConfirmation] =
    useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await apiClient("/boards/user");
        setBoards(data.boards);
      } catch (err) {
        console.error("Error fetching boards: ", err);
      }
    };
    fetchBoards();
  }, []);

  const handlerSaveSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl;
      const formData = new FormData(e.currentTarget);
      const formValues = {
        sessionMatchForecast: formData.get("sessionMatchForecast") as string,
        description: formData.get("sessionNotes") as string,
        boardId: parseInt(formData.get("chooseBoard") as string, 10),
      };

      if (selectedFile) {
        imageUrl = await uploadImageToSupaBase(
          selectedFile,
          user?.id,
          "Session Images",
          session?.forecast?.sessions?.[0].startTime
        );
      }

      await apiClient("/sessions", {
        method: "PUT",
        body: JSON.stringify({
          shareInFeed,
          ...formValues,
          sessionImageUrl: imageUrl,
        }),
      });

      showConfirmation();
    } catch (err) {
      console.error("Error adding session: ", err);
    }
  };

  const showConfirmation = () => {
    setsessionUpdatedConfirmation(true);

    setTimeout(() => {
      setsessionUpdatedConfirmation(false);
      navigate("/my-sessions");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  if (sessionUpdatedConfirmation) {
    return (
      <div className={style.sessionAdded}>
        <p>🤙</p>
        <p>Session updated successfully!</p>
      </div>
    );
  }

  return (
    <>
      <div className={style.header}>
        <h1 className={style.title}>Edit Your Session</h1>
        <p className={style.subtitle}>
          {session?.forecast?.spotName} • {session?.forecast?.region}
        </p>
      </div>

      <form onSubmit={handlerSaveSession} className={style.formAddSession}>
        <ForecastDisplay
          forecast={transformForecastToReport(session.forecast!)}
        />

        <div className={style.sessionDetails}>
          <div className={style.inputGroup}>
            <label htmlFor="sessionMatchForecast" className={style.label}>
              Did the waves match the forecast?
            </label>
            <textarea
              name="sessionMatchForecast"
              id="sessionMatchForecast"
              placeholder="e.g. Waves were 2ft bigger than forecast, more consistent than expected..."
              className={style.textarea}
              rows={3}
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="sessionNotes" className={style.label}>
              Session Notes
            </label>
            <textarea
              name="sessionNotes"
              id="sessionNotes"
              placeholder="Left was really fun. The Right a bit soft. Tried some cutbacks. Need to learn how to properly use my arms."
              className={style.textarea}
              rows={4}
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="chooseBoard" className={style.label}>
              Which board did you surf?
            </label>
            <select
              name="chooseBoard"
              id="chooseBoard"
              className={style.select}
            >
              <option value="">-- Select board from your quiver --</option>
              {boards?.map((b) => (
                <option value={b.id} key={b.id}>
                  {b.brand} - {b.name} - {b.size} - {b.volume}L
                </option>
              ))}
            </select>
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="sessionUpload">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              id="sessionUpload"
              onChange={handleFileChange}
            />
          </div>

          <div className={style.toggleGroup}>
            <div className={style.toggleItem}>
              <label htmlFor="connectWatch" className={style.toggleLabel}>
                <span>Connect with Surf Watch</span>
                <div className={style.toggleContainer}>
                  <input
                    type="checkbox"
                    id="connectWatch"
                    disabled={true}
                    className={style.toggleInput}
                  />
                  <span className={style.toggleSlider}></span>
                </div>
              </label>
              <span className={style.italicInfo}>
                Functionality not available in beta.
              </span>
            </div>

            <div className={style.toggleItem}>
              <label htmlFor="share" className={style.toggleLabel}>
                <span>Share in Feed</span>
                <div className={style.toggleContainer}>
                  <input
                    type="checkbox"
                    id="share"
                    checked={shareInFeed}
                    onChange={(e) => setShareInFeed(e.target.checked)}
                    className={style.toggleInput}
                  />
                  <span className={style.toggleSlider}></span>
                </div>
              </label>
            </div>
          </div>

          <div className={style.buttonGroup}>
            <button type="submit" className={style.primaryButton}>
              Update Session
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
