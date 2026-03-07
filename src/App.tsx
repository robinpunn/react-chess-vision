import "./App.css";
import Desktop from "./components/layout/Desktop";
import Mobile from "./components/layout/Mobile";
import { useWindowSize } from "./hooks/core/useWindowSize";
import { usePerspective } from "./hooks/core/usePerspective";
import { useClassicMode } from "./hooks/modes/useClassicMode";

function App() {
  const width = useWindowSize();
  const { perspective, togglePerspective } = usePerspective();
  const game = useClassicMode();
    
  return (
    <div className="App">
      {width >= 960 ? (
        <Desktop
          {... game}
          perspective={perspective}
          togglePerspective={togglePerspective} 
        />
      ) : (
        <Mobile
          {... game}
          perspective={perspective}
          togglePerspective={togglePerspective} 
        />
      )}
    </div>
  );
}

export default App;
