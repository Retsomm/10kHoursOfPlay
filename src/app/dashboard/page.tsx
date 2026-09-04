import { redirect } from "next/navigation";

const DashboardIndex = () => {
  redirect("/dashboard/profile");
};

export default DashboardIndex;
