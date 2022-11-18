import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../helpers/hooks";
import { authOperations } from "../redux/auth/authOperations";

export function GoogleBtn() {
  const dispatch = useAppDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      dispatch(authOperations.googleAuth({ code }));
    },
    flow: "auth-code",
  });

  return (
    <button
      className="flex items-center justify-center w-[47%] mb-8 py-3 rounded-3xl bg-sky-100 font-bold text-base hover:bg-sky-300 focus:bg-sky-300 transition-colors"
      type="button"
      onClick={() => {
        googleLogin();
      }}
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      Google
    </button>
  );
}
