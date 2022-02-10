import axios from "axios";
import React, { useState } from "react";
import { sendAccessToken } from "../../helpers";
import { useUser } from "../context/UserContext";
type IProps = { _class: string };

const TakeAttendence = ({ _class }: IProps) => {
    const { user } = useUser();
    const [_takeAttendence, setTakeAttendence] = useState(true);
    const openAttendence = async () => {
        // TODO:check if the attendence sheet already presented or not
        try {
            const res: any = await sendAccessToken(
                `http://localhost:3001/api/openAttendence?_class=${_class}`,
                "patch"
            );
            alert(res.data.data.message);
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
            const res: any = await sendAccessToken(
                `http://localhost:3001/api/openAttendence?_class=${_class}`,
                "patch"
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
                    onClick={openAttendence}
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
