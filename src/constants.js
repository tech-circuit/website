const dev = process.env.REACT_APP_NODE_ENV === "prod";

const BASE_API_URL = dev
    ? "http://localhost:4000"
    : "https://api.techcircuit.co";

export default BASE_API_URL;
