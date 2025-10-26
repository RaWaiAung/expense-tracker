import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../ui/Input";
import ProfilePhotoSelector from "../../ui/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { useUser } from "../../hooks/useUser";
import type { AuthResponse } from "../../types/auth-types";
import uploadImage from "../../utils/uploadImage";
import type { ApiResponse } from "../../types/common-types";

const SignUp = () => {
    const navigate = useNavigate();

    const [profilePic, setProfilePic] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { updateUser } = useUser();

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        let profileImageUrl = "";
        if (!name) {
            setError("Please enter your name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }
        setError("");

        // Signup logic here
        try {
            if (profilePic) {
                const imageUploadResponse = uploadImage(profilePic);
                profileImageUrl = await imageUploadResponse;
            }
            const response = await axiosInstance.post<ApiResponse<AuthResponse>>(API_PATHS.AUTH.REGISTER, {
                name,
                email,
                password,
                profileImageUrl
            });
            const data = response.data.content;
            if (data) {
                localStorage.setItem("accessToken", data.accessToken);
                updateUser(data);
                navigate("/dashboard");
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    }
    return (
        <AuthLayout>
            <div className="w-full max-w-xl space-y-8">
                <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-black">Create an account</h3>
                    <p className="text-sm text-slate-700">
                        Join us today by entering your details below
                    </p>
                </div>
                <form onSubmit={handleSignUp} className="space-y-6">
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                            label="Full Name"
                            placeholder="John"
                            type="text"
                        />
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            type="text"
                            placeholder="john@example.com"
                        />
                        <div className="md:col-span-2">
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                type="password"
                                placeholder="Minimun 8 Characters Long"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button type="submit" className="btn-primary w-full">
                        SignUp
                    </button>
                    <p className="text-sm text-slate-800 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-primary underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default SignUp
