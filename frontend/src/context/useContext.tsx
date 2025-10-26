import { createContext, useState, type ReactNode } from "react";

interface ContextType {
    user: any;
    updateUser: (newUser: any) => void;
    removeUser: () => void;
}

export const UserContext = createContext<ContextType | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
}

const UserProvider = ({ children }: ProviderProps) => {
    const [user, setUser] = useState<any>(null);

    const updateUser = (newUser: any) => {
        setUser(newUser);
    };

    const removeUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, updateUser, removeUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
