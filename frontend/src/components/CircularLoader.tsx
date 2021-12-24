import React, { ReactElement } from "react";

export default function CircularLoader(): ReactElement {
    return (
        <div>
            <div className="flex items-center justify-center mr-2">
                <div className="w-7 h-8 border-b-2 border-gray-700 rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
