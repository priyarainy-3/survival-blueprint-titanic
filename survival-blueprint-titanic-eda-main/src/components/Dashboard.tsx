
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatasetOverview from "./DatasetOverview";
import SurvivalFactors from "./SurvivalFactors";
import FeatureImportance from "./FeatureImportance";
import PassengerExplorer from "./PassengerExplorer";
import StatisticalSummary from "./StatisticalSummary";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container py-6 animate-fade-in">
      <Card className="bg-card">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="factors">Survival Factors</TabsTrigger>
            <TabsTrigger value="importance">Feature Importance</TabsTrigger>
            <TabsTrigger value="explorer">Passenger Explorer</TabsTrigger>
            <TabsTrigger value="stats">Statistical Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="p-4 md:p-6">
            <DatasetOverview />
          </TabsContent>
          <TabsContent value="factors" className="p-4 md:p-6">
            <SurvivalFactors />
          </TabsContent>
          <TabsContent value="importance" className="p-4 md:p-6">
            <FeatureImportance />
          </TabsContent>
          <TabsContent value="explorer" className="p-4 md:p-6">
            <PassengerExplorer />
          </TabsContent>
          <TabsContent value="stats" className="p-4 md:p-6">
            <StatisticalSummary />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Dashboard;
