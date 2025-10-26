import React, { useState, type InputHTMLAttributes } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  showToggle?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: string;
  placeholder: string;
};

const Input = ({
  value,
  onChange,
  label,
  type,
  placeholder,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className='text-[13px] text-slate-800'>{label}</label>
      <div className='input-box'>
        <input type={type == "password" ? showPassword ? "text" : "password" : type}
          placeholder={placeholder}
          className='w-full bg-transparent outline-none'
          value={value}
          onChange={(e) => onChange(e)}
        />
        {
          type === "password" && (
            <>
              {
                showPassword ?
                  (
                    <FaRegEye size={22}
                      className='text-primary cursor-pointer'
                      onClick={() => toggleShowPassword()} />
                  ) : (
                    <FaRegEyeSlash size={22}
                      className='text-primary cursor-pointer'
                      onClick={() => toggleShowPassword()} />
                  )
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default Input