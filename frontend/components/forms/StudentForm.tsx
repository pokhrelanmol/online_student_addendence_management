import { useState } from "react";
import axios from "axios";
import router from "next/router";

const StudentForm = () => {
    const [registration, SetRegistration] = useState(false);
    const [email, setEmail] = useState("");
    const [roll_no, setRoll_no] = useState("");
    const [password, setPassword] = useState("");

    const [name, setName] = useState("");
    const handleRegister = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3001/registerStudent",
                {
                    name,
                    email,
                    roll_no,
                    password,
                }
            );
            if (res.status === 201) {
                alert(res.data.message);
                router.push("/attendence");
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
            const res = await axios.post("http://localhost:3001/loginStudent", {
                email,
                roll_no,
                password,
            });
            if (res.status === 200) {
                alert(res.data.mkessage);

                router.push("/attendence");
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
            <h1>Student Form</h1>
            {registration ? (
                //   for regitration
                <div>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        required
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        onChange={(e) => setRoll_no(e.target.value)}
                        type="text"
                        placeholder="Roll No"
                        required
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <button onClick={handleRegister}>Register</button>

                    <p
                        onClick={() => SetRegistration(false)}
                        className="text-blue-700 hover:underline"
                    >
                        login
                    </p>
                </div>
            ) : (
                // for login
                <div>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        onChange={(e) => setRoll_no(e.target.value)}
                        type="text"
                        placeholder="Roll No"
                        required
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        required
                    />

                    <button onClick={handleLogin}>Login</button>
                    <p
                        onClick={() => SetRegistration(true)}
                        className="text-blue-700 hover:underline"
                    >
                        register
                    </p>
                </div>
            )}
        </div>
    );
};

export default StudentForm;
