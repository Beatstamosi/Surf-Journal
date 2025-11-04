import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { GiWaveSurfer } from "react-icons/gi";
import { MdOutlineSurfing } from "react-icons/md";
import { GiSurferVan } from "react-icons/gi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import wavelogLogo from "../../assets/wavelog.png";

export default function Sidebar() {
  // get routing to set link as active
  // get user to use id for links

  // add logo @top

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.wrapperLogo}>
        <img src={wavelogLogo} alt="Wavelog Logo" />
      </div>
      <div className={styles.sidebarBlock}>
        <Link to="/main" className={styles.sidebarLink}>
          <GiWaveSurfer size={"1.5em"} />
          Feed
        </Link>
      </div>

      <div className={styles.sidebarBlock}>
        <Link to="/my-sessions" className={styles.sidebarLink}>
          <MdOutlineSurfing size={"1.5em"} />
          My Sessions
        </Link>
        <Link to="/add-session" className={styles.sidebarLink}>
          <IoIosAddCircleOutline size={"1.5em"} />
          Add Session
        </Link>
      </div>

      <div className={styles.sidebarBlock}>
        <Link to="/my-quiver" className={styles.sidebarLink}>
          <GiSurferVan size={"1.5em"} />
          My Quiver
        </Link>
        <Link to="/edit-profile" className={styles.sidebarLink}>
          <FaUserEdit size={"1.5em"} />
          Edit Profile
        </Link>
      </div>

      <div className={styles.sidebarBlock}>
        <Link to="/logout" className={styles.sidebarLink}>
          <MdOutlineLogout size={"1.5em"} />
          Logout
        </Link>
      </div>
    </div>
  );
}
