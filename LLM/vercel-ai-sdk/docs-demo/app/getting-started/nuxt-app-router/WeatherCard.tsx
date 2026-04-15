export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
}

const weatherIcons: Record<string, string> = {
  晴天: "☀️",
  多云: "⛅",
  小雨: "🌧️",
  大雨: "⛈️",
  阴天: "☁️",
  雪: "❄️",
  Sunny: "☀️",
  Rainy: "🌧️",
  Cloudy: "☁️",
};

export function WeatherCard({ data }: { data: WeatherData }) {
  const icon = weatherIcons[data.condition] || "🌡️";
  const isCelsius = data.temperature < 50;
  const tempDisplay = isCelsius
    ? `${data.temperature}°C`
    : `${data.temperature}°F`;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 12,
        padding: 16,
        color: "white",
        minWidth: 200,
        maxWidth: 260,
        boxShadow: "0 4px 16px rgba(102, 126, 234, 0.35)",
        marginTop: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600 }}>{data.location}</span>
        <span style={{ fontSize: 11, opacity: 0.75 }}>天气</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 300 }}>{tempDisplay}</div>
        <div style={{ fontSize: 44 }}>{icon}</div>
      </div>

      <div
        style={{
          fontSize: 14,
          padding: "4px 10px",
          background: "rgba(255,255,255,0.2)",
          borderRadius: 16,
          display: "inline-block",
        }}
      >
        {data.condition}
      </div>
    </div>
  );
}
