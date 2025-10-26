import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const CustomBarChart = ({ data }: { data: any }) => {
    const getBarColor = (index: number) => {
        return index % 2 === 0 ? "#875CF5" : "#CFBEF5";
    }

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 shadow-md rounded-lg">
                    <p className="text-sm font-semibold text-purple-800 mb-1">{`${payload[0].payload.category}`}</p>
                    <p className="text-sm text-gray-600">
                        <span className="text-sm font-medium text-gray-900">Amount: ${`${payload[0].payload.amount}`}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} >
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <Tooltip content={CustomTooltip} />

                    <Bar
                        dataKey="amount"
                        fill="#FF8042"
                        radius={[10, 10, 0, 0]}
                        activeBar={{ fill: 'green' }}
                    >
                        {
                            data.map((_: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart