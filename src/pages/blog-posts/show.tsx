import { useParams } from "react-router-dom";
import { useNavigation, useOne } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import { Skeleton } from "@/components/ui/skeleton";

export const BlogPostShow = () => {
  const { edit, list } = useNavigation();
  const { id } = useParams();
  const { data, isLoading } = useOne({
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <Card>
          <CardContent className="p-6 space-y-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      );
    }

    return (
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
                <Skeleton className="h-4 w-24" />
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
    );
  };

  return (
    <Main>
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Show Post</h1>
            <div className="flex gap-2">
              <Button className="h-9" variant="outline" onClick={() => list("blog_posts")}>
                List
              </Button>
              <Button className="h-9" onClick={() => edit("blog_posts", id ?? "")}>
                Edit
              </Button>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    </Main>
  );
};
