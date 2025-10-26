import { getInitials } from "../utils/helper";

const Avatar = ({
    fullName,
    width,
    height,
    style
}: {
    fullName: string;
    width: string;
    height: string;
    style: string;
}) => {
    return (
        <div className={`${width || 'w-12'} ${height || 'w-12'} ${style || ''} flex items-center justify-center rounded-full
    text-gray-900 font-medium bg-gray-100
    `}>{getInitials(fullName)}</div>
    )
}

export default Avatar