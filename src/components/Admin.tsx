import React, { useState, useEffect } from "react";
import { 
  FileUp, 
  Trash2, 
  Brain, 
  ChevronLeft, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  ShieldAlert,
  Save,
  Rocket,
  Download,
  LayoutDashboard,
  Database,
  PlusCircle,
  Settings,
  LogOut,
  Search,
  Filter,
  Beaker,
  Image as ImageIcon,
  Cpu,
  Bookmark,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BrainService } from "../services/BrainService";
import { QuestionService } from "../services/QuestionService";
import { validateQuestion } from "../services/geminiService";
import { Question } from "../data/mockQuestions";
import { cn } from "../lib/utils";

interface AdminProps {
  onBack: () => void;
}

type AdminView = 'stats' | 'questions' | 'brain' | 'settings';

export default function Admin({ onBack }: AdminProps) {
  const [view, setView] = useState<AdminView>('stats');
  const [knowledgeList, setKnowledgeList] = useState<any[]>([]);
  const [questionList, setQuestionList] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [showTemplateGuide, setShowTemplateGuide] = useState(false);

  // New Question Form State
  const [newQuestion, setNewQuestion] = useState<Omit<Question, 'id'>>({
    examType: 'JAMB',
    subject: 'Biology',
    year: '2024',
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    staticExplanation: '',
    topic: 'General',
    image: ''
  });
  const [diagramPreview, setDiagramPreview] = useState<string | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (isAdmin) {
       loadKnowledge();
       loadQuestions();
    }
  }, [isAdmin]);

  const loadKnowledge = async () => {
    const list = await BrainService.getAllKnowledge();
    setKnowledgeList(list);
  };

  const loadQuestions = async () => {
    const list = await QuestionService.getAllQuestions();
    setQuestionList(list);
  };

  const handleJsonUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json" && !file.name.endsWith('.json')) {
      setError("Only JSON files are supported for AI feeding.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setStatus("Reading JSON Data...");

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      setStatus("Analyzing Patterns...");
      
      const category = jsonData.category || "GENERAL";
      const processedText = typeof jsonData === 'string' 
        ? jsonData 
        : JSON.stringify(jsonData, null, 2);

      await BrainService.addKnowledge(file.name, processedText, category);
      await loadKnowledge();
      setStatus(null);
    } catch (err: any) {
      setError("Failed to parse JSON. Check format.");
    } finally {
      setIsProcessing(false);
      if (event.target) event.target.value = "";
    }
  };

  const handleDiagramUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setDiagramPreview(url);
      setNewQuestion({ ...newQuestion, image: url });
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.questionText || newQuestion.options.some(o => !o)) {
      setError("Please fill in all question fields.");
      return;
    }

    try {
      setIsProcessing(true);
      await QuestionService.addQuestion(newQuestion);
      await loadQuestions();
      setNewQuestion({
        examType: 'JAMB',
        subject: 'Biology',
        year: '2024',
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        staticExplanation: '',
        topic: 'General',
        image: ''
      });
      setDiagramPreview(null);
      setAiFeedback(null);
      setStatus("Question Saved to Arena Bank!");
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setError("Failed to save question.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTestAI = async () => {
    if (!newQuestion.questionText) return;
    setIsValidating(true);
    const feedback = await validateQuestion(
      newQuestion.questionText, 
      newQuestion.options, 
      String.fromCharCode(65 + newQuestion.correctAnswer),
      newQuestion.staticExplanation
    );
    setAiFeedback(feedback);
    setIsValidating(false);
  };

  const deleteBrainEntry = async (id: string) => {
    if (confirm("Remove this data?")) {
      await BrainService.deleteKnowledge(id);
      await loadKnowledge();
    }
  };

  const deleteQuestionEntry = async (id: string) => {
    if (confirm("Delete this question?")) {
      await QuestionService.deleteQuestion(id);
      await loadQuestions();
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === "ARENA2026") {
      setIsAdmin(true);
      setError(null);
    } else {
      setError("Invalid Access Code.");
    }
  };

  const totalSyllabusTopics = new Set(questionList.map(q => q.topic)).size;

  // Login Screen
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full max-w-lg glass p-12 rounded-[3.5rem] border-white/10 shadow-[0_64px_128px_-16px_rgba(0,0,0,0.6)] space-y-12 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
             <ShieldAlert className="w-32 h-32 text-primary" />
           </div>

           <div className="space-y-4 text-center relative z-10">
              <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto text-white shadow-2xl shadow-primary/30 transform -rotate-3">
                 <Cpu className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter">Arena Command</h2>
              <p className="text-slate-500 font-medium">Identity synchronization required for neural override.</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Access Code</label>
                <input 
                  type="password" 
                  autoFocus
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="••••••••"
                  className="w-full glass border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-primary transition-all text-center tracking-[0.5em] text-2xl font-black"
                />
              </div>
              {error && (
                <div className="flex items-center gap-3 text-rose-500 text-xs font-bold justify-center bg-rose-500/5 py-4 rounded-2xl border border-rose-500/10">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              <button className="w-full py-6 bg-primary text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] shadow-2xl shadow-primary/40 active:scale-95">
                Execute Portal Entry
              </button>
           </form>
           
           <button 
             onClick={onBack}
             className="w-full text-slate-500 hover:text-white font-black uppercase tracking-widest text-[10px] transition-colors pt-4"
           >
             Terminate Connection
           </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-transparent overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 glass border-r border-white/5 flex flex-col p-8 z-20">
         <div className="flex items-center gap-4 mb-20 px-2 group cursor-pointer" onClick={onBack}>
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
               <GraduationCap className="w-6 h-6" />
            </div>
            <div>
               <h1 className="font-black text-xl text-white tracking-tight">Edu Arena</h1>
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Admin Terminal</span>
            </div>
         </div>

         <nav className="flex-1 space-y-4">
            {[
              { id: 'stats', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'questions', label: 'Question Bank', icon: Database },
              { id: 'brain', label: 'Neural Intelligence', icon: Brain },
              { id: 'settings', label: 'Portal Config', icon: Settings },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setView(item.id as AdminView)}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-black text-sm transition-all group",
                  view === item.id 
                    ? "bg-primary text-white shadow-xl shadow-primary/20 translate-x-1" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", view === item.id ? "text-white" : "text-slate-500 group-hover:text-primary transition-colors")} />
                {item.label}
              </button>
            ))}
         </nav>

         <div className="pt-8 border-t border-white/5 space-y-4">
            <button 
              onClick={() => setIsAdmin(false)}
              className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-black text-sm text-rose-500 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
            >
               <LogOut className="w-5 h-5" />
               Lock Console
            </button>
         </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 overflow-y-auto bg-transparent relative custom-scrollbar">
         {/* Top Glass Header */}
         <div className="sticky top-0 h-24 glass border-b border-white/5 flex items-center justify-between px-12 z-10">
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Current Node</span>
               <ChevronLeft className="w-3 h-3 text-slate-700 rotate-180" />
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">{view.replace('-', ' ')}</span>
            </div>
            
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Link Active</span>
               </div>
               <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5 shadow-2xl">
                  <img src="https://i.pravatar.cc/100?u=arena-admin" className="w-full h-full rounded-full grayscale hover:grayscale-0 transition-all cursor-pointer" />
               </div>
            </div>
         </div>

         <div className="p-12 max-w-7xl mx-auto space-y-12">
            <AnimatePresence mode="wait">
               {/* VIEW: STATS */}
               {view === 'stats' && (
                 <motion.div 
                   key="stats"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="space-y-12"
                 >
                    <div className="space-y-2">
                       <h2 className="text-6xl font-black text-white tracking-tighter">System Metrics</h2>
                       <p className="text-slate-400 font-medium text-xl">Real-time intelligence and resource allocation overhead.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                       {[
                         { label: "Total Questions", val: questionList.length, icon: Database, color: "text-primary", bg: "bg-primary/10" },
                         { label: "Neural Knowledge", val: knowledgeList.length, icon: Brain, color: "text-amber-400", bg: "bg-amber-400/10" },
                         { label: "JAMB Coverage", val: questionList.filter(q => q.examType === 'JAMB').length, icon: Bookmark, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                         { label: "Syllabus Topics", val: totalSyllabusTopics, icon: Bookmark, color: "text-rose-400", bg: "bg-rose-400/10" },
                       ].map((stat, i) => (
                         <div key={i} className="glass-card p-10 rounded-[3.5rem] border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                               <stat.icon className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                               <p className="text-5xl font-black text-white tracking-tighter tabular-nums">{stat.val}</p>
                               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                            </div>
                            <div className="absolute bottom-0 right-0 p-8 opacity-5">
                               <stat.icon className="w-24 h-24" />
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {[
                          { name: 'JAMB', count: questionList.filter(q => q.examType === 'JAMB').length, color: 'bg-primary' },
                          { name: 'WAEC', count: questionList.filter(q => q.examType === 'WAEC').length, color: 'bg-emerald-500' },
                          { name: 'NECO', count: questionList.filter(q => q.examType === 'NECO').length, color: 'bg-rose-500' },
                       ].map(board => (
                          <div key={board.name} className="glass p-8 rounded-[2.5rem] border-white/5 flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <div className={cn("w-3 h-3 rounded-full", board.color)} />
                                <span className="font-black text-slate-300">{board.name} Portal</span>
                             </div>
                             <span className="text-2xl font-black text-white tabular-nums">{board.count}</span>
                          </div>
                       ))}
                    </div>

                    <div className="glass p-1 rounded-[3rem] border-white/5">
                       <div className="glass shadow-inner rounded-[2.8rem] p-12 space-y-8">
                          <div className="flex items-center justify-between">
                             <h4 className="text-xl font-black text-white tracking-tight">Active Node Registry</h4>
                             <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:text-white transition-colors">Export Diagnostics</button>
                          </div>
                          
                          <div className="space-y-4">
                             {[
                               { task: "Neural Knowledge Synthesis", status: "Active", progress: "94%", color: "bg-emerald-500" },
                               { task: "Question Bank Indexing", status: "Idle", progress: "100%", color: "bg-primary" },
                               { task: "AI Personality Alignment", status: "Syncing", progress: "88%", color: "bg-amber-500" },
                             ].map((task, i) => (
                               <div key={i} className="flex items-center justify-between p-6 glass rounded-2xl border-white/5 group hover:border-white/10 transition-colors">
                                  <div className="flex items-center gap-6">
                                     <div className={cn("w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]", task.color === 'bg-emerald-500' ? 'text-emerald-500' : task.color === 'bg-primary' ? 'text-primary' : 'text-amber-500')} />
                                     <span className="text-sm font-black text-slate-300">{task.task}</span>
                                  </div>
                                  <div className="flex items-center gap-10">
                                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{task.status}</span>
                                     <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border-white/5">
                                        <div className={cn("h-full rounded-full", task.color)} style={{ width: task.progress }} />
                                     </div>
                                     <span className="text-[10px] font-black text-white w-8">{task.progress}</span>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </motion.div>
               )}

               {/* VIEW: QUESTIONS */}
               {view === 'questions' && (
                 <motion.div 
                   key="questions"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                 >
                    {/* Add Question Form */}
                    <div className="space-y-12">
                       <div className="space-y-2">
                          <h2 className="text-5xl font-black text-white tracking-tighter">Bank Editor</h2>
                          <p className="text-slate-400 font-medium">Inject raw questions into the Arena question banks.</p>
                       </div>

                       <form onSubmit={handleAddQuestion} className="glass p-10 rounded-[3rem] border-white/5 shadow-2xl space-y-8">
                          <div className="grid grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Exam Board</label>
                                <select 
                                  value={newQuestion.examType}
                                  onChange={(e) => setNewQuestion({...newQuestion, examType: e.target.value as 'JAMB' | 'WAEC' | 'NECO'})}
                                  className="w-full glass border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-all text-sm font-bold"
                                >
                                   <option value="JAMB" className="bg-slate-900 text-white">JAMB (UTME)</option>
                                   <option value="WAEC" className="bg-slate-900 text-white">WAEC (WASSCE)</option>
                                   <option value="NECO" className="bg-slate-900 text-white">NECO (SSCE)</option>
                                </select>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Target Year</label>
                                <input 
                                  type="text" 
                                  value={newQuestion.year}
                                  onChange={(e) => setNewQuestion({...newQuestion, year: e.target.value})}
                                  placeholder="2024"
                                  className="w-full glass border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-all text-sm font-bold"
                                />
                             </div>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Subject & Topic Tag</label>
                             <div className="grid grid-cols-2 gap-4">
                                <input 
                                  type="text" 
                                  value={newQuestion.subject}
                                  onChange={(e) => setNewQuestion({...newQuestion, subject: e.target.value})}
                                  placeholder="Subject (e.g. Biology)"
                                  className="w-full glass border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-all text-sm font-bold"
                                />
                                <input 
                                  type="text" 
                                  value={newQuestion.topic}
                                  onChange={(e) => setNewQuestion({...newQuestion, topic: e.target.value})}
                                  placeholder="Topic Tag (Syllabus Topic)"
                                  className="w-full glass border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-all text-sm font-bold"
                                />
                             </div>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Neural Question Text</label>
                             <textarea 
                               value={newQuestion.questionText}
                               onChange={(e) => setNewQuestion({...newQuestion, questionText: e.target.value})}
                               placeholder="Draft the question logic here..."
                               rows={4}
                               className="w-full glass border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-all text-sm font-bold resize-none"
                             />
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Diagram (Supabase Storage Cloud)</label>
                             <div className="relative group overflow-hidden rounded-2xl">
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={handleDiagramUpload}
                                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className={cn(
                                   "glass border-dashed border-2 border-white/10 p-6 flex flex-col items-center justify-center gap-3 transition-all",
                                   diagramPreview ? "border-emerald-500/50" : "group-hover:border-primary/50"
                                )}>
                                   {diagramPreview ? (
                                     <img src={diagramPreview} className="w-full h-32 object-contain" />
                                   ) : (
                                     <>
                                       <ImageIcon className="w-8 h-8 text-slate-700 group-hover:text-primary transition-colors" />
                                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select diagram file</span>
                                     </>
                                   )}
                                </div>
                             </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             {newQuestion.options.map((opt, i) => (
                               <div key={i} className="flex items-center gap-3">
                                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center font-black text-primary border border-white/5 shrink-0">
                                     {String.fromCharCode(65 + i)}
                                  </div>
                                  <input 
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const newOpts = [...newQuestion.options];
                                      newOpts[i] = e.target.value;
                                      setNewQuestion({...newQuestion, options: newOpts});
                                    }}
                                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                    className="w-full glass border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all text-sm font-bold"
                                  />
                               </div>
                             ))}
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Correct Path Index</label>
                             <div className="flex gap-4">
                                {[0,1,2,3].map(i => (
                                  <button 
                                    key={i}
                                    type="button"
                                    onClick={() => setNewQuestion({...newQuestion, correctAnswer: i})}
                                    className={cn(
                                      "flex-1 py-4 rounded-xl font-black transition-all border",
                                      newQuestion.correctAnswer === i 
                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                                        : "glass text-slate-500 border-white/5 hover:text-white"
                                    )}
                                  >
                                    {String.fromCharCode(65 + i)}
                                  </button>
                                ))}
                             </div>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Logic Explanation (Pedagogical)</label>
                             <textarea 
                               value={newQuestion.staticExplanation}
                               onChange={(e) => setNewQuestion({...newQuestion, staticExplanation: e.target.value})}
                               placeholder="Explain why the path is correct..."
                               rows={3}
                               className="w-full glass border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-all text-sm font-bold resize-none italic"
                             />
                          </div>
                          
                          <div className="flex gap-4">
                             <button 
                               type="button"
                               onClick={handleTestAI}
                               disabled={isValidating || !newQuestion.questionText}
                               className="flex-1 py-5 glass border-primary/20 text-primary rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-primary/5 transition-all disabled:opacity-50"
                             >
                                {isValidating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Beaker className="w-5 h-5" />}
                                AI Personality Check
                             </button>
                             <button 
                               type="submit"
                               className="flex-[2] py-5 bg-primary text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
                             >
                                <Save className="w-5 h-5" />
                                Index Question
                             </button>
                          </div>
                       </form>
                    </div>

                    {/* Registry List & AI Feedback */}
                    <div className="space-y-12">
                       <AnimatePresence>
                          {aiFeedback && (
                            <motion.div 
                               initial={{ opacity: 0, scale: 0.95 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 0.95 }}
                               className="glass p-10 rounded-[3rem] border-primary/20 bg-primary/5 shadow-[0_32px_128px_-16px_rgba(59,130,246,0.2)] space-y-6 relative overflow-hidden"
                            >
                               <div className="absolute top-0 right-0 p-8 opacity-5">
                                  <Cpu className="w-24 h-24 text-primary" />
                               </div>
                               <div className="flex items-center justify-between relative z-10">
                                  <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
                                        <Cpu className="w-6 h-6" />
                                     </div>
                                     <h4 className="text-xl font-black text-white tracking-tight">AI Diagnostic Feedback</h4>
                                  </div>
                                  <button onClick={() => setAiFeedback(null)} className="text-slate-500 hover:text-white transition-colors">
                                     <AlertCircle className="w-5 h-5 rotate-45" />
                                  </button>
                               </div>
                               <div className="bg-black/20 rounded-2xl p-6 border border-white/5 relative z-10 h-64 overflow-y-auto custom-scrollbar">
                                  <p className="text-slate-300 leading-relaxed font-medium italic whitespace-pre-wrap">{aiFeedback}</p>
                               </div>
                               <div className="flex items-center gap-2 px-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] relative z-10">
                                  <CheckCircle2 className="w-4 h-4" />
                                  Diagnostic Passed • Tone Aligned
                               </div>
                            </motion.div>
                          )}
                       </AnimatePresence>

                       <div className="space-y-6">
                           <div className="flex items-center justify-between px-4">
                              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Local Bank Registry</h3>
                              <div className="flex items-center gap-4">
                                 <Search className="w-4 h-4 text-slate-700" />
                                 <Filter className="w-4 h-4 text-slate-700" />
                              </div>
                           </div>
                           
                           <div className="grid gap-4 h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                              {questionList.length === 0 ? (
                                <div className="glass p-20 rounded-[3rem] border-white/5 text-center space-y-4">
                                   <Database className="w-12 h-12 text-slate-800 mx-auto" />
                                   <p className="text-slate-600 font-bold italic">Question bank dormant. Inject data now.</p>
                                </div>
                              ) : (
                                questionList.slice().reverse().map((q) => (
                                  <div key={q.id} className="glass px-8 py-6 rounded-[2rem] border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors shadow-xl">
                                     <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                                           <span className="font-black text-lg">{q.examType[0]}</span>
                                        </div>
                                        <div>
                                           <p className="text-white font-black tracking-tight line-clamp-1 max-w-sm">{q.questionText}</p>
                                           <div className="flex items-center gap-3 mt-1">
                                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{q.subject} • {q.year}</span>
                                              <div className="w-1 h-1 rounded-full bg-slate-800" />
                                              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Topic: {q.topic}</span>
                                           </div>
                                        </div>
                                     </div>
                                     <button 
                                       onClick={() => deleteQuestionEntry(q.id)}
                                       className="p-4 rounded-xl text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                                     >
                                       <Trash2 className="w-5 h-5" />
                                     </button>
                                  </div>
                                ))
                              )}
                           </div>
                       </div>
                    </div>
                 </motion.div>
               )}

               {/* VIEW: BRAIN/KNOWLEDGE */}
               {view === 'brain' && (
                 <motion.div 
                   key="brain"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="space-y-12"
                 >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                       <div className="space-y-2">
                          <h2 className="text-6xl font-black text-white tracking-tighter leading-none">Intelligence Feed</h2>
                          <p className="text-slate-400 font-medium text-xl">Direct memory injection for official documentation.</p>
                       </div>
                       
                       <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setShowTemplateGuide(!showTemplateGuide)}
                            className="px-8 py-7 glass border-white/10 text-slate-400 rounded-3xl font-black text-sm hover:text-white transition-all"
                          >
                             {showTemplateGuide ? 'Close Guide' : 'Format Guide'}
                          </button>
                          <div className="relative group">
                             <input 
                               type="file" 
                               accept=".json" 
                               onChange={handleJsonUpload}
                               className="absolute inset-0 opacity-0 cursor-pointer z-20"
                               disabled={isProcessing}
                             />
                             <button className="flex items-center gap-4 bg-primary text-white px-12 py-7 rounded-[2.5rem] font-black text-lg shadow-2xl shadow-primary/40 group-hover:scale-105 transition-all">
                                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <PlusCircle className="w-6 h-6" />}
                                Import JSON
                             </button>
                          </div>
                       </div>
                    </div>

                    <AnimatePresence>
                      {showTemplateGuide && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden"
                        >
                          {[
                            {
                              title: "Past Question",
                              icon: Database,
                              color: "text-primary",
                              json: {
                                category: "PAST_QUESTION",
                                subject: "Biology",
                                examType: "JAMB",
                                year: "2023",
                                questions: [
                                  { q: "Define Cell?", a: "Functional unit of life" }
                                ]
                              }
                            },
                            {
                              title: "Syllabus Node",
                              icon: Bookmark,
                              color: "text-amber-500",
                              json: {
                                category: "SYLLABUS",
                                subject: "Physics",
                                examBoard: "WAEC",
                                topics: ["Waves", "Optics", "Electricity"]
                              }
                            },
                            {
                              title: "Tutorial Node",
                              icon: GraduationCap,
                              color: "text-emerald-500",
                              json: {
                                category: "TUTORIAL",
                                subject: "Chemistry",
                                title: "Organic 101",
                                content: "Organic chemistry is..."
                              }
                            }
                          ].map((tmpl, idx) => (
                            <div key={idx} className="glass p-8 rounded-[2rem] border-white/5 space-y-4">
                              <div className="flex items-center gap-3">
                                <tmpl.icon className={cn("w-5 h-5", tmpl.color)} />
                                <h4 className="font-black text-white text-sm uppercase tracking-widest">{tmpl.title}</h4>
                              </div>
                              <pre className="bg-black/40 p-4 rounded-xl text-[10px] text-slate-400 font-mono overflow-x-auto">
                                {JSON.stringify(tmpl.json, null, 2)}
                              </pre>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                       <div className="lg:col-span-2 space-y-6">
                           <div className="grid gap-4">
                              {knowledgeList.length === 0 ? (
                                <div className="glass-card p-24 rounded-[4rem] border-white/5 text-center space-y-8">
                                   <Brain className="w-20 h-20 text-slate-800 mx-auto" />
                                   <p className="text-slate-500 font-bold max-w-xs mx-auto italic">Intelligence layer disconnected. Feed standard data to align neural pathways.</p>
                                </div>
                              ) : (
                                knowledgeList.map((k) => (
                                  <div key={k.id} className="glass px-10 py-8 rounded-[2.5rem] border-white/5 flex items-center justify-between shadow-2xl hover:border-white/10 transition-all group">
                                     <div className="flex items-center gap-8">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-primary shadow-inner">
                                           <FileText className="w-8 h-8" />
                                        </div>
                                        <div>
                                           <div className="flex items-center gap-4">
                                              <p className="text-white font-black text-xl tracking-tight leading-none">{k.fileName}</p>
                                              <span className={cn(
                                                "text-[9px] font-black px-3 py-1 rounded-full border uppercase tracking-wider",
                                                k.category === 'SYLLABUS' ? "bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]" :
                                                k.category === 'PAST_QUESTION' ? "bg-primary/10 border-primary/30 text-primary shadow-[0_0_15px_rgba(59,130,246,0.2)]" :
                                                k.category === 'TUTORIAL' ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]" :
                                                "bg-slate-500/10 border-slate-500/30 text-slate-500"
                                              )}>
                                                {k.category} Node
                                              </span>
                                           </div>
                                           <div className="flex items-center gap-4 mt-3">
                                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Indexed: {new Date(k.timestamp).toLocaleDateString()}</p>
                                              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                                              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{k.text.length.toLocaleString()} Neural Units</p>
                                           </div>
                                        </div>
                                     </div>
                                     <button 
                                       onClick={() => deleteBrainEntry(k.id)}
                                       className="p-5 rounded-2xl text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                                     >
                                       <Trash2 className="w-6 h-6" />
                                     </button>
                                  </div>
                                ))
                              )}
                           </div>
                       </div>
                       
                       <div className="space-y-8">
                          <div className="glass-card p-10 rounded-[3rem] border-white/5 shadow-2xl space-y-8">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                                   <Beaker className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-black text-white tracking-tight">Node Diagnostics</h4>
                             </div>
                             <div className="space-y-6">
                                {[
                                  { label: "Indexing Accuracy", val: "99.9%", color: "text-emerald-400" },
                                  { label: "Vector Recall", val: "12ms", color: "text-primary" },
                                  { label: "Neural Drift", val: "0.02%", color: "text-slate-500" },
                                ].map((m, i) => (
                                  <div key={i} className="flex justify-between items-center bg-white/5 border border-white/5 rounded-2xl px-6 py-4">
                                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{m.label}</span>
                                     <span className={cn("font-black tracking-tighter text-lg", m.color)}>{m.val}</span>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </main>
    </div>
  );
}
