import React from "react";

type CardWhellProps = {
  background: string;
  rank: number;
  label: string;
  filter: boolean;
};

export const CardWhell: React.FC<CardWhellProps> = ({ background, rank, label, filter }) => {
  return (
    <div
      className="card-whell"
      style={{
        background: `conic-gradient(${background} ${rank * 3.6}deg, ${background}25 ${rank * 3.6}deg)`,
        filter: filter ? `hue-rotate(${rank * 3.6}deg)` : "none",
      }}
    >
      <span className="card-whell-number">{rank}</span>
      <span>{label}</span>
    </div>
  );
};
