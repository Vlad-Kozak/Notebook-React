import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { authOperations } from "../redux/auth/authOperations";
import { isLoadingLogin, isLoadingRegister } from "../redux/reduxSelectors";
import { ThreeDots } from "react-loader-spinner";
import { Formik, Field, Form } from "formik";
import { GoogleBtn } from "./GoogleBtn";
import * as yup from "yup";

interface IFormValues {
  email: string;
  password: string;
}

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loadingRegister = useAppSelector(isLoadingRegister);
  const loadingLogin = useAppSelector(isLoadingLogin);
  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("This field is required"),
    password: yup
      .string()
      .min(6, "The minimum number of characters must be 6")
      .required("This field is required"),
  });

  const initialValues: IFormValues = { email: "", password: "" };

  const login = async (values: IFormValues) => {
    const { email, password } = values;
    await dispatch(
      authOperations.login({
        email,
        password,
      })
    );
  };

  const register = async (values: IFormValues) => {
    const { email, password } = values;
    await dispatch(
      authOperations.register({
        email,
        password,
      })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={login}
      validateOnChange
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, isValid, dirty }) => (
        <Form className="flex flex-col items-center px-20 py-14 rounded-3xl shadow-2xl bg-white text-sm">
          <p className="w-72 mb-5">You can log in with your Google Account:</p>
          <GoogleBtn />
          <p className="w-72 mb-5">
            Or log in using an email and password, after registering:
          </p>

          {/* email */}
          <label className="flex flex-col mb-5">
            <span className="mb-3">Email:</span>
            <Field
              className={`w-72 h-14 rounded-3xl px-5 text-xl bg-sky-100 placeholder-gray-500  ${
                values.email.length > 0 && !errors.email
                  ? "border-2 border-green-500 outline-green-500"
                  : "outline-sky-200"
              }`}
              name="email"
              placeholder="your@email.com"
            />
          </label>

          {/* password */}
          <label className="flex flex-col mb-12">
            <span className="mb-3">Password:</span>
            <div className="relative">
              <Field
                className={`w-72 h-14 rounded-3xl pl-5 pr-12 text-xl bg-sky-100 placeholder-gray-500 ${
                  values.password.length > 0 && !errors.password
                    ? "border-2 border-green-500 outline-green-500"
                    : "outline-sky-200"
                }`}
                name="password"
                placeholder="password"
                type={showPassword ? "text" : "password"}
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
              className={`w-[47%] h-14 rounded-3xl bg-sky-100 font-bold tracking-wi transition-colors  ${
                dirty &&
                isValid &&
                "bg-sky-700 text-white hover:bg-sky-900 focus:bg-sky-900"
              }`}
              type="submit"
              disabled={!isValid || !dirty}
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
              className={`w-[47%] h-14 rounded-3xl bg-sky-100 font-bold tracking-wide transition-colors ${
                dirty &&
                isValid &&
                "bg-sky-700 text-white hover:bg-sky-900 focus:bg-sky-900"
              }`}
              type="button"
              disabled={!isValid || !dirty}
              onClick={() => {
                register(values);
              }}
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
        </Form>
      )}
    </Formik>
  );
}
