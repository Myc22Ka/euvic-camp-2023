import React from "react";
import { CardWhell } from "./CardWhell";
import styles from "../../styles/styles.module.scss";

type CardStatsProps = {
  event: resultsEvent;
};

export const CardStats: React.FC<CardStatsProps> = ({ event }) => {
  return (
    <div className="card-content">
      <div className="card-stats">
        <div className="predicted-event-spend">
          <span className="predicted-event-spend-number">${event.predicted_event_spend?.toLocaleString() ?? 0}</span>
          <span>Predicted Event Spend (USD)</span>
        </div>
        <div className="card-stats-whells">
          <CardWhell background={styles.main} rank={event.rank} label="PHQ" filter={true} />
          <CardWhell background={styles.error} rank={event.local_rank} label="Local" filter={false} />
        </div>
      </div>
    </div>
  );
};
