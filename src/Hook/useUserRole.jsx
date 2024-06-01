import { useEffect, useState, useContext } from 'react';
import { Context } from '../AuthProvider/Authprovider';
import useSecurePublic from '../Hook/useSecurePublic';

const useUserRole = () => {
  const { user } = useContext(Context);
  const axiosSecurePublic = useSecurePublic();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
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
  }, [user, axiosSecurePublic]);

  return { role, loading };
};

export default useUserRole;
