import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import muiTheme from './shared/theme/muiTheme';
import JewelryListing from './presentation/pages/JewelryListing';

/**
 * Main App Component
 * Provides theme and renders main page
 */
function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <JewelryListing />
    </ThemeProvider>
  );
}

export default App;
