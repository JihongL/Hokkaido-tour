import { useState, useEffect, useCallback, useMemo } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// 브라우저/플랫폼 감지 결과
export type PwaPlatform = "ios-safari" | "android-chrome" | "other";

function detectPlatform(): PwaPlatform {
  if (typeof navigator === "undefined") return "other";

  const ua = navigator.userAgent;

  // iOS Safari 감지: iPhone/iPad/iPod + Safari (Chrome on iOS도 WebKit이지만 CriOS 포함)
  const isIos = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (isIos) {
    // iOS의 인앱 브라우저가 아닌 Safari인지 확인
    const isSafari = !(/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua));
    if (isSafari) return "ios-safari";
    return "other"; // iOS의 타사 브라우저는 PWA 설치 불가
  }

  // Android Chrome 감지
  const isAndroid = /Android/.test(ua);
  const isChrome = /Chrome/.test(ua) && !/Edge|OPR|Samsung/.test(ua);
  if (isAndroid && isChrome) return "android-chrome";

  // Samsung Internet, Edge 등도 beforeinstallprompt 지원
  if (isAndroid) return "android-chrome";

  return "other";
}

function detectIsInstalled(): boolean {
  if (typeof window === "undefined") return false;
  const mq = window.matchMedia("(display-mode: standalone)");
  return (
    mq.matches ||
    ("standalone" in navigator &&
      (navigator as { standalone?: boolean }).standalone === true)
  );
}

// dismiss 후 1일(24시간) 이내인지 확인
const DISMISS_DURATION_MS = 1000 * 60 * 60 * 24; // 1일
const DISMISS_STORAGE_KEY = "hokkaido-pwa-install-dismissed";

function isDismissedRecently(): boolean {
  try {
    const ts = localStorage.getItem(DISMISS_STORAGE_KEY);
    if (!ts) return false;
    return Date.now() - Number(ts) < DISMISS_DURATION_MS;
  } catch {
    return false;
  }
}

// 모듈 스코프에서 이벤트를 즉시 캡처하여 EntryGate 단계에서도 놓치지 않음
let capturedEvent: BeforeInstallPromptEvent | null = null;
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    capturedEvent = e as BeforeInstallPromptEvent;
  });
}

export function usePwaInstall() {
  const platform = useMemo(() => detectPlatform(), []);

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(capturedEvent);
  const [isInstalled, setIsInstalled] = useState(detectIsInstalled);
  const [dismissed, setDismissed] = useState(isDismissedRecently);

  // iOS Safari 가이드 오버레이 상태
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    if (isInstalled) return;

    const handler = (e: Event) => {
      e.preventDefault();
      capturedEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(capturedEvent);
    };

    const installedHandler = () => setIsInstalled(true);

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, [isInstalled]);

  // Android Chrome: 네이티브 설치 프롬프트
  const install = useCallback(async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
    } catch {
      // 브라우저가 프롬프트를 취소한 경우
    } finally {
      setDeferredPrompt(null);
      capturedEvent = null;
    }
  }, [deferredPrompt]);

  // iOS Safari: 수동 가이드 오버레이 열기/닫기
  const openIosGuide = useCallback(() => setShowIosGuide(true), []);
  const closeIosGuide = useCallback(() => setShowIosGuide(false), []);

  const dismiss = useCallback(() => {
    setDismissed(true);
    setDeferredPrompt(null);
    setShowIosGuide(false);
    capturedEvent = null;
    try {
      localStorage.setItem(DISMISS_STORAGE_KEY, String(Date.now()));
    } catch {
      // localStorage 접근 불가 (private browsing 등)
    }
  }, []);

  // 배너 표시 조건: 설치 안 됨 + 최근에 닫지 않음
  // iOS Safari: 항상 수동 가이드 가능
  // Android Chrome: beforeinstallprompt 이벤트가 있어야 네이티브 설치 가능
  // 기타 브라우저: 안내 메시지만 표시
  const showBanner = useMemo(() => {
    if (isInstalled || dismissed) return false;
    if (platform === "ios-safari") return true;
    if (platform === "android-chrome") return !!deferredPrompt;
    // 기타 브라우저: 데스크톱 등에서도 안내 표시
    return !!deferredPrompt;
  }, [isInstalled, dismissed, platform, deferredPrompt]);

  return {
    platform,
    showBanner,
    install,
    dismiss,
    isInstalled,
    showIosGuide,
    openIosGuide,
    closeIosGuide,
  };
}
