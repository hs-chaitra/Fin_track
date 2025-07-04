// This is an autogenerated file from Firebase Studio.
'use server';
/**
 * @fileOverview A flow that automatically categorizes expenses using AI.
 *
 * - categorizeExpense - A function that handles the expense categorization process.
 * - CategorizeExpenseInput - The input type for the categorizeExpense function.
 * - CategorizeExpenseOutput - The return type for the categorizeExpense function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeExpenseInputSchema = z.object({
  transactionDescription: z
    .string()
    .describe('The description of the transaction to categorize.'),
  availableCategories: z
    .array(z.string())
    .describe('The list of available expense categories.'),
});
export type CategorizeExpenseInput = z.infer<typeof CategorizeExpenseInputSchema>;

const CategorizeExpenseOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'The predicted expense category for the transaction, chosen from the available categories.'
    ),
  confidence: z
    .number()
    .describe(
      'A confidence score between 0 and 1 indicating the certainty of the categorization.'
    ),
});
export type CategorizeExpenseOutput = z.infer<typeof CategorizeExpenseOutputSchema>;

export async function categorizeExpense(
  input: CategorizeExpenseInput
): Promise<CategorizeExpenseOutput> {
  return categorizeExpenseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeExpensePrompt',
  input: {schema: CategorizeExpenseInputSchema},
  output: {schema: CategorizeExpenseOutputSchema},
  prompt: `You are an expert financial advisor.

You will categorize the provided transaction into one of the provided categories.

Transaction Description: {{{transactionDescription}}}
Available Categories: {{#each availableCategories}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Consider these factors when deciding:
- What the transaction description implies about the purchase.
- Which category best fits the purchase.

Respond with the category and a confidence score.
`,
});

const categorizeExpenseFlow = ai.defineFlow(
  {
    name: 'categorizeExpenseFlow',
    inputSchema: CategorizeExpenseInputSchema,
    outputSchema: CategorizeExpenseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
