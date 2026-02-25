import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Paperclip, Trash2, FileText, Loader2, Bot, Image, Globe, History, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import guruBotImage from "@/assets/guru-ai-bot.jpg";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  fileName?: string;
  imagePreview?: string;
};

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
};

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "👋 Hi! I am **GURU AI** — your powerful study assistant.\n\nI can now:\n- 📄 Analyze uploaded notes & documents\n- 📸 **Analyze images** — diagrams, circuits, handwriting\n- 🌐 **Answer in your language** — Hindi, Telugu, Tamil & more\n- 💾 **Save chat history** for later review\n\nAsk me anything!",
};

const QUICK_ACTIONS = [
  "Upload notes and explain",
  "Summarize this file",
  "Important questions from this material",
  "Solve problems step-by-step",
  "Extract formulas from this chapter",
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", label: "മലയാളം", flag: "🇮🇳" },
  { code: "mr", label: "मराठी", flag: "🇮🇳" },
  { code: "bn", label: "বাংলা", flag: "🇮🇳" },
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/guru-chat`;
const SESSIONS_KEY = "guru-ai-sessions";
const MAX_SESSIONS = 10;

function loadSessions(): ChatSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveSessions(sessions: ChatSession[]) {
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.slice(0, MAX_SESSIONS)));
  } catch { /* ignore */ }
}

export function GuruAIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [showFrame, setShowFrame] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [language, setLanguage] = useState("en");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>(loadSessions);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [pendingImageName, setPendingImageName] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowFrame(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const extractTextFromFile = async (file: File): Promise<string> => {
    const text = await file.text();
    const printableChars = text.replace(/[^\x20-\x7E\n\r\t]/g, "");
    if (printableChars.length < text.length * 0.3) {
      throw new Error("File contains too much binary content to extract text.");
    }
    if (file.type === "text/plain" || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      return printableChars.substring(0, 30000);
    }
    const cleaned = text
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, " ")
      .replace(/\s{3,}/g, "\n\n")
      .trim();
    if (cleaned.length < 50) {
      return `[File: ${file.name}] - The file content could not be fully extracted as text. Please describe what you'd like to know about this document.`;
    }
    return cleaned.substring(0, 30000);
  };

  const handleImageUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: "⚠️ Image too large. Please upload images under 5MB." }]);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPendingImage(base64);
      setPendingImageName(file.name);
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: `📸 Image **${file.name}** ready for analysis. Type your question or just send to analyze!`,
      }]);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = async (file: File) => {
    // Check if it's an image
    if (file.type.startsWith("image/")) {
      return handleImageUpload(file);
    }

    const allowedTypes = [
      "application/pdf", "text/plain",
      "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const allowedExtensions = [".pdf", ".txt", ".ppt", ".pptx", ".doc", ".docx", ".md"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(ext)) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: "⚠️ Unsupported file format. Please upload PDF, PPT, DOC, TXT, or image files." }]);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: "⚠️ File too large. Please upload files under 10MB." }]);
      return;
    }

    setIsProcessingFile(true);
    setFileName(file.name);
    try {
      const content = await extractTextFromFile(file);
      setFileContent(content);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "user", content: `📄 Uploaded: **${file.name}**`, fileName: file.name },
        { id: (Date.now() + 1).toString(), role: "assistant", content: `✅ I've loaded **${file.name}**. I'm ready to help!\n\nYou can ask me to:\n- Summarize the content\n- Explain specific topics\n- Find important questions\n- Extract formulas and definitions` },
      ]);
    } catch {
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: "⚠️ Error processing file. Please try again or use a different format." }]);
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, []);

  const saveCurrentSession = () => {
    const realMessages = messages.filter(m => m.id !== "welcome");
    if (realMessages.length < 2) return;
    const firstUserMsg = realMessages.find(m => m.role === "user");
    const title = firstUserMsg?.content.substring(0, 50) || "Chat Session";
    const session: ChatSession = {
      id: Date.now().toString(),
      title,
      messages: realMessages,
      createdAt: new Date().toISOString(),
    };
    const updated = [session, ...sessions].slice(0, MAX_SESSIONS);
    setSessions(updated);
    saveSessions(updated);
  };

  const loadSession = (session: ChatSession) => {
    setMessages([WELCOME_MESSAGE, ...session.messages]);
    setShowHistory(false);
  };

  const deleteSession = (sessionId: string) => {
    const updated = sessions.filter(s => s.id !== sessionId);
    setSessions(updated);
    saveSessions(updated);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      imagePreview: pendingImage ? pendingImageName || "image" : undefined,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const chatHistory = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));
    chatHistory.push({ role: "user", content: text });

    const currentImage = pendingImage;
    setPendingImage(null);
    setPendingImageName(null);

    let assistantSoFar = "";
    const assistantId = (Date.now() + 1).toString();

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          messages: chatHistory,
          fileContent: fileContent,
          language: language,
          imageData: currentImage || undefined,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || "Request failed");
      }
      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.id === assistantId) {
                  return prev.map((m) => m.id === assistantId ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { id: assistantId, role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) =>
                prev.map((m) => m.id === assistantId ? { ...m, content: assistantSoFar } : m)
              );
            }
          } catch { /* ignore */ }
        }
      }

      if (!assistantSoFar) {
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "I couldn't generate a response. Please try again." },
        ]);
      }
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: `⚠️ ${e.message || "Something went wrong. Please try again."}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    saveCurrentSession();
    setMessages([WELCOME_MESSAGE]);
    setFileContent(null);
    setFileName(null);
    setPendingImage(null);
    setPendingImageName(null);
  };

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  if (!isOpen) {
    return (
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {(showFrame || isHovering) && (
          <div className="flex items-center gap-3 bg-card border border-border rounded-2xl shadow-lg px-3 py-2.5 animate-fade-in">
            <img src={guruBotImage} alt="Guru AI" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <div className="leading-tight">
              <p className="text-sm font-bold text-foreground">Hi I'm Guru AI!</p>
              <p className="text-xs text-muted-foreground">Now with 📸 Image Analysis & 🌐 Multi-language!</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Open GURU AI"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[650px] max-h-[calc(100vh-3rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">GURU AI</h3>
            <p className="text-white/70 text-xs">Powered Study Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Language Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
              title="Change language"
            >
              <Globe className="w-4 h-4" />
            </Button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-xl py-1 w-36 z-50 max-h-48 overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-muted transition-colors",
                      language === lang.code && "bg-primary/10 text-primary font-semibold"
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* History */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHistory(!showHistory)}
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
            title="Chat history"
          >
            <History className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
            title="New chat (saves current)"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Language indicator */}
      {language !== "en" && (
        <div className="px-3 py-1.5 bg-primary/10 border-b border-border flex items-center gap-2 text-xs flex-shrink-0">
          <Globe className="w-3 h-3 text-primary" />
          <span className="text-primary font-medium">Responding in {currentLang.flag} {currentLang.label}</span>
        </div>
      )}

      {/* File indicator */}
      {fileName && (
        <div className="px-3 py-2 bg-muted/50 border-b border-border flex items-center gap-2 text-xs flex-shrink-0">
          <FileText className="w-3.5 h-3.5 text-violet-500" />
          <span className="truncate text-muted-foreground">{fileName}</span>
          <button onClick={() => { setFileContent(null); setFileName(null); }} className="ml-auto text-muted-foreground hover:text-foreground">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Pending image indicator */}
      {pendingImage && (
        <div className="px-3 py-2 bg-violet-500/10 border-b border-border flex items-center gap-2 text-xs flex-shrink-0">
          <Image className="w-3.5 h-3.5 text-violet-500" />
          <span className="truncate text-violet-600 dark:text-violet-400 font-medium">📸 {pendingImageName} ready</span>
          <button onClick={() => { setPendingImage(null); setPendingImageName(null); }} className="ml-auto text-muted-foreground hover:text-foreground">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* History Panel */}
      {showHistory && (
        <div className="absolute inset-0 top-[52px] bg-card z-40 flex flex-col">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h4 className="font-semibold text-sm text-foreground">Chat History</h4>
            <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)} className="h-7 w-7">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {sessions.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                No saved sessions yet. Start a new chat to save history!
              </div>
            ) : (
              sessions.map((session) => (
                <div key={session.id} className="px-4 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors group">
                  <button onClick={() => loadSession(session)} className="w-full text-left">
                    <p className="text-sm font-medium text-foreground truncate">{session.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(session.createdAt).toLocaleDateString()} · {session.messages.length} messages
                    </p>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                    className="absolute right-4 top-3 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                msg.role === "user"
                  ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              )}
            >
              {msg.imagePreview && (
                <div className="text-xs opacity-80 mb-1 flex items-center gap-1">
                  <Image className="w-3 h-3" /> {msg.imagePreview}
                </div>
              )}
              {msg.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {isProcessingFile && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin text-violet-500" />
              Processing file...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick actions */}
      {messages.length <= 1 && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action}
              onClick={() => sendMessage(action)}
              className="text-xs px-2.5 py-1.5 rounded-full border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-3 py-3 border-t border-border flex-shrink-0">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
          className="flex items-center gap-2"
        >
          <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.txt,.ppt,.pptx,.doc,.docx,.md"
            onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload(file); e.target.value = ""; }}
          />
          <input type="file" ref={imageInputRef} className="hidden" accept="image/png,image/jpeg,image/webp"
            onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file); e.target.value = ""; }}
          />
          <Button type="button" variant="ghost" size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="h-9 w-9 flex-shrink-0 text-muted-foreground hover:text-violet-500"
            disabled={isProcessingFile}
            title="Upload document"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon"
            onClick={() => imageInputRef.current?.click()}
            className="h-9 w-9 flex-shrink-0 text-muted-foreground hover:text-violet-500"
            title="Upload image for analysis"
          >
            <Image className="w-4 h-4" />
          </Button>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={pendingImage ? "Ask about the image..." : "Ask your doubt..."}
            className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500/50 placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={(!input.trim() && !pendingImage) || isLoading}
            className="h-9 w-9 flex-shrink-0 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
