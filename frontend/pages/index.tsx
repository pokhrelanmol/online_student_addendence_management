import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../src/context/UserContext";

const IndexPage = () => {
    const router = useRouter();
    const { user } = useUser();
    if (process.browser) {
        !user.name && router.push("/login");
    }
    return (
        <div>
            <Head>
                <title>home page</title>
            </Head>
            {user.role === "student" ? (
                <h1>student page</h1>
            ) : (
                <h1>teacher page</h1>
            )}
            <h1>logged in as {user.name}</h1>
        </div>
    );
};

export default IndexPage;
