import axios from "axios";
import { useEffect, useState } from "react";
import { sendAccessToken } from "../../helpers";
import { useUser } from "../context/UserContext";
import { StudentState } from "./CreateStudent";
import TakeAttendence from "./TakeAttendence";
interface Student extends StudentState {
    teacher: string;
    takeAttendence: boolean;
}
const GetStudents = () => {
    const { user } = useUser();
    const [students, setStudents] = useState<Student[]>([] as Student[]);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");

    useEffect(() => {
        const getClasses = async () => {
            try {
                const res: any = await sendAccessToken(
                    `http://localhost:3001/api/classes`,
                    "get"
                );
                if (res.data.data.length <= 0)
                    alert("opps not classes has been alloted to you");
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
    const getStudents = async () => {
        try {
            const res: any = await sendAccessToken(
                `http://localhost:3001/api/getStudents?_class=${selectedClass}`,
                "get"
            );
            // incase server doesn't return error
            if (res.data.data.length <= 0) {
                alert(" No Students found");
            } else {
                setStudents(res.data.data);
            }
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

    return (
        <div>
            <div>
                <h1>Get Student List</h1>
                <select onChange={(e) => setSelectedClass(e.target.value)}>
                    {classes?.map((className, index) => (
                        <option key={index} value={className}>
                            {className}
                        </option>
                    ))}
                </select>
                <button onClick={getStudents}>Get</button>
            </div>
            <div>
                <TakeAttendence _class={selectedClass} />
                <table className="flex flex-col items-center mx-auto   border-black border bg-gray-200 overflow-y-scroll   overflow-scroll ">
                    <thead className="w-full">
                        <tr className=" text-white  flex justify-around items-center w-full  bg-black border-b border-gray-600 uppercase ">
                            <th className="">Name</th>
                            <th className=" ">Email</th>
                            <th className=" ">Roll No</th>
                            <th>Class</th>
                            <th className="">mobile</th>
                            {/* days student was present */}
                        </tr>
                    </thead>
                    {students?.map((student) => (
                        <tbody
                            key={Math.floor(Math.random() * 100)}
                            className="flex justify-center  flex-col "
                        >
                            <tr className="text-center  text-gray-500">
                                <td className=" border w-64 border-gray-600 p-3 capitalize ">
                                    {student.name}
                                </td>
                                <td className=" border w-64  hover:bg-yellow-300 border-gray-600  p-3">
                                    {student.email}
                                </td>
                                <td className=" border w-64 hover:bg-red-300  border-gray-600 p-3">
                                    {student.rollNumber}
                                </td>
                                <td className=" border w-64 hover:bg-green-300  border-gray-600 p-3">
                                    {student.class}
                                </td>
                                <td className=" border w-64 hover:bg-green-300  border-gray-600 p-3">
                                    {student.mobile}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default GetStudents;
