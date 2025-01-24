'use client';
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for the context value
interface GlobalContextType {
    user: any; // Replace 'any' with a specific type if the user object has a defined structure
    setUser: Dispatch<SetStateAction<any>>; // Adjust 'any' to the user type accordingly
}

// Create the context with the defined type
export const GlobalContext = createContext<GlobalContextType | null>(null);

// Define props for the GlobalState component
interface GlobalStateProps {
    children: ReactNode;
}

// Create the GlobalState component with proper typing
export default function GlobalState({ children }: GlobalStateProps) {
    const [user, setUser] = useState<any>(null);

    return (
        <GlobalContext.Provider value={{ user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
}
