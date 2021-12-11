import { useState } from "react";
import axios from "axios";
import router from "next/router";
import { useUser } from "../../context/UserContext";
const TeacherForm = () => {
    const [registration, setRegistration] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useUser();
    const handleRegister = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3001/registerTeacher",
                {
                    name,
                    email,
                    password,
                }
            );
            if (res.status === 201) {
                setUser({ name: email, role: "teacher" });
                alert(res.data.message);
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
            const res = await axios.post("http://localhost:3001/loginTeacher", {
                email,
                password,
            });
            if (res.status === 200) {
                setUser({ name: email, role: "teacher" });
                alert(res.data.message);

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
        <div>
            <h1>Teacher Form</h1>
            {registration ? (
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
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <button onClick={handleRegister}>Register</button>
                    <p
                        onClick={() => setRegistration(false)}
                        className="text-blue-700 hover:underline"
                    >
                        login
                    </p>
                </div>
            ) : (
                <div>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
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
                        onClick={() => setRegistration(true)}
                        className="text-blue-700 hover:underline"
                    >
                        register
                    </p>
                </div>
            )}
        </div>
    );
};

export default TeacherForm;
