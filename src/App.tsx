import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface ModuleSesi {
  id: string;
  title: string;
  subtitle: string;
  file: string;
  duration: string;
  tag: string;
}

const SESI_LIST: ModuleSesi[] = [
  {
    id: 'sesi1',
    title: 'Sesi 01: Algoritma & Kompleksitas',
    subtitle: 'Role of Algorithms, Correctness, Pseudocode & Complexity',
    file: '/ada-study-module/content/sesi1.md',
    duration: '2 Jam Belajar',
    tag: 'Dasar Algoritma'
  },
  {
    id: 'sesi2',
    title: 'Sesi 02: Analisis Matematis & Rekursi',
    subtitle: 'Induksi Matematika, Deret Summations & Recurrence',
    file: '/ada-study-module/content/sesi2.md',
    duration: '2.5 Jam Belajar',
    tag: 'Math & Rekursi'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'material' | 'flashcards' | 'quiz'>('material');
  const [currentSesiId, setCurrentSesiId] = useState<string>('sesi1');
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);

  const activeSesi = SESI_LIST.find(s => s.id === currentSesiId) || SESI_LIST[0];

  useEffect(() => {
    setLoading(true);
    fetch(activeSesi.file)
      .then(res => res.text())
      .then(text => {
        setMarkdownContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load markdown', err);
        setMarkdownContent('# Gagal memuat materi\nSilakan coba lagi nanti.');
        setLoading(false);
      });
  }, [currentSesiId]);

  // Sample Flashcards & Quiz Data based on Session
  const flashcardsData = currentSesiId === 'sesi1' ? [
    { q: "Apa definisi Algoritma menurut Sesi 1?", a: "Prosedur komputasi terspesifikasi yang mengambil input dan menghasilkan output yang tepat." },
    { q: "Apa bedanya Loop Invariant dengan Induksi Matematika?", a: "Loop Invariant membuktikan kebenaran algoritma iteratif pada tiap iterasi, Induksi untuk membuktikan rumus/rekursi." },
    { q: "Mengapa Big-O mengabaikan konstanta dan suku bernilai rendah?", a: "Karena pada ukuran input n -> infinity (asymptotic), suku berpangkat tertinggi yang mendominasi pertumbuhan waktu." },
    { q: "Apa kompleksitas waktu dari Insertion Sort pada Worst Case?", a: "O(n^2) ketika array terurut terbalik (reverse sorted)." },
    { q: "Apa kondisi Best Case untuk Insertion Sort?", a: "O(n) ketika array sudah terurut sempurna." }
  ] : [
    { q: "Apa 2 langkah utama dalam Induksi Matematika?", a: "1. Basis Step (buktikan n=1), 2. Inductive Step (asumsi n=k benar, buktikan n=k+1 benar)." },
    { q: "Berapakah hasil dari rumus deret kuadrat sum_(i=1)^n i^2 ?", a: "n(n+1)(2n+1) / 6" },
    { q: "Apa komparasi memori antara Faktorial Rekursif vs Iteratif?", a: "Rekursif memakan memori Stack O(n), sedangkan Iteratif hanya butuh memori O(1)." },
    { q: "Apa risiko utama dari rekursi tanpa Base Case yang benar?", a: "Stack Overflow Error karena stack frame terus bertambah tanpa batas." }
  ];

  const quizData = currentSesiId === 'sesi1' ? [
    {
      question: "Mengapa kompleksitas Insertion Sort pada Average Case tetap O(n^2)?",
      options: [
        "Karena tetap melakukan pergantian elemen sebanyak n kali di tiap iterasi",
        "Rata-rata elemen yang diperiksa adalah n/2, sehingga 1/2 * n^2 masih dalam orde O(n^2)",
        "Karena memori tambahan yang digunakan berkembang secara kuadratik",
        "Karena tidak ada perbandingan yang dilakukan"
      ],
      correct: 1,
      explanation: "Secara rata-rata kita memeriksa separuh subarray terurut (n/2). Konstanta 1/2 diabaikan dalam notasi Big-O, sehingga tetap O(n^2)."
    },
    {
      question: "Syarat utama agar sebuah algoritma dikatakan Correct adalah...",
      options: [
        "Berhenti untuk sebagian besar input",
        "Menghasilkan output yang tepat dan selalu berhenti (halting) untuk semua masukan sah",
        "Memiliki kompleksitas waktu O(1)",
        "Dapat ditulis kurang dari 10 baris pseudocode"
      ],
      correct: 1,
      explanation: "Algoritma correct harus berhenti (halt) untuk setiap instance input dan memberikan jawaban tepat sesuai spesifikasi."
    }
  ] : [
    {
      question: "Pada pembuktian Induksi Matematika sum_(i=1)^n i = n(n+1)/2, pada Inductive Step kita harus membuktikan untuk...",
      options: [
        "n = k",
        "n = 1",
        "n = k + 1",
        "n = 2k"
      ],
      correct: 2,
      explanation: "Setelah mengasumsikan P(k) benar, langkah induksi wajib membuktikan P(k+1) benar menggunakan hipotesis P(k)."
    },
    {
      question: "Penggunaan memori Call Stack pada fungsi faktorial rekursif factorial(n) adalah...",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n^2)"
      ],
      correct: 2,
      explanation: "Tiap pemanggilan rekursif factorial(k) menumpuk 1 stack frame hingga n kedalaman, sehingga memori membesar secara linier O(n)."
    }
  ];

  const handleQuizOptionSelect = (qIdx: number, optIdx: number) => {
    if (submittedQuiz) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    quizData.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-[#f7f8f8] flex flex-col font-sans selection:bg-[#5e6ad2] selection:text-white">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#0f1011]/80 backdrop-blur-md border-b border-white/[0.08] px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5e6ad2] to-[#828fff] flex items-center justify-center font-bold text-white shadow-lg shadow-[#5e6ad2]/20">
            A
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-[#f7f8f8] flex items-center gap-2">
              ADA Study Module
              <span className="text-[10px] font-mono bg-[#7170ff]/15 text-[#828fff] px-2 py-0.5 rounded-full border border-[#7170ff]/30">
                COMP6049
              </span>
            </h1>
            <p className="text-xs text-[#8a8f98]">Algorithm Design & Analysis • BINUS</p>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-1 bg-[#191a1b] p-1 rounded-lg border border-white/[0.06]">
          <button
            onClick={() => setActiveTab('material')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'material'
                ? 'bg-[#5e6ad2] text-white shadow-sm'
                : 'text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-white/[0.03]'
            }`}
          >
            📖 Materi Lecture
          </button>
          <button
            onClick={() => {
              setActiveTab('flashcards');
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'flashcards'
                ? 'bg-[#5e6ad2] text-white shadow-sm'
                : 'text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-white/[0.03]'
            }`}
          >
            🎴 Flashcards
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setSubmittedQuiz(false);
              setQuizAnswers({});
            }}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-[#5e6ad2] text-white shadow-sm'
                : 'text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-white/[0.03]'
            }`}
          >
            🧠 Interactive Quiz
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 lg:px-6 py-6 gap-6">
        {/* Sidebar Session Selector */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
          <div className="linear-card p-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#8a8f98] mb-3">
              Daftar Modul Sesi
            </h2>
            <div className="flex flex-col gap-2">
              {SESI_LIST.map(sesi => (
                <button
                  key={sesi.id}
                  onClick={() => setCurrentSesiId(sesi.id)}
                  className={`text-left p-3 rounded-lg border transition-all flex flex-col gap-1 ${
                    currentSesiId === sesi.id
                      ? 'bg-[#5e6ad2]/15 border-[#7170ff]/40 text-white shadow-inner'
                      : 'bg-white/[0.01] border-white/[0.05] text-[#8a8f98] hover:bg-white/[0.03] hover:text-[#f7f8f8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#828fff]">{sesi.tag}</span>
                    <span className="text-[10px] text-[#62666d]">{sesi.duration}</span>
                  </div>
                  <h3 className="text-sm font-medium text-[#f7f8f8] leading-snug">{sesi.title}</h3>
                  <p className="text-xs text-[#8a8f98] line-clamp-1">{sesi.subtitle}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="linear-card p-4 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8a8f98]">💡 Pedoman Studi</h3>
            <p className="text-xs text-[#8a8f98] leading-relaxed">
              Modul ini disusun dengan pendekatan intuisi formal, pembuktian matematis, trace call-stack, serta kuis interaktif.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'material' && (
            <div className="linear-card p-6 lg:p-8 relative">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#8a8f98]">
                  <div className="w-6 h-6 border-2 border-[#7170ff] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-mono">Memuat materi markdown...</span>
                </div>
              ) : (
                <div className="custom-prose max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div className="linear-card p-6 lg:p-8 flex flex-col items-center justify-center min-h-[450px]">
              <div className="w-full max-w-md space-y-6 text-center">
                <div className="flex items-center justify-between text-xs text-[#8a8f98]">
                  <span>Kartu {currentCardIndex + 1} dari {flashcardsData.length}</span>
                  <span className="font-mono text-[#828fff]">{activeSesi.tag}</span>
                </div>

                {/* Card Container */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full h-64 bg-[#0f1011] border border-white/[0.1] hover:border-[#7170ff]/50 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-[1.01] shadow-2xl relative"
                >
                  <span className="absolute top-4 right-4 text-[10px] uppercase font-mono text-[#62666d] bg-white/[0.04] px-2 py-0.5 rounded">
                    {isFlipped ? 'Jawaban' : 'Pertanyaan'}
                  </span>
                  
                  <p className={`text-base lg:text-lg font-medium transition-all ${isFlipped ? 'text-[#828fff]' : 'text-[#f7f8f8]'}`}>
                    {isFlipped ? flashcardsData[currentCardIndex].a : flashcardsData[currentCardIndex].q}
                  </p>

                  <span className="absolute bottom-4 text-xs text-[#62666d]">
                    Klik untuk melihat {isFlipped ? 'pertanyaan' : 'jawaban'}
                  </span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    disabled={currentCardIndex === 0}
                    onClick={() => {
                      setCurrentCardIndex(prev => prev - 1);
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.08]"
                  >
                    ← Sebelumnya
                  </button>
                  <button
                    disabled={currentCardIndex === flashcardsData.length - 1}
                    onClick={() => {
                      setCurrentCardIndex(prev => prev + 1);
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#5e6ad2] text-white text-xs font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7170ff]"
                  >
                    Selanjutnya →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="linear-card p-6 lg:p-8 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-[#f7f8f8] mb-1">Evaluasi Pemahaman - {activeSesi.title}</h2>
                <p className="text-xs text-[#8a8f98]">Jawab seluruh pertanyaan berikut untuk menguji pemahaman konsep.</p>
              </div>

              <div className="space-y-6">
                {quizData.map((q, qIdx) => (
                  <div key={qIdx} className="p-5 rounded-xl bg-[#0f1011] border border-white/[0.06] space-y-4">
                    <h3 className="text-sm font-semibold text-[#f7f8f8] flex gap-2">
                      <span className="text-[#7170ff] font-mono">{qIdx + 1}.</span> {q.question}
                    </h3>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = quizAnswers[qIdx] === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let optionStyle = "bg-white/[0.02] border-white/[0.06] text-[#d0d6e0] hover:bg-white/[0.05]";

                        if (submittedQuiz) {
                          if (isCorrect) {
                            optionStyle = "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-medium";
                          } else if (isSelected) {
                            optionStyle = "bg-rose-500/15 border-rose-500/40 text-rose-300";
                          }
                        } else if (isSelected) {
                          optionStyle = "bg-[#5e6ad2]/20 border-[#7170ff] text-white font-medium";
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleQuizOptionSelect(qIdx, optIdx)}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {submittedQuiz && isCorrect && <span className="text-xs">✓ Benar</span>}
                            {submittedQuiz && isSelected && !isCorrect && <span className="text-xs">✗ Salah</span>}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className="p-3 rounded-lg bg-[#5e6ad2]/10 border border-[#5e6ad2]/20 text-xs text-[#d0d6e0] space-y-1">
                        <span className="font-semibold text-[#828fff]">Penjelasan:</span>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quiz Submit Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                {submittedQuiz ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-white">
                      Skor Akhir: <span className="text-[#828fff] font-mono">{calculateQuizScore()} / {quizData.length}</span>
                    </span>
                    <button
                      onClick={() => {
                        setSubmittedQuiz(false);
                        setQuizAnswers({});
                      }}
                      className="px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-white"
                    >
                      Ulangi Kuis
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={Object.keys(quizAnswers).length < quizData.length}
                    onClick={() => setSubmittedQuiz(true)}
                    className="ml-auto px-6 py-2.5 rounded-lg bg-[#5e6ad2] hover:bg-[#7170ff] text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#5e6ad2]/20"
                  >
                    Kirim Jawaban
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
