import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, FileText, X, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { BlogPost, InsertBlogPost } from "@shared/schema";
import { AdminAuth } from "@/components/AdminAuth";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel.",
    });
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const [formData, setFormData] = useState<Partial<InsertBlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    imageUrl: "",
  });

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      return apiRequest("POST", "/api/blog/posts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({
        title: "Blog post created",
        description: "Your blog post has been published successfully.",
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create blog post.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertBlogPost> }) => {
      return apiRequest("PATCH", `/api/blog/posts/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({
        title: "Blog post updated",
        description: "Your changes have been saved successfully.",
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update blog post.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/blog/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({
        title: "Post deleted",
        description: "The blog post has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setShowEditor(false);
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      imageUrl: "",
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl || "",
    });
    setShowEditor(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData: InsertBlogPost = {
      title: formData.title!,
      slug: formData.slug!,
      excerpt: formData.excerpt!,
      content: formData.content!,
      imageUrl: formData.imageUrl || null,
      publishedAt: new Date(),
    };

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(id);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title });
    if (!editingPost) {
      setFormData({ ...formData, title, slug: generateSlug(title) });
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Admin Panel</h1>
            <div className="flex gap-2">
              {!showEditor && (
                <Button
                  onClick={() => {
                    resetForm();
                    setShowEditor(true);
                  }}
                  data-testid="button-new-post"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              )}
              <Button
                variant="outline"
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {showEditor && (
            <Card className="p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {editingPost ? "Edit Post" : "Create New Post"}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetForm}
                  data-testid="button-close-editor"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title"
                    required
                    data-testid="input-title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="post-url-slug"
                    required
                    data-testid="input-slug"
                  />
                  <p className="text-xs text-muted-foreground">
                    Auto-generated from title, but you can customize it
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL (optional)</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                    data-testid="input-imageUrl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Brief description of the post"
                    rows={3}
                    required
                    data-testid="input-excerpt"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content (HTML supported)</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Write your blog post content (HTML supported)"
                    rows={12}
                    required
                    data-testid="input-content"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-publish"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {editingPost ? "Update Post" : "Publish Post"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Manage Posts</h2>
            {isLoading ? (
              <p className="text-muted-foreground">Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-muted-foreground">No posts yet. Create your first post!</p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{post.title}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span>Slug: {post.slug}</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(post)}
                        data-testid={`button-edit-${post.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(post.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${post.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
