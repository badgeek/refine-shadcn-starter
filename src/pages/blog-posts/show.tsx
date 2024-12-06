import { useParams } from "react-router-dom";
import { useNavigation, useOne } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const BlogPostShow = () => {
  const { edit, list } = useNavigation();
  const { id } = useParams();
  const { data } = useOne({
    resource: "blog_posts",
    id: id || "",
  });

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Show Post</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => list("blog_posts")}>
              List
            </Button>
            <Button onClick={() => edit("blog_posts", id ?? "")}>
              Edit
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium leading-none">ID</h3>
              <p className="text-sm text-muted-foreground">{record?.id ?? ""}</p>
            </div>

            <Separator />

            <div className="space-y-1.5">
              <h3 className="text-sm font-medium leading-none">Title</h3>
              <p className="text-sm text-muted-foreground">{record?.title}</p>
            </div>

            <Separator />

            <div className="space-y-1.5">
              <h3 className="text-sm font-medium leading-none">Content</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{record?.content}</p>
            </div>

            <Separator />

            <div className="space-y-1.5">
              <h3 className="text-sm font-medium leading-none">Category</h3>
              <p className="text-sm text-muted-foreground">
                {categoryIsLoading ? (
                  "Loading..."
                ) : (
                  categoryData?.data?.title
                )}
              </p>
            </div>

            <Separator />

            <div className="space-y-1.5">
              <h3 className="text-sm font-medium leading-none">Status</h3>
              <div>
                <Badge variant={
                  record?.status === 'published' ? 'default' :
                  record?.status === 'draft' ? 'secondary' : 'destructive'
                }>
                  {record?.status}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-1.5">
              <h3 className="text-sm font-medium leading-none">Created at</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(record?.createdAt).toLocaleString(undefined, {
                  timeZone: "UTC",
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
