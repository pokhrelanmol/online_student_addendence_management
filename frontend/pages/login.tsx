import { useState } from "react";
import axios from "axios";
import router from "next/router";

import { useUser } from "../src/context/UserContext";
import { joinClasses } from "../helpers";
const login = () => {
    const [isStudent, setIsStudent] = useState(false);
    const [registration, SetRegistration] = useState(false);
    const [email, setEmail] = useState("");
    const [roll_no, setRoll_no] = useState("");
    const [password, setPassword] = useState("");

    const [name, setName] = useState("");
    const { setUser } = useUser();
    const handleRegister = async () => {
        let registerEndPoint = "";
        if (roll_no) {
            registerEndPoint = "registerStudent";
        } else {
            registerEndPoint = "registerTeacher";
        }

        try {
            const res = await axios.post(
                `http://localhost:3001/${registerEndPoint}`,
                {
                    name,
                    email,
                    roll_no,
                    password,
                }
            );
            if (res.status === 201) {
                alert(res.data.message);
                setUser({ name: email, role: "student" });
                router.push("/");
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
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3001/login", {
                email,
                roll_no,
                password,
            });
            if (res.status === 200) {
                alert(res.data.message);

                setUser({ name: email, role: "student" });
                router.push("/");
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
        <div className="container max-w-3xl mx-auto">
            {registration ? (
                //   for regitration
                <>
                    {" "}
                    <h1 className={joinClasses("text-center")}>Register</h1>
                    <div className="flex flex-col space-y-4">
                        <input
                            className="input"
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Name"
                            required
                        />
                        <input
                            className="input"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            required
                        />
                        <div>
                            <input
                                onChange={() => setIsStudent(!isStudent)}
                                className="input"
                                type="checkbox"
                                checked={isStudent}
                            />
                            <label
                                className="pl-2 text-sm font-extralight"
                                htmlFor="checkbox"
                            >
                                are you a student?
                            </label>
                        </div>
                        {isStudent && (
                            <input
                                className="input"
                                onChange={(e) => setRoll_no(e.target.value)}
                                type="text"
                                placeholder="Roll No"
                                required
                            />
                        )}

                        <input
                            className="input"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <button className="button" onClick={handleRegister}>
                            Register
                        </button>

                        <p
                            onClick={() => SetRegistration(false)}
                            className="text-blue-700 hover:underline"
                        >
                            login
                        </p>
                    </div>
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
                        <div>
                            <input
                                onChange={() => setIsStudent(!isStudent)}
                                className="input"
                                type="checkbox"
                                checked={isStudent}
                            />
                            <label
                                className="pl-2 text-sm font-extralight"
                                htmlFor="checkbox"
                            >
                                are you a student?
                            </label>
                        </div>
                        {isStudent && (
                            <input
                                className="input"
                                onChange={(e) => setRoll_no(e.target.value)}
                                type="text"
                                placeholder="Roll No"
                                required
                            />
                        )}
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
