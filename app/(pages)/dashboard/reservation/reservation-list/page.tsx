import GetReservations from "@/app/components/getReservations";
import Sidebar from "@/app/components/sidebar";

function ReservationList() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <GetReservations />
      </main>
    </div>
  );
}

export default ReservationList;