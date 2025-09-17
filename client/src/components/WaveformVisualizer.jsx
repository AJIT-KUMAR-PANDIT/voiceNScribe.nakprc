export function WaveformVisualizer({ isActive = false, className = "" }) {
  const bars = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    color: ["bg-blue-400", "bg-green-400", "bg-purple-400", "bg-pink-400"][i % 4]
  }));

  return (
    <div className={`flex justify-center items-end space-x-1 h-16 ${className}`}>
      {bars.map(({ id, delay, color }) => (
        <div
          key={id}
          className={`w-2 ${color} rounded-full transition-all duration-300 ${
            isActive ? "waveform-bar" : "h-4"
          }`}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}
