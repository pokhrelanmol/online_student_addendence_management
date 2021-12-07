import React, { ReactNode } from "react";

interface UserProps {
    user: {
        name: string;
        role: string;
    };
    setUser: React.Dispatch<
        React.SetStateAction<{ name: string; role: string }>
    >;
}

type ProviderProps = {
    children: ReactNode;
};

export const UserContext = React.createContext<UserProps>({
    user: { name: "", role: "" },
    setUser: () => {},
});

export const UserProvider = ({ children }: ProviderProps) => {
    const [user, setUser] = React.useState({
        name: "",
        role: "",
    });
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => React.useContext(UserContext);
