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
  tag: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const SESI_LIST: ModuleSesi[] = [
  {
    id: 'sesi1',
    title: 'Sesi 01: Algoritma & Kompleksitas',
    subtitle: 'Role of Algorithms, Correctness, Pseudocode & Complexity',
    file: '/ada-study-module/content/sesi1.md',
    tag: 'Sesi 1'
  },
  {
    id: 'sesi2',
    title: 'Sesi 02: Analisis Matematis & Rekursi',
    subtitle: 'Induksi Matematika, Deret Summations & Recurrence',
    file: '/ada-study-module/content/sesi2.md',
    tag: 'Sesi 2'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'reading' | 'flashcards' | 'quiz'>('reading');
  const [currentSesiId, setCurrentSesiId] = useState<string>('sesi1');
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [toc, setToc] = useState<TocItem[]>([]);

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
        
        // Generate TOC from headings
        const headings: TocItem[] = [];
        const lines = text.split('\n');
        lines.forEach((line) => {
          if (line.startsWith('## ')) {
            const headingText = line.replace('## ', '').trim();
            const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            headings.push({ id, text: headingText, level: 2 });
          } else if (line.startsWith('### ')) {
            const headingText = line.replace('### ', '').trim();
            const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            headings.push({ id, text: headingText, level: 3 });
          }
        });
        setToc(headings);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load markdown', err);
        setMarkdownContent('# Gagal memuat materi\nSilakan coba lagi nanti.');
        setLoading(false);
      });
  }, [currentSesiId]);

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
    <div className="min-h-screen bg-[#0b0c0e] text-[#e2e8f0] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#0d0e11]/90 backdrop-blur-md border-b border-white/[0.08] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-blue-500/20">
            ADA
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-100">COMP6049 • Algorithm Design & Analysis</span>
            <span className="text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">BINUS University</span>
          </div>
        </div>

        {/* Action Toggle Switch */}
        <div className="flex items-center bg-[#15171c] p-1 rounded-lg border border-white/[0.08]">
          <button
            onClick={() => setActiveTab('reading')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'reading'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📖 Reading Lane
          </button>
          <button
            onClick={() => {
              setActiveTab('flashcards');
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'flashcards'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
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
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🧠 Quiz Engine
          </button>
        </div>
      </header>

      {/* 3-Column Mintlify Documentation Body */}
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
        {/* Left Column: Module Directory Navigation */}
        <aside className="w-64 border-r border-white/[0.08] p-5 shrink-0 hidden lg:flex flex-col gap-6 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div>
            <h2 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">Daftar Modul</h2>
            <div className="space-y-1">
              {SESI_LIST.map(sesi => (
                <button
                  key={sesi.id}
                  onClick={() => setCurrentSesiId(sesi.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                    currentSesiId === sesi.id
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
                  }`}
                >
                  <span className="truncate">{sesi.title}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400">{sesi.tag}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300">Format Pembelajaran</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Materi disusun dengan Intuition, Formal Proof, Worked Examples, dan Trace Call Stack.
            </p>
          </div>
        </aside>

        {/* Center Column: Reading Lane / Main Content */}
        <main className="flex-1 min-w-0 p-6 lg:px-12 lg:py-8 max-w-4xl mx-auto">
          {activeTab === 'reading' && (
            <div>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-500">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-mono">Memuat materi markdown...</span>
                </div>
              ) : (
                <article className="doc-prose">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      h2: ({ node, ...props }) => {
                        const id = String(props.children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                        return <h2 id={id} {...props} />;
                      },
                      h3: ({ node, ...props }) => {
                        const id = String(props.children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                        return <h3 id={id} {...props} />;
                      }
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </article>
              )}
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-full max-w-lg space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Kartu {currentCardIndex + 1} / {flashcardsData.length}</span>
                  <span className="text-blue-400">{activeSesi.title}</span>
                </div>

                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full min-h-[260px] bg-[#12141a] border border-white/[0.1] hover:border-blue-500/40 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 text-center shadow-xl relative"
                >
                  <span className="absolute top-4 right-4 text-[10px] uppercase font-mono text-slate-500 bg-white/[0.05] px-2 py-0.5 rounded">
                    {isFlipped ? 'Jawaban' : 'Pertanyaan'}
                  </span>
                  
                  <p className={`text-base lg:text-lg font-medium ${isFlipped ? 'text-blue-300' : 'text-slate-100'}`}>
                    {isFlipped ? flashcardsData[currentCardIndex].a : flashcardsData[currentCardIndex].q}
                  </p>

                  <span className="absolute bottom-4 text-xs text-slate-500">
                    Klik untuk membalik kartu
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    disabled={currentCardIndex === 0}
                    onClick={() => {
                      setCurrentCardIndex(prev => prev - 1);
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-md bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.08]"
                  >
                    ← Sebelumnya
                  </button>
                  <button
                    disabled={currentCardIndex === flashcardsData.length - 1}
                    onClick={() => {
                      setCurrentCardIndex(prev => prev + 1);
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white text-xs font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-500"
                  >
                    Selanjutnya →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-1">Evaluasi Pemahaman - {activeSesi.title}</h2>
                <p className="text-xs text-slate-400">Jawab seluruh pertanyaan berikut untuk menguji pemahaman konsep.</p>
              </div>

              <div className="space-y-5">
                {quizData.map((q, qIdx) => (
                  <div key={qIdx} className="p-5 rounded-xl bg-[#12141a] border border-white/[0.08] space-y-4">
                    <h3 className="text-sm font-medium text-slate-200 flex gap-2">
                      <span className="text-blue-400 font-mono">{qIdx + 1}.</span> {q.question}
                    </h3>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = quizAnswers[qIdx] === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let optionStyle = "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.05]";

                        if (submittedQuiz) {
                          if (isCorrect) {
                            optionStyle = "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-medium";
                          } else if (isSelected) {
                            optionStyle = "bg-rose-500/15 border-rose-500/40 text-rose-300";
                          }
                        } else if (isSelected) {
                          optionStyle = "bg-blue-600/20 border-blue-500 text-white font-medium";
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
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-slate-300 space-y-1">
                        <span className="font-semibold text-blue-400">Penjelasan:</span>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                {submittedQuiz ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-white">
                      Skor Akhir: <span className="text-blue-400 font-mono">{calculateQuizScore()} / {quizData.length}</span>
                    </span>
                    <button
                      onClick={() => {
                        setSubmittedQuiz(false);
                        setQuizAnswers({});
                      }}
                      className="px-4 py-2 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-white"
                    >
                      Ulangi Kuis
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={Object.keys(quizAnswers).length < quizData.length}
                    onClick={() => setSubmittedQuiz(true)}
                    className="ml-auto px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-500/20"
                  >
                    Kirim Jawaban
                  </button>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Right Column: On-Page Table of Contents */}
        {activeTab === 'reading' && (
          <aside className="w-60 border-l border-white/[0.08] p-5 shrink-0 hidden xl:block sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
            <h2 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">On This Page</h2>
            <nav className="space-y-1.5 text-xs">
              {toc.length > 0 ? (
                toc.map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.id}`}
                    className={`block truncate transition-colors ${
                      item.level === 3 ? 'pl-3 text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-blue-400 font-medium'
                    }`}
                  >
                    {item.text}
                  </a>
                ))
              ) : (
                <span className="text-slate-600 text-[11px]">Tidak ada section.</span>
              )}
            </nav>
          </aside>
        )}
      </div>
    </div>
  );
}
