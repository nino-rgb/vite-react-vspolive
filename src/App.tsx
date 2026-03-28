import React from "react";
import axios from "axios";
import { ArchiveIdProvider } from "./store/archiveContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ArchiveList } from "./pages/archiveList";
import { NowstrList } from "./pages/nowstrList";
import { TalentList } from "./pages/talentList";
import { TalentSearchResults } from "./pages/talentSearchResults";
import { TalentDetail } from "./pages/talentDetail";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const App: React.FC = () => {
  return (
    <ArchiveIdProvider>
      <BrowserRouter>
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/nowstr" replace />} />
            <Route path="/archive" element={<ArchiveList />} />
            <Route path="/nowstr" element={<NowstrList />} />
            <Route path="/talents" element={<TalentList />} />
            <Route path="/talents/search" element={<TalentSearchResults />} />
            <Route path="/talents/:id" element={<TalentDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ArchiveIdProvider>
  );
};

export default App;
