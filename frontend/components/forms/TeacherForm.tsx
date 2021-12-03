import { useState } from "react";

const TeacherForm = () => {
    const [registration, setRegistration] = useState(false);
    return (
        <div>
            {registration ? (
                <div>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <button>Register</button>
                    <p
                        onClick={() => setRegistration(false)}
                        className="text-blue-700 hover:underline"
                    >
                        login
                    </p>
                </div>
            ) : (
                <div>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />

                    <button>Login</button>
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
