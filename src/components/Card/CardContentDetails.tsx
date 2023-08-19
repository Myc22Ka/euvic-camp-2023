import React from "react";

type CardContentDetailsProps = {
  title: string;
  children: React.ReactNode;
};

export const CardContentDetails: React.FC<CardContentDetailsProps> = ({ title, children }) => {
  return (
    <div className="card-content details">
      <div>
        <div className="details-title">{title}</div>
        <div className="tags">{children}</div>
      </div>
    </div>
  );
};
