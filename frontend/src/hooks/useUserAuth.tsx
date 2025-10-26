import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './useUser'
import { API_PATHS } from '../utils/apiPath';
import type { GetProfileResponse } from '../types/auth-types';
import type { ApiResponse } from '../types/common-types';

export const useUserAuth = () => {
    const navigate = useNavigate();
    const { user, updateUser, removeUser } = useUser();

    useEffect(() => {
        if (user) return;
        let isMounted = true;
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                removeUser();
                return;
            }
            try {
                const response = await axios.get<ApiResponse<GetProfileResponse>>(API_PATHS.USER.GET_PROFILE, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data) {
                    const data = response.data;
                    if (isMounted) {
                        updateUser(data.content);
                    }
                } else {
                    removeUser();
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                removeUser();
            }
        };
        fetchUser();
        return () => {
            isMounted = false;
        };
    }, [updateUser, removeUser, navigate]);
}