
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SecurityChart from "./SecurityChart";

interface SecurityPanelProps {
  title: string;
  description: string;
  value: string;
  icon: React.ReactNode;
}

const SecurityPanel = ({ title, description, value, icon }: SecurityPanelProps) => {
  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-2xl font-bold">{value}</p>
          <SecurityChart />
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityPanel;
