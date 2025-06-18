"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  fetchTime: number;
  renderTime: number;
  totalTime: number;
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
}

interface PerformanceMonitorProps {
  fetchTime: number;
  renderTime: number;
  totalTime: number;
}

const PerformanceMonitor = ({
  fetchTime,
  renderTime,
  totalTime,
}: PerformanceMonitorProps) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fetchTime,
    renderTime,
    totalTime,
  });

  useEffect(() => {
    // Update metrics when props change
    setMetrics({ fetchTime, renderTime, totalTime });

    // Measure Core Web Vitals
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries[entries.length - 1];
        if (fcp) {
          setMetrics((prev) => ({ ...prev, fcp: fcp.startTime }));
        }
      });
      fcpObserver.observe({ entryTypes: ["paint"] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        if (lcp) {
          setMetrics((prev) => ({ ...prev, lcp: lcp.startTime }));
        }
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fid = entries[entries.length - 1];
        if (fid) {
          setMetrics((prev) => ({
            ...prev,
            fid: fid.processingStart - fid.startTime,
          }));
        }
      });
      fidObserver.observe({ entryTypes: ["first-input"] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        setMetrics((prev) => ({ ...prev, cls: clsValue }));
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });

      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, [fetchTime, renderTime, totalTime]);

  const getPerformanceGrade = (metric: number, type: "time" | "cls") => {
    if (type === "cls") {
      return metric < 0.1 ? "🟢" : metric < 0.25 ? "🟡" : "🔴";
    }
    return metric < 100 ? "🟢" : metric < 300 ? "🟡" : "🔴";
  };

  return (
    <div className="space-y-4 p-4 bg-muted rounded-lg">
      <h2 className="text-lg font-semibold">Performance Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Network & Render</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Fetch:</span>
              <span className="font-mono">
                {metrics.fetchTime.toFixed(2)}ms{" "}
                {getPerformanceGrade(metrics.fetchTime, "time")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Render:</span>
              <span className="font-mono">
                {metrics.renderTime.toFixed(2)}ms{" "}
                {getPerformanceGrade(metrics.renderTime, "time")}
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span className="font-mono">
                {metrics.totalTime.toFixed(2)}ms{" "}
                {getPerformanceGrade(metrics.totalTime, "time")}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm">Core Web Vitals</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>FCP:</span>
              <span className="font-mono">
                {metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : "Loading..."}
              </span>
            </div>
            <div className="flex justify-between">
              <span>LCP:</span>
              <span className="font-mono">
                {metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : "Loading..."}
              </span>
            </div>
            <div className="flex justify-between">
              <span>FID:</span>
              <span className="font-mono">
                {metrics.fid ? `${metrics.fid.toFixed(2)}ms` : "Loading..."}
              </span>
            </div>
            <div className="flex justify-between">
              <span>CLS:</span>
              <span className="font-mono">
                {metrics.cls ? metrics.cls.toFixed(3) : "Loading..."}{" "}
                {metrics.cls ? getPerformanceGrade(metrics.cls, "cls") : ""}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm">Performance Tips</h3>
          <div className="text-xs space-y-1 text-muted-foreground">
            <div>• Keep total time under 300ms</div>
            <div>• LCP should be under 2.5s</div>
            <div>• FID should be under 100ms</div>
            <div>• CLS should be under 0.1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
