import { Route, Routes } from "react-router-dom";
import { RaceListPage } from "../../pages";

const CrewRouter = () => {
  return (
    <Routes>
      <Route path={`/:crewId/race/:eventId`} element={<RaceListPage />} />
    </Routes>
  );
};

export default CrewRouter;
