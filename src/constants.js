const prod = process.env.REACT_APP_NODE_ENV === "production";

const BASE_API_URL = prod
    ? "https://api.techcircuit.co"
    : "http://localhost:4000";
export default BASE_API_URL;
