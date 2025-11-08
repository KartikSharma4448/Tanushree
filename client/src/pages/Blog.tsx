import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts"],
  });

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Insights on AI, IoT, web development, and teaching computer science
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card
                      className="p-8 hover-elevate cursor-pointer"
                      data-testid={`card-blog-${post.id}`}
                    >
                      <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{calculateReadTime(post.content)}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
