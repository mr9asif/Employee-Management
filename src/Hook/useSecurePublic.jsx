import axios from "axios";

const axiosSecurePublic=axios.create({
    baseURL:'https://as-12-server-weld.vercel.app',
})
const useSecurePublic = () => {
    return axiosSecurePublic
};

export default useSecurePublic;