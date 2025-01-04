import { useNavigate } from "react-router-dom";

export default function SuccessPopup({ msg, btn, nav, ...props }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">
          Success!
        </h2>
        <p className="text-gray-700 text-center mb-6">{msg} </p>
        <button
          onClick={() => navigate(nav)}
          className="w-full flex justify-center rounded-md bg-purple-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-800"
        >
          {btn}
        </button>
      </div>
    </div>
  );
}
