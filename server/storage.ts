import {
  type User,
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type Project,
  type InsertProject,
  type Achievement,
  type InsertAchievement,
  users,
  blogPosts,
  projects,
  achievements,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

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

  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  getAllAchievements(): Promise<Achievement[]>;
  getAchievement(id: string): Promise<Achievement | undefined>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  updateAchievement(id: string, achievement: Partial<InsertAchievement>): Promise<Achievement | undefined>;
  deleteAchievement(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async seedInitialData() {
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

    const existingPosts = await db.select().from(blogPosts).limit(1);
    if (existingPosts.length === 0) {
      for (const post of posts) {
        await db.insert(blogPosts).values(post);
      }
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async updateProject(id: string, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  async getAllAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements).orderBy(desc(achievements.createdAt));
  }

  async getAchievement(id: string): Promise<Achievement | undefined> {
    const [achievement] = await db.select().from(achievements).where(eq(achievements.id, id));
    return achievement;
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const [achievement] = await db.insert(achievements).values(insertAchievement).returning();
    return achievement;
  }

  async updateAchievement(id: string, updates: Partial<InsertAchievement>): Promise<Achievement | undefined> {
    const [achievement] = await db
      .update(achievements)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(achievements.id, id))
      .returning();
    return achievement;
  }

  async deleteAchievement(id: string): Promise<boolean> {
    const result = await db.delete(achievements).where(eq(achievements.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
