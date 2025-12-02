import { useEffect, useState } from "react";
import axios from "axios";
import { Nowstreaming } from "model/nowstr";
import "./nostrList.css";
import { useNavigate } from "react-router-dom";
export const NowstrList = () => {
  const [nowstreamings, setNowstrList] = useState<Nowstreaming[]>([]);
  const navigate = useNavigate();
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    (async () => {
      const response = await axios.get<Nowstreaming[]>("/nowstreamings", { params: { offset: 0 } });
      setNowstrList(response.data);
    })();
  }, [setNowstrList]);

  return (
    <div className="nowstr-container">
      {/* ヘッダー */}
      <header className="nowstr-header">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="タレント名で検索"
            className="search-input"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
          />
          <button
            className="search-btn"
            onClick={() => {
              const trimmed = keywordInput.trim();
              if (!trimmed) return;
              // 検索結果ページへ遷移
              navigate(`/talents/search?keyword=${encodeURIComponent(trimmed)}`);
            }}
          >
            🔍
          </button>
        </div>
      </header>

      {/* カテゴリボタン */}
      <div className="nowstr-buttons">
        <button onClick={() => navigate("/archive")}>📅 過去の配信一覧</button>
        <button onClick={() => navigate("/talents")}>👤 所属タレント一覧</button>
      </div>

      {/* アーカイブ一覧 */}
      <h2>配信中一覧</h2>
      <div>
        {nowstreamings.map((nowstr) => (
          <div key={nowstr.id} className="nowstr-card">
            <a href={nowstr.outer_link} target="_blank" rel="noopener noreferrer">
              <img src={nowstr.video_thumbnail} alt="thumbnail" className="nowstr-thumbnail" />
            </a>
            <div>
              <h3>
                <a
                  href={nowstr.outer_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {nowstr.video_title}
                </a>
              </h3>
              <p>{new Date(nowstr.open_date).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
