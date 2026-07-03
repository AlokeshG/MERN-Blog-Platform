import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StatsChart({ blogs, users, comments }) {
  const data = {
    labels: ["Blogs", "Users", "Comments"],
    datasets: [
      {
        label: "Statistics",
        data: [blogs, users, comments],
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#dc3545",
        ],
      },
    ],
  };

  return (
    <div className="card shadow p-3">
      <h4 className="mb-3">Project Statistics</h4>

      <Bar data={data} />
    </div>
  );
}

export default StatsChart;