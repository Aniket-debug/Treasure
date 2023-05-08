import "./App.css";
import AppContextProvider from "./context/AppContextProvider";
import AppRouter from "./navigation/AppRouter";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <AppRouter />
      </AppContextProvider>
    </div>
  );
}

export default App;
