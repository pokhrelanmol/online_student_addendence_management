import React, { ReactNode } from "react";

interface UserProps {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
}

type ProviderProps = {
    children: ReactNode;
};

export const UserContext = React.createContext<UserProps>({
    user: "",
    setUser: () => {},
});

export const UserProvider = ({ children }: ProviderProps) => {
    const [user, setUser] = React.useState<string>("");
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
