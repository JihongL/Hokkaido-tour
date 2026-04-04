import { useState, useEffect, useRef } from "react";
import { useExchangeRate } from "@/hooks/useExchangeRate";

const ExchangeTab = () => {
  const [krwInput, setKrwInput] = useState("");
  const [jpyInput, setJpyInput] = useState("");
  const { data, isLoading } = useExchangeRate();

  const rate = data?.rate ?? 0.11;
  const isFallback = data?.isFallback ?? true;
  const prevRate = useRef(rate);
  const lastEdited = useRef<"krw" | "jpy">("krw");

  useEffect(() => {
    if (prevRate.current !== rate) {
      if (lastEdited.current === "krw" && krwInput) {
        setJpyInput(String(Math.round(Number(krwInput) * rate)));
      } else if (lastEdited.current === "jpy" && jpyInput) {
        setKrwInput(String(Math.round(Number(jpyInput) / rate)));
      }
    }
    prevRate.current = rate;
  }, [rate, krwInput, jpyInput]);

  const formatNum = (n: number) => n.toLocaleString("ko-KR");

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return dateStr.replace(/-/g, ".");
  };

  const handleKrw = (val: string) => {
    lastEdited.current = "krw";
    setKrwInput(val);
    setJpyInput(val ? String(Math.round(Number(val) * rate)) : "");
  };

  const handleJpy = (val: string) => {
    lastEdited.current = "jpy";
    setJpyInput(val);
    setKrwInput(val ? String(Math.round(Number(val) / rate)) : "");
  };

  const presets = [
    { label: "라멘", jpy: 900 },
    { label: "편의점 도시락", jpy: 500 },
    { label: "커피 (캔)", jpy: 150 },
    { label: "온천 입장", jpy: 1000 },
    { label: "가솔린 (1L)", jpy: 175 },
    { label: "편의점 간식", jpy: 300 },
    { label: "소프트크림", jpy: 350 },
    { label: "기념품", jpy: 1500 },
  ];

  return (
    <div className="space-y-4 fade-in">
      {/* Bidirectional converter */}
      <div className="card-base space-y-4">
        <div>
          <label className="text-base font-bold text-foreground mb-2 block">🇰🇷 한국 원 (KRW)</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={krwInput}
            onChange={(e) => handleKrw(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="금액 입력"
            className="w-full text-2xl font-bold text-foreground bg-secondary/50 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-primary/50 min-h-[56px]"
          />
          {krwInput && (
            <p className="text-base text-muted-foreground mt-1">
              = {formatNum(Number(jpyInput))} 엔
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-border" />
            <span className="text-base font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {isLoading ? "환율 로딩중..." : `1원 = ${rate}엔`}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <span className="text-xs text-muted-foreground">
            {!isFallback
              ? `오늘의 환율 · ${formatDate(data!.updatedAt)} 기준`
              : "참고 환율 (실제와 다를 수 있음)"}
          </span>
        </div>

        <div>
          <label className="text-base font-bold text-foreground mb-2 block">🇯🇵 일본 엔 (JPY)</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={jpyInput}
            onChange={(e) => handleJpy(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="금액 입력"
            className="w-full text-2xl font-bold text-foreground bg-secondary/50 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-primary/50 min-h-[56px]"
          />
          {jpyInput && (
            <p className="text-base text-muted-foreground mt-1">
              = {formatNum(Number(krwInput))} 원
            </p>
          )}
        </div>
      </div>

      {/* Quick presets */}
      <div className="card-base">
        <h3 className="text-lg font-bold text-foreground mb-3">🧮 이거 한국 돈으로 얼마?</h3>
        <div className="space-y-2">
          {presets.map((item, i) => (
            <button
              key={i}
              onClick={() => handleJpy(String(item.jpy))}
              className="w-full flex items-center justify-between bg-secondary/50 rounded-xl p-3.5 min-h-[48px] active:scale-[0.98] transition-transform"
            >
              <span className="text-base font-medium text-foreground">{item.label}</span>
              <div className="text-right">
                <span className="text-sm text-muted-foreground">{formatNum(item.jpy)}엔</span>
                <span className="text-base font-bold text-primary ml-2">≈ {formatNum(Math.round(item.jpy / rate))}원</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
        <p className="text-base text-foreground font-medium">
          💡 <strong>꿀팁:</strong> 엔에 10을 곱하면 대략 한국 원!
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          예: 900엔 → ×10 = 약 9,000원
        </p>
      </div>
    </div>
  );
};

export default ExchangeTab;
