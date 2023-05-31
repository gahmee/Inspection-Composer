import { CategoriesContextProvider } from "./contexts/categoriesContext";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <CategoriesContextProvider>
        <Home/>
      </CategoriesContextProvider>
    </div>
  );
}

export default App;
