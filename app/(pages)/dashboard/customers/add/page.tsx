import CreateCustomer from "@/app/components/createCustomer";
import Sidebar from "@/app/components/sidebar";
function addCustomer() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <CreateCustomer />
      </main>
    </div>
  );
}

export default addCustomer;
