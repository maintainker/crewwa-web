import { Route, Routes } from "react-router-dom";
import CrewRouter from "./crewRouter";

const RunnusRouter = () => {
  return (
    <Routes>
      <Route path={`/crew/*`} element={<CrewRouter />} />
    </Routes>
  );
};

export default RunnusRouter;
