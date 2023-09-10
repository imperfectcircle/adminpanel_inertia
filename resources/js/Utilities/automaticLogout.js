import axios from "axios";

export const automaticLogout = () => {
    let inactivityTimer;

    const logout = () => {
        axios.post("/logout");
    };

    const resetTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(logout, 1 * 60 * 1000);
    };

    const handleUserActivity = () => {
        resetTimer();
    };

    window.addEventListener("click", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    resetTimer();

    return () => {
        clearTimeout(inactivityTimer);
        window.removeEventListener("click", handleUserActivity);
        window.removeEventListener("scroll", handleUserActivity);
    };
};
