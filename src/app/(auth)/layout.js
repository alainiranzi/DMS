import "../globals.css";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-sky-700">DMS</h1>
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        {children}
      </div>
    </div>
  );
}