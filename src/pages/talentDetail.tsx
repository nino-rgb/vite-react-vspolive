import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./talentDetail.css";
import { Talent } from "../model/talent";
import { Archive } from "../model/archive";

export const TalentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [keywordInput, setKeywordInput] = useState("");

  const [talent, setTalent] = useState<Talent | null>(null);
  const [archives, setArchives] = useState<Archive[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchTalent = async () => {
      try {
        const response = await axios.get<Talent>(`/talents/${id}`);
        setTalent(response.data);
      } catch (error) {
        console.error("talent fetch error", error);
      }
    };

    const fetchArchives = async () => {
      try {
        const response = await axios.get<Archive[]>("/archives/by-talent", {
          params: { talent_id: id },
        });
        console.log("archives response:", response.data);
        setArchives(response.data);
      } catch (error) {
        console.error("archives fetch error", error);
      }
    };

    fetchTalent();
    fetchArchives();
  }, [id]);

  if (!talent) return <p>読み込み中...</p>;

  const hasAnySocialLink = talent.youtube_url || talent.twitch_url || talent.x_url || talent.x_sub_url;

  return (
    <div className="talent-detail-page">
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
              const trimmed = keywordInput.trim();
              if (!trimmed) return;
              navigate(`/talents/search?keyword=${encodeURIComponent(trimmed)}`);
            }}
          >
            🔍
          </button>
        </div>
      </header>

      {/* カテゴリボタン */}
      <div className="talent-detail-buttons">
        <button onClick={() => navigate("/nowstr")}>📅 配信中一覧</button>
        <button onClick={() => navigate("/archive")}>📅 過去の配信一覧</button>
      </div>

      <div className="talent-overview-row">
        <div className="overview-icon">
          {talent.icon_url && <img src={talent.icon_url} alt={talent.name} className="talent-detail-icon" />}
          <h2 className="talent-detail-name">{talent.name}</h2>
        </div>

        {hasAnySocialLink && (
          <div className="overview-sns">
            <h3 className="sns-title">SNS</h3>
            <div className="sns-buttons">
              {talent.youtube_url && (
                <a href={talent.youtube_url} className="sns-button sns-youtube" target="_blank" rel="noreferrer">
                  <img src="/sns/youtube.jpg" alt="YouTube" className="sns-icon" />
                </a>
              )}

              {talent.twitch_url && (
                <a href={talent.twitch_url} className="sns-button sns-twitch" target="_blank" rel="noreferrer">
                  <img src="/sns/twitch.png" alt="Twitch" className="sns-icon" />
                </a>
              )}

              {talent.x_url && (
                <a href={talent.x_url} className="sns-button sns-x" target="_blank" rel="noreferrer">
                  <img src="/sns/x.jpg" alt="X" className="sns-icon" />
                </a>
              )}

              {talent.x_sub_url && (
                <a href={talent.x_sub_url} className="sns-button sns-x-sub" target="_blank" rel="noreferrer">
                  <img src="/sns/x.jpg" alt="Xサブ" className="sns-icon" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* 公式プロフィール */}
        <div className="overview-profile">
          <h3>公式プロフィール</h3>
          <p className="profile-text">{talent.official_profile || "未設定"}</p>
        </div>
      </div>

      {/* タレントの配信一覧 */}
      <div className="talent-archives-section">
        {archives.length === 0 ? (
          <p>配信履歴がありません。</p>
        ) : (
          <div className="talent-detail-archive-list">
            {archives.map((archive) => (
              <a
                key={archive.id}
                href={archive.outer_link}
                target="_blank"
                rel="noopener noreferrer"
                className="talent-detail-archive-card"
              >
                <img src={archive.video_thumbnail} alt={archive.video_title} className="archive-thumbnail" />
                <div className="talent-detail-archive-info">
                  <h4>{archive.video_title}</h4>
                  <p>{new Date(archive.open_date).toLocaleString()}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
