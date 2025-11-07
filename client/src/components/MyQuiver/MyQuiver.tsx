import { useEffect, useState } from "react";
import { useAuth } from "../Authentication/useAuth";
// import type { Board } from "../types/models";
// import { apiClient } from "../../utils/apiClient";
import { boardBrands } from "../../utils/boardInfos/boardBrands";
import { boardSizes } from "../../utils/boardInfos/boardSizes";
import style from "./MyQuiver.module.css";

interface typeDummyBoards {
  id: number;
  brand: string;
  size: string;
  volume: number;
  name: string;
}

export default function MyQuiver() {
  const { user } = useAuth();
  const [boards, setBoards] = useState<typeDummyBoards[] | null>();
  const [modelName, setmodelName] = useState("");

  useEffect(() => {
    const dummyBoards = [
      {
        id: 1,
        brand: "Channel Islands / Al Merrick",
        size: "5'10",
        volume: 28.5,
        name: "Happy Everyday",
      },
      {
        id: 2,
        brand: "Pyzel",
        size: "6'2",
        volume: 33.8,
        name: "Ghost",
      },
      {
        id: 3,
        brand: "McTavish",
        size: "9'4",
        volume: 73.2,
        name: "Fireball Evo 2",
      },
    ];

    const fetchBoards =  () => {
      // const data = await apiClient("/user/boards");
      setBoards(dummyBoards);
    };
    fetchBoards();
  }, [user?.id]);

  const handleAddBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(boards);
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
              value={modelName}
              onChange={(e) => setmodelName(e.target.value)}
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
