import { CategoriesContextProvider } from "./contexts/categoriesContext";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from "./pages/Home";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CategoriesContextProvider>
          <Home />
        </CategoriesContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
