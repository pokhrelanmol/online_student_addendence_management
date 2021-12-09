import StudentForm from "../src/components/forms/StudentForm";
import { useState } from "react";
import TeacherForm from "../src/components/teacher/TeacherForm";
const login = () => {
    const [isStudent, setIsStudent] = useState(false);
    return (
        <div>
            {isStudent ? <StudentForm /> : <TeacherForm />}
            <p
                className="text-indigo-600 hover:underline text-lg"
                onClick={() => setIsStudent(!isStudent)}
            >
                i m a {isStudent ? "Teacher" : "Student"}
            </p>
        </div>
    );
};

export default login;
