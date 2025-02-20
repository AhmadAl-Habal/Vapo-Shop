import { Link, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 flex  justify-between">
      <Link
        className="border border-2 py-1 px-4 rounded-full inline-block text-sm mb-5 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-md"
        to={"/"}
      >
        العودة الى الصفحة الرئيسية
      </Link>
      <button
        onClick={() => navigate(-1)}
        className="border border-2 py-1 px-4 rounded-full inline-block text-sm mb-5 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-md"
      >
        رجوع
      </button>
    </div>
  );
};

export default BackButton;
