import { useEffect, useState } from "react";
import axios from "axios";
import { Nowstreaming } from "model/nowstr";
import "./nostrList.css";
import { useNavigate } from "react-router-dom";
export const NowstrList = () => {
  const [nowstreamings, setNowstrList] = useState<Nowstreaming[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await axios.get<Nowstreaming[]>("nowstreamings", { params: { offset: 0 } });
      setNowstrList(response.data);
    })();
  }, [setNowstrList]);

  return (
    <div className="nowstr-container">
      {/* ヘッダー */}
      <header className="nowstr-header">
        <div style={{ backgroundColor: "#ccc", width: 100, height: 40 }}></div>
        <input type="text" placeholder="タレント名で検索" className="nowstr-search" />
        <button>🔍</button>
      </header>

      {/* カテゴリボタン */}
      <div className="nowstr-buttons">
        <button onClick={() => navigate("/archive")}>📅 過去の配信一覧</button>
        <button>👤 所属タレント一覧</button>
      </div>

      {/* アーカイブ一覧 */}
      <h2>配信中一覧</h2>
      <div>
        {nowstreamings.map((nowstr) => (
          <div key={nowstr.id} className="nowstr-card">
            <img src={nowstr.video_thumbnail} alt="thumbnail" className="nowstr-thumbnail" />
            <div>
              <h3>{nowstr.video_title}</h3>
              <p>{new Date(nowstr.open_date).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
