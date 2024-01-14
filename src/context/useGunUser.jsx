import { useState, useEffect, useCallback } from 'react';
import gunInstance from '../config/gunInstance';
import { useNavigate } from "react-router-dom";

const useGunUser = () => {
    const [user, setUser] = useState(null);
    const gunUser = gunInstance.user();
    const navigate = useNavigate();

    // Function to sign up a new user
    const signUp = (alias, password) => {
        gunUser.create(alias, password, (ack) => {
            if (ack.err) {
                console.error('Sign up error:', ack.err);
            } else {
                // Automatically log in after sign up
                logIn(alias, password);
            }
        });
    };

    // Function to log in
    const logIn = (alias, password) => {
        gunUser.auth(alias, password, (ack) => {
            if (ack.err) {
                console.error('Login error:', ack.err);
            } else {
                setUser({ alias }); // Set the user state
                navigate('/'); // Navigate to the home page
            }
        });
    };

    // Function to log out
    const logOut = useCallback(() => {
        gunUser.leave();
        setUser(null);
        navigate('/login'); // Navigate to the login page after logout
    }, [gunUser, navigate]);

    // Effect to recall the user session and listen for changes
    useEffect(() => {
        // Recall the user session from sessionStorage
        gunUser.recall({ sessionStorage: true });

        // Subscribe to the 'auth' event to handle user session
        const authListener = gunUser.on('auth', async (event) => {
            const alias = await gunUser.get('alias').then();
            setUser(alias); // Update user state with the alias
            console.log(`signed in as ${alias}`);
        });

        // Subscribe to changes on the 'alias' field
        const aliasListener = gunUser.get('alias').on((v) => {
            if(v){
                setUser({ alias: v }); // Update user state with the new alias
            }
        });

        // Cleanup listeners
        return () => {
            gunUser.get('alias').off(aliasListener);
            gunUser.off(authListener);
        };
    }, [gunUser]);

    return { user, signUp, logIn, logOut };
};

export default useGunUser;
