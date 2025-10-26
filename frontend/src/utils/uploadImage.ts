import type { ApiResponse, UploadResponse } from "../types/auth-types";
import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (file: string): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axiosInstance.post<ApiResponse<UploadResponse>>(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (!response.status || response.status !== 200 || !response.data.content) {
            throw new Error('Image upload failed');
        }

        const data = response.data.content;
        return data.imageUrl; // assuming the server responds with { imageUrl: 'url_of_uploaded_image' }
    } catch (error) {
        console.error("Error uploading the image", error);
        throw error;
    }
};

export default uploadImage;