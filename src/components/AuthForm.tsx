import { useState, FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { authOperations } from "../redux/auth/authOperations";
import { emailValidate } from "../helpers/emailValidate";
import { isLoadingLogin, isLoadingRegister } from "../redux/reduxSelectors";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loadingRegister = useAppSelector(isLoadingRegister);
  const loadingLogin = useAppSelector(isLoadingLogin);
  const dispatch = useAppDispatch();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = e.currentTarget;
    await dispatch(
      authOperations.login({
        email: email.value.trim(),
        password: password.value.trim(),
      })
    );
  };

  const register = async () => {
    await dispatch(
      authOperations.register({
        email: email.trim(),
        password: password.trim(),
      })
    );
  };

  return (
    <form
      className="flex flex-col items-center px-20 py-14 rounded-3xl shadow-2xl bg-white text-sm"
      onSubmit={(e) => {
        login(e);
      }}
    >
      <p className="w-72 mb-5">You can log in with your Google Account:</p>
      <button
        className="flex items-center justify-center w-[47%] mb-8 py-3 rounded-3xl bg-sky-100 font-bold text-base hover:bg-sky-300 focus:bg-sky-300 transition-colors"
        type="button"
        onClick={() => {
          toast("This functionality will be available in the near future");
        }}
      >
        <FcGoogle className="w-6 h-6 mr-2" />
        Google
      </button>
      <p className="w-72 mb-5">
        Or log in using an email and password, after registering:
      </p>
      <label className="flex flex-col mb-5">
        <span className="mb-3">Email:</span>
        <input
          className={`w-72 h-14 rounded-3xl px-5 text-xl bg-sky-100 placeholder-gray-500 ${
            emailValidate(email)
              ? `outline-2 outline-emerald-700 ${
                  email.length > 0 && "border-2 border-emerald-700"
                }`
              : `outline-2 outline-red-700 ${
                  email.length > 0 && "border-2 border-red-700"
                }`
          }`}
          type="text"
          placeholder="your@email.com"
          value={email}
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <label className="flex flex-col mb-12">
        <span className="mb-3">Password:</span>
        <div className="relative">
          <input
            className={`w-72 h-14 rounded-3xl pl-5 pr-12 text-xl bg-sky-100 placeholder-gray-500 ${
              password.length < 6
                ? `outline-2 outline-red-700 ${
                    password.length > 0 && "border-2 border-red-700"
                  }`
                : `outline-2 outline-emerald-700 ${
                    password.length > 0 && "border-2 border-emerald-700"
                  }`
            }`}
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <AiOutlineEye className="w-8 h-8 fill-gray-500" />
            ) : (
              <AiOutlineEyeInvisible className="w-8 h-8 fill-gray-500" />
            )}
          </div>
        </div>
      </label>
      <div className="flex justify-between w-full">
        <button
          className="w-[47%] h-14 rounded-3xl bg-sky-700 text-white font-bold tracking-wide hover:bg-sky-900 transition-colors focus:bg-sky-900"
          type="submit"
        >
          {loadingLogin ? (
            <div className="flex justify-center">
              <ThreeDots
                height="50"
                width="50"
                color="white"
                ariaLabel="circles-loading"
              />
            </div>
          ) : (
            "LOGIN"
          )}
        </button>
        <button
          className="w-[47%] h-14 rounded-3xl bg-sky-100 font-bold tracking-wide hover:bg-sky-300 transition-colors focus:bg-sky-300"
          type="button"
          onClick={register}
        >
          {loadingRegister ? (
            <div className="flex justify-center">
              <ThreeDots
                height="50"
                width="50"
                color="gray"
                ariaLabel="circles-loading"
              />
            </div>
          ) : (
            "REGISTRATION"
          )}
        </button>
      </div>
    </form>
  );
}
