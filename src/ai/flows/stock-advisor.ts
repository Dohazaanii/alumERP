'use server';

/**
 * @fileOverview AI-powered stock advisor flow.
 *
 * - analyzeOrderAndSuggestStockLevels - Analyzes order specifications and suggests optimal stock levels.
 * - AnalyzeOrderAndSuggestStockLevelsInput - The input type for the analyzeOrderAndSuggestStockLevels function.
 * - AnalyzeOrderAndSuggestStockLevelsOutput - The return type for the analyzeOrderAndSuggestStockLevels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeOrderAndSuggestStockLevelsInputSchema = z.object({
  orderSpecifications: z
    .string()
    .describe('Detailed specifications of the order, including product types, quantities, and materials.'),
});
export type AnalyzeOrderAndSuggestStockLevelsInput = z.infer<typeof AnalyzeOrderAndSuggestStockLevelsInputSchema>;

const AnalyzeOrderAndSuggestStockLevelsOutputSchema = z.object({
  suggestedStockLevels: z
    .string()
    .describe('AI-suggested optimal stock levels for each material based on the order specifications.'),
  reasoning: z
    .string()
    .describe('Explanation of the AI reasoning behind the suggested stock levels.'),
});
export type AnalyzeOrderAndSuggestStockLevelsOutput = z.infer<typeof AnalyzeOrderAndSuggestStockLevelsOutputSchema>;

export async function analyzeOrderAndSuggestStockLevels(
  input: AnalyzeOrderAndSuggestStockLevelsInput
): Promise<AnalyzeOrderAndSuggestStockLevelsOutput> {
  return analyzeOrderAndSuggestStockLevelsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeOrderAndSuggestStockLevelsPrompt',
  input: {schema: AnalyzeOrderAndSuggestStockLevelsInputSchema},
  output: {schema: AnalyzeOrderAndSuggestStockLevelsOutputSchema},
  prompt: `You are an AI assistant that helps production managers optimize stock levels based on new orders.

  Analyze the following order specifications and provide suggestions for optimal stock levels for each material required.
  Also, explain your reasoning behind the suggestions.

  Order Specifications: {{{orderSpecifications}}}

  Respond with the suggested stock levels and the reasoning behind them.
  `,
});

const analyzeOrderAndSuggestStockLevelsFlow = ai.defineFlow(
  {
    name: 'analyzeOrderAndSuggestStockLevelsFlow',
    inputSchema: AnalyzeOrderAndSuggestStockLevelsInputSchema,
    outputSchema: AnalyzeOrderAndSuggestStockLevelsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
