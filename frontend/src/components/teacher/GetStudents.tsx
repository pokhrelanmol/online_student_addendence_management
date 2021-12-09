import axios from "axios";
import { useEffect, useState } from "react";

const GetStudents = () => {
    const [_class, _setClass] = useState("");
    useEffect(() => {
        const getStudents = async () => {
            const res = await axios.get(
                `http://localhost:3001/getStudents/${_class}`
            );
        };
        getStudents();
    }, []);
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
        </div>
    );
};

export default GetStudents;
