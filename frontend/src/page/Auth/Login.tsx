import { useState, type FormEvent } from "react";
import AuthLayout from "../../components/layouts/AuthLayout"
import Input from "../../ui/Input"
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import type { AuthResponse } from "../../types/auth-types";
import { useUser } from "../../hooks/useUser";
import type { ApiResponse } from "../../types/common-types";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { updateUser } = useUser();
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }
        setError("");

        // Login logic here
        try {
            const response = await axiosInstance.post<ApiResponse<AuthResponse>>(API_PATHS.AUTH.LOGIN, {
                email,
                password
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

    };
    return (
        <AuthLayout>
            <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to log in
                </p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" type="text" placeholder="john@example.com"></Input>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" placeholder="Minimun 8 Characters Long"></Input>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button type="submit" className="btn-primary w-full">
                        Login
                    </button>
                    <p className="text-[13px] text-slate-800">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-primary underline">
                            SignUp
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login
