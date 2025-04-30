
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { statisticalSummary } from "@/services/titanicData";

const StatisticalSummary = () => {
  // Create data for statistical charts
  const createStatData = (feature: keyof typeof statisticalSummary) => {
    const stats = statisticalSummary[feature];
    return [
      { name: "Minimum", value: stats.min },
      { name: "Mean", value: stats.mean },
      { name: "Median", value: stats.median },
      { name: "Maximum", value: stats.max }
    ];
  };
  
  const renderStatisticsTab = (feature: keyof typeof statisticalSummary, title: string, description: string) => {
    const data = createStatData(feature);
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title} Statistics</CardTitle>
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
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [
                feature === 'fare' ? `$${value}` : 
                feature === 'age' ? `${value} years` :
                value
              ]} />
              <Legend />
              <Bar dataKey="value" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-secondary p-2 rounded-md">
              <div className="text-sm font-medium">Minimum</div>
              <div className="text-xl font-bold">
                {feature === 'fare' ? `$${statisticalSummary[feature].min}` : statisticalSummary[feature].min}
              </div>
            </div>
            <div className="bg-secondary p-2 rounded-md">
              <div className="text-sm font-medium">Mean</div>
              <div className="text-xl font-bold">
                {feature === 'fare' ? `$${statisticalSummary[feature].mean}` : statisticalSummary[feature].mean}
              </div>
            </div>
            <div className="bg-secondary p-2 rounded-md">
              <div className="text-sm font-medium">Median</div>
              <div className="text-xl font-bold">
                {feature === 'fare' ? `$${statisticalSummary[feature].median}` : statisticalSummary[feature].median}
              </div>
            </div>
            <div className="bg-secondary p-2 rounded-md">
              <div className="text-sm font-medium">Maximum</div>
              <div className="text-xl font-bold">
                {feature === 'fare' ? `$${statisticalSummary[feature].max}` : statisticalSummary[feature].max}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold">Statistical Analysis</div>
      
      <Tabs defaultValue="age">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="age">Age</TabsTrigger>
          <TabsTrigger value="fare">Fare</TabsTrigger>
          <TabsTrigger value="sibsp">Siblings/Spouses</TabsTrigger>
          <TabsTrigger value="parch">Parents/Children</TabsTrigger>
        </TabsList>
        <TabsContent value="age" className="pt-4">
          {renderStatisticsTab("age", "Age", "Statistical summary of passenger ages")}
        </TabsContent>
        <TabsContent value="fare" className="pt-4">
          {renderStatisticsTab("fare", "Fare", "Statistical summary of ticket prices")}
        </TabsContent>
        <TabsContent value="sibsp" className="pt-4">
          {renderStatisticsTab("sibsp", "Siblings/Spouses", "Number of siblings/spouses aboard")}
        </TabsContent>
        <TabsContent value="parch" className="pt-4">
          {renderStatisticsTab("parch", "Parents/Children", "Number of parents/children aboard")}
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Statistical Insights</CardTitle>
          <CardDescription>Key observations from the numerical data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Age Distribution</h3>
              <p className="text-sm text-muted-foreground">
                The youngest passenger was an infant (0.42 years), while the oldest was 80 years old.
                The average age was 29.7 years, with a median of 28 years, suggesting a slightly right-skewed distribution.
                Nearly 20% of age data was missing in the original dataset.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Fare Distribution</h3>
              <p className="text-sm text-muted-foreground">
                Ticket prices varied dramatically, from free passage (£0) to an extremely expensive £512.33.
                The average fare was £32.2, but the median was only £14.45, indicating a heavily right-skewed distribution
                with a few very expensive tickets pulling up the average.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Family Size</h3>
              <p className="text-sm text-muted-foreground">
                Most passengers traveled alone or with a small family. The average number of siblings/spouses
                was 0.52, and the average number of parents/children was 0.38. However, some passengers had large
                families, with up to 8 siblings/spouses and 6 parents/children aboard.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Correlation with Survival</h3>
              <p className="text-sm text-muted-foreground">
                Statistical testing reveals significant correlations between survival and several variables:
                sex (highest correlation), passenger class, and fare. Age shows a weaker negative correlation,
                suggesting lower survival rates for older passengers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticalSummary;
