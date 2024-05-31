import './App.css';
import  Home  from './Pages/Home.js';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import About from './Pages/About';
import SignUp from './Pages/Authentication/SignUp';
import Login from './Pages/Authentication/Login';
import AddCourse from './Pages/Course/AddCourse';
import UpdateCourse from './Pages/Course/UpdateCourse';
import DisplayCourse from './Pages/Course/DisplayCourse';
import Logout from './Pages/Authentication/Logout';
import Chat from './Pages/ChatBox/Chat';
import AuthContextProvider from './Context/AuthState';
import AuthContext from './Context/AuthContext';
import { useContext } from 'react';
import GuestNavbar from './Components/Navbar/GuestNavbar'
import AdminNavbar from './Components/Navbar/AdminNavbar'
import TeacherNavbar from './Components/Navbar/TeacherNavbar'
import StudentNavbar from './Components/Navbar/StudentNavbar'
import DisplayAllUser from './Pages/User/DisplayAllUser';
import EditUser from './Pages/User/EditUser';
import CreateAssignment from './Pages/Assignment/CreateAssignment';
import DisplayToStudent from './Pages/Assignment/DisplayToStudent';
import DisplayToTeacher from './Pages/Assignment/DisplayToTeacher';
import ViewPDF from './Pages/Assignment/ViewPDF';
import ViewQuestion from './Pages/Assignment/ViewQuestion';
import AssignmentDisplayTeacher from './Pages/Assignment/AssignmentDisplayTeacher';
import UpdateAssignment from './Pages/Assignment/UpdateAssignment';
import Remarks from './Pages/Assignment/Remarks';
import MyProfile from './Pages/Profile/MyProfile';
import UpdateProfile from './Pages/Profile/UpdateProfile';
import CreateAttendance from './Pages/Attendance/CreateAttendance';
import DisplayAttendance from './Pages/Attendance/DisplayAttendance';
import UpdateAttendance from './Pages/Attendance/UpdateAttendance';
import ErrorPage from './Pages/ErrorPage';
import TeacherProfile from './Pages/Profile/TeacherProfile';
import MyCalendar from './Pages/Calendar/MyCalendar';
import MyEvent from './Pages/Calendar/MyEvent';
import DisplayAllEvent from './Pages/Calendar/DisplayAllEvent';
import UpdateEvent from './Pages/Calendar/UpdateEvent';
import PersonalChat from './Pages/ChatBox/PersonalChat';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import Search from './Search/Search';
import Notification from './Pages/Notification/Notification';
import CourseDetails from './Pages/CourseDetails/CourseDetails';
import KhaltiPayment from './Pages/Payment/KhaltiPayment';
import SuccessPage from './Pages/Payment/SuccessPage';
import PaymentDetails from './Pages/Payment/PaymentDetails';
import PaidStudentNavbar from './Components/Navbar/PaidStudentNavbar';
import PaidContext from './Context/PaidContext';
import PaidContextProvider from './Context/PaidState';
import AdminApproval from './Pages/Authentication/AdminApproval';
import AdminPaymentView from './Pages/Payment/AdminPaymentView';
import DisplayStudent  from './Pages/User/DisplayStudent';
import DisplayTeacher  from './Pages/User/DisplayTeacher';
import TeacherDashbaord from './Components/Dashboard/TeacherDashboard';
import UpdateTeacher from './Pages/User/UpdateTeacher';
import AdminHome from './Components/Dashboard/AdminHome';
import GenderInfo from './Components/Dashboard/Data/GenderInfo';
import AssignmentStatus from './Pages/Assignment/AssignmentStatus';


const NavElement= () => {
  const {isAuthenticated, role} = useContext(AuthContext);
  const {paid}=useContext(PaidContext);

  let navbar;
  if(!isAuthenticated){
    navbar= <GuestNavbar/>;
  }
  else{
    switch(role){
      case 'admin':
        navbar= <AdminNavbar/>
        break;

      case 'teacher':
        navbar= <TeacherNavbar/>
        break;

      case 'student':
        navbar = paid ?  <PaidStudentNavbar /> :<StudentNavbar />;
        break;
      default:
        navbar= <GuestNavbar/>
        break;
    }
  }
  return navbar;
} 

const DashboardElement= () => {
  const {isAuthenticated, role} = useContext(AuthContext);
  let dashboard;
  if(!isAuthenticated){
    dashboard= <Home/>;
  }
  else{
    switch(role){
      case 'admin':
        dashboard= <AdminDashboard/>
        break;

      case 'teacher':
        dashboard= <TeacherDashbaord/>
        break;

      case 'student':
        dashboard= <Home/>
        break;

      default:
        dashboard= <Home/>
        break;
    }
  }
  return dashboard;
} 

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={< NavElement/>}>
      <Route index element={<DashboardElement/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/signUp" element={<SignUp/>} />
      <Route path="/logIn" element={<Login/>} />
      <Route path="/addCourse" element={<AddCourse/>} />
      <Route path="/updateCourse/:id" element={<UpdateCourse/>} />
      <Route path="/logout" element={<Logout/>} />
      <Route path="/chat" element={<Chat/>} />
      <Route path="/displayCourse" element={<DisplayCourse/>} />
      <Route path="/displayAllUser" element={<DisplayAllUser/>} />
      <Route path="/editUser/:id" element={<EditUser/>} />
      <Route path="/createAssignment" element={<CreateAssignment/>} />
      <Route path="/displayToStudent" element={<DisplayToStudent/>} />
      <Route path="/displayToTeacher" element={<DisplayToTeacher/>} />
      <Route path="/viewPDF/:id" element={<ViewPDF/>} />
      <Route path="/viewQuestion/:id" element={<ViewQuestion/>} />
      <Route path="/displayAssignmentTeacher" element={<AssignmentDisplayTeacher/>} />
      <Route path="/updateAssignment/:id" element={<UpdateAssignment/>} />
      <Route path="/remarks/:id/:subject" element={<Remarks/>} />
      <Route path="/myProfile" element={<MyProfile/>} />
      <Route path="/teacherProfile" element={<TeacherProfile/>} />
      <Route path="/updateProfile/:id" element={<UpdateProfile/>} />
      <Route path="/createAttendance" element={<CreateAttendance/>} />
      <Route path="/displayAttendance" element={<DisplayAttendance/>} />
      <Route path="/updateAttendance/:id" element={<UpdateAttendance/>} />
      <Route path="/calendar" element={<MyCalendar/>} />
      <Route path="/addEvent" element={<MyEvent/>} />
      <Route path="/displayAllEvent" element={<DisplayAllEvent />} />
      <Route path="/updateEvent/:id" element={<UpdateEvent />} />
      <Route path="/personalChat" element={<PersonalChat />} />
      <Route path="/searchResult" element={<Search/>} />
      <Route path="/notification" element={<Notification/>} />
      <Route path="/courseDetails/:id" element={<CourseDetails/>} />
      <Route path="/khalti" element={<KhaltiPayment/>} />
      <Route path="/success" element={<SuccessPage/>} />
      <Route path="/paymentDetails/:id" element={<PaymentDetails/>} />
      <Route path="/adminApproval" element={<AdminApproval/>} />
      <Route path="/viewPaymentRecord" element={<AdminPaymentView/>} />
      <Route path="/displayStudent" element={<DisplayStudent/>} />
      <Route path="/displayTeacher" element={<DisplayTeacher/>} />
      <Route path="/updateTeacher/:id" element={<UpdateTeacher/>} />
      <Route path="/adminHome" element={<AdminHome/>} />
      <Route path="/genderInfo" element={<GenderInfo/>} />
      <Route path="/assignmentStatus" element={<AssignmentStatus/>} />
      <Route path="*" element={<ErrorPage/>} /> 
    </Route>
  )
);


function App() {
  return (
    <>
    <AuthContextProvider>
      <PaidContextProvider>
        <RouterProvider router={router} />  
      </PaidContextProvider> 
    </AuthContextProvider>
    </>
  );
}



export default App;
