import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Calculator, TrendingUp, ArrowDownUp } from 'lucide-react';
import type { Region } from './types';
import { Tabs, SettingsDropdown } from './components/ui';
import { SIPCalculator, StepUpSIPCalculator, SWPCalculator } from './components/calculator';

// Hook to detect scroll direction with smooth behavior
function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Always show header when at the top
          if (currentScrollY < 30) {
            setIsVisible(true);
          }
          // Scrolling down - hide header (with some buffer)
          else if (currentScrollY > lastScrollY + 5) {
            setIsVisible(false);
          }
          // Scrolling up - show header
          else if (currentScrollY < lastScrollY - 5) {
            setIsVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return isVisible;
}

const CALCULATOR_TABS = [
  { id: 'sip-calculator', label: 'SIP Calculator', icon: <Calculator className="w-4 h-4" /> },
  { id: 'step-up-sip-calculator', label: 'Step-Up SIP', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'swp-calculator', label: 'SWP Calculator', icon: <ArrowDownUp className="w-4 h-4" /> },
];

function App() {
  const location = useLocation();
  const [region, setRegion] = useState<Region>('INR');
  const [showInflation, setShowInflation] = useState(true);
  const isHeaderVisible = useScrollDirection();

  // Get active tab from URL path
  const activeTab = location.pathname.slice(1) || 'sip-calculator';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Header */}
      <header className={`bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 transition-transform duration-200 ease-out md:translate-y-0 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-indigo-600 text-white p-1.5 md:p-2 rounded-lg">
                <Calculator className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h1 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">SIP/SWP Calculator</h1>
                <p className="text-xs text-gray-500 dark:text-slate-400 hidden sm:block">
                  Plan your investments smartly
                </p>
              </div>
            </div>
            <SettingsDropdown
              region={region}
              onRegionChange={setRegion}
              showInflation={showInflation}
              onInflationToggle={setShowInflation}
            />
          </div>
        </div>
      </header>

      {/* Mobile Tabs - Full width scrollable on mobile, stays visible */}
      <div className={`md:hidden bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky z-40 transition-all duration-200 ease-out ${isHeaderVisible ? 'top-14' : 'top-0'}`}>
        <Tabs
          tabs={CALCULATOR_TABS}
          activeTab={activeTab}
          isMobile={true}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Desktop wrapper with container */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Desktop Tabs - Inside container */}
          <div className="bg-white dark:bg-slate-800 rounded-t-xl border border-b-0 border-gray-200 dark:border-slate-700">
            <Tabs
              tabs={CALCULATOR_TABS}
              activeTab={activeTab}
            />
          </div>
          {/* Calculator Content */}
          <div className="bg-white dark:bg-slate-800 rounded-b-xl border border-gray-200 dark:border-slate-700 p-5">
            <Routes>
              <Route path="/" element={<Navigate to="/sip-calculator" replace />} />
              <Route path="/sip-calculator" element={<SIPCalculator region={region} showInflation={showInflation} />} />
              <Route path="/step-up-sip-calculator" element={<StepUpSIPCalculator region={region} showInflation={showInflation} />} />
              <Route path="/swp-calculator" element={<SWPCalculator region={region} showInflation={showInflation} />} />
              <Route path="*" element={<Navigate to="/sip-calculator" replace />} />
            </Routes>
          </div>
        </div>

        {/* Mobile - No container, edge-to-edge */}
        <div className="md:hidden">
          <Routes>
            <Route path="/" element={<Navigate to="/sip-calculator" replace />} />
            <Route path="/sip-calculator" element={<SIPCalculator region={region} showInflation={showInflation} />} />
            <Route path="/step-up-sip-calculator" element={<StepUpSIPCalculator region={region} showInflation={showInflation} />} />
            <Route path="/swp-calculator" element={<SWPCalculator region={region} showInflation={showInflation} />} />
            <Route path="*" element={<Navigate to="/sip-calculator" replace />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <p className="text-center text-xs md:text-sm text-gray-500 dark:text-slate-400 text-balance">
            Disclaimer: The calculations are based on assumed rates of return and are for
            illustrative purposes only. Actual returns may vary based on market conditions.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
