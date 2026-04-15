// 天气数据类型
export interface WeatherData {
  city: string;
  temperature: string;
  condition: string;
  humidity: string;
  wind: string;
}

// 天气图标映射
const weatherIcons: Record<string, string> = {
  晴天: "☀️",
  多云: "⛅",
  小雨: "🌧️",
  大雨: "⛈️",
  阴天: "☁️",
  雪: "❄️",
};

// 天气卡片组件
export function WeatherCard({ data }: { data: WeatherData }) {
  const icon = weatherIcons[data.condition] || "🌡️";

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 16,
        padding: 20,
        color: "white",
        minWidth: 200,
        maxWidth: 280,
        boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
        marginTop: 8,
      }}
    >
      {/* 城市名称 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600 }}>{data.city}</span>
        <span style={{ fontSize: 12, opacity: 0.8 }}>今日天气</span>
      </div>

      {/* 温度和图标 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 42, fontWeight: 300 }}>{data.temperature}</div>
        <div style={{ fontSize: 48 }}>{icon}</div>
      </div>

      {/* 天气状况 */}
      <div
        style={{
          fontSize: 16,
          marginBottom: 16,
          padding: "6px 12px",
          background: "rgba(255,255,255,0.2)",
          borderRadius: 20,
          display: "inline-block",
        }}
      >
        {data.condition}
      </div>

      {/* 详细信息 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          opacity: 0.9,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span>💧</span>
          <span>湿度 {data.humidity}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span>🌬️</span>
          <span>{data.wind}</span>
        </div>
      </div>
    </div>
  );
}
