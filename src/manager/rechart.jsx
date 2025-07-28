import React, { useEffect, useState, useMemo } from 'react';
import axios from '../axiosInstance';
import {
  BarChart,
  Cell,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function CityBarChart({ title, county, apiUrl, highlightColor = '#ff4d4d', defaultColor = '#134B70' }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setData(response.data);
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError("دریافت اطلاعات با خطا مواجه شد.");
      });
  }, [apiUrl]);

  // 🟢 useMemo باید قبل از هر return باشد
  const coloredData = useMemo(() => {
    return data.map(item => ({
      ...item,
      fill: item.name === county ? highlightColor : defaultColor
    }));
  }, [data, county, highlightColor, defaultColor]);

  // 🔴 return زودهنگام بعد از useMemo مشکلی ایجاد نمی‌کند
  if (error) {
    return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h3 style={{ textAlign: 'center' }}>{title}</h3>
      <ResponsiveContainer>
        <BarChart data={coloredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={defaultColor}>
            {
              coloredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
