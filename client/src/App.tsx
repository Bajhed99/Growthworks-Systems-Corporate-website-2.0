import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Framework from "@/pages/Framework";
import DiagnosticPlatform from "@/pages/DiagnosticPlatform";
import RevenueDiagnostic from "@/pages/RevenueDiagnostic";
import Solutions from "@/pages/Solutions";
import AIVisibility from "@/pages/AIVisibility";
import AIVisibilityCall from "@/pages/AIVisibilityCall";
import AIReadyWebsite from "@/pages/AIReadyWebsite";
import CRMAutomation from "@/pages/CRMAutomation";
import ConversionSystems from "@/pages/ConversionSystems";
import Industries from "@/pages/Industries";
import HomeServices from "@/pages/HomeServices";
import FinancialAdvisors from "@/pages/FinancialAdvisors";
import InsuranceAgencies from "@/pages/InsuranceAgencies";
import Resources from "@/pages/Resources";
import About from "@/pages/About";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { PasswordGate } from "./components/PasswordGate";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/framework"} component={Framework} />
      <Route path={"/diagnostic"} component={DiagnosticPlatform} />
      <Route path={"/diagnostic-platform"} component={DiagnosticPlatform} />
      <Route path={"/revenue-diagnostic"} component={RevenueDiagnostic} />
      <Route path={"/solutions"} component={Solutions} />
      <Route path={"/ai-visibility"} component={AIVisibility} />
      <Route path={"/ai-visibility-call"} component={AIVisibilityCall} />
      <Route path={"/ai-ready-website"} component={AIReadyWebsite} />
      <Route path={"/crm-automation"} component={CRMAutomation} />
      <Route path={"/conversion-systems"} component={ConversionSystems} />
      <Route path={"/industries"} component={Industries} />
      <Route path={"/home-services"} component={HomeServices} />
      <Route path={"/financial-advisors"} component={FinancialAdvisors} />
      <Route path={"/insurance-agencies"} component={InsuranceAgencies} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/about"} component={About} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated (from localStorage or URL param)
    const token = localStorage.getItem('gws_access_token');
    const correctPassword = import.meta.env.VITE_GWS_ACCESS_PASSWORD || '';

    if (correctPassword && token === correctPassword) {
      setIsAuthenticated(true);
    } else if (correctPassword) {
      // Check URL parameter
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('access');
      if (urlToken === correctPassword) {
        localStorage.setItem('gws_access_token', correctPassword);
        setIsAuthenticated(true);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
