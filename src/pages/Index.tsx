import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EntryGate from "./EntryGate";
import TripDashboard from "./TripDashboard";

const isKakaoInApp = /KAKAOTALK/i.test(navigator.userAgent);
const isIOS = /(iPhone|iPad)/i.test(navigator.userAgent);

const KakaoRedirectScreen = () => {
  const [copied, setCopied] = useState(false);

  const handleAndroidOpen = () => {
    const intentUrl = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
    window.location.href = intentUrl;
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="card-base max-w-sm w-full text-center space-y-6"
      >
        <div className="space-y-2">
          <div className="text-5xl mb-4">🌐</div>
          <h1 className="text-xl font-bold text-foreground leading-snug">
            외부 브라우저에서 열어주세요
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            카카오톡 내 브라우저에서는<br />앱 설치가 제한됩니다
          </p>
        </div>

        <div className="bg-secondary rounded-xl p-4 text-base text-secondary-foreground">
          ⋮ 메뉴 → 다른 브라우저로 열기
        </div>

        {isIOS ? (
          <div className="space-y-3">
            <button
              onClick={handleCopyUrl}
              className="w-full bg-primary text-primary-foreground text-lg font-semibold py-3 px-6 rounded-xl active:opacity-80 transition-opacity"
            >
              {copied ? "✓ 복사됨" : "URL 복사"}
            </button>
            {copied && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-base text-primary font-medium"
              >
                복사 완료! Safari에서 붙여넣기 해주세요
              </motion.p>
            )}
          </div>
        ) : (
          <button
            onClick={handleAndroidOpen}
            className="w-full bg-primary text-primary-foreground text-lg font-semibold py-3 px-6 rounded-xl active:opacity-80 transition-opacity"
          >
            Chrome에서 열기
          </button>
        )}
      </motion.div>
    </div>
  );
};

const Index = () => {
  const [entered, setEntered] = useState(() => {
    try {
      return localStorage.getItem("hokkaido-trip-gate-agreed") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (entered) {
      try { localStorage.setItem("hokkaido-trip-gate-agreed", "true"); } catch { /* private browsing */ }
    }
  }, [entered]);

  if (isKakaoInApp) {
    return <KakaoRedirectScreen />;
  }

  if (!entered) {
    return <EntryGate onEnter={() => setEntered(true)} />;
  }

  return <TripDashboard />;
};

export default Index;
