import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
          404
        </h1>

        <div className="bg-blue-500 px-4 py-2 text-sm rounded rotate-12 absolute mt-4">
          Page Not Found
        </div>

        <p className="text-gray-600 mt-8 mb-8">
          Oops! Halaman yang kamu cari tidak ditemukan.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}