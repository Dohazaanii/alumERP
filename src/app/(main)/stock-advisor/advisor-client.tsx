'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { analyzeOrderAndSuggestStockLevels, type AnalyzeOrderAndSuggestStockLevelsOutput } from '@/ai/flows/stock-advisor';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  orderSpecifications: z.string().min(10, 'Veuillez fournir des détails sur la commande.'),
});

type FormValues = z.infer<typeof formSchema>;

export function AdvisorClient() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeOrderAndSuggestStockLevelsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderSpecifications: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await analyzeOrderAndSuggestStockLevels({
        orderSpecifications: data.orderSpecifications,
      });
      setResult(response);
    } catch (error) {
        console.error("Failed to get stock analysis:", error);
        toast({
            variant: "destructive",
            title: "Erreur",
            description: "Impossible d'obtenir l'analyse du stock. Veuillez réessayer.",
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Spécifications de la Commande</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="orderSpecifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Détails de la commande</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: 5 fenêtres coulissantes 120x150cm, profilé alu gris, double vitrage..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                <Wand2 className="mr-2 h-4 w-4" />
                {loading ? 'Analyse en cours...' : 'Analyser le stock'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading && (
         <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </CardContent>
            </Card>
         </div>
      )}

      {result && (
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Niveaux de stock suggérés</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result.suggestedStockLevels}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Raisonnement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result.reasoning}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
