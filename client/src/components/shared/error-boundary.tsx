import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090a0c] text-zinc-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#111215] border border-zinc-800 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <div className="h-10 w-10 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              !
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Application Exception Encountered</h2>
              <p className="text-xs text-zinc-400 mt-1">
                {this.state.error?.message || 'An unexpected rendering error occurred.'}
              </p>
            </div>
            {this.state.error?.stack && (
              <pre className="text-[11px] font-mono text-left bg-black/60 p-3 rounded-xl border border-zinc-800/80 text-rose-300 max-h-40 overflow-auto">
                {this.state.error.stack}
              </pre>
            )}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/dashboard';
              }}
              className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs py-2.5 rounded-xl shadow-sm transition-colors"
            >
              Reset Session & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
