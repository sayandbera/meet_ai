import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsetSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GenerateAvatar } from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEdit = !!initialValues?.id;

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        // TODO: Invalidate free tire usage
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
        // TODO: if error code is "FORBIDDEN", redirect user to upgrade
      },
    })
  );

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        if (isEdit) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({
              id: initialValues.id,
            })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
        // TODO: if error code is "FORBIDDEN", redirect user to upgrade
      },
    })
  );

  const form = useForm<z.infer<typeof agentsInsetSchema>>({
    resolver: zodResolver(agentsInsetSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof agentsInsetSchema>) => {
    if (isEdit) {
      updateAgent.mutate({ ...values, id: initialValues.id });
    } else {
      createAgent.mutate(values);
    }
  };

  const isPending = createAgent.isPending || updateAgent.isPending;

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GenerateAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="order size-16"
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Physics tutor" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="You are a helpful Physics assistant that can answer questions and help with assignments."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-x-4">
          {onCancel && (
            <Button
              variant="ghost"
              type="button"
              disabled={isPending}
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}

          <Button type="submit" disabled={isPending}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
