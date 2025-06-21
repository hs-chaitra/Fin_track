"use server";

import {
  categorizeExpense,
  type CategorizeExpenseInput,
} from "@/ai/flows/categorize-expense";

export async function handleCategorization(
  transactionDescription: string,
  availableCategories: string[]
) {
  try {
    const input: CategorizeExpenseInput = {
      transactionDescription,
      availableCategories,
    };
    const result = await categorizeExpense(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error categorizing expense:", error);
    return { success: false, error: "Failed to categorize expense." };
  }
}
