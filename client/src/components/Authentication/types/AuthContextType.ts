import type { User } from "../../types/models";

export default interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  fetchUser: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
