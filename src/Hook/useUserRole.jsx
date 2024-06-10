import { useEffect, useState, useContext } from 'react';
import { Context } from '../AuthProvider/Authprovider';
import useSecurePublic from '../Hook/useSecurePublic';

const useUserRole = () => {
  const { user, loading:authloading } = useContext(Context);
  const axiosSecurePublic = useSecurePublic();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
console.log('user', user)
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user && !authloading) {
        try {
          const response = await axiosSecurePublic.get(`/users/${user.email}`);
          setRole(response.data.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user, axiosSecurePublic, authloading]);

  return { role, loading };
};

export default useUserRole;
