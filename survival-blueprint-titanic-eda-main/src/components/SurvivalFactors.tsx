
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { survivalByClass, survivalByGender, survivalByAge, survivalByEmbarked } from "@/services/titanicData";

const SurvivalFactors = () => {
  const renderSurvivalChart = (data: any[], title: string, description: string) => {
    // Calculate survival rates
    const rateData = data.map(item => ({
      category: item.category,
      rate: (item.survived / (item.survived + item.perished) * 100).toFixed(1),
      total: item.survived + item.perished
    }));

    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value, name) => [value, name === "survived" ? "Survived" : "Did Not Survive"]} />
              <Legend />
              <Bar 
                dataKey="survived" 
                stackId="a" 
                fill="#4ade80" 
                name="Survived"
              >
                {data.map((entry, index) => {
                  const survivalRate = (entry.survived / (entry.survived + entry.perished) * 100).toFixed(1);
                  return <Cell key={`cell-survived-${index}`} fill="#4ade80" />
                })}
              </Bar>
              <Bar 
                dataKey="perished" 
                stackId="a" 
                fill="#f87171" 
                name="Did Not Survive"
              >
                {data.map((entry, index) => {
                  const survivalRate = (entry.survived / (entry.survived + entry.perished) * 100).toFixed(1);
                  return <Cell key={`cell-perished-${index}`} fill="#f87171" />
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            {rateData.map((item, index) => (
              <div key={index} className="bg-secondary p-2 rounded-md">
                <div className="text-sm font-medium">{item.category}</div>
                <div className="text-xl font-bold">{item.rate}%</div>
                <div className="text-xs text-muted-foreground">Survival Rate ({item.total} passengers)</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold">Key Factors Influencing Survival</div>
      
      <Tabs defaultValue="class">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="class">Passenger Class</TabsTrigger>
          <TabsTrigger value="gender">Gender</TabsTrigger>
          <TabsTrigger value="age">Age Group</TabsTrigger>
          <TabsTrigger value="embarked">Port of Embarkation</TabsTrigger>
        </TabsList>
        <TabsContent value="class" className="pt-4">
          {renderSurvivalChart(survivalByClass, "Survival by Passenger Class", "How passenger class affected survival rates")}
        </TabsContent>
        <TabsContent value="gender" className="pt-4">
          {renderSurvivalChart(survivalByGender, "Survival by Gender", "How gender affected survival rates")}
        </TabsContent>
        <TabsContent value="age" className="pt-4">
          {renderSurvivalChart(survivalByAge, "Survival by Age Group", "How age affected survival rates")}
        </TabsContent>
        <TabsContent value="embarked" className="pt-4">
          {renderSurvivalChart(survivalByEmbarked, "Survival by Port of Embarkation", "How embarkation port affected survival rates")}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>Analysis of survival patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>Women had a much higher survival rate (74.2%) compared to men (18.9%), following the "women and children first" protocol.</li>
            <li>First class passengers had the highest survival rate (63.0%), while third class had the lowest (24.2%).</li>
            <li>Children under 18 had better survival chances (52.3%) than adults (36.8%).</li>
            <li>Passengers who embarked from Cherbourg had the highest survival rate (55.4%) compared to those from Southampton (33.7%).</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurvivalFactors;
