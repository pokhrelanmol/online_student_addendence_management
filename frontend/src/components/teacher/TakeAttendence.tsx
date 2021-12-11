import axios from "axios";
import React from "react";
import { useUser } from "../../context/UserContext";
type IProps = { _class: string };

const TakeAttendence = ({ _class }: IProps) => {
    const { user } = useUser();

    const takeAttendence = async () => {
        const res = await axios.get(
            `http://localhost:3001/takeAttendence?user=${user.name}&_class=${_class}`
        );
        console.log(res);
    };
    return (
        <div className="flex justify-end">
            <button
                onClick={takeAttendence}
                className="py-2 px-4 bg-indigo-700 text-white mb-2"
            >
                Take Attendence
            </button>
        </div>
    );
};

export default TakeAttendence;
