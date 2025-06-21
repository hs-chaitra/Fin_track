"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { handleCategorization } from "@/app/actions";
import type { CategorizeExpenseOutput } from "@/ai/flows/categorize-expense";

const formSchema = z.object({
  description: z.string().min(3, "Please enter a description."),
});

interface CategorizeExpenseDialogProps {
  categories: string[];
}

export function CategorizeExpenseDialog({
  categories,
}: CategorizeExpenseDialogProps) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<CategorizeExpenseOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setResult(null);
    startTransition(async () => {
      const { success, data, error } = await handleCategorization(
        values.description,
        categories
      );
      if (success && data) {
        setResult(data);
      } else {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: error,
        });
      }
    });
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
      setResult(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Sparkles className="mr-2" />
          Categorize with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Automatic Expense Categorization</DialogTitle>
          <DialogDescription>
            Enter a transaction description and let AI categorize it for you.
          </DialogDescription>
        </DialogHeader>
        {result ? (
          <div className="py-4 space-y-4 text-center">
            <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                    <Bot className="w-10 h-10 text-primary" />
                </div>
            </div>
            <p className="text-muted-foreground">The transaction is likely:</p>
            <p className="text-2xl font-bold font-headline">{result.category}</p>
            <p className="text-sm text-muted-foreground">Confidence: {Math.round(result.confidence * 100)}%</p>
            <Button variant="outline" onClick={() => setResult(null)}>Try another</Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'Coffee with friends at Starbucks'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Categorize
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
