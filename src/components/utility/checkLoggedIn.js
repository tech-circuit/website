import BASE_API_URL from "../../constants";
import notyf from "../../tcNotyf";

const checkLoggedIn = (redirect) => {
    const getUser = async () => {
        const dataJson = await fetch(
            `${BASE_API_URL}/user/info?access_token=${localStorage.getItem(
                "authToken"
            )}`
        );
        const data = await dataJson.json();

        if (data.user) {
            return true;
        } else {
            notyf.error("Please login to make a post/event");
            setTimeout(() => {
                window.location.href = redirect;
            }, 3000);
        }
    };

    if (localStorage.getItem("authToken")) getUser();
    else {
        notyf.error("Please login to make a post/event");
        setTimeout(() => {
            window.location.href = redirect;
        }, 3000);
    }
};

export default checkLoggedIn;
