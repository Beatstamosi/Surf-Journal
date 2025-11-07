import { useEffect, useState } from "react";
import { useAuth } from "../Authentication/useAuth";
import type { Board } from "../types/models";
import { apiClient } from "../../utils/apiClient";
import { boardBrands } from "../../utils/boardInfos/boardBrands";
import { boardSizes } from "../../utils/boardInfos/boardSizes";
import style from "./MyQuiver.module.css";
import { MdDelete } from "react-icons/md";

// TODO:
// Add API endpoint deleteboard
// Add button to delete board
// Add toggle to show / not show addBoard form

export default function MyQuiver() {
  const { user } = useAuth();
  const [boards, setBoards] = useState<Board[] | null>();
  const fetchBoards = async () => {
    const data = await apiClient("/boards/user");
    setBoards(data.boards);
  };

  useEffect(() => {
    fetchBoards();
  }, [user?.id]);

  const handleAddBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const brand = formData.get("brandList");
    const size = formData.get("boardSize");
    const volume = parseFloat(formData.get("volume") as string);
    const name = formData.get("ModelName");

    try {
      await apiClient("/boards/user", {
        method: "POST",
        body: JSON.stringify({ brand, size, volume, name }),
      });
      form.reset();
      await fetchBoards();
    } catch (err) {
      console.error("Error adding board", err);
    }
  };

  return (
    <div className={style.quiverWrapper}>
      {/* Header */}
      <div className={style.header}>
        <h1 className={style.title}>My Quiver</h1>
        <p className={style.subtitle}>Manage your surfboard collection</p>
      </div>

      {/* Boards Display */}
      <div>
        {boards && boards.length > 0 ? (
          <div className={style.boardsGrid}>
            {boards.map((b) => (
              <div key={b.id} className={style.boardCard}>
                <button className={style.deleteBoardBtn}><MdDelete /></button>
                <h3 className={style.boardName}>{b.name}</h3>
                <div className={style.boardDetails}>
                  <div className={style.boardDetail}>
                    <span className={style.boardLabel}>Brand:</span>
                    <span className={style.boardValue}>{b.brand}</span>
                  </div>
                  <div className={style.boardDetail}>
                    <span className={style.boardLabel}>Size:</span>
                    <span className={style.boardValue}>{b.size}</span>
                  </div>
                  <div className={style.boardDetail}>
                    <span className={style.boardLabel}>Volume:</span>
                    <span className={style.boardValue}>{b.volume}L</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={style.emptyState}>
            <div className={style.emptyStateIcon}>🏄‍♂️</div>
            <p className={style.emptyStateText}>
              No boards in your quiver mate. Better get going to not miss out on
              the swell!
            </p>
          </div>
        )}
      </div>

      {/* Add Board Form */}
      <div className={style.formSection}>
        <h2 className={style.formTitle}>Add New Board</h2>
        <form onSubmit={handleAddBoard} className={style.boardForm}>
          <div className={style.formGroup}>
            <label htmlFor="brandList" className={style.formLabel}>
              Brand
            </label>
            <select
              name="brandList"
              id="brandList"
              className={style.formSelect}
            >
              {boardBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="ModelName" className={style.formLabel}>
              Model
            </label>
            <input
              type="text"
              name="ModelName"
              id="ModelName"
              className={style.formInput}
              placeholder="e.g. Spitfire"
            />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="boardSize" className={style.formLabel}>
              Size
            </label>
            <select
              name="boardSize"
              id="boardSize"
              className={style.formSelect}
            >
              {boardSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="volume" className={style.formLabel}>
              Volume (Liters)
            </label>
            <input
              type="number"
              name="volume"
              id="volume"
              step="0.1"
              min={1}
              defaultValue={30}
              className={style.formInput}
            />
          </div>

          <button type="submit" className={style.submitButton}>
            Add to Quiver
          </button>
        </form>
      </div>
    </div>
  );
}
