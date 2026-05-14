import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CultureProvider } from "./contexts/CultureContext";
import Home from "./pages/Home";
import CultureMap from "./pages/CultureMap";
import InteractiveExperience from "./pages/InteractiveExperience";
import Library from "./pages/Library";
import MeditationRoom from "./pages/MeditationRoom";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/culture-map" component={CultureMap} />
      <Route path="/interactive" component={InteractiveExperience} />
      <Route path="/library" component={Library} />
      <Route path="/meditation" component={MeditationRoom} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CultureProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CultureProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
