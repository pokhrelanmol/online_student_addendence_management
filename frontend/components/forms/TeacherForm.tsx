import { useState } from "react";
import axios from "axios";
const TeacherForm = () => {
    const [registration, setRegistration] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleRegister = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3001/registerTeacher"
            );
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3001/loginTeacher", {
                name,
                email,
            });
        } catch (error) {
            console.log(error.message);
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
