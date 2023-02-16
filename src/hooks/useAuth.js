// PERSONALIZED HOOK TO ACCESS DATA OF CONTEXT
import { useContext } from "react";
import { AuthContext } from "../contexts";

//Exporting AuthContext
export const useAuth = () => useContext(AuthContext);