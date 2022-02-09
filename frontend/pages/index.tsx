import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import router, { useRouter } from "next/router";
import { useUser } from "../src/context/UserContext";
import CreateStudent from "../src/components/CreateStudent";
import GetStudents from "../src/components/GetStudents";
import GiveAttendence from "../src/components/GiveAttendence";
import { IPayload, sendAccessToken, setTokens } from "../helpers";

const IndexPage = () => {
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        sendAccessToken("http://localhost:3001/api")
            .then(({ payload }: IPayload) => {
                user.name = payload.name;
                user.role = payload.role;
                router.push("/");
            })
            .catch((err) => router.push("/login"));
    }, []);
    //*Runs only on client side
    if (process.browser) {
        !user.name && router.push("/login");
    }
    return (
        <div>
            <Head>
                <title>home page</title>
            </Head>
            {user.role === "student" ? (
                <GiveAttendence />
            ) : (
                <>
                    <CreateStudent />
                    <GetStudents />
                </>
            )}
            <h1>logged in as {user.name}</h1>
        </div>
    );
};

export default IndexPage;
