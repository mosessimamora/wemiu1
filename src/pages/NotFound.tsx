
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const NotFound = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-yearbook-cream p-4 text-yearbook-brown">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Oops! Halaman tidak ditemukan</p>
        <Link to="/" className="yearbook-button">
          Kembali ke Halaman Utama
        </Link>
      </div>
    </PageTransition>
  );
};

export default NotFound;
