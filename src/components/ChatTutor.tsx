import React, { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ChevronLeft, 
  BookOpen, 
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  suggestions?: { text: string; action: () => void }[];
}

interface ChatTutorProps {
  onClose: () => void;
  onNavigateToQuiz: (exam?: string) => void;
}

export default function ChatTutor({ onClose, onNavigateToQuiz }: ChatTutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hello! I'm your AI Study Tutor. I can help you understand complex topics or guide you to relevant past questions. What are we studying today?",
      suggestions: [
        { text: "Help me with Biology", action: () => handleSend("Tell me more about Biology past questions") },
        { text: "JAMB Syllabus", action: () => handleSend("Show me the JAMB Syllabus") },
        { text: "Take a Quick Test", action: () => onNavigateToQuiz() }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      let botResponse: Partial<Message> = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: "That's a great topic! Based on current trends, students often struggle with genetics and ecology in JAMB Biology. Would you like to practice some 2016 Biology questions together?",
        suggestions: [
          { text: "Yes, start 2016 session", action: () => onNavigateToQuiz('JAMB') },
          { text: "Explain Genetics first", action: () => handleSend("Explain Mendel's laws") }
        ]
      };

      if (text.toLowerCase().includes("syllabus")) {
        botResponse.text = "I have the full 2024 JAMB Syllabus for all major subjects. You can access it in the 'Syllabus' tab, or I can summarize a specific subject for you right here.";
        botResponse.suggestions = [
            { text: "Summarize Biology", action: () => handleSend("What's in the Biology syllabus?") },
            { text: "View all Syllabi", action: () => {} }
        ];
      }

      setMessages(prev => [...prev, botResponse as Message]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card w-full max-w-2xl h-[90vh] sm:h-[700px] sm:rounded-[3rem] border-white/5 shadow-[0_32px_128px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="glass p-8 text-white flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-5">
            <button onClick={onClose} className="p-3 glass hover:bg-white/10 rounded-2xl transition-all group">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 rotate-3">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-black text-xl tracking-tight leading-none">AI Study Tutor</h2>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mt-1.5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Arena Expert
              </div>
            </div>
          </div>
          <div className="hidden sm:flex gap-1.5">
            {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />)}
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-10 scroll-smooth selection:bg-primary/30"
        >
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex gap-5 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-12 h-12 rounded-3xl shrink-0 flex items-center justify-center shadow-inner ${msg.type === 'bot' ? 'glass text-primary rotate-3 border-white/5' : 'bg-primary/20 text-primary -rotate-3 border border-primary/20'}`}>
                {msg.type === 'bot' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
              </div>
              <div className={`space-y-6 max-w-[85%] ${msg.type === 'user' ? 'items-end flex flex-col' : ''}`}>
                <div className={`p-6 rounded-[2rem] text-sm md:text-base leading-relaxed font-medium ${msg.type === 'bot' ? 'glass text-slate-300 rounded-tl-none border-white/5 shadow-2xl' : 'bg-primary text-white rounded-tr-none shadow-2xl shadow-primary/20'}`}>
                  {msg.text}
                </div>
                {msg.suggestions && (
                  <div className="flex flex-wrap gap-3">
                    {msg.suggestions.map((s, si) => (
                      <button 
                        key={si}
                        onClick={s.action}
                        className="px-6 py-3 glass border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-primary hover:text-white transition-all shadow-xl"
                      >
                        {s.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-3xl glass text-primary shrink-0 flex items-center justify-center border-white/5 shadow-inner">
                <Bot className="w-6 h-6" />
              </div>
              <div className="p-5 glass rounded-[2rem] flex gap-1.5 items-center border-white/5">
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '200ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 glass border-t border-white/5">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex gap-4"
          >
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask for an explanation or tutorial..."
              className="flex-1 glass border border-white/5 rounded-[1.5rem] px-8 py-5 text-base text-white focus:outline-none focus:border-primary/50 transition-all font-medium placeholder:text-slate-600"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="w-16 h-16 bg-primary text-white rounded-[1.5rem] flex items-center justify-center hover:scale-110 transition-all disabled:bg-white/5 disabled:text-slate-700 shadow-2xl shadow-primary/40"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
          <div className="flex items-center justify-center gap-10 mt-8">
             <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                <BookOpen className="w-4 h-4" />
                Guides Included
             </div>
             <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                <Lightbulb className="w-4 h-4" />
                Arena Strategy
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
