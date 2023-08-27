import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Clear the user data from sessionStorage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("name");

    // Redirect to the login page after logout
    router.push("/User/login");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-semibold">Logging out...</p>
    </div>
  );
}
