
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { featureImportance, correlationData } from "@/services/titanicData";

const FeatureImportance = () => {
  // Sort feature importance data in descending order
  const sortedFeatures = [...featureImportance].sort((a, b) => b.importance - a.importance);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Feature Importance</CardTitle>
          <CardDescription>The relative importance of features in predicting survival</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedFeatures}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 0.5]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
              <YAxis type="category" dataKey="feature" />
              <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Importance']} />
              <Legend />
              <Bar 
                dataKey="importance" 
                fill="#0ea5e9" 
                name="Importance"
              >
                {sortedFeatures.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? '#0ea5e9' : index === 1 ? '#38bdf8' : '#7dd3fc'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Feature Correlation with Survival</CardTitle>
          <CardDescription>Correlation coefficients between features and survival outcome</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={correlationData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[-0.6, 0.6]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
              <YAxis type="category" dataKey="feature" />
              <Tooltip formatter={(value) => [`${value}%`, 'Correlation']} />
              <Legend />
              <Bar 
                dataKey="value" 
                name="Correlation (%)"
              >
                {correlationData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.correlation > 0 ? '#4ade80' : '#f87171'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Feature Explanation</CardTitle>
          <CardDescription>What each feature means in the context of the Titanic dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Sex</h3>
              <p className="text-sm text-muted-foreground">
                Passenger's gender (male/female). This was the most important factor in survival, with females having much higher survival rates.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Pclass</h3>
              <p className="text-sm text-muted-foreground">
                Ticket class (1st, 2nd, 3rd). Higher classes had significantly better survival rates, reflecting socioeconomic differences.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Age</h3>
              <p className="text-sm text-muted-foreground">
                Passenger's age. Children had higher survival rates, especially in first and second classes.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Fare</h3>
              <p className="text-sm text-muted-foreground">
                Passenger fare. Higher fares correlated with higher survival rates, often related to class and accommodation quality.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">SibSp</h3>
              <p className="text-sm text-muted-foreground">
                Number of siblings/spouses aboard. Having family affected survival chances, but the relationship was complex.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Parch</h3>
              <p className="text-sm text-muted-foreground">
                Number of parents/children aboard. Similar to SibSp, family relationships influenced survival patterns.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Embarked</h3>
              <p className="text-sm text-muted-foreground">
                Port of embarkation (C = Cherbourg, Q = Queenstown, S = Southampton). This may reflect socioeconomic factors.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Title</h3>
              <p className="text-sm text-muted-foreground">
                Title extracted from name (Mr, Mrs, Miss, etc.). Titles provide additional demographic information beyond gender.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureImportance;
