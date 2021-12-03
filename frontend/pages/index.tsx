import Link from "next/link";
import Head from "next/head";
import { joinClasses } from "../helpers";
import StudentForm from "../components/forms/StudentForm";
import { useState } from "react";
import TeacherForm from "../components/forms/TeacherForm";

const IndexPage = () => {
    const [isStudent, setIsStudent] = useState(false);
    return (
        <div>
            <Head>
                <title>home page</title>
            </Head>
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

export default IndexPage;
