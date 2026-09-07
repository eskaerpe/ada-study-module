import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { BookOpen, HelpCircle, Layers, Menu, X, RefreshCw, Award } from 'lucide-react';

interface QuizItem {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface FlashcardItem {
  id: number;
  front: string;
  back: string;
  category: string;
}

const quizData: Record<string, QuizItem[]> = {
  sesi1: [
    {
      id: 1,
      question: "Apa syarat utama suatu prosedur dapat dikategorikan sebagai algoritma yang valid?",
      options: [
        "Harus ditulis menggunakan bahasa pemrograman Java/C++",
        "Harus terdefinisi secara presisi, tidak ambigu, dan berhenti setelah langkah terhingga",
        "Harus memiliki kompleksitas waktu O(1)",
        "Harus berjalan di atas arsitektur GPU"
      ],
      answer: 1,
      explanation: "Algoritma wajib welldefined (langkah jelas/tidak ambigu) dan memiliki sifat finiteness (pasti berhenti dalam waktu/langkah terhingga)."
    },
    {
      id: 2,
      question: "Manakah kriteria pengurutan (Sorting Criteria) yang memastikan urutan elemen dengan kunci sama tidak berubah?",
      options: ["Correctness", "Stability", "Efficiency", "In-Place"],
      answer: 1,
      explanation: "Stability (Pengurutan Stabil) menjaga urutan relatif awal dari dua elemen yang memiliki kunci (key) bernilai sama."
    },
    {
      id: 3,
      question: "Persyaratan wajib mata kuliah ADA terkait kompetisi di BINUS University adalah minimal berpartisipasi dalam...",
      options: ["ICPC World Finals", "INC (Indonesia National Contest)", "Gemastik Final", "Codeforces Grand Prix"],
      answer: 1,
      explanation: "Berdasarkan slide Sesi 1, partisipasi minimal INC (Indonesia National Contest) atau kompetisi sejenis adalah syarat AoL/kelulusan ADA."
    }
  ],
  sesi2: [
    {
      id: 1,
      question: "Langkah awal dalam Induksi Matematika untuk membuktikan P(n) benar adalah...",
      options: ["Inductive Step P(k) -> P(k+1)", "Base Case (membuktikan P(1) atau P(initial) benar)", "Recursion Tree", "Master Theorem"],
      answer: 1,
      explanation: "Base Case adalah langkah pertama wajib di mana kita membuktikan pernyataan dasar P(initial) bernilai benar."
    },
    {
      id: 2,
      question: "Apa bahaya utama dari fungsi rekursif tanpa kondisi berhenti (base case) yang valid?",
      options: ["Compiler Error", "Stack Overflow Error", "Memory Leak pada Disk", "Syntax Error"],
      answer: 1,
      explanation: "Tanpa base case, fungsi akan memanggil dirinya sendiri tanpa akhir hingga memori Call Stack penuh dan menyebabkan Stack Overflow."
    },
    {
      id: 3,
      question: "Berapakah hasil dari rumus sumasi kuadrat ∑_{i=1}^n i^2?",
      options: ["n(n+1)/2", "n(n+1)(2n+1)/6", "[n(n+1)/2]^2", "2^n - 1"],
      answer: 1,
      explanation: "Rumus umum jumlah kuadrat n bilangan bulat positif pertama adalah n(n+1)(2n+1)/6."
    }
  ]
};

const flashcardsData: Record<string, FlashcardItem[]> = {
  sesi1: [
    { id: 1, front: "Definisi Algoritma", back: "Urutan langkah komputasi terdefinisi secara presisi yang mengambil input dan menghasilkan output terhingga.", category: "Teori Dasar" },
    { id: 2, front: "Correctness (Kebenaran Algoritma)", back: "Algoritma dikatakan correct jika untuk setiap instance input valid, algoritma berhenti dan memberikan output yang tepat.", category: "Properti" },
    { id: 3, front: "Stability pada Sorting", back: "Sifat sorting di mana elemen dengan nilai kunci sama mempertahankan urutan relatifnya seperti pada input asal.", category: "Sorting" },
    { id: 4, front: "Algorithms as Technology", back: "Pemahaman bahwa efisiensi algoritma sama pentingnya dengan kecepatan hardware/sistem operasi.", category: "Konsep" }
  ],
  sesi2: [
    { id: 1, front: "Base Case (Induksi/Rekursi)", back: "Kondisi awal/terdasar yang membuktikan nilai dasar dan menghentikan pemanggilan rekursif berulang.", category: "Induksi & Rekursi" },
    { id: 2, front: "Inductive Hypothesis", back: "Asumsi bahwa pernyataan P(k) bernilai benar untuk suatu k ≥ base case.", category: "Induksi Matematika" },
    { id: 3, front: "Call Stack Memory", back: "Struktur data LIFO pada RAM tempat menyimpan stack frame (parameter, variabel lokal, return address) dari setiap pemanggilan fungsi.", category: "Arsitektur Execution" },
    { id: 4, front: "Pass by Value vs Pass by Reference", back: "Pass by Value mengirim salinan nilai (asal tidak berubah), Pass by Reference mengirim alamat memori (asal ikut berubah).", category: "Pemrograman" }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'sesi1' | 'sesi2'>('sesi1');
  const [activeView, setActiveView] = useState<'materi' | 'quiz' | 'flashcards'>('materi');
  const [content, setContent] = useState<Record<string, string>>({ sesi1: '', sesi2: '' });
  const [loading, setLoading] = useState<boolean>(true);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  // Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Sidebar mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const basePath = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
        const res1 = await fetch(`${basePath}content/sesi1.md`);
        const text1 = await res1.text();
        const res2 = await fetch(`${basePath}content/sesi2.md`);
        const text2 = await res2.text();
        setContent({ sesi1: text1, sesi2: text2 });
      } catch (err) {
        console.error("Error loading markdown:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const currentQuiz = quizData[activeTab] || [];
  const currentFlashcards = flashcardsData[activeTab] || [];

  const handleQuizSelect = (qId: number, optionIdx: number) => {
    if (showQuizResults) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    currentQuiz.forEach(q => {
      if (quizAnswers[q.id] === q.answer) score += 1;
    });
    return Math.round((score / currentQuiz.length) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header Bar */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold">ADA</div>
              <div>
                <h1 className="font-bold text-lg leading-tight">COMP6049 - Algorithm Design and Analysis</h1>
                <p className="text-xs text-slate-400">BINUS University • Modul Interaktif Sesi 01 & 02</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 bg-slate-900/60 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => { setActiveTab('sesi1'); setQuizAnswers({}); setShowQuizResults(false); setCurrentCardIndex(0); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'sesi1' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Sesi 01: Role of Algorithms
            </button>
            <button
              onClick={() => { setActiveTab('sesi2'); setQuizAnswers({}); setShowQuizResults(false); setCurrentCardIndex(0); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'sesi2' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Sesi 02: Math Induction & Recursion
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-b border-slate-700 p-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pilih Sesi Materi</div>
          <button
            onClick={() => { setActiveTab('sesi1'); setMobileMenuOpen(false); setQuizAnswers({}); setShowQuizResults(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm ${activeTab === 'sesi1' ? 'bg-indigo-600 text-white' : 'bg-slate-700/50 text-slate-300'}`}
          >
            Sesi 01: Peran Algoritma dalam Pemrograman
          </button>
          <button
            onClick={() => { setActiveTab('sesi2'); setMobileMenuOpen(false); setQuizAnswers({}); setShowQuizResults(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm ${activeTab === 'sesi2' ? 'bg-indigo-600 text-white' : 'bg-slate-700/50 text-slate-300'}`}
          >
            Sesi 02: Induksi Matematika & Fungsi Rekursif
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Nav View */}
        <aside className="md:col-span-1 space-y-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Mode Pembelajaran</h2>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveView('materi')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeView === 'materi' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-700/50'}`}
              >
                <BookOpen size={18} />
                <span>Modul Bacaan Utuh</span>
              </button>
              <button
                onClick={() => setActiveView('flashcards')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeView === 'flashcards' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-700/50'}`}
              >
                <Layers size={18} />
                <span>Kartu Kilat (Flashcards)</span>
              </button>
              <button
                onClick={() => setActiveView('quiz')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeView === 'quiz' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-700/50'}`}
              >
                <HelpCircle size={18} />
                <span>Uji Kuis Interaktif</span>
              </button>
            </nav>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 text-xs space-y-2">
            <div className="font-semibold text-slate-300">Standar Pedagogi:</div>
            <ul className="list-disc list-inside text-slate-400 space-y-1">
              <li>100% Zero-Loss Slide Content</li>
              <li>Explanatory Deep Expansion</li>
              <li>LaTeX Mathematical Proofs</li>
              <li>Call Stack Step Execution</li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="md:col-span-3">
          {loading ? (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center text-slate-400">
              <RefreshCw className="animate-spin mx-auto mb-3" size={28} />
              Memuat modul materi akademik...
            </div>
          ) : (
            <>
              {/* VIEW 1: MATERI UTUH MARKDOWN */}
              {activeView === 'materi' && (
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 md:p-8 shadow-sm space-y-6">
                  <article className="prose prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-headings:text-indigo-300 prose-a:text-indigo-400">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {content[activeTab]}
                    </ReactMarkdown>
                  </article>
                </div>
              )}

              {/* VIEW 2: FLASHCARDS */}
              {activeView === 'flashcards' && (
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 md:p-8 shadow-sm space-y-6 text-center">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Flashcard {currentCardIndex + 1} dari {currentFlashcards.length}</span>
                    <span className="bg-indigo-900/60 text-indigo-300 border border-indigo-700 px-2.5 py-0.5 rounded-full font-medium">
                      {currentFlashcards[currentCardIndex]?.category}
                    </span>
                  </div>

                  <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="min-h-[240px] bg-slate-900 border border-slate-700 hover:border-indigo-500/50 cursor-pointer rounded-2xl p-8 flex flex-col justify-center items-center transition-all duration-300 shadow-inner group"
                  >
                    <span className="text-xs text-slate-500 uppercase tracking-widest mb-3">
                      {isFlipped ? "JAWABAN / PENJELASAN" : "PERTANYAAN / KONSEP"}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {isFlipped ? currentFlashcards[currentCardIndex]?.back : currentFlashcards[currentCardIndex]?.front}
                    </h3>
                    <span className="text-xs text-indigo-400/80 mt-6 flex items-center gap-1">
                      Klik untuk me-balik kartu
                    </span>
                  </div>

                  <div className="flex items-center justify-center space-x-4 pt-2">
                    <button
                      disabled={currentCardIndex === 0}
                      onClick={() => { setCurrentCardIndex(prev => prev - 1); setIsFlipped(false); }}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 rounded-lg text-sm font-medium"
                    >
                      Sebelumnya
                    </button>
                    <button
                      disabled={currentCardIndex === currentFlashcards.length - 1}
                      onClick={() => { setCurrentCardIndex(prev => prev + 1); setIsFlipped(false); }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-lg text-sm font-medium"
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW 3: QUIZ */}
              {activeView === 'quiz' && (
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 md:p-8 shadow-sm space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-slate-100">Evaluasi Pemahaman Interaktif</h2>
                    <p className="text-sm text-slate-400">Uji daya ingat dan pemahaman logis materi {activeTab === 'sesi1' ? 'Sesi 01' : 'Sesi 02'}.</p>
                  </div>

                  {showQuizResults && (
                    <div className="bg-indigo-950/60 border border-indigo-700/60 rounded-xl p-6 text-center space-y-2">
                      <Award className="mx-auto text-indigo-400" size={40} />
                      <h3 className="text-2xl font-extrabold text-indigo-200">Skor Akhir: {calculateScore()}%</h3>
                      <p className="text-xs text-indigo-300">
                        {calculateScore() >= 80 ? 'Sangat Bagus! Anda memahami materi sesi ini secara mendalam.' : 'Tetap Semangat! Pelajari kembali materi pada tab Modul Bacaan Utuh.'}
                      </p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {currentQuiz.map((q, qIdx) => (
                      <div key={q.id} className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5 space-y-4">
                        <div className="font-semibold text-slate-200 text-base">
                          {qIdx + 1}. {q.question}
                        </div>
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = quizAnswers[q.id] === optIdx;
                            const isCorrect = q.answer === optIdx;
                            let btnStyle = "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700/80";
                            
                            if (showQuizResults) {
                              if (isCorrect) btnStyle = "bg-emerald-950/80 border-emerald-600 text-emerald-200";
                              else if (isSelected && !isCorrect) btnStyle = "bg-rose-950/80 border-rose-600 text-rose-200";
                            } else if (isSelected) {
                              btnStyle = "bg-indigo-600/30 border-indigo-500 text-indigo-200 font-medium";
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleQuizSelect(q.id, optIdx)}
                                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-start space-x-3 ${btnStyle}`}
                              >
                                <span className="font-mono text-xs opacity-60 mt-0.5">{String.fromCharCode(65 + optIdx)}.</span>
                                <span className="flex-1">{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                        {showQuizResults && (
                          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs text-slate-300 space-y-1">
                            <span className="font-bold text-indigo-400">Pembahasan: </span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-4">
                    {showQuizResults ? (
                      <button
                        onClick={() => { setQuizAnswers({}); setShowQuizResults(false); }}
                        className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium"
                      >
                        Ulangi Kuis
                      </button>
                    ) : (
                      <button
                        disabled={Object.keys(quizAnswers).length < currentQuiz.length}
                        onClick={() => setShowQuizResults(true)}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-lg text-sm font-medium shadow-md"
                      >
                        Submit & Lihat Hasil
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
