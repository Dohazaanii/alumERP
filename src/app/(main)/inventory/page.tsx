import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { stock } from "@/lib/data";

export default function InventoryPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock</h1>
          <p className="text-muted-foreground">Gérez les niveaux de stock de vos matériaux.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>État du stock</CardTitle>
          <CardDescription>Vue d'ensemble de l'inventaire actuel.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Unité</TableHead>
                <TableHead className="w-[25%]">Quantité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stock.map((item) => {
                const stockLevel = (item.quantity / (item.threshold * 1.5)) * 100; // Calculate percentage for progress bar
                let progressColorClass = "text-primary";
                if (item.quantity < item.threshold) {
                  progressColorClass = "text-destructive"
                } else if (item.quantity < item.threshold * 1.2) {
                  progressColorClass = "text-yellow-500"
                }

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <span className="w-16 text-right">{item.quantity} / {item.threshold}</span>
                        <Progress value={stockLevel} className="h-2 w-full" indicatorClassName={progressColorClass} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}
