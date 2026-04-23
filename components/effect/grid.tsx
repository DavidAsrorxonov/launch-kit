const Grid = () => {
  return (
    <div
      className="absolute inset-0 opacity-[0.10]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.8) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)",
        backgroundSize: "60px 60px",
      }}
    />
  );
};

export default Grid;
