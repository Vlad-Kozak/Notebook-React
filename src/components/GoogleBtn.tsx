import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export function GoogleBtn() {
  return (
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
  );
}
