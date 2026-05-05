import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

const Home = () => {
  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-bold">Student Management</h1>
      <StudentForm />
      <StudentList />
    </div>
  );
};

export default Home;