const dev = import.meta.env.VITE_NODE_ENV === "dev";

const BASE_API_URL = dev
    ? "http://localhost:4000"
    : "https://api.techcircuit.co";

export default BASE_API_URL;
