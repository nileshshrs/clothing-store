import TodoList from '../Todos/TodoList'
import "./dashboardcontent.scss"
import img from "../../../assets/dashboard1.png"
import img1 from "../../../assets/dashboard2.png"
import img2 from "../../../assets/dashboard3.png"
import img3 from "../../../assets/dashboard4.png"
import img4 from "../../../assets/dashboard5.png"
import { useAuthContext } from '../../../context/useAuthContext';
import "../Todos/todolist.scss"


const DashboardContent = () => {
  const { user } = useAuthContext()
  const id = user?.user?.id
  const accesstoken = user ? user.token : null



  return (
    <div className='main px-3'>
      <div className="card-container">
        <div className='todolist p-0'><img src={img} alt="" className='h-full w-full' /></div>
        <div className='todolist p-0'><img src={img1} alt="" className='h-full w-full' /></div>
        <div className='todolist p-0'><img src={img2} alt="" className='h-full w-full' /></div>
        <div className='todolist p-0'><img src={img3} alt="" className='h-full w-full' /></div>
        <TodoList />
      </div>
      <div className='py-5'>
        <div className=''>
          <img src={img4} alt="" className='shadow-xl shadow-black/15 rounded-lg border mx-auto' />
        </div>
      </div>

    </div >
  )
}

export default DashboardContent