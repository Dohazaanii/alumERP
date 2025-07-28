import { AdvisorClient } from './advisor-client';

export default function StockAdvisorPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">AI Stock Advisor</h1>
            <p className="mt-2 text-muted-foreground">
                Analysez les spécifications de commande pour déterminer les niveaux de stock requis.
            </p>
        </div>
        <div className="mt-10">
            <AdvisorClient />
        </div>
      </div>
    </div>
  );
}
