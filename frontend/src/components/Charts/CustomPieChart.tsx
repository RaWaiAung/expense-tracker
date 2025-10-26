import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegentd from "./CustomLegentd";
const CustomPieChart = ({
    data,
    label,
    totalBalance,
    colors,
    showTextAnchor
}: {
    data: { label: string; value: number; color?: string }[];
    label: string;
    totalBalance: number | string;
    colors: string[];
    showTextAnchor?: boolean;
}) => {
    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={130}
                    labelLine={false}
                >
                    {
                        data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))
                    }
                </Pie>
                <Tooltip content={CustomTooltip}/>
                <Legend content={CustomLegentd}/>
                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill="#666"
                            fontSize="14px"
                        >
                            {
                                label
                            }
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill="#333"
                            fontSize="24px"
                            fontWeight="semi-bold"
                        >
                            ${totalBalance}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart