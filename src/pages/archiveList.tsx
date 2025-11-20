import { useEffect, useState } from "react";
import axios from "axios";
import { Archive } from "model/archive";
import "./ArchiveList.css";
import { useNavigate } from "react-router-dom";
export const ArchiveList = () => {
  const [archives, setArchiveList] = useState<Archive[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await axios.get<Archive[]>("archives", { params: { offset: 0 } });
      console.log("archives:", response.data);
      setArchiveList(response.data);
    })();
  }, [setArchiveList]);

  return (
    <div className="archive-container">
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
        <button onClick={() => navigate("/talentlist")}>👤 所属タレント一覧</button>
      </div>

      {/* アーカイブ一覧 */}
      <h2>過去の配信一覧</h2>
      <div>
        {archives.map((archive) => (
          <div key={archive.id} className="archive-card">
            <a href={archive.outer_link} target="_blank" rel="noopener noreferrer">
              <img src={archive.video_thumbnail} alt="thumbnail" className="archive-thumbnail" />
            </a>
            <div>
              <h3>
                <a
                  href={archive.outer_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {archive.video_title}
                </a>
              </h3>
              <p>{new Date(archive.open_date).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
