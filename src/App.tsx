import { Container } from "./components/Container";
import { Notes } from "./components/Notes";
import { SideBar } from "./components/SideBar";

function App() {
  return (
    <div className="w-screen h-screen bg-transparent">
      <SideBar />

      <Container>
        <Notes />
      </Container>
    </div>
  );
}

export default App;
