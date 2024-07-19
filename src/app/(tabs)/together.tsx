import { useUser } from "@root/src/state/useUser";
import TogetherScreen from "../challenges/ongoing";
import TogetherSignUp from "../challenges/together-signup";

const Together = () => {
  const isGuest = useUser((state) => state.isGuest);

  return isGuest ? <TogetherSignUp /> : <TogetherScreen />;
};
export default Together;
