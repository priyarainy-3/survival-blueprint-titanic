
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { samplePassengers, Passenger } from "@/services/titanicData";
import { CheckCircle, XCircle, Search, Ship, Anchor } from "lucide-react";

const PassengerExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterSex, setFilterSex] = useState("all");
  const [filterSurvived, setFilterSurvived] = useState("all");
  
  // In a real application, we would fetch more data as needed
  const [passengers] = useState<Passenger[]>(samplePassengers);
  
  const filteredPassengers = passengers.filter(passenger => {
    // Apply search filter
    const matchesSearch = 
      passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      passenger.ticket.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply class filter
    const matchesClass = filterClass === "all" || passenger.pclass === parseInt(filterClass);
    
    // Apply sex filter
    const matchesSex = filterSex === "all" || passenger.sex === filterSex;
    
    // Apply survived filter
    const matchesSurvived = 
      filterSurvived === "all" || 
      (filterSurvived === "survived" && passenger.survived === 1) ||
      (filterSurvived === "perished" && passenger.survived === 0);
    
    return matchesSearch && matchesClass && matchesSex && matchesSurvived;
  });
  
  const getPassengerIcon = (passenger: Passenger) => {
    if (passenger.survived === 1) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };
  
  const getClassBadge = (pclass: number) => {
    switch(pclass) {
      case 1:
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">1st Class</span>;
      case 2:
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">2nd Class</span>;
      case 3:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">3rd Class</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Ship className="h-5 w-5 mr-2" /> Passenger Explorer
          </CardTitle>
          <CardDescription>Browse through passenger records from the Titanic</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ticket..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Select value={filterClass} onValueChange={setFilterClass}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="1">1st Class</SelectItem>
                    <SelectItem value="2">2nd Class</SelectItem>
                    <SelectItem value="3">3rd Class</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterSex} onValueChange={setFilterSex}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterSurvived} onValueChange={setFilterSurvived}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="survived">Survived</SelectItem>
                    <SelectItem value="perished">Did Not Survive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Passenger</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Fare</TableHead>
                    <TableHead>Embarked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPassengers.map((passenger) => (
                    <TableRow key={passenger.id}>
                      <TableCell>{getPassengerIcon(passenger)}</TableCell>
                      <TableCell>
                        <div className="font-medium">{passenger.name}</div>
                        <div className="text-xs text-muted-foreground">Ticket: {passenger.ticket}</div>
                      </TableCell>
                      <TableCell>{getClassBadge(passenger.pclass)}</TableCell>
                      <TableCell>{passenger.age ?? "Unknown"}</TableCell>
                      <TableCell>{passenger.sex}</TableCell>
                      <TableCell>${passenger.fare.toFixed(2)}</TableCell>
                      <TableCell>
                        {passenger.embarked ? 
                          <div className="flex items-center">
                            <Anchor className="h-3 w-3 mr-1" />
                            {passenger.embarked === "C" ? "Cherbourg" : 
                             passenger.embarked === "Q" ? "Queenstown" : 
                             passenger.embarked === "S" ? "Southampton" : passenger.embarked}
                          </div> : "Unknown"}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPassengers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No passengers found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="text-sm text-muted-foreground text-center">
              Showing {filteredPassengers.length} of {passengers.length} passengers
              <div className="text-xs">
                (Sample data - In a complete application, pagination would be implemented)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Passenger Profile Analysis</CardTitle>
          <CardDescription>What typical passenger profiles tell us about survival chances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-md border border-green-200">
              <h3 className="font-semibold text-green-800 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" /> High Survival Chance
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-green-800">
                <li>• Female passengers</li>
                <li>• First class ticket holders</li>
                <li>• Children under 10 years old</li>
                <li>• Passengers with cabin records</li>
                <li>• Those who embarked from Cherbourg</li>
                <li>• Passengers with "Mrs" or "Miss" titles</li>
              </ul>
            </div>
            
            <div className="bg-red-50 p-4 rounded-md border border-red-200">
              <h3 className="font-semibold text-red-800 flex items-center">
                <XCircle className="h-5 w-5 mr-2" /> Low Survival Chance
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-red-800">
                <li>• Male passengers</li>
                <li>• Third class ticket holders</li>
                <li>• Adult men (20-50 years old)</li>
                <li>• Passengers without cabin records</li>
                <li>• Those who embarked from Southampton</li>
                <li>• Passengers with "Mr" title</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PassengerExplorer;
