import { useEffect, useState } from "react";
import axios from "axios";
import { Archive } from "model/archive";
import "./ArchiveList.css";
export const ArchiveList = () => {
  const [archives, setArchiveList] = useState<Archive[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get<Archive[]>("/archives?offset=0");
      setArchiveList(response.data);
    })();
  }, [setArchiveList]);

  return (
    <div className="archive-container">
      {/* ヘッダー */}
      <header className="archive-header">
        <div style={{ backgroundColor: "#ccc", width: 100, height: 40 }}></div>
        <input type="text" placeholder="タレント名で検索" className="archive-search" />
        <button>🔍</button>
      </header>

      {/* カテゴリボタン */}
      <div className="archive-buttons">
        <button>📅 配信スケジュール</button>
        <button>👤 所属タレント一覧</button>
      </div>

      {/* アーカイブ一覧 */}
      <h2>過去の配信一覧</h2>
      <div>
        {archives.map((archive) => (
          <div key={archive.id} className="archive-card">
            <img src={archive.video_thumbnail} alt="thumbnail" className="archive-thumbnail" />
            <div>
              <h3>{archive.video_title}</h3>
              <p>{new Date(archive.open_date).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
