import Sidebar from "@/app/components/sidebar";
import { requireAuth } from "@/app/hooks/getCookies";

export default async function Home() {
  await requireAuth();

  return (
    <div>
      <Sidebar />
    </div>
  );
}