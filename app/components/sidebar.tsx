import { getCurrentUser } from "../hooks/getCookies";
import { sideBarElements } from "../utils/sideBarElements";

async function Sidebar() {
    const user = await getCurrentUser();
    return (
        <div>

        </div>
    );
}

export default Sidebar;