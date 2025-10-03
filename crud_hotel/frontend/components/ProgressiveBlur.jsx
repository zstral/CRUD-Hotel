export default function ProgressiveBlur({ height = "100%" }) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ height }}>
      <div
        className="absolute inset-0 bg-[#00000042]"
        style={{
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 90%)",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 90%)",
          borderBottom: "1px solid #ffffff33",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          WebkitMaskImage: "linear-gradient(to top, transparent 10%, black 50%, transparent 70%)",
          maskImage: "linear-gradient(to top, transparent 10%, black 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          WebkitMaskImage: "linear-gradient(to top, transparent 10%, black 70%)",
          maskImage: "linear-gradient(to top, transparent 10%, black 20%)",
        }}
      />
    </div>
  )
}