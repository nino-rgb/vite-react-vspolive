// src/pages/TalentSearchResults.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";

// ここを model から import！
import { Talent } from "../model/talent";

export const TalentSearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const [keywordInput, setKeywordInput] = useState("");
  const keyword = searchParams.get("keyword") ?? "";

  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!keyword) {
      setTalents([]);
      setKeywordInput(""); // ここで一緒にクリアしておくのもアリ
      return;
    }

    setKeywordInput(keyword); // URL のキーワードを入力欄に反映

    const fetchTalents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<Talent[]>("/talents/search", {
          params: { keyword },
        });

        setTalents(response.data);
      } catch (err) {
        console.error(err);
        setError("検索中にエラーが発生しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, [keyword]);

  return (
    <div className="talent-search-result-page">
      {/* ヘッダー */}
      <header className="archive-header">
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
              if (keywordInput.trim()) {
                navigate(`/talents/search?keyword=${encodeURIComponent(keywordInput)}`);
              }
            }}
          >
            🔍
          </button>
        </div>
      </header>

      {/* カテゴリボタン */}
      <div className="archive-buttons">
        <button onClick={() => navigate("/nowstr")}>📅 配信中一覧</button>
        <button onClick={() => navigate("/archive")}>📅 過去の配信一覧</button>
      </div>

      <h2>タレント検索結果</h2>

      {loading && <p>検索中です…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && keyword && talents.length === 0 && <p>該当するタレントが見つかりませんでした。</p>}

      <div className="talent-list-container">
        {talents.map((talent) => (
          <Link key={talent.id} to={`/talents/${talent.id}`} className="talent-card">
            {talent.icon_url && <img src={talent.icon_url} alt={talent.name} className="talent-icon" />}

            <div className="talent-info">
              <h3>{talent.name}</h3>
              {talent.youtube_profile && <p className="talent-profile">{talent.youtube_profile}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
