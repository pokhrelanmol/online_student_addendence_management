import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
const GetStudents = () => {
    const { user } = useUser();
    const [_class, _setClass] = useState("");
    const getStudents = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3001/getStudents/${user.name}?_class=${_class}`
            );
            // incase server doesn't return error
            if (res.data.totalStudents.length <= 0) {
                alert(" No Students found");
            }
        } catch (error) {
            const errRes = error.response;
            if (errRes.status === 404) {
                alert(errRes.data.error);
            } else if (errRes.status === 500) {
                alert(errRes.data.error);
            }
        }
    };

    return (
        <div>
            <h1>Get Student List</h1>
            <select name="" id="" onChange={(e) => _setClass(e.target.value)}>
                <option value="Nursery">Nursery</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                <option value="One">One</option>
                <option value="Two">Two</option>
            </select>
            <button onClick={getStudents}>Get</button>
        </div>
    );
};

export default GetStudents;
