import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema } from "@shared/schema";
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

  const httpServer = createServer(app);
  return httpServer;
}
