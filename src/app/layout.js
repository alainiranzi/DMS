import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>DMS</title>
      </head>
      <body>
        <AuthProvider>
          <Toaster position="top-right" /> 
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}