
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <p>Titanic Survival Explorer - Interactive Data Analysis Dashboard</p>
      </footer>
    </div>
  );
};

export default Index;
