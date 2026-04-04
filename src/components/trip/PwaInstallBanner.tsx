import { motion, AnimatePresence } from "framer-motion";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import type { PwaPlatform } from "@/hooks/usePwaInstall";

// ─── iOS Safari 공유 버튼 아이콘 (SVG) ───
function ShareIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent inline-block"
      aria-hidden="true"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

// ─── "홈 화면에 추가" 아이콘 (+ 사각형) ───
function AddToHomeIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent inline-block"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

// ─── iOS Safari 단계별 가이드 오버레이 ───
function IosGuideOverlay({
  onClose,
  onDismiss,
}: {
  onClose: () => void;
  onDismiss: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="홈 화면에 추가 안내"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="w-full max-w-lg rounded-t-3xl bg-card shadow-2xl"
        style={{ maxHeight: "85vh", overflowY: "auto" }}
      >
        {/* 핸들 바 */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-muted" />
        </div>

        <div className="px-6 pb-8 pt-2">
          {/* 제목 */}
          <h2 className="text-center text-xl font-bold text-foreground leading-relaxed mb-1">
            홈 화면에 추가하기
          </h2>
          <p className="text-center text-base text-muted-foreground mb-6">
            아래 순서대로 따라해 주세요
          </p>

          {/* 단계 목록 */}
          <ol className="space-y-5">
            {/* 1단계 */}
            <li className="flex items-start gap-4">
              <span
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-lg font-bold"
                aria-hidden="true"
              >
                1
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-foreground leading-relaxed">
                  화면 아래의{" "}
                  <span className="inline-flex items-center align-middle mx-0.5">
                    <ShareIcon />
                  </span>{" "}
                  <strong>공유 버튼</strong>을 눌러주세요
                </p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Safari 하단 가운데에 있는 네모 + 화살표 버튼이에요
                </p>
              </div>
            </li>

            {/* 2단계 */}
            <li className="flex items-start gap-4">
              <span
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-lg font-bold"
                aria-hidden="true"
              >
                2
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-foreground leading-relaxed">
                  목록에서{" "}
                  <span className="inline-flex items-center align-middle mx-0.5">
                    <AddToHomeIcon />
                  </span>{" "}
                  <strong>홈 화면에 추가</strong>를 찾아 눌러주세요
                </p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  아래로 스크롤하면 보여요
                </p>
              </div>
            </li>

            {/* 3단계 */}
            <li className="flex items-start gap-4">
              <span
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-lg font-bold"
                aria-hidden="true"
              >
                3
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-foreground leading-relaxed">
                  오른쪽 위의 <strong>추가</strong> 버튼을 눌러주세요
                </p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  이제 홈 화면에서 앱처럼 바로 열 수 있어요!
                </p>
              </div>
            </li>
          </ol>

          {/* 하단 안내 화살표 (Safari 공유 버튼 위치 가리킴) */}
          <div className="mt-6 flex justify-center" aria-hidden="true">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-primary"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </motion.div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-1">
            Safari 하단의 공유 버튼을 찾아보세요
          </p>

          {/* 버튼 영역 */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={onClose}
              className="w-full min-h-[52px] rounded-2xl bg-primary text-primary-foreground text-lg font-bold active:scale-[0.97] transition-transform"
            >
              알겠어요
            </button>
            <button
              onClick={onDismiss}
              className="w-full min-h-[48px] rounded-2xl text-base text-muted-foreground active:opacity-60 transition-opacity"
            >
              나중에 할게요
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── 플랫폼별 배너 내용 ───
function BannerContent({
  platform,
  onInstall,
  onShowGuide,
  onDismiss,
}: {
  platform: PwaPlatform;
  onInstall: () => void;
  onShowGuide: () => void;
  onDismiss: () => void;
}) {
  if (platform === "ios-safari") {
    return (
      <div className="bg-card border border-border rounded-2xl shadow-xl p-5 flex items-center gap-4">
        <div className="flex-shrink-0 text-4xl" aria-hidden="true">
          📲
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-foreground leading-snug">
            홈 화면에 추가하면
            <br />더 편하게 쓸 수 있어요!
          </p>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            앱처럼 바로 열 수 있어요
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={onShowGuide}
            className="min-w-[80px] min-h-[48px] px-5 py-2.5 bg-primary text-primary-foreground text-base font-bold rounded-2xl active:scale-95 transition-transform"
          >
            방법 보기
          </button>
          <button
            onClick={onDismiss}
            className="min-h-[40px] px-5 py-1.5 text-sm text-muted-foreground active:opacity-60 transition-opacity"
          >
            나중에
          </button>
        </div>
      </div>
    );
  }

  // Android Chrome 및 기타 (beforeinstallprompt 지원 브라우저)
  return (
    <div className="bg-card border border-border rounded-2xl shadow-xl p-5 flex items-center gap-4">
      <div className="flex-shrink-0 text-4xl" aria-hidden="true">
        📲
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base font-bold text-foreground leading-snug">
          홈 화면에 추가하면
          <br />더 편하게 쓸 수 있어요!
        </p>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          앱처럼 바로 열 수 있어요
        </p>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0">
        <button
          onClick={onInstall}
          className="min-w-[80px] min-h-[48px] px-5 py-2.5 bg-primary text-primary-foreground text-base font-bold rounded-2xl active:scale-95 transition-transform"
        >
          설치
        </button>
        <button
          onClick={onDismiss}
          className="min-h-[40px] px-5 py-1.5 text-sm text-muted-foreground active:opacity-60 transition-opacity"
        >
          나중에
        </button>
      </div>
    </div>
  );
}

// ─── 메인 배너 컴포넌트 ───
const PwaInstallBanner = () => {
  const {
    platform,
    showBanner,
    install,
    dismiss,
    showIosGuide,
    openIosGuide,
    closeIosGuide,
  } = usePwaInstall();

  return (
    <>
      {/* 배너 */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-4 right-4 z-40 mx-auto max-w-lg"
            style={{
              bottom:
                "calc(5rem + env(safe-area-inset-bottom, 0px) + 0.5rem)",
            }}
            role="banner"
            aria-label="앱 설치 안내"
          >
            <BannerContent
              platform={platform}
              onInstall={install}
              onShowGuide={openIosGuide}
              onDismiss={dismiss}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Safari 단계별 가이드 오버레이 */}
      <AnimatePresence>
        {showIosGuide && (
          <IosGuideOverlay onClose={closeIosGuide} onDismiss={dismiss} />
        )}
      </AnimatePresence>
    </>
  );
};

export default PwaInstallBanner;
