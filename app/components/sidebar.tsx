import { getCurrentUser } from "../hooks/getCookies";

async function Sidebar() {
    const user = await getCurrentUser();


    return (
        <div>

        </div>
    );
}

export default Sidebar;