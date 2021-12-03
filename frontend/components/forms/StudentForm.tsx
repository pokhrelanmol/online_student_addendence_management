import { useState } from "react";
import handler from "../../pages/api/users";

const StudentForm = () => {
    const [registration, SetRegistration] = useState(false);
    const [email, setEmail] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [name, setName] = useState("");
    return (
        <div>
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
