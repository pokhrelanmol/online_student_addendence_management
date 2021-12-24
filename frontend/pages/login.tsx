import { useState } from "react";
import axios from "axios";
import router from "next/router";

import { useUser } from "../src/context/UserContext";
import { joinClasses } from "../helpers";
import StudentRegister from "../src/components/StudentRegister";
const login = () => {
    const [registration, SetRegistration] = useState(false);
    const [email, setEmail] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isTeacher, setIsTeacher] = useState(false);

    const [name, setName] = useState("");
    const { setUser } = useUser();
    const handleRegister = async () => {
        try {
            const res = await axios.patch(
                `http://localhost:3001/api/auth/registerStudent`,
                {
                    name,
                    email,
                    rollNumber,
                    password,
                }
            );
            if (res.status === 201) {
                console.log(res);
                alert(res.data.message);
                setUser({ name: email, role: "student" });
                router.push("/");
            }
        } catch (error) {
            const errRes = error.response;
            console.log(errRes);

            if (errRes) alert(errRes.data.error.message);
        }
    };
    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3001/api/auth/login",
                {
                    email,
                    rollNumber,
                    password,
                    isTeacher,
                }
            );
            if (res.status === 200) {
                const tokens = {
                    accessToken: res.data.accessToken as string,
                    refreshToken: res.data.refreshToken as string,
                };
                localStorage.setItem("tokens", JSON.stringify(tokens));
                setUser({
                    name: email,
                    role: isTeacher ? "teacher" : "student",
                });
                router.push("/");
            }
        } catch (error) {
            const errRes = error.response;
            if (errRes) alert(errRes.data.error.message);
        }
    };

    return (
        <div className="container max-w-3xl mx-auto">
            {registration ? (
                <>
                    <StudentRegister />
                    <p
                        onClick={() => SetRegistration(false)}
                        className="text-blue-700 hover:underline"
                    >
                        login
                    </p>
                </>
            ) : (
                // for login
                <>
                    <h1 className={joinClasses("text-center")}>Login </h1>
                    <div className="flex flex-col space-y-4">
                        <input
                            className="input"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            required
                        />
                        {!isTeacher ? (
                            <input
                                className="input"
                                type="text"
                                placeholder="Roll Number"
                                onChange={(e) => setRollNumber(e.target.value)}
                            />
                        ) : (
                            ""
                        )}
                        <div>
                            <input
                                onChange={() => setIsTeacher(!isTeacher)}
                                className="input"
                                type="checkbox"
                                checked={isTeacher}
                            />
                            <label
                                className="pl-2 text-sm font-extralight"
                                htmlFor="checkbox"
                            >
                                are you a teacher?
                            </label>
                        </div>

                        <input
                            className="input"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            required
                        />

                        <button className="button" onClick={handleLogin}>
                            Login
                        </button>
                        <p
                            onClick={() => SetRegistration(true)}
                            className="text-blue-700 hover:underline"
                        >
                            register
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default login;
