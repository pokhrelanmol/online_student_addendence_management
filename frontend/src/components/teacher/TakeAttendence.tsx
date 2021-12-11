import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
type IProps = { _class: string };

const TakeAttendence = ({ _class }: IProps) => {
    const { user } = useUser();
    const [_takeAttendence, setTakeAttendence] = useState(true);
    const takeAttendence = async () => {
        try {
            const res = await axios.patch(
                `http://localhost:3001/takeAttendence?user=${user.name}&_class=${_class}`
            );
            alert(res.data.message);
            setTakeAttendence(false);
        } catch (error) {
            const errRes = error.response;
            if (errRes.status === 404) {
                alert(errRes.data.error);
            } else if (errRes.status === 500) {
                alert(errRes.data.error);
            }
        }
    };
    const finishAttendence = async () => {
        try {
            const res = await axios.patch(
                `http://localhost:3001/finishAttendence?user=${user.name}&_class=${_class}`
            );
            alert(res.data.message);
            setTakeAttendence(true);
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
        <div className="flex justify-end">
            {_takeAttendence ? (
                <button
                    onClick={takeAttendence}
                    className="py-2 px-4 bg-indigo-700 text-white mb-2"
                >
                    Take Attendence
                </button>
            ) : (
                <button
                    onClick={finishAttendence}
                    className="py-2 px-4 bg-red-700 text-white mb-2"
                >
                    Finish Attendence
                </button>
            )}
        </div>
    );
};

export default TakeAttendence;
