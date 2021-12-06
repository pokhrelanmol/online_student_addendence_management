import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import router from "next/router";
import { useUser } from "../src/context/UserContext";

const IndexPage = () => {
    const { user } = useUser();
    console.log(user);
    !user && router.push("/login");
    return (
        <div>
            <Head>
                <title>home page</title>
            </Head>
            <h1>logged in as {user}</h1>
        </div>
    );
};

export default IndexPage;
