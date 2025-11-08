import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, insertProjectSchema, insertAchievementSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog post routes
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog/posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid blog post data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  app.patch("/api/blog/posts/:id", async (req, res) => {
    try {
      const updates = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, updates);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid blog post data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog/posts/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid project data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const updates = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, updates);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid project data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Achievement routes
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch achievements" });
    }
  });

  app.get("/api/achievements/:id", async (req, res) => {
    try {
      const achievement = await storage.getAchievement(req.params.id);
      if (!achievement) {
        return res.status(404).json({ error: "Achievement not found" });
      }
      res.json(achievement);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch achievement" });
    }
  });

  app.post("/api/achievements", async (req, res) => {
    try {
      const validatedData = insertAchievementSchema.parse(req.body);
      const achievement = await storage.createAchievement(validatedData);
      res.status(201).json(achievement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid achievement data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create achievement" });
    }
  });

  app.patch("/api/achievements/:id", async (req, res) => {
    try {
      const updates = insertAchievementSchema.partial().parse(req.body);
      const achievement = await storage.updateAchievement(req.params.id, updates);
      if (!achievement) {
        return res.status(404).json({ error: "Achievement not found" });
      }
      res.json(achievement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid achievement data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update achievement" });
    }
  });

  app.delete("/api/achievements/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteAchievement(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Achievement not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete achievement" });
    }
  });

  // Simple admin authentication check
  app.post("/api/admin/verify", async (req, res) => {
    const { password } = req.body;
    // Simple password check - in production, use proper authentication
    if (password === "tanushree2025") {
      res.json({ authenticated: true });
    } else {
      res.status(401).json({ authenticated: false, error: "Invalid password" });
    }
  });

  // Seed initial data
  await storage.seedInitialData();

  const httpServer = createServer(app);
  return httpServer;
}
