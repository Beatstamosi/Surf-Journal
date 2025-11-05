import styles from "./Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import { GiWaveSurfer } from "react-icons/gi";
import { MdOutlineSurfing } from "react-icons/md";
import { GiSurferVan } from "react-icons/gi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import surfLogLogo from "../../assets/surflog_logo.png";
import LogOut from "../Authentication/LogOut/LogOut";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.wrapperLogo}>
        <img src={surfLogLogo} alt="Wavelog Logo" />
      </div>

      <div className={styles.sidebarBlock}>
        <Link
          to="/"
          className={`${styles.sidebarLink} ${
            currentPath === "/" ? styles.active : ""
          }`}
        >
          <GiWaveSurfer size={"1.5em"} />
          Feed
        </Link>
      </div>

      <div className={styles.sidebarBlock}>
        <Link
          to="/my-sessions"
          className={`${styles.sidebarLink} ${
            currentPath === "/my-sessions" ? styles.active : ""
          }`}
        >
          <MdOutlineSurfing size={"1.5em"} />
          My Sessions
        </Link>

        <Link
          to="/add-session"
          className={`${styles.sidebarLink} ${
            currentPath === "/add-session" ? styles.active : ""
          }`}
        >
          <IoIosAddCircleOutline size={"1.5em"} />
          Add Session
        </Link>
      </div>

      <div className={styles.sidebarBlock}>
        <Link
          to="/my-quiver"
          className={`${styles.sidebarLink} ${
            currentPath === "/my-quiver" ? styles.active : ""
          }`}
        >
          <GiSurferVan size={"1.5em"} />
          My Quiver
        </Link>

        <Link
          to="/edit-profile"
          className={`${styles.sidebarLink} ${
            currentPath === "/edit-profile" ? styles.active : ""
          }`}
        >
          <FaUserEdit size={"1.5em"} />
          My Profile
        </Link>
      </div>

      <div className={styles.sidebarBlock}>
        <LogOut className={styles.sidebarLink} />
      </div>
    </div>
  );
}
