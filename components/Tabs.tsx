'use client';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex border-b-2 border-black bg-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'text-black'
              : 'text-black/60 hover:text-black hover:bg-black/5'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full animate-scale-in" />
          )}
        </button>
      ))}
    </div>
  );
}
