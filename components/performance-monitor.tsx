"use client";

import { useEffect, useState, useRef } from "react";

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

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
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

  const observersRef = useRef<PerformanceObserver[]>([]);

  useEffect(() => {
    // Update metrics when props change
    setMetrics((prev) => ({
      ...prev,
      fetchTime,
      renderTime,
      totalTime,
    }));
  }, [fetchTime, renderTime, totalTime]);

  useEffect(() => {
    // Cleanup function to disconnect all observers
    const cleanup = () => {
      observersRef.current.forEach((observer) => observer.disconnect());
      observersRef.current = [];
    };

    // Measure Core Web Vitals
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      try {
        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(
            (entry) => entry.name === "first-contentful-paint"
          );
          if (fcpEntry) {
            setMetrics((prev) => ({ ...prev, fcp: fcpEntry.startTime }));
          }
        });
        fcpObserver.observe({ entryTypes: ["paint"] });
        observersRef.current.push(fcpObserver);

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          if (lcp) {
            setMetrics((prev) => ({ ...prev, lcp: lcp.startTime }));
          }
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        observersRef.current.push(lcpObserver);

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fidEntry = entries[
            entries.length - 1
          ] as PerformanceEventTiming;
          if (fidEntry && fidEntry.processingStart) {
            setMetrics((prev) => ({
              ...prev,
              fid: fidEntry.processingStart - fidEntry.startTime,
            }));
          }
        });
        fidObserver.observe({ entryTypes: ["first-input"] });
        observersRef.current.push(fidObserver);

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as LayoutShiftEntry[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          setMetrics((prev) => ({ ...prev, cls: clsValue }));
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
        observersRef.current.push(clsObserver);
      } catch (error) {
        console.warn("Performance Observer not supported:", error);
      }
    }

    return cleanup;
  }, []); // Empty dependency array - only run once

  const getPerformanceGrade = (
    metric: number,
    type: "time" | "cls" | "lcp" | "fid"
  ) => {
    switch (type) {
      case "cls":
        return metric < 0.1 ? "🟢" : metric < 0.25 ? "🟡" : "🔴";
      case "lcp":
        return metric < 2500 ? "🟢" : metric < 4000 ? "🟡" : "🔴";
      case "fid":
        return metric < 100 ? "🟢" : metric < 300 ? "🟡" : "🔴";
      case "time":
      default:
        return metric < 100 ? "🟢" : metric < 300 ? "🟡" : "🔴";
    }
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
                {metrics.fcp ? (
                  <>
                    {metrics.fcp.toFixed(2)}ms{" "}
                    {getPerformanceGrade(metrics.fcp, "time")}
                  </>
                ) : (
                  "Loading..."
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>LCP:</span>
              <span className="font-mono">
                {metrics.lcp ? (
                  <>
                    {metrics.lcp.toFixed(2)}ms{" "}
                    {getPerformanceGrade(metrics.lcp, "lcp")}
                  </>
                ) : (
                  "Loading..."
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>FID:</span>
              <span className="font-mono">
                {metrics.fid ? (
                  <>
                    {metrics.fid.toFixed(2)}ms{" "}
                    {getPerformanceGrade(metrics.fid, "fid")}
                  </>
                ) : (
                  "Loading..."
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>CLS:</span>
              <span className="font-mono">
                {metrics.cls !== undefined ? (
                  <>
                    {metrics.cls.toFixed(3)}{" "}
                    {getPerformanceGrade(metrics.cls, "cls")}
                  </>
                ) : (
                  "Loading..."
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm">Performance Tips</h3>
          <div className="text-xs space-y-1 text-muted-foreground">
            <div>• Keep fetch time under 100ms</div>
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
