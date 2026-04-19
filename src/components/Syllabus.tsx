import React, { useState } from "react";
import { 
  Search, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  ArrowLeft,
  GraduationCap,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Topic {
  id: string;
  title: string;
  objectives: string[];
  isCompleted: boolean;
}

interface SubjectSyllabus {
  id: string;
  name: string;
  categories: {
    name: string;
    topics: Topic[];
  }[];
}

const mockSyllabus: SubjectSyllabus[] = [
  {
    id: "biology",
    name: "Biology",
    categories: [
      {
        name: "LIVING ORGANISMS",
        topics: [
          { 
            id: "1", 
            title: "Cell Structure and Functions", 
            isCompleted: true,
            objectives: ["Identify organelles", "Differentiate plant/animal cells"]
          },
          { 
            id: "2", 
            title: "Levels of Organization", 
            isCompleted: false,
            objectives: ["Explain hierarchy: Cell -> Tissue -> Organ"]
          }
        ]
      },
      {
        name: "FORM AND FUNCTIONS",
        topics: [
          { 
            id: "3", 
            title: "Nutrition", 
            isCompleted: false,
            objectives: ["Autotrophic/Heterotrophic", "Human digestive system"]
          },
          { 
            id: "4", 
            title: "Respiration", 
            isCompleted: false,
            objectives: ["Aerobic vs Anaerobic", "Respiratory organs in insects/fish"]
          }
        ]
      }
    ]
  },
  {
    id: "mathematics",
    name: "Mathematics",
    categories: [
      {
        name: "NUMBERS AND NUMERATION",
        topics: [
          { 
            id: "m1", 
            title: "Number Bases", 
            isCompleted: true,
            objectives: ["Operations in different bases", "Base conversion"]
          }
        ]
      }
    ]
  }
];

interface SyllabusProps {
  onBack: () => void;
}

export default function Syllabus({ onBack }: SyllabusProps) {
  const [selectedSubject, setSelectedSubject] = useState<SubjectSyllabus | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = mockSyllabus.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 min-h-[60vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <button 
            onClick={selectedSubject ? () => setSelectedSubject(null) : onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-sm transition-colors mb-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {selectedSubject ? "Back to Subjects" : "Back to Home"}
          </button>
          <h2 className="text-4xl font-black text-white tracking-tight">
            {selectedSubject ? `${selectedSubject.name} Syllabus` : "Official Syllabus"}
          </h2>
          <p className="text-slate-400 font-medium">Master every topic systematically according to board requirements.</p>
        </div>

        {!selectedSubject && (
           <div className="relative group max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search subject syllabus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 glass text-white rounded-2xl focus:outline-none focus:border-primary/50 transition-all font-medium text-sm shadow-2xl"
            />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!selectedSubject ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSubjects.map((sub, i) => (
              <motion.button 
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedSubject(sub)}
                className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-primary/40 hover:scale-[1.02] transition-all text-left flex items-start gap-6 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0 shadow-inner">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white tracking-tight">{sub.name}</h3>
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    <span>{sub.categories.reduce((acc, cat) => acc + cat.topics.length, 0)} Topics</span>
                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-primary italic">2024 Exam</span>
                  </div>
                </div>
              </motion.button>
            ))}
            {filteredSubjects.length === 0 && (
              <div className="col-span-full py-24 glass rounded-[3rem] border-white/5 text-center flex flex-col items-center justify-center space-y-6">
                 <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-slate-600">
                    <ShieldAlert className="w-10 h-10" />
                 </div>
                 <p className="text-slate-400 font-bold tracking-tight max-w-xs">We couldn't find that syllabus yet. Try searching for "Biology".</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            {selectedSubject.categories.map((cat, ci) => (
              <div key={ci} className="space-y-6">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-6">
                  {cat.name}
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid gap-4">
                  {cat.topics.map((topic, ti) => (
                    <motion.div 
                      key={topic.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: ti * 0.05 }}
                      className="glass-card p-8 rounded-[2.5rem] border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-8 group hover:border-primary/20 transition-all shadow-2xl"
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${topic.isCompleted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-600'}`}>
                           {topic.isCompleted ? <CheckCircle2 className="w-7 h-7" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-700" />}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-black text-white text-lg tracking-tight">{topic.title}</h4>
                          <p className="text-xs text-slate-500 font-medium line-clamp-1">{topic.objectives.join(", ")}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-3 glass text-white px-8 py-4 rounded-2xl text-xs font-black hover:bg-primary transition-all group-hover:scale-105">
                        Study Topic
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
