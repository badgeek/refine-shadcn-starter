import { useNavigation, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BlogPostEdit = () => {
  const { list } = useNavigation();

  const form = useForm({});

  const {
    refineCore: { onFinish, queryResult },
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = form;

  const blogPostsData = queryResult?.data?.data;

  const { options: categoryOptions } = useSelect({
    resource: "categories",
    defaultValue: blogPostsData?.category?.id,
  });

  React.useEffect(() => {
    setValue("category.id", blogPostsData?.category?.id);
  }, [categoryOptions]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Post</h1>
        <Button variant="outline" onClick={() => list("blog_posts")}>
          List
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onFinish)} className="space-y-6">
          <div className="grid gap-6">
            <FormField
              control={control}
              name="title"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...register("title", { required: "This field is required" })} />
                  </FormControl>
                  <FormMessage>{errors?.title?.message as string}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="content"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...register("content", { required: "This field is required" })} rows={5} />
                  </FormControl>
                  <FormMessage>{errors?.content?.message as string}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="category.id"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    // {...register("category.id", { required: "This field is required" })}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage>{(errors as any)?.category?.id?.message as string}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="status"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue="draft"
                    // {...register("status", { required: "This field is required" })}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>{errors?.status?.message as string}</FormMessage>
                </FormItem>
              )}
            />

            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
