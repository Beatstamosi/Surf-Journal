import style from "./NavBarMobile.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GiWaveSurfer } from "react-icons/gi";
import { MdOutlineSurfing } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa6";
import { GiSurferVan } from "react-icons/gi";
import { useAuth } from "../Authentication/useAuth";

export default function NavBarMobile() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();

  return (
    <div className={style.navBarMobileWrapper}>
      <div className={style.navNarBlock}>
        <Link
          to="/"
          className={`${style.navBarLink} ${
            currentPath === "/" ? style.active : ""
          }`}
        >
          <GiWaveSurfer size={"2em"} />
        </Link>
      </div>

      <div className={style.navNarBlock}>
        <Link
          to="/my-sessions"
          className={`${style.navBarLink} ${
            currentPath === "/my-sessions" ? style.active : ""
          }`}
        >
          <MdOutlineSurfing size={"2em"} />
        </Link>
      </div>

      <div className={style.navNarBlock}>
        <Link
          to="/add-session"
          className={`${style.navBarLink} ${
            currentPath === "/add-session" ? style.active : ""
          }`}
        >
          <IoIosAddCircleOutline size={"2em"} />
        </Link>
      </div>

      <div className={style.navNarBlock}>
        <Link
          to="/my-quiver"
          className={`${style.navBarLink} ${
            currentPath === "/my-quiver" ? style.active : ""
          }`}
        >
          <GiSurferVan size={"2em"} />
        </Link>
      </div>

      <div className={style.navNarBlock}>
        <Link
          to={`/user/${user?.id}`}
          className={`${style.navBarLink} ${
            currentPath === `/user/${user?.id}` ? style.active : ""
          }`}
        >
          <FaUserAstronaut size={"1.85em"} />
        </Link>
      </div>
    </div>
  );
}
