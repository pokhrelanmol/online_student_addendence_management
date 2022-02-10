import axios from "axios";
import React, { useEffect, useState } from "react";
import { sendAccessToken } from "../../helpers";
import { useUser } from "../context/UserContext";
export interface StudentState {
    name: string;
    email: string;
    rollNumber: string;
    class: string;
    mobile: number;
}

const CreateStudent = () => {
    const { user } = useUser();
    const [classes, setClasses] = useState([]);
    const [student, setStudent] = useState<StudentState>({
        name: "",
        email: "",
        rollNumber: "",
        class: "",
        mobile: "" as unknown as number,
    });
    useEffect(() => {
        const getClasses = async () => {
            try {
                const res: any = await sendAccessToken(
                    `http://localhost:3001/api/classes`,
                    "get"
                );
                if (res.data.data.length <= 0)
                    alert("opps not classes has been alloted to you");
                console.log(res.data.data);
                setClasses(res.data.data);
            } catch (error) {
                const errRes = error.response;
                console.log(errRes);
                if (errRes?.status === 404) {
                    alert(errRes.data.error.message);
                } else if (errRes?.status === 500) {
                    alert(errRes.data.error);
                }
            }
        };
        getClasses();
    }, []);
    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { value, name } = e.target;
        setStudent({
            ...student,
            [name]: value,
        } as unknown as StudentState);
    };
    const handleCreateStudent = async () => {
        try {
            const res: any = await sendAccessToken(
                `http://localhost:3001/api/createStudent`,
                "post",
                student
            );
            if (res.data.data.status === 201) {
                alert(res.data.data.message);
                setStudent({
                    name: "",
                    email: "",
                    rollNumber: "",
                    class: "",
                    mobile: "" as unknown as number,
                });
            }
        } catch (error) {
            const errRes = error.response;
            if (errRes.status) {
                alert(errRes.data.error.message);
            }
        }
    };
    return (
        <div>
            <h1>Create New Student</h1>
            <div>
                <input
                    onChange={handleChange}
                    type="text"
                    value={student.name}
                    name="name"
                    placeholder="Name of the Student"
                />
                <input
                    onChange={handleChange}
                    type="email"
                    value={student.email}
                    name="email"
                    placeholder="Email"
                />
                <input
                    onChange={handleChange}
                    type="text"
                    value={student.rollNumber}
                    name="rollNumber"
                    placeholder="Roll No"
                />
                <input
                    onChange={handleChange}
                    type="number"
                    value={student.mobile}
                    name="mobile"
                    placeholder="Mobile No"
                />
                <select name="class" onChange={handleChange} id="">
                    <option value="null">--select class--</option>
                    {classes.map((className, index) => (
                        <option key={index} value={className}>
                            {className}
                        </option>
                    ))}
                </select>
                <button onClick={handleCreateStudent}>Create Student</button>
            </div>

            {/*list of students with class  */}
        </div>
    );
};

export default CreateStudent;
