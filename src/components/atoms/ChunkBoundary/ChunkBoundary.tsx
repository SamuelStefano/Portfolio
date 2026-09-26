import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ChunkBoundaryProps {
  children: ReactNode;
  /** Rendered instead of the failed piece; defaults to nothing. */
  fallback?: ReactNode;
}

interface ChunkBoundaryState {
  failed: boolean;
}

/**
 * Wraps a lazily loaded piece (overlay, terminal skin, dialogs). If its chunk cannot be fetched —
 * a tab left open across a deploy, a flaky network — only that piece is lost; without this
 * boundary React would unmount the whole page.
 */
export class ChunkBoundary extends Component<ChunkBoundaryProps, ChunkBoundaryState> {
  state: ChunkBoundaryState = { failed: false };

  static getDerivedStateFromError(): ChunkBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('A lazily loaded part of the page failed to load:', error, info.componentStack);
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}

export default ChunkBoundary;
