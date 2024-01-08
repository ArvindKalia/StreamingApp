import AdminPanel from "../../../../Components/AdminPanel/AdminPanel";
import Jobs from "../../../../Components/AdminPanel/Jobs/Jobs";

const page = ()=>{
    const design=(
        <>
        <AdminPanel>
            <Jobs />
        </AdminPanel>
        </>
    )
    return design;
}
export default page;