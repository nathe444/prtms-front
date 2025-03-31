import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

const Dashboard = () => {

    const User = useSelector((state:RootState) => state.auth.user);
    console.log(User)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard