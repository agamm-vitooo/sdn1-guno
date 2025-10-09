"use client";

import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartData {
  date: string;
  count: number;
}

export default function VisitorsChartsSection() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      const res = await fetch("/api/visitors");
      const json = await res.json();
      const chartData = Object.entries(json).map(([date, count]) => ({
        date,
        count: count as number,
      }));
      setData(chartData);
    };
    fetchVisitors();
  }, []);

  // --- BAR CHART (Kiri) ---
  const barOptions: Highcharts.Options = {
    chart: { type: "column", backgroundColor: "#fff" },
    title: { text: "Statistik" },
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
        name: "Pengunjung",
        data: data.map((d) => d.count),
        type: "column",
        color: "#2563eb",
      },
    ],
    tooltip: { shared: true, valueSuffix: " kunjungan" },
    credits: { enabled: false },
  };

  // --- LINE CHART (Kanan) ---
  const lineOptions: Highcharts.Options = {
    chart: { type: "line", backgroundColor: "#fff" },
    title: { text: "Statistik" },
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
    tooltip: { shared: true, valueSuffix: " kunjungan" },
    credits: { enabled: false },
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white rounded-xl shadow p-6">
        <HighchartsReact highcharts={Highcharts} options={barOptions} />
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <HighchartsReact highcharts={Highcharts} options={lineOptions} />
      </div>
    </section>
  );
}
