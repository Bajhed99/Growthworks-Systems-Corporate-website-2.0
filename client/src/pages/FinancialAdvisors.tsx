import { Home } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLocation } from "wouter";

export default function FinancialAdvisors() {
  const [, setLocation] = useLocation();
  return (
    <>
    <SiteHeader />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Financial Advisors</h1>
      <p className="text-lg text-slate-600 mb-8">Page template — content to be customized per Blueprint documentation by Jhed.</p>
      <button onClick={() => setLocation("/")} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition"><Home size={18} /> Back to Home</button>
    </div>
    <SiteFooter />
    </>
  );
}
