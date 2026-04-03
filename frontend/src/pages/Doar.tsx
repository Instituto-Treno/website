import { useState } from "react";
import {
  ShieldCheck,
  Copy,
  CheckCircle2,
  Timer,
  ArrowLeft,
} from "lucide-react";
import { PatternFormat, NumericFormat } from "react-number-format";
import { QRCodeSVG } from "qrcode.react";

// --- 1. Função de Validação de CPF (Algoritmo Oficial) ---
const validarCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/\D/g, "");
  if (cleanCPF.length !== 11 || /^(\d)\1+$/.test(cleanCPF)) return false;

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cleanCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
};

const Doar = () => {
  // --- 2. Estados (Hooks) ---
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cpfErro, setCpfErro] = useState(false);
  const [formData, setFormData] = useState({ nome: "", cpf: "", valor: "" });
  const [valorSelecionado, setValorSelecionado] = useState("10");
  // Simulação de código Pix (No futuro vindo de API)
  const pixCode = `00020126580014BR.GOV.BCB.PIX01366050b12a-87a4-4a4e-9a21-9e767f4c5678520400005303986${formData.valor}`;

  // --- 3. Funções de Ação ---
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const valorNum = parseFloat(formData.valor);

    if (!validarCPF(formData.cpf)) {
      setCpfErro(true);
      return;
    }

    if (!valorNum || valorNum < 10) {
      alert("O valor mínimo para doação é R$ 10,00");
      return;
    }

    setCpfErro(false);
    setLoading(true);

    // Simula tempo de resposta do banco para UX
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 4. Renderização ---
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
        {/* Sidebar de Segurança */}
        <div className="md:w-72 bg-slate-900 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="bg-red-600/20 p-3 rounded-2xl inline-block mb-6">
              <ShieldCheck className="text-red-500" size={32} />
            </div>
            <h2 className="text-xl font-bold mb-4">Ambiente Seguro</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sua doação é processada via API Bancária criptografada. O
              Instituto Trenô nunca armazena seus dados bancários.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800">
            <p className="text-xs text-slate-500 font-mono italic">
              INSTITUTO TRENÔ © 2026
            </p>
          </div>
        </div>

        {/* Área de Formulário / QR Code */}
        <div className="flex-1 p-8 md:p-12">
          {step === 1 ? (
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Detalhes da Doação
              </h1>
              <p className="text-slate-500 mb-8">
                Identifique-se para gerar seu QR Code exclusivo.
              </p>

              <form onSubmit={handleGenerate} className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600 transition-all outline-none"
                    placeholder="Como no documento"
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                      CPF
                    </label>
                    <PatternFormat
                      format="###.###.###-##"
                      mask="_"
                      required
                      className={`w-full mt-1 p-4 bg-slate-50 rounded-2xl focus:ring-2 transition-all outline-none border-2 ${
                        cpfErro
                          ? "border-red-500 focus:ring-red-500"
                          : "border-transparent focus:ring-red-600"
                      }`}
                      placeholder="000.000.000-00"
                      onValueChange={(values) => {
                        setFormData({ ...formData, cpf: values.value });
                        if (cpfErro) setCpfErro(false);
                      }}
                    />
                    {cpfErro && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold">
                        CPF INVÁLIDO
                      </p>
                    )}
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                      Escolha um valor para doar
                    </label>

                    <div className="grid grid-cols-3 gap-3">
                      {["10", "20", "50", "100", "200"].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => {
                            setValorSelecionado(v);
                            setFormData({ ...formData, valor: v });
                          }}
                          className={`py-3 rounded-xl font-bold transition-all border-2 ${
                            valorSelecionado === v
                              ? "border-red-600 bg-red-50 text-red-600 shadow-sm"
                              : "border-slate-100 bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          R$ {v}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() => setValorSelecionado("outro")}
                        className={`py-3 rounded-xl font-bold transition-all border-2 ${
                          valorSelecionado === "outro"
                            ? "border-red-600 bg-red-50 text-red-600"
                            : "border-slate-100 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        Outro
                      </button>
                    </div>

                    {/* Campo "Outro Valor" - Só aparece se clicar no botão 'Outro' */}
                    {valorSelecionado === "outro" && (
                      <div className="animate-in slide-in-from-top-2 duration-300">
                        <NumericFormat
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="R$ "
                          allowNegative={false}
                          decimalScale={2}
                          fixedDecimalScale
                          required
                          min={10} // Validação de mínimo direto no componente
                          className="w-full p-4 bg-slate-50 border-2 border-red-100 rounded-2xl focus:ring-2 focus:ring-red-600 transition-all outline-none"
                          placeholder="Mínimo de R$ 10,00"
                          onValueChange={(values) =>
                            setFormData({ ...formData, valor: values.value })
                          }
                        />
                        <p className="text-[10px] text-slate-400 mt-2 ml-1 italic">
                          * Valor mínimo para processamento: R$ 10,00
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? "Validando com o Banco..." : "Gerar QR Code Pix"}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center animate-in zoom-in-95 duration-300">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-8 transition-colors text-sm mx-auto"
              >
                <ArrowLeft size={16} /> Voltar e alterar valor
              </button>

              <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 inline-block shadow-sm mb-6">
                <QRCodeSVG value={pixCode} size={220} includeMargin={true} />
              </div>

              <div className="mb-8">
                <p className="text-3xl font-black text-slate-900 italic">
                  R${" "}
                  {formData.valor
                    ? parseFloat(formData.valor).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })
                    : "0,00"}
                </p>
                <div className="flex items-center justify-center gap-2 text-amber-600 mt-2 font-medium bg-amber-50 py-1 px-4 rounded-full w-fit mx-auto text-sm">
                  <Timer size={14} /> <span>Válido por 30 minutos</span>
                </div>
              </div>

              <div className="grid gap-3 max-w-sm mx-auto">
                <button
                  onClick={copyToClipboard}
                  className={`w-full p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${copied ? "bg-green-100 text-green-700" : "bg-slate-900 text-white hover:bg-slate-800"}`}
                >
                  {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                  {copied ? "Código Copiado!" : "Copiar Pix Copia e Cola"}
                </button>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-4">
                  Beneficiário: Instituto Trenô de Apoio Social
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doar;
