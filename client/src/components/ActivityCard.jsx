const ActivityCard = ({ activity }) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div
      className="card bg-gradient-to-br from-pink-50 via-white to-red-50 shadow-lg border border-pink-200 rounded-xl hover:scale-105 transition-transform duration-200"
      key={activity.id}
    >
      <div className="card-body">
        <h2 className="card-title text-red-600 font-extrabold">
          {activity.name}
        </h2>
        <p className="text-gray-700">{activity.description}</p>

        <div className="mt-4 space-y-1 text-sm text-gray-800">
          <p>
            <strong className="text-red-500">ประเภทกิจกรรม:</strong>{" "}
            {activity.type === "competition" ? "การแข่งขัน" : activity.type}
          </p>
          <p>
            <strong className="text-red-500">ระดับ:</strong> {activity.level}
          </p>
          <p>
            <strong className="text-red-500">จำนวนคนต่อทีม:</strong>{" "}
            {activity.team_size} คน
          </p>
          <p>
            <strong className="text-red-500">วันที่แข่งขัน:</strong>{" "}
            {formatDate(activity.date)}
          </p>
          <p>
            <strong className="text-red-500">สถานที่:</strong> {activity.location}
          </p>
          <p>
            <strong className="text-red-500">รับสมัคร:</strong>{" "}
            {formatDate(activity.reg_open)} – {formatDate(activity.reg_close)}
          </p>
          <p>
            <strong className="text-red-500">สถานะ:</strong>{" "}
            <span
              className={`font-bold ${
                activity.status === "open" ? "text-green-600" : "text-red-600"
              }`}
            >
              {activity.status === "open" ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
            </span>
          </p>
        </div>

        <div className="divider border-pink-200"></div>

        <div className="text-sm text-gray-800">
          <p>
            <strong className="text-red-500">ติดต่อ:</strong> {activity.contact_name}
          </p>
          <p>📞 {activity.contact_phone}</p>
          <p>
            ✉️{" "}
            <a
              href={`mailto:${activity.contact_email}`}
              className="text-pink-600 underline hover:text-red-500"
            >
              {activity.contact_email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
