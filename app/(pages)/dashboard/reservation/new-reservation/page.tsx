import CreateCustomer from "@/app/components/createCustomer";
import CreateReservations from "@/app/components/createReservations";
import Sidebar from "@/app/components/sidebar";

function newReservation() {
  return <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 overflow-auto">
      <CreateCustomer />
    </main>
  </div>;
}

export default newReservation;
