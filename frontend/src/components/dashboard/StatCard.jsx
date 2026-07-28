import "./StatCard.css";

const StatCard = ({
  title,
  value,
  icon,
  color,
  onClick,
}) => {

  return (

    <div
      className="stat-card"
      onClick={onClick || undefined}
      style={{
        cursor: onClick ? "pointer" : "default",
      }}
    >

      <div className="stat-top">

        <span className="stat-title">
          {title}
        </span>

        <div style={{ color }}>
          {icon}
        </div>

      </div>

      <h2 className="stat-value">
        {value}
      </h2>

    </div>

  );

};

export default StatCard;