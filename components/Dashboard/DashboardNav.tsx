import { authentication } from "@/firebase/Firebase";
import { getAuth, signOut } from "firebase/auth";

const DashboardNav = () => {
  const handleLogout = async () => {
    try {
      const auth = await signOut(authentication);
      console.log("Signed out successfully", auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 bg-green-600 w-full h-20 flex items-center justify-between p-5">
      <div>Dashboard</div>
      <button onClick={handleLogout}>SignOut</button>
    </nav>
  );
};

export default DashboardNav;
