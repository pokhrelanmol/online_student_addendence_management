import axios from "axios";
import { useEffect } from "react";
import { joinClasses, sendAccessToken } from "../../helpers";

const GiveAttendence = () => {
    // TODO: check if the logged in student have some attendence going or not
    useEffect(() => {
        const checkOngoingAttendence = async () => {
            const res = await sendAccessToken(
                "http://localhost:3001/ongoingAttendence",
                "get"
            );
            console.log(res);
        };
    }, []);
    return (
        <div className={joinClasses("space-x-4 m-5")}>
            <input type="text" disabled value="name" className="input" />
            <input type="text" disabled value="email" className="input" />
            <input type="text" disabled value="roll No" className="input" />
            <button className="button">present</button>
        </div>
    );
};
export default GiveAttendence;
