import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import router, { useRouter } from "next/router";
import { useUser } from "../src/context/UserContext";
import CreateStudent from "../src/components/CreateStudent";
import GetStudents from "../src/components/GetStudents";
import GiveAttendence from "../src/components/GiveAttendence";
import axios from "axios";
import jwt from "jsonwebtoken";
interface IPayload {
    role: string;
    aud: string;
    name: string;
}

const IndexPage = () => {
    const router = useRouter();
    const { user } = useUser();

    // send token
    async function sendAccessToken(accessToken: string) {
        try {
            const res = await axios.get("http://localhost:3001/api", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const payload: IPayload = jwt.decode(accessToken);
            user.name = payload.name;
            router.push("/");
        } catch (error) {
            console.log(error.response);
            router.push("/login");
        }
    }
    useEffect(() => {
        const tokens: any = JSON.parse(localStorage.getItem("tokens"));

        if (tokens) {
            sendAccessToken(tokens.accessToken);
        } else {
            router.push("/login");
        }
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
