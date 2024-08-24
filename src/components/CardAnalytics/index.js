import React from "react";
import "./style.scss";

export default function CardAnalytics(props) {
  const { title, value, percent, icon } = props;
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col mt-0">
            <h5 className="card-title">{title}</h5>
          </div>
          <div className="col-auto">
            <div className="stat-icon text-primary">{icon}</div>
          </div>
        </div>
        <h1 className="mt-1 mb-3">{value}</h1>
        <div className="mb-0">
          {percent < 0 ? (
            <span className="text-danger">{percent}%</span>
          ) : (
            <span className="text-success">{percent}%</span>
          )}
          <span className="text-muted"> Since last month</span>
        </div>
      </div>
    </div>
  );
}
