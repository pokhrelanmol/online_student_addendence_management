import { joinClasses } from "../../helpers";

const GiveAttendence = () => {
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
