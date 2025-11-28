import { useEffect, useState } from "react";
import axios from "axios";
import { Talent } from "model/talent";
import "./talentList.css";
import { useNavigate } from "react-router-dom";

export const TalentList = () => {
  const [talents, setTalentList] = useState<Talent[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await axios.get<Talent[]>("/talents", { params: { offset: 0 } });
      console.log("talents:", response.data);
      setTalentList(response.data);
    })();
  }, []);

  return (
    <div className="talent-in-Page">
      {/* ヘッダー */}
      <header className="archive-header">
        <div style={{ backgroundColor: "#ccc", width: 100, height: 40 }}></div>
        <div className="search-wrapper">
          <input type="text" placeholder="タレント名で検索" className="search-input" />
          <button className="search-btn">🔍</button>
        </div>
      </header>
      {/* カテゴリボタン */}
      <div className="archive-buttons">
        <button onClick={() => navigate("/nowstr")}>📅 配信中一覧</button>
        <button onClick={() => navigate("/archive")}>📅 過去の配信一覧</button>
      </div>
      {/* タレント一覧 */}
      <h2>タレント一覧</h2>
      <div className="talent-list-container">
        {talents.map((talent) => (
          <div key={talent.id} className="talent-card">
            <img src={talent.icon_url} alt={talent.name} className="talent-icon" />

            <div className="talent-info">
              <h3>{talent.name}</h3>
              <p>{talent.youtube_profile}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
