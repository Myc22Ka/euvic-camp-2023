import React from "react";
import { CardWhell } from "./CardWhell";
import styles from "../../styles/styles.module.scss";

type CardStatsProps = {
  event: resultsEvent;
  noMoney?: boolean;
};

export const CardStats: React.FC<CardStatsProps> = ({ event, noMoney = false }) => {
  return (
    <div className="card-content" style={{ minWidth: "30vw" }}>
      <div className="card-stats">
        {!noMoney ? (
          <div className="predicted-event-spend">
            <span className="predicted-event-spend-number">${event.predicted_event_spend?.toLocaleString() ?? 0}</span>
            <span>Predicted Event Spend (USD)</span>
          </div>
        ) : null}
        <div className="predicted-event-spend">
          <span className="predicted-event-spend-number black">{event.phq_attendance?.toLocaleString() ?? 0}</span>
          <span>PHQ Attendance</span>
        </div>
        <div className="card-stats-whells">
          <CardWhell background={styles.main} rank={event.rank} label="PHQ" filter={true} />
          <CardWhell background={styles.error} rank={event.local_rank} label="Local" filter={false} />
        </div>
      </div>
    </div>
  );
};
