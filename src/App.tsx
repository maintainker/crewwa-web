import { ModalsProvider } from "./components";
import RunnusRouter from "./router";

const App = () => {
  return (
    <ModalsProvider>
      <div style={{ flex: 1, height: "100vh", background: "black" }} />
      <RunnusRouter />
      <div style={{ flex: 1, height: "100vh", background: "black" }} />
    </ModalsProvider>
  );
};

export default App;
