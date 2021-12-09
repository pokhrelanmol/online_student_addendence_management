import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
type StudentState = {
    name: string;
    email: string;
    roll_no: string;
    class: string;
    mobile: number;
};
const CreateStudent = () => {
    const { user } = useUser();
    const [student, setStudent] = useState<StudentState>({
        name: "",
        email: "",
        roll_no: "",
        class: "",
        mobile: "" as unknown as number,
    });
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
            const res = await axios.post(
                `http://localhost:3001/createStudent/${user.name}`,
                student
            );
            if (res.status === 201) {
                alert(res.data.message);
                setStudent({
                    name: "",
                    email: "",
                    roll_no: "",
                    class: "",
                    mobile: "" as unknown as number,
                });
            }
        } catch (error) {
            const errRes = error.response;
            if (errRes.status === 400) {
                alert(errRes.data.error);
            } else if (errRes.status === 500) {
                alert(errRes.data.error);
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
                    value={student.roll_no}
                    name="roll_no"
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
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="One">One</option>
                    <option value="Two">Two</option>
                </select>
                <button onClick={handleCreateStudent}>Create Student</button>
            </div>

            {/*list of students with class  */}
        </div>
    );
};

export default CreateStudent;
