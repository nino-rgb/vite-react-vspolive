import React from "react";
import axios from "axios";
import { ArchiveIdProvider } from "./store/archiveContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ArchiveList } from "./pages/archiveList";
import { NowstrList } from "./pages/nowstrList";
import { TalentList } from "./pages/talentList";
import { TalentSearchResults } from "./pages/talentSearchResults";

axios.defaults.baseURL = "http://localhost:4000/api/";

const App: React.FC = () => {
  return (
    <ArchiveIdProvider>
      <BrowserRouter>
        <div className="content">
          <Routes>
            <Route path="/archive" element={<ArchiveList />} />
            <Route path="/nowstr" element={<NowstrList />} />
            <Route path="/talents" element={<TalentList />} />
            <Route path="/talents/search" element={<TalentSearchResults />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ArchiveIdProvider>
  );
};

export default App;
