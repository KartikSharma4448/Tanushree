import { type User, type InsertUser, type BlogPost, type InsertBlogPost } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.seedBlogPosts();
  }

  private seedBlogPosts() {
    const posts: InsertBlogPost[] = [
      {
        title: "Getting Started with Generative Adversarial Networks",
        slug: "getting-started-with-gans",
        excerpt: "An introduction to GANs and their applications in medical imaging and text summarization",
        content: `<h2>Introduction to GANs</h2>
<p>Generative Adversarial Networks (GANs) represent one of the most exciting developments in artificial intelligence and machine learning. In this article, I'll share my experience working with GANs in medical imaging and text summarization.</p>

<h3>What are GANs?</h3>
<p>GANs consist of two neural networks - a generator and a discriminator - that work together in a competitive process. The generator creates synthetic data, while the discriminator tries to distinguish between real and fake data.</p>

<h3>Applications in Medical Imaging</h3>
<p>In my research on improving the quality of medical scans using GANs, I discovered that these networks can significantly enhance image resolution and reduce noise, leading to better diagnostic capabilities.</p>

<h3>Text Summarization with GANs</h3>
<p>Another fascinating application is abstractive text summarization. Unlike extractive methods, GANs can generate entirely new sentences that capture the essence of longer texts.</p>

<h2>Getting Started</h2>
<p>If you're interested in exploring GANs, I recommend starting with basic implementations using PyTorch or TensorFlow. Understanding the underlying mathematics is crucial, but practical experimentation will teach you the most.</p>

<h2>Conclusion</h2>
<p>GANs are powerful tools with applications across multiple domains. Whether you're working on image generation, data augmentation, or creative AI, understanding GANs will open up new possibilities in your research and development work.</p>`,
        imageUrl: null,
        publishedAt: new Date("2024-11-15"),
      },
      {
        title: "Building IoT Fire Detection Systems",
        slug: "iot-fire-detection",
        excerpt: "Learn how to create an industrial fire detection and control system using NodeMCU and cloud integration",
        content: `<h2>Introduction</h2>
<p>Fire detection systems are critical for industrial safety. In this article, I'll walk through building a comprehensive IoT-based fire detection and control system using NodeMCU and cloud integration.</p>

<h3>System Architecture</h3>
<p>Our system uses multiple sensor types including temperature sensors, smoke detectors, and flame sensors connected to a NodeMCU microcontroller. The data is sent to the cloud for real-time monitoring and alerts.</p>

<h3>Hardware Components</h3>
<ul>
<li>NodeMCU ESP8266</li>
<li>MQ-2 Smoke Sensor</li>
<li>DS18B20 Temperature Sensor</li>
<li>Flame Sensor Module</li>
<li>Relay Module for Control</li>
</ul>

<h3>Cloud Integration</h3>
<p>We use cloud platforms to store sensor data, trigger alerts, and provide remote monitoring capabilities. This allows for real-time response to fire incidents.</p>

<h2>Implementation Details</h2>
<p>The NodeMCU reads sensor values every second and sends them to the cloud. When threshold values are exceeded, the system triggers both local alarms and cloud-based notifications.</p>

<h2>Conclusion</h2>
<p>This IoT fire detection system provides industrial-grade safety at a fraction of traditional costs, with the added benefit of remote monitoring and control.</p>`,
        imageUrl: null,
        publishedAt: new Date("2024-10-22"),
      },
      {
        title: "My Journey Teaching Computer Science",
        slug: "teaching-computer-science",
        excerpt: "Reflections on 1.5 years of teaching Python, DBMS, and AI to undergraduate students",
        content: `<h2>Introduction</h2>
<p>Teaching computer science to undergraduate students has been one of the most rewarding experiences of my career. Here are my reflections after 1.5 years as a Junior Research Fellow.</p>

<h3>Subjects I Teach</h3>
<p>I have the privilege of teaching diverse subjects including Python Programming, Database Management Systems, Software Engineering, Computer Networks, Web Technologies, and Emerging Technologies like AI and IoT.</p>

<h3>Challenges and Solutions</h3>
<p>One of the biggest challenges is bridging the gap between theoretical concepts and practical applications. I've found that hands-on projects and real-world examples significantly improve student engagement.</p>

<h3>Student Projects</h3>
<p>Guiding students through projects in IoT, AI, and web development has been particularly fulfilling. Seeing them build working systems - from fire detection to AI chatbots - demonstrates the power of experiential learning.</p>

<h2>Looking Forward</h2>
<p>I'm excited to continue enhancing student engagement through innovative teaching methods and research-oriented learning.</p>`,
        imageUrl: null,
        publishedAt: new Date("2024-09-10"),
      },
    ];

    posts.forEach((post) => {
      const id = randomUUID();
      const blogPost: BlogPost = {
        ...post,
        imageUrl: post.imageUrl ?? null,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.blogPosts.set(id, blogPost);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
    const blogPost: BlogPost = {
      ...insertPost,
      imageUrl: insertPost.imageUrl ?? null,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async updateBlogPost(
    id: string,
    updates: Partial<InsertBlogPost>
  ): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;

    const updated: BlogPost = {
      ...existing,
      ...updates,
      imageUrl: updates.imageUrl !== undefined ? updates.imageUrl ?? null : existing.imageUrl,
      id,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

export const storage = new MemStorage();
