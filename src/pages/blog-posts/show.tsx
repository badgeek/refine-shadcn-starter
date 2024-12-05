import { useNavigation, useOne, useResource, useShow } from "@refinedev/core";
import React from "react";
import { Button } from "@/components/ui/button";

export const BlogPostShow = () => {
  const { edit, list } = useNavigation();
  const { id } = useResource();
  const { queryResult } = useShow({});
  const { data } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Show Post</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => list("blog_posts")}>
              List
            </Button>
            <Button onClick={() => edit("blog_posts", id ?? "")}>
              Edit
            </Button>
          </div>
        </div>

        <div className="space-y-8 bg-white rounded-lg border p-6">
          <div className="grid gap-2">
            <h3 className="font-medium text-gray-700">ID</h3>
            <p className="text-sm text-muted-foreground">{record?.id ?? ""}</p>
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium text-gray-700">Title</h3>
            <p className="text-sm text-muted-foreground">{record?.title}</p>
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium text-gray-700">Content</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{record?.content}</p>
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium text-gray-700">Category</h3>
            <p className="text-sm text-muted-foreground">
              {categoryIsLoading ? (
                "Loading..."
              ) : (
                categoryData?.data?.title
              )}
            </p>
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium text-gray-700">Status</h3>
            <div className="text-sm">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${record?.status === 'published' ? 'bg-green-100 text-green-800' : 
                  record?.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}`}>
                {record?.status}
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium text-gray-700">Created at</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(record?.createdAt).toLocaleString(undefined, {
                timeZone: "UTC",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
