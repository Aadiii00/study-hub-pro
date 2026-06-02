import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, RotateCcw, Sparkles, ChevronRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/guru-chat`;

type QuizMode = "quiz" | "flashcard";

interface FlashCard {
  front: string;
  back: string;
}

export default function AIQuiz() {
  const [topic, setTopic] = useState("");
  const [branch, setBranch] = useState("");
  const [mode, setMode] = useState<QuizMode>("quiz");
  const [numQuestions, setNumQuestions] = useState(5);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [showResults, setShowResults] = useState(false);

  const generateContent = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setContent("");
    setFlashcards([]);
    setFlippedCards(new Set());
    setShowResults(true);

    const prompt =
      mode === "quiz"
        ? `Generate ${numQuestions} multiple-choice quiz questions on the topic "${topic.trim()}"${branch ? ` for ${branch} engineering students` : ""}. For each question, provide 4 options (A, B, C, D), mark the correct answer, and give a brief explanation. Format clearly with markdown.`
        : `Generate ${numQuestions} flashcards on the topic "${topic.trim()}"${branch ? ` for ${branch} engineering students` : ""}. For each flashcard, format as:
**Card 1 Front:** [question/term]
**Card 1 Back:** [answer/definition]

Make them concise and exam-focused.`;

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!resp.ok || !resp.body) throw new Error("Failed to generate");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              fullContent += delta;
              setContent(fullContent);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Parse flashcards if in flashcard mode
      if (mode === "flashcard" && fullContent) {
        const cards: FlashCard[] = [];
        const frontRegex = /\*\*Card \d+ Front:\*\*\s*(.*?)(?=\n\*\*Card \d+ Back:\*\*)/gs;
        const backRegex = /\*\*Card \d+ Back:\*\*\s*(.*?)(?=\n\*\*Card \d+ Front:\*\*|\n\n|$)/gs;
        const fronts = [...fullContent.matchAll(frontRegex)].map((m) => m[1].trim());
        const backs = [...fullContent.matchAll(backRegex)].map((m) => m[1].trim());
        for (let i = 0; i < Math.min(fronts.length, backs.length); i++) {
          cards.push({ front: fronts[i], back: backs[i] });
        }
        if (cards.length > 0) setFlashcards(cards);
      }
    } catch (err) {
      setContent("❌ Failed to generate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCard = (index: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const reset = () => {
    setContent("");
    setFlashcards([]);
    setFlippedCards(new Set());
    setShowResults(false);
  };

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md mb-6 border border-primary/30">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white">AI-Powered Study Tools</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
              Quiz & <span className="gradient-text">Flashcards</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Generate instant quizzes and flashcards on any topic using GURU AI
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 md:p-8 rounded-3xl bg-card border border-border/50 shadow-premium mb-8"
            >
              {/* Mode Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setMode("quiz")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    mode === "quiz"
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Lightbulb className="w-4 h-4" />
                  Quiz Mode
                </button>
                <button
                  onClick={() => setMode("flashcard")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    mode === "flashcard"
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Flashcards
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Topic *</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    maxLength={200}
                    placeholder="e.g. Data Structures, Thermodynamics"
                    className="w-full input-premium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Branch (optional)</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    maxLength={50}
                    placeholder="e.g. CSE, ECE, Mech"
                    className="w-full input-premium"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Number of {mode === "quiz" ? "Questions" : "Cards"}: {numQuestions}
                </label>
                <input
                  type="range"
                  min={3}
                  max={15}
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>3</span>
                  <span>15</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={generateContent}
                  disabled={isLoading || !topic.trim()}
                  className="flex-1 btn-gradient rounded-xl py-6 text-base font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-500"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Generate {mode === "quiz" ? "Quiz" : "Flashcards"}
                    </span>
                  )}
                </Button>
                {showResults && (
                  <Button onClick={reset} variant="outline" aria-label="Reset quiz" className="rounded-xl py-6 px-5">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Results */}
            <AnimatePresence>
              {showResults && content && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {mode === "flashcard" && flashcards.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {flashcards.map((card, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08 }}
                          onClick={() => toggleCard(i)}
                          className="cursor-pointer group"
                        >
                          <div
                            className={`p-6 rounded-2xl border transition-all duration-500 min-h-[160px] flex flex-col justify-center ${
                              flippedCards.has(i)
                                ? "bg-primary/10 border-primary/30 shadow-glow/20"
                                : "bg-card border-border/50 hover:border-primary/30"
                            }`}
                          >
                            <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                              {flippedCards.has(i) ? "Answer" : `Card ${i + 1}`}
                              <span className="float-right text-primary">
                                <ChevronRight className={`w-4 h-4 transition-transform ${flippedCards.has(i) ? "rotate-90" : ""}`} />
                              </span>
                            </div>
                            <p className="text-foreground font-medium">
                              {flippedCards.has(i) ? card.back : card.front}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 md:p-8 rounded-3xl bg-card border border-border/50 shadow-premium">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{content}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
}
