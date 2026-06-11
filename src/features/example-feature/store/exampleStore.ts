import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExampleState {
  selectedIds: Set<string>;
  isFilterPanelOpen: boolean;
  toggleFilterPanel: () => void;
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
}

// ─── Client State Store ─────────────────────────────────────────────
// Zustand is used ONLY for ephemeral UI state.
// Server state (data from API) is handled by React Query.
export const useExampleStore = create<ExampleState>()(
  devtools(
    (set) => ({
      selectedIds: new Set<string>(),
      isFilterPanelOpen: false,

      toggleFilterPanel: () =>
        set((state) => ({ isFilterPanelOpen: !state.isFilterPanelOpen })),

      toggleSelection: (id) =>
        set((state) => {
          const next = new Set(state.selectedIds);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return { selectedIds: next };
        }),

      clearSelection: () => set({ selectedIds: new Set() }),
    }),
    { name: "example-store" }
  )
);
