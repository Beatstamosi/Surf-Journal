import { MdOutlineLogout } from "react-icons/md";
import style from "./LogOut.module.css";
import useLogOut from "./useLogOut";

type LogOutProps = {
  className: string;
};

export default function LogOutBtn({ className }: LogOutProps) {
  const logOutHandler = useLogOut()

  return (
    <button
      onClick={logOutHandler}
      className={`${style.logOutButton} ${className || ""}`}
    >
      <MdOutlineLogout size={"1.5em"} />
      Log Out
    </button>
  );
}