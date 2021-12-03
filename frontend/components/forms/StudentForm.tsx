import { useState } from "react";
import axios from "axios";

const StudentForm = () => {
    const [registration, SetRegistration] = useState(false);
    const [email, setEmail] = useState("");
    const [rollNo, setRollNo] = useState("");

    const [name, setName] = useState("");
    const handleRegister = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3001/registerStudent",
                {
                    name,
                    email,
                    rollNo,
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3001/loginStudent", {
                email,
                rollNo,
            });
        } catch (error) {
            console.log(error.message);
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
                        onChange={(e) => setRollNo(e.target.value)}
                        type="text"
                        placeholder="Roll No"
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
                        onChange={(e) => setRollNo(e.target.value)}
                        type="text"
                        placeholder="Roll No"
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
