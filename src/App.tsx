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
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { mockQuestions, Question } from "./data/mockQuestions";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type View = 'home' | 'subjects' | 'quiz';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Filtered lists
  const availableSubjects = useMemo(() => {
    if (!selectedExam) return [];
    const subjects = mockQuestions
      .filter(q => q.examType === selectedExam)
      .map(q => q.subject);
    return Array.from(new Set(subjects));
  }, [selectedExam]);

  const quizQuestions = useMemo(() => {
    if (!selectedExam || !selectedSubject) return [];
    return mockQuestions.filter(q => q.examType === selectedExam && q.subject === selectedSubject);
  }, [selectedExam, selectedSubject]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Logic
  const handleExamSelect = (exam: string) => {
    setSelectedExam(exam);
    setView('subjects');
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setView('quiz');
  };

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // Prevent double clicking
    setSelectedOption(index);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // Completed, go home
      alert("You have completed the questions for this category!");
      setView('home');
    }
  };

  const goBack = () => {
    if (view === 'quiz') setView('subjects');
    else if (view === 'subjects') setView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-slate-800">CBT Hub</h1>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4" />
            <span>Time: 00:00:00</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Select Examination Type</h2>
                <p className="text-slate-500 max-w-lg mx-auto">Choose your target board to access thousands of past questions and detailed explanations.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['JAMB', 'WAEC', 'NECO'].map((exam) => (
                  <button 
                    key={exam}
                    onClick={() => handleExamSelect(exam)}
                    className="group bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all text-center space-y-6 flex flex-col items-center"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <BookOpen className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">{exam}</h3>
                      <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest font-bold">Past Questions</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                      <ArrowRight className="w-5 h-5" />
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
              className="space-y-8"
            >
              <button 
                onClick={goBack}
                className="flex items-center gap-2 text-slate-500 hover:text-primary font-medium transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Exam Types
              </button>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">{selectedExam} Subjects</h2>
                <p className="text-slate-500">Select a subject to begin your practice session.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {availableSubjects.map((sub) => (
                  <button 
                    key={sub}
                    onClick={() => handleSubjectSelect(sub)}
                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/40 hover:bg-primary/5 transition-all text-left flex items-center justify-between group shadow-sm"
                  >
                    <span className="font-bold text-slate-700">{sub}</span>
                    <div className="text-slate-300 group-hover:text-primary transform translate-x-0 group-hover:translate-x-1 transition-all">
                      <ChevronLeft className="w-5 h-5 rotate-180" />
                    </div>
                  </button>
                ))}
                {availableSubjects.length === 0 && (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                    <p className="text-slate-400">No questions available for this category yet.</p>
                  </div>
                )}
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
                  className="flex items-center gap-2 text-slate-500 hover:text-primary font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Exit Quiz
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Progress</span>
                  <div className="flex gap-1">
                    {quizQuestions.map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "w-2 h-2 rounded-full",
                          i === currentQuestionIndex ? "bg-primary" : i < currentQuestionIndex ? "bg-slate-300" : "bg-slate-200"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-12 space-y-8">
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-2">
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{currentQuestion.examType}</span>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{currentQuestion.subject}</span>
                      <span className="text-slate-400 text-[10px] font-bold">YEAR {currentQuestion.year}</span>
                   </div>
                   <span className="text-slate-300 text-sm font-bold">Q{currentQuestionIndex + 1} / {quizQuestions.length}</span>
                </div>

                <div className="space-y-6">
                  {currentQuestion.image && (
                    <div className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50 max-h-72 flex justify-center">
                      <img 
                        src={currentQuestion.image} 
                        alt="Question Material" 
                        className="object-contain h-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
                    {currentQuestion.questionText}
                  </p>
                </div>

                <div className="grid gap-4">
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
                          "relative w-full p-5 rounded-2xl border text-left font-medium transition-all flex items-center gap-4 group",
                          selectedOption === null 
                            ? "bg-white border-slate-200 hover:border-primary/30 hover:bg-slate-50"
                            : showSuccess 
                              ? "bg-emerald-50 border-emerald-500 text-emerald-900" 
                              : showFailure 
                                ? "bg-rose-50 border-rose-500 text-rose-900"
                                : isCorrect && selectedOption !== null
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                                  : "bg-slate-50 border-slate-200 text-slate-400"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold",
                          selectedOption === null 
                            ? "bg-slate-100 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary"
                            : showSuccess 
                              ? "bg-emerald-500 text-white" 
                              : showFailure 
                                ? "bg-rose-500 text-white"
                                : isCorrect && selectedOption !== null
                                  ? "bg-emerald-200 text-emerald-700"
                                  : "bg-slate-200 text-slate-400"
                        )}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {selectedOption !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        {showFailure && <XCircle className="w-5 h-5 text-rose-600" />}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-8 border-t border-slate-100 space-y-4"
                  >
                    {!showExplanation ? (
                      <button 
                        onClick={() => setShowExplanation(true)}
                        className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                      >
                        <Info className="w-4 h-4" />
                        Show Detailed Explanation
                      </button>
                    ) : (
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <HelpCircle className="w-4 h-4 text-primary" />
                          <h4 className="font-bold text-sm uppercase tracking-wider text-slate-600">Solution Guide</h4>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                          {currentQuestion.staticExplanation}
                        </p>
                      </div>
                    )}
                    
                    <button 
                      onClick={nextQuestion}
                      className="w-full btn-primary bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                      {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Session' : 'Proceed to Next Question'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
