import axios from "axios";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import { joinClasses, setTokens } from "../../helpers";
import CircularLoader from "./CircularLoader";
type Students = {
    rollNumber: string;
}[];

const StudentRegister = () => {
    const [students, setStudents] = useState<Students>([]);
    const [rollNumber, setRollNumber] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswordField, setShowPasswordField] = useState(false);
    const [password, setPassword] = useState("");

    const [classes, setClasses] = useState<string[]>(["LKG", "UKG"]);
    useEffect(() => {
        const getAllClasses = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3001/api/classes"
                );
                let _classes = [];
                res.data.forEach((_class: { name: string }) => {
                    _classes.push(_class.name);
                });
                console.log(classes);
                setClasses([..._classes]);
            } catch (error) {
                console.log(error.response);
            }
        };
        getAllClasses();
    }, []);
    const handleClassChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setStudents([]);
        if (e.target.value) {
            try {
                setIsLoading(true);

                const res = await axios.get(
                    `http://localhost:3001/api/auth/registerStudent/?_class=${e.target.value}`
                );
                console.log(res);
                setStudents(res.data.students);

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                alert(error.response.data.error.message);
            }
        }
    };
    const findStudent = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(
                `http://localhost:3001/api/auth/registerStudent/?rollNumber=${rollNumber}&email=${email}`
            );
            console.log(res);
            if (res) setShowPasswordField(true);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            alert(error.response.data.error.message);
        }
    };

    const handleRegsiter = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3001/api/auth/registerStudent/?rollNumber=${rollNumber}&email=${email}&password=${password}`
            );
            console.log(res);
            const tokens = {
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            };
            setTokens(tokens);
            alert(res.data.message);
            Router.push("/");
        } catch (error) {
            console.log(error.response);
        }
    };
    return (
        <div className="space-y-5">
            {isLoading && <CircularLoader />}
            {/*dropDown  */}
            <div>
                <label htmlFor=""> select class</label>
                <select name="" id="" onChange={handleClassChange}>
                    <option value={null}>--select--</option>
                    {classes?.map((_class: string) => (
                        <option value={_class}>{_class}</option>
                    ))}
                </select>
            </div>
            {students.length > 0 ? (
                <>
                    <span>Select Roll Number</span>
                    <select
                        name=""
                        id=""
                        onChange={(e) => setRollNumber(e.target.value)}
                    >
                        {students.map(({ rollNumber }, indx) => (
                            <>
                                <option value={null}>--select--</option>
                                <option key={indx} value={rollNumber}>
                                    {rollNumber}
                                </option>
                            </>
                        ))}
                    </select>
                    <p>Enter the Email You have Given to Your Institute</p>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className=" ml-5 py-2 px-4 bg-gray-400 text-white rounded-md"
                        onClick={findStudent}
                    >
                        Find Me
                    </button>
                    {showPasswordField ? (
                        <div>
                            <label htmlFor="">Set Your Password</label>
                            <input
                                className="input"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* try using forward ref here */}
                            <button className="button" onClick={handleRegsiter}>
                                Register
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default StudentRegister;
