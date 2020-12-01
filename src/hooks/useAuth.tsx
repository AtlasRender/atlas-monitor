/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React from "react";
import User from "../entities/User";
import Containerable from "../interfaces/Containerable";
import PropTypes from "prop-types";

/**
 * AuthContext - interface for AuthContext context.
 * @interface
 * @author Danil Adnreev
 */
export interface AuthContext {
    /**
     * getUser - returns current logged in user data.
     * @function
     * @author Danil Andreev
     */
    getUser(): User | null;

    /**
     * isLogged - true, when user is logged and false if not.
     */
    isLogged: boolean,

    /**
     * login - locally saves user credentials.
     * @function
     * @param user User data for login
     * @author Danil Andreev
     */
    login(user: User): void;

    /**
     * logout - clears locally seved user credentials.
     * @function
     * @author Danil Andreev
     */
    logout(): void;
}

const Context: React.Context<AuthContext> = React.createContext<AuthContext>({
    getUser(): User | null {
        return null;
    },
    isLogged: false,
    login(user: User): void {
    },
    logout(): void {
    }
});

export const displayName: string = "AuthProvider";

/**
 * AuthProviderProps - interface for AuthProvider component props.
 * @interface
 * @author Danil Andreev
 */
export interface AuthProviderProps extends Containerable {
}

/**
 * AuthProvider - React provider for Auth system. Place it to the root of layout.
 * @function
 * @param props - Properties of the component.
 * @author Danil Andreev
 */
export function AuthProvider(props: AuthProviderProps) {
    const {
        children,
    } = props;
    const [logged, setLogged] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<User | null>(null);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        const localStorageUser = getUserFromLocalStorage();
        setUser(localStorageUser);
        setLogged(!!localStorageUser);
        setLoaded(true);
    }, []);

    React.useEffect(() => {
        window.addEventListener("storage", changeStorage);
        return () => window.removeEventListener("storage", changeStorage);
    });

    function changeStorage(event: StorageEvent) {
        if (!event.newValue && logged) {
            logout();
        }
    }

    function logout(): void {
        localStorage.auth = null;
        setLogged(false);
        setUser(null);
    }

    function getUserFromLocalStorage(): User | null {
        try {
            const credentials: any = JSON.parse(localStorage.auth);
            const user: User | null = credentials ? new User({
                id: +credentials.id,
                username: String(credentials.username),
                email: String(credentials.email),
                deleted: !!credentials.deleted,
                createdAt: new Date(credentials.createdAt),
                updatedAt: new Date(credentials.updatedAt),
                bearer: String(credentials.bearer),
            }) : null;
            if (user && !user.id) {
                logout();
                return null;
            }
            return user;
        } catch (error) {
            logout();
        }
        return null;
    }

    function getUser() {
        if (!user) {
            logout();
            return null;
        }
        return user;
    }

    function login(user: User) {
        localStorage.auth = JSON.stringify(user);
        setUser(user);
        setLogged(true);
    }

    if (!loaded) return null;

    return (
        <Context.Provider value={{isLogged: logged, getUser, login, logout}}>
            {children}
        </Context.Provider>
    );
}

AuthProvider.displayName = displayName;

AuthProvider.propTypes = {
    children: PropTypes.node,
};

/**
 * useAuth - React hook, designed to work with user authentication.
 * @function
 * @author Danil Andreev
 * @example
 * function MyComponent(props) {
 *     const {user, isLoggedIn} = useAuth();
 *     return (
 *         <div>
 *             {user?.username}
 *         </div>
 *     );
 * }
 */
const useAuth = (): AuthContext => React.useContext(Context);
export default useAuth;
