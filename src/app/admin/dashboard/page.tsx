"use client";

import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function LandingVisitorsChart() {
  const [data, setData] = useState<{ date: string; count: number }[]>([]);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Fetch data pengunjung
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((res) => {
        const chartData = Object.entries(res).map(([date, count]) => ({
          date,
          count: count as number,
        }));
        setData(chartData);
      });

    // Tentukan sapaan
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) {
      setGreeting("Selamat Pagi, Admin 👋");
    } else if (hour >= 11 && hour < 15) {
      setGreeting("Selamat Siang, Admin ☀️");
    } else if (hour >= 15 && hour < 18) {
      setGreeting("Selamat Sore, Admin 🌅");
    } else {
      setGreeting("Selamat Malam, Admin 🌙");
    }
  }, []);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "line",
      backgroundColor: "#fff",
    },
    title: {
      text: "Statistik Pengunjung Landing Page",
    },
    xAxis: {
      categories: data.map((d) => d.date),
      title: { text: "Tanggal" },
    },
    yAxis: {
      title: { text: "Jumlah Pengunjung" },
      allowDecimals: false,
    },
    series: [
      {
        name: "Landing Page",
        data: data.map((d) => d.count),
        type: "line",
        color: "#16a34a",
      },
    ],
    tooltip: {
      shared: true,
      valueSuffix: " kunjungan",
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">{greeting}</h2>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}
