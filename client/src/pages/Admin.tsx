import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, FileText, X, LogOut, Award, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { BlogPost, InsertBlogPost, Project, InsertProject, Achievement, InsertAchievement } from "@shared/schema";
import { AdminAuth } from "@/components/AdminAuth";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("blog");
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [showProjectEditor, setShowProjectEditor] = useState(false);
  const [showAchievementEditor, setShowAchievementEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  
  const [blogFormData, setBlogFormData] = useState<Partial<InsertBlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    imageUrl: "",
  });

  const [projectFormData, setProjectFormData] = useState<Partial<InsertProject>>({
    title: "",
    description: "",
    technologies: [],
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    featured: "false",
  });

  const [achievementFormData, setAchievementFormData] = useState<Partial<InsertAchievement>>({
    title: "",
    description: "",
    date: "",
    category: "",
  });

  const { toast } = useToast();

  const { data: posts = [], isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts"],
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: achievements = [], isLoading: achievementsLoading } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

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

  // Blog Post Mutations
  const createBlogMutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      return apiRequest("POST", "/api/blog/posts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Blog post created", description: "Your blog post has been published successfully." });
      resetBlogForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create blog post.", variant: "destructive" });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertBlogPost> }) => {
      return apiRequest("PATCH", `/api/blog/posts/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Blog post updated", description: "Your changes have been saved successfully." });
      resetBlogForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update blog post.", variant: "destructive" });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/blog/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Post deleted", description: "The blog post has been removed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete blog post.", variant: "destructive" });
    },
  });

  // Project Mutations
  const createProjectMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      return apiRequest("POST", "/api/projects", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project created", description: "Your project has been added successfully." });
      resetProjectForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create project.", variant: "destructive" });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProject> }) => {
      return apiRequest("PATCH", `/api/projects/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project updated", description: "Your changes have been saved successfully." });
      resetProjectForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update project.", variant: "destructive" });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project deleted", description: "The project has been removed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete project.", variant: "destructive" });
    },
  });

  // Achievement Mutations
  const createAchievementMutation = useMutation({
    mutationFn: async (data: InsertAchievement) => {
      return apiRequest("POST", "/api/achievements", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Achievement created", description: "Your achievement has been added successfully." });
      resetAchievementForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create achievement.", variant: "destructive" });
    },
  });

  const updateAchievementMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertAchievement> }) => {
      return apiRequest("PATCH", `/api/achievements/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Achievement updated", description: "Your changes have been saved successfully." });
      resetAchievementForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update achievement.", variant: "destructive" });
    },
  });

  const deleteAchievementMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/achievements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Achievement deleted", description: "The achievement has been removed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete achievement.", variant: "destructive" });
    },
  });

  const resetBlogForm = () => {
    setShowBlogEditor(false);
    setEditingPost(null);
    setBlogFormData({ title: "", slug: "", excerpt: "", content: "", imageUrl: "" });
  };

  const resetProjectForm = () => {
    setShowProjectEditor(false);
    setEditingProject(null);
    setProjectFormData({ title: "", description: "", technologies: [], imageUrl: "", githubUrl: "", liveUrl: "", featured: "false" });
  };

  const resetAchievementForm = () => {
    setShowAchievementEditor(false);
    setEditingAchievement(null);
    setAchievementFormData({ title: "", description: "", date: "", category: "" });
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  };

  const handleBlogTitleChange = (title: string) => {
    setBlogFormData({ ...blogFormData, title });
    if (!editingPost) {
      setBlogFormData({ ...blogFormData, title, slug: generateSlug(title) });
    }
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: InsertBlogPost = {
      title: blogFormData.title!,
      slug: blogFormData.slug!,
      excerpt: blogFormData.excerpt!,
      content: blogFormData.content!,
      imageUrl: blogFormData.imageUrl || null,
      publishedAt: new Date(),
    };
    if (editingPost) {
      updateBlogMutation.mutate({ id: editingPost.id, data: submitData });
    } else {
      createBlogMutation.mutate(submitData);
    }
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = Array.isArray(projectFormData.technologies) 
      ? projectFormData.technologies 
      : (projectFormData.technologies as string || "").split(",").map(t => t.trim()).filter(Boolean);
    
    const submitData: InsertProject = {
      title: projectFormData.title!,
      description: projectFormData.description!,
      technologies: techArray,
      imageUrl: projectFormData.imageUrl || null,
      githubUrl: projectFormData.githubUrl || null,
      liveUrl: projectFormData.liveUrl || null,
      featured: projectFormData.featured || "false",
    };
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data: submitData });
    } else {
      createProjectMutation.mutate(submitData);
    }
  };

  const handleAchievementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: InsertAchievement = {
      title: achievementFormData.title!,
      description: achievementFormData.description!,
      date: achievementFormData.date!,
      category: achievementFormData.category!,
    };
    if (editingAchievement) {
      updateAchievementMutation.mutate({ id: editingAchievement.id, data: submitData });
    } else {
      createAchievementMutation.mutate(submitData);
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Admin Panel</h1>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="blog" data-testid="tab-blog">
                <FileText className="mr-2 h-4 w-4" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="projects" data-testid="tab-projects">
                <Briefcase className="mr-2 h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="achievements" data-testid="tab-achievements">
                <Award className="mr-2 h-4 w-4" />
                Achievements
              </TabsTrigger>
            </TabsList>

            {/* Blog Posts Tab */}
            <TabsContent value="blog" className="space-y-6">
              {!showBlogEditor && (
                <div className="flex justify-end">
                  <Button onClick={() => { resetBlogForm(); setShowBlogEditor(true); }} data-testid="button-new-blog">
                    <Plus className="mr-2 h-4 w-4" />
                    New Blog Post
                  </Button>
                </div>
              )}

              {showBlogEditor && (
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{editingPost ? "Edit Post" : "Create New Post"}</h2>
                    <Button variant="ghost" size="icon" onClick={resetBlogForm} data-testid="button-close-blog-editor">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <form onSubmit={handleBlogSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="blog-title">Title</Label>
                      <Input
                        id="blog-title"
                        value={blogFormData.title}
                        onChange={(e) => handleBlogTitleChange(e.target.value)}
                        placeholder="Enter post title"
                        required
                        data-testid="input-blog-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blog-slug">Slug</Label>
                      <Input
                        id="blog-slug"
                        value={blogFormData.slug}
                        onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                        placeholder="post-url-slug"
                        required
                        data-testid="input-blog-slug"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blog-imageUrl">Image URL (optional)</Label>
                      <Input
                        id="blog-imageUrl"
                        value={blogFormData.imageUrl || ""}
                        onChange={(e) => setBlogFormData({ ...blogFormData, imageUrl: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        data-testid="input-blog-imageUrl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blog-excerpt">Excerpt</Label>
                      <Textarea
                        id="blog-excerpt"
                        value={blogFormData.excerpt}
                        onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                        placeholder="Brief description of the post"
                        rows={3}
                        required
                        data-testid="input-blog-excerpt"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blog-content">Content (HTML supported)</Label>
                      <Textarea
                        id="blog-content"
                        value={blogFormData.content}
                        onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                        placeholder="Write your blog post content"
                        rows={12}
                        required
                        data-testid="input-blog-content"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button type="submit" disabled={createBlogMutation.isPending || updateBlogMutation.isPending} data-testid="button-blog-submit">
                        <FileText className="mr-2 h-4 w-4" />
                        {editingPost ? "Update Post" : "Publish Post"}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetBlogForm} data-testid="button-blog-cancel">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Manage Blog Posts</h2>
                {postsLoading ? (
                  <p className="text-muted-foreground">Loading posts...</p>
                ) : posts.length === 0 ? (
                  <p className="text-muted-foreground">No posts yet. Create your first post!</p>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border rounded-md">
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
                            onClick={() => {
                              setEditingPost(post);
                              setBlogFormData({
                                title: post.title,
                                slug: post.slug,
                                excerpt: post.excerpt,
                                content: post.content,
                                imageUrl: post.imageUrl || "",
                              });
                              setShowBlogEditor(true);
                            }}
                            data-testid={`button-edit-blog-${post.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this post?")) {
                                deleteBlogMutation.mutate(post.id);
                              }
                            }}
                            disabled={deleteBlogMutation.isPending}
                            data-testid={`button-delete-blog-${post.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              {!showProjectEditor && (
                <div className="flex justify-end">
                  <Button onClick={() => { resetProjectForm(); setShowProjectEditor(true); }} data-testid="button-new-project">
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </div>
              )}

              {showProjectEditor && (
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{editingProject ? "Edit Project" : "Create New Project"}</h2>
                    <Button variant="ghost" size="icon" onClick={resetProjectForm} data-testid="button-close-project-editor">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <form onSubmit={handleProjectSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="project-title">Title</Label>
                      <Input
                        id="project-title"
                        value={projectFormData.title}
                        onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                        placeholder="Enter project title"
                        required
                        data-testid="input-project-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea
                        id="project-description"
                        value={projectFormData.description}
                        onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                        placeholder="Project description"
                        rows={4}
                        required
                        data-testid="input-project-description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-technologies">Technologies (comma-separated)</Label>
                      <Input
                        id="project-technologies"
                        value={Array.isArray(projectFormData.technologies) ? projectFormData.technologies.join(", ") : projectFormData.technologies}
                        onChange={(e) => setProjectFormData({ ...projectFormData, technologies: e.target.value.split(",").map(t => t.trim()) })}
                        placeholder="React, Node.js, MongoDB"
                        required
                        data-testid="input-project-technologies"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-imageUrl">Image URL (optional)</Label>
                      <Input
                        id="project-imageUrl"
                        value={projectFormData.imageUrl || ""}
                        onChange={(e) => setProjectFormData({ ...projectFormData, imageUrl: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        data-testid="input-project-imageUrl"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-githubUrl">GitHub URL (optional)</Label>
                        <Input
                          id="project-githubUrl"
                          value={projectFormData.githubUrl || ""}
                          onChange={(e) => setProjectFormData({ ...projectFormData, githubUrl: e.target.value })}
                          placeholder="https://github.com/username/repo"
                          data-testid="input-project-githubUrl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project-liveUrl">Live URL (optional)</Label>
                        <Input
                          id="project-liveUrl"
                          value={projectFormData.liveUrl || ""}
                          onChange={(e) => setProjectFormData({ ...projectFormData, liveUrl: e.target.value })}
                          placeholder="https://example.com"
                          data-testid="input-project-liveUrl"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button type="submit" disabled={createProjectMutation.isPending || updateProjectMutation.isPending} data-testid="button-project-submit">
                        <Briefcase className="mr-2 h-4 w-4" />
                        {editingProject ? "Update Project" : "Create Project"}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetProjectForm} data-testid="button-project-cancel">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Manage Projects</h2>
                {projectsLoading ? (
                  <p className="text-muted-foreground">Loading projects...</p>
                ) : projects.length === 0 ? (
                  <p className="text-muted-foreground">No projects yet. Create your first project!</p>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex-1">
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{project.description.substring(0, 100)}...</p>
                          <div className="flex gap-2 mt-2">
                            {project.technologies.map((tech, i) => (
                              <span key={i} className="text-xs bg-muted px-2 py-1 rounded">{tech}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingProject(project);
                              setProjectFormData({
                                title: project.title,
                                description: project.description,
                                technologies: project.technologies,
                                imageUrl: project.imageUrl || "",
                                githubUrl: project.githubUrl || "",
                                liveUrl: project.liveUrl || "",
                                featured: project.featured,
                              });
                              setShowProjectEditor(true);
                            }}
                            data-testid={`button-edit-project-${project.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this project?")) {
                                deleteProjectMutation.mutate(project.id);
                              }
                            }}
                            disabled={deleteProjectMutation.isPending}
                            data-testid={`button-delete-project-${project.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              {!showAchievementEditor && (
                <div className="flex justify-end">
                  <Button onClick={() => { resetAchievementForm(); setShowAchievementEditor(true); }} data-testid="button-new-achievement">
                    <Plus className="mr-2 h-4 w-4" />
                    New Achievement
                  </Button>
                </div>
              )}

              {showAchievementEditor && (
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{editingAchievement ? "Edit Achievement" : "Create New Achievement"}</h2>
                    <Button variant="ghost" size="icon" onClick={resetAchievementForm} data-testid="button-close-achievement-editor">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <form onSubmit={handleAchievementSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="achievement-title">Title</Label>
                      <Input
                        id="achievement-title"
                        value={achievementFormData.title}
                        onChange={(e) => setAchievementFormData({ ...achievementFormData, title: e.target.value })}
                        placeholder="Enter achievement title"
                        required
                        data-testid="input-achievement-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="achievement-description">Description</Label>
                      <Textarea
                        id="achievement-description"
                        value={achievementFormData.description}
                        onChange={(e) => setAchievementFormData({ ...achievementFormData, description: e.target.value })}
                        placeholder="Achievement description"
                        rows={4}
                        required
                        data-testid="input-achievement-description"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="achievement-date">Date</Label>
                        <Input
                          id="achievement-date"
                          value={achievementFormData.date}
                          onChange={(e) => setAchievementFormData({ ...achievementFormData, date: e.target.value })}
                          placeholder="2024"
                          required
                          data-testid="input-achievement-date"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="achievement-category">Category</Label>
                        <Input
                          id="achievement-category"
                          value={achievementFormData.category}
                          onChange={(e) => setAchievementFormData({ ...achievementFormData, category: e.target.value })}
                          placeholder="Education, Research, etc."
                          required
                          data-testid="input-achievement-category"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button type="submit" disabled={createAchievementMutation.isPending || updateAchievementMutation.isPending} data-testid="button-achievement-submit">
                        <Award className="mr-2 h-4 w-4" />
                        {editingAchievement ? "Update Achievement" : "Create Achievement"}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetAchievementForm} data-testid="button-achievement-cancel">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Manage Achievements</h2>
                {achievementsLoading ? (
                  <p className="text-muted-foreground">Loading achievements...</p>
                ) : achievements.length === 0 ? (
                  <p className="text-muted-foreground">No achievements yet. Create your first achievement!</p>
                ) : (
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                            <span>{achievement.date}</span>
                            <span className="bg-muted px-2 py-0.5 rounded text-xs">{achievement.category}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingAchievement(achievement);
                              setAchievementFormData({
                                title: achievement.title,
                                description: achievement.description,
                                date: achievement.date,
                                category: achievement.category,
                              });
                              setShowAchievementEditor(true);
                            }}
                            data-testid={`button-edit-achievement-${achievement.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this achievement?")) {
                                deleteAchievementMutation.mutate(achievement.id);
                              }
                            }}
                            disabled={deleteAchievementMutation.isPending}
                            data-testid={`button-delete-achievement-${achievement.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
