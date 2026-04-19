import React, { useState, useMemo } from "react";
import { 
  BookOpen, 
  ChevronLeft, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Info,
  Clock,
  ArrowRight,
  GraduationCap,
  MessageSquare,
  Trophy,
  FileText,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { mockQuestions, Question } from "./data/mockQuestions";

// New Components
import LandingPage from "./components/LandingPage";
import ChatTutor from "./components/ChatTutor";
import Syllabus from "./components/Syllabus";
import Challenges from "./components/Challenges";

import Registration from "./components/Registration";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type View = 'landing' | 'exam-select' | 'subjects' | 'years' | 'quiz' | 'syllabus' | 'challenges' | 'registration';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [showChat, setShowChat] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Filtered lists
  const availableSubjects = useMemo(() => {
    if (!selectedExam) return [];
    const subjects = mockQuestions
      .filter(q => q.examType === selectedExam)
      .map(q => q.subject);
    return Array.from(new Set(subjects)).sort();
  }, [selectedExam]);

  const availableYears = useMemo(() => {
    if (!selectedExam || !selectedSubject) return [];
    const years = mockQuestions
      .filter(q => q.examType === selectedExam && q.subject === selectedSubject)
      .map(q => q.year);
    return Array.from(new Set(years)).sort((a, b) => b.localeCompare(a));
  }, [selectedExam, selectedSubject]);

  const quizQuestions = useMemo(() => {
    if (!selectedExam || !selectedSubject || !selectedYear) return [];
    return mockQuestions.filter(
      q => q.examType === selectedExam && 
      q.subject === selectedSubject && 
      q.year === selectedYear
    );
  }, [selectedExam, selectedSubject, selectedYear]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Logic
  const handleExamSelect = (exam: string) => {
    setSelectedExam(exam);
    setView('subjects');
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setView('years');
  };

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setView('quiz');
  };

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      alert("You have completed the questions for this category!");
      setView('landing');
    }
  };

  const goBack = () => {
    if (view === 'quiz') setView('years');
    else if (view === 'years') setView('subjects');
    else if (view === 'subjects') setView('exam-select');
    else if (view === 'exam-select') setView('landing');
    else setView('landing');
  };

  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-primary/20">
      {/* Navbar */}
      <nav className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('landing')}>
            <div className="bg-primary p-2.5 rounded-[1rem] shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-black text-2xl tracking-tight text-white group-hover:text-primary transition-colors">Edu Arena</h1>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Platform Online</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-white">
            <button onClick={() => setView('landing')} className={cn("text-sm font-bold transition-colors", view === 'landing' ? "text-primary border-b-2 border-primary pb-1" : "text-slate-400 hover:text-white")}>Home</button>
            <button onClick={() => setView('exam-select')} className={cn("text-sm font-bold transition-colors", view === 'exam-select' ? "text-primary border-b-2 border-primary pb-1" : "text-slate-400 hover:text-white")}>Practice</button>
            <button onClick={() => setView('syllabus')} className={cn("text-sm font-bold transition-colors", view === 'syllabus' ? "text-primary border-b-2 border-primary pb-1" : "text-slate-400 hover:text-white")}>Syllabus</button>
            <button onClick={() => setView('challenges')} className={cn("text-sm font-bold transition-colors", view === 'challenges' ? "text-primary border-b-2 border-primary pb-1" : "text-slate-400 hover:text-white")}>Challenges</button>
            <button onClick={() => setView('registration')} className={cn("text-sm font-bold transition-colors", view === 'registration' ? "text-primary border-b-2 border-primary pb-1" : "text-slate-400 hover:text-white")}>Register</button>
            <button onClick={() => setShowChat(true)} className="flex items-center gap-2 glass px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/10 transition-all border-white/10">
               <MessageSquare className="w-4 h-4 text-primary" />
               AI Tutor
            </button>
          </div>

          <div className="flex md:hidden items-center gap-4">
             <button onClick={() => setShowChat(true)} className="p-3 bg-primary/10 text-primary rounded-xl">
               <MessageSquare className="w-5 h-5" />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <LandingPage 
              key="landing"
              onStartQuiz={() => setView('exam-select')}
              onOpenChat={() => setShowChat(true)}
              onOpenSyllabus={() => setView('syllabus')}
              onOpenChallenges={() => setView('challenges')}
              onOpenRegistration={() => setView('registration')}
            />
          )}

          {view === 'exam-select' && (
            <motion.div 
              key="exam-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="flex items-center gap-6">
                 <button onClick={goBack} className="p-4 glass rounded-2xl hover:bg-white/10 transition-all text-slate-300 shadow-2xl">
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <div className="space-y-1">
                   <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">Select Exam Board</h2>
                   <p className="text-slate-400 font-medium">Choose your target examination board to start practicing.</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['JAMB', 'WAEC', 'NECO'].map((exam) => (
                  <button 
                    key={exam}
                    onClick={() => handleExamSelect(exam)}
                    className="group glass-card p-12 rounded-[3.5rem] border-white/5 shadow-2xl hover:scale-105 hover:border-primary/20 transition-all text-left space-y-8 flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 scale-150 opacity-5 group-hover:opacity-10 transition-opacity">
                       <BookOpen className="w-32 h-32 rotate-12 text-primary" />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black text-white tracking-tight">{exam}</h3>
                      <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] mt-3 group-hover:text-primary transition-colors italic">Official practice archives</p>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                       <span className="text-xs font-black text-slate-400 group-hover:text-primary transition-colors uppercase tracking-widest">Start Session</span>
                       <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight className="w-6 h-6" />
                       </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'subjects' && (
            <motion.div 
              key="subjects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
               <div className="flex items-center gap-6">
                 <button onClick={goBack} className="p-4 glass rounded-2xl hover:bg-white/10 transition-all text-slate-300">
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <div className="space-y-1">
                    <h2 className="text-4xl font-black text-white tracking-tight">{selectedExam} Subjects</h2>
                    <p className="text-slate-400 font-medium">Select a subject to dive into specific years.</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableSubjects.map((sub, i) => (
                  <motion.button 
                    key={sub}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSubjectSelect(sub)}
                    className="glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-primary/40 hover:scale-[1.02] transition-all text-left flex items-center justify-between group shadow-2xl"
                  >
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary/20 group-hover:text-primary transition-all shadow-inner">
                          <FileText className="w-7 h-7" />
                       </div>
                       <span className="font-black text-white text-xl tracking-tight group-hover:text-primary transition-colors">{sub}</span>
                    </div>
                    <div className="text-slate-600 group-hover:text-primary transform -translate-x-2 group-hover:translate-x-0 transition-all">
                      <ChevronLeft className="w-6 h-6 rotate-180" />
                    </div>
                  </motion.button>
                ))}
                {availableSubjects.length === 0 && (
                  <div className="col-span-full py-24 glass rounded-[3rem] border-white/5 text-center flex flex-col items-center justify-center space-y-6">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-slate-600">
                       <HelpCircle className="w-10 h-10" />
                    </div>
                    <p className="text-slate-400 font-bold max-w-xs">No questions available for this category yet. Our team is working on it!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'years' && (
            <motion.div 
              key="years"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="flex items-center gap-6">
                 <button onClick={goBack} className="p-4 glass rounded-2xl hover:bg-white/10 transition-all text-slate-300">
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <div className="space-y-1">
                    <h2 className="text-4xl font-black text-white tracking-tight uppercase tracking-widest leading-none">{selectedSubject} Years</h2>
                    <p className="text-slate-400 font-medium">Access historical past questions for {selectedSubject}.</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
                {availableYears.map((year, i) => (
                  <motion.button 
                    key={year}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleYearSelect(year)}
                    className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-primary/40 hover:bg-primary hover:text-white transition-all text-center flex flex-col items-center justify-center group shadow-2xl hover:-translate-y-3"
                  >
                    <span className="font-black text-4xl tracking-tighter group-hover:scale-110 transition-transform">{year}</span>
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-3 group-hover:text-white/70 transition-colors">Questions</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'quiz' && currentQuestion && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={goBack}
                  className="flex items-center gap-3 text-slate-400 hover:text-primary font-black uppercase tracking-widest text-xs transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Exit Quiz
                </button>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Mastery Progress</span>
                  <div className="flex gap-1.5 h-2 w-56 glass rounded-full overflow-hidden p-0.5 border-white/5">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                      style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[4rem] border-white/5 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] p-10 md:p-20 space-y-16 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 scale-[2] opacity-5 pointer-events-none">
                   <Zap className="w-64 h-64 text-primary fill-current rotate-12" />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start gap-8 relative z-10">
                   <div className="flex flex-wrap items-center gap-4">
                      <span className="bg-white/10 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/5">{currentQuestion.examType}</span>
                      <span className="bg-primary/20 text-primary px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">{currentQuestion.subject}</span>
                      <span className="glass text-slate-500 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border-white/5">YEAR {currentQuestion.year}</span>
                   </div>
                   <div className="glass px-8 py-3.5 rounded-[1.5rem] flex items-center gap-4 border-white/5 shadow-2xl">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-white font-black text-lg tabular-nums tracking-tighter">00:00:00</span>
                      <div className="w-px h-5 bg-white/10" />
                      <span className="text-slate-500 text-sm font-black uppercase tracking-widest">Q{currentQuestionIndex + 1} / {quizQuestions.length}</span>
                   </div>
                </div>

                <div className="space-y-12 relative z-10">
                  {currentQuestion.image && (
                    <div className="glass p-6 rounded-[3rem] border-white/5 overflow-hidden max-h-96 flex justify-center shadow-2xl">
                      <img 
                        src={currentQuestion.image} 
                        alt="Question Material" 
                        className="object-contain h-full shadow-2xl rounded-2xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <h3 className="text-3xl md:text-5xl font-black text-white leading-[1.2] text-center max-w-5xl mx-auto tracking-tighter">
                    {currentQuestion.questionText}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQuestion.correctAnswer;
                    const showSuccess = selectedOption !== null && isCorrect;
                    const showFailure = isSelected && !isCorrect;

                    return (
                      <button 
                        key={idx}
                        onClick={() => handleOptionClick(idx)}
                        disabled={selectedOption !== null}
                        className={cn(
                          "relative w-full p-8 rounded-[2.5rem] border-2 text-left font-black transition-all flex items-center gap-8 group py-10",
                          selectedOption === null 
                            ? "glass border-white/5 hover:border-primary/50 hover:scale-[1.02] hover:bg-white/10 shadow-2xl"
                            : showSuccess 
                              ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.2)] ring-4 ring-emerald-500/10" 
                              : showFailure 
                                ? "bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_50px_rgba(244,63,94,0.2)]"
                                : isCorrect && selectedOption !== null
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-inner"
                                  : "glass border-white/5 text-slate-600 opacity-40 scale-[0.98]"
                        )}
                      >
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 font-black text-2xl transition-all shadow-inner",
                          selectedOption === null 
                            ? "glass text-slate-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 group-hover:scale-110"
                            : showSuccess 
                              ? "bg-emerald-500 text-white rotate-12 scale-125 shadow-[0_0_20px_rgba(16,185,129,0.5)]" 
                              : showFailure 
                                ? "bg-rose-500 text-white -rotate-12 scale-110 shadow-[0_0_20px_rgba(244,63,94,0.5)]"
                                : isCorrect && selectedOption !== null
                                  ? "bg-emerald-500/40 text-emerald-100"
                                  : "glass text-slate-600"
                        )}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="flex-1 text-xl leading-tight tracking-tight">{option}</span>
                        {selectedOption !== null && isCorrect && <CheckCircle2 className="w-8 h-8 text-emerald-400" />}
                        {showFailure && <XCircle className="w-8 h-8 text-rose-400" />}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-20 border-t border-white/5 space-y-12 relative z-10"
                  >
                    <div className="glass p-10 md:p-16 rounded-[4rem] border border-white/5 space-y-8 shadow-inner overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-32 -mt-32" />
                        <div className="flex items-center justify-between relative z-10">
                           <div className="flex items-center gap-4">
                              <div className="bg-primary/20 p-3 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/40">
                                 <HelpCircle className="w-6 h-6 text-primary" />
                              </div>
                              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-primary">Expert AI Insights</h4>
                           </div>
                           <div className="flex -space-x-3">
                              {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-900 overflow-hidden ring-2 ring-white/5 shadow-2xl"><img src={`https://i.pravatar.cc/100?u=expert-${i}`} alt="expert" /></div>)}
                           </div>
                        </div>
                        <p className="text-slate-300 text-2xl leading-relaxed italic font-medium tracking-tight relative z-10">
                          {currentQuestion.staticExplanation}
                        </p>
                    </div>
                    
                    <button 
                      onClick={nextQuestion}
                      className="w-full bg-primary text-white py-8 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-6 hover:scale-[1.02] transition-all shadow-2xl shadow-primary/30 group"
                    >
                      {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Challenge Session' : 'Next Question Arena'}
                      <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'syllabus' && (
            <Syllabus 
              key="syllabus"
              onBack={() => setView('landing')} 
            />
          )}

          {view === 'challenges' && (
            <Challenges 
              key="challenges"
              onBack={() => setView('landing')} 
            />
          )}

          {view === 'registration' && (
            <Registration 
              key="registration"
              onBack={() => setView('landing')}
              onSuccess={() => setView('landing')}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Global Ad Banner */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="glass h-32 rounded-[2.5rem] border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2 relative z-10">Google AdSense</span>
           <div className="text-2xl md:text-3xl font-black text-white/20 tracking-tighter relative z-10 group-hover:text-white/40 transition-colors">
             Google Ad come Here
           </div>
           <div className="absolute top-2 right-4 p-1.5 glass rounded-lg border-white/5 opacity-50">
              <Info className="w-3 h-3 text-slate-600" />
           </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="glass border-t border-white/5 py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setView('landing')}>
              <div className="glass p-3 rounded-2xl group-hover:rotate-12 transition-transform shadow-2xl">
                <GraduationCap className="text-primary w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-white tracking-tight text-xl">Edu Arena</span>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Arena v2.0</p>
              </div>
           </div>
           <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] text-center">
             © 2026 Edu Arena • <span className="text-primary">Empowering the Next Generation</span>
           </p>
           <div className="flex items-center gap-8">
              {['Terms', 'Privacy', 'Support'].map(f => (
                <button key={f} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                  {f}
                </button>
              ))}
           </div>
        </div>
      </footer>

      {/* Global AI Tutor Shell */}
      <AnimatePresence>
        {showChat && (
          <ChatTutor 
            onClose={() => setShowChat(false)} 
            onNavigateToQuiz={(exam) => {
              if (exam) setSelectedExam(exam);
              setView(exam ? 'subjects' : 'exam-select');
              setShowChat(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
