import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Talents } from "model/talent";

axios.defaults.baseURL = "http://localhost:4000/api/";

const App: React.FC = () => {
  const [talentList, setTalentList] = useState<Talents[]>([]);
  // get
  useEffect(() => {
    (async () => {
      const response = await axios.get<Talents[]>("/talents");
      setTalentList(response.data);
      console.log(talentList);
    })();
  }, [setTalentList]);

  const Talent = () => {
    return <h1>TEST</h1>;
  };
  return (
    <div className="App">
      <Talent />
      {talentList.map((talent: Talents) => {
        return (
          <div key={talent.id}>
            <h1>
              {talent.name}; {talent.youtube_profile}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default App;
