import React from "react";
import { AppProps } from "next/app";

import "../styles/index.css";
import { UserProvider } from "../src/context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <Component {...pageProps} />;
        </UserProvider>
    );
}

export default MyApp;
