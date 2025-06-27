import React from "react";

const SummaryCard = ({ icon, title, subtitle, note }) => {
  return (
    <div className="bg-base-200 rounded-xl p-6 flex items-center gap-5 hover:shadow-xs">
      <div className="text-green-700">{icon}</div>
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-2xl font-bold text-green-700">{subtitle}</p>
        {note && <p className="text-sm md:text-base">{note}</p>}
      </div>
    </div>
  );
};

export default SummaryCard;
