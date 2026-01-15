/**
 * Filter Slice
 * Manages filter state for jewelry listing
 */

export const createFilterSlice = (set, get) => ({
  // Filter state
  filters: {
    metals: [],
    styles: [],
    priceRange: null,
    birthstoneMonths: [],
  },
  
  sortBy: 'recommended',
  showDeliveryDate: true,
  maxDeliveryDays: null,

  // Actions
  setMetalFilter: (metals) =>
    set((state) => ({
      filters: { ...state.filters, metals },
    })),

  addMetalFilter: (metal) =>
    set((state) => ({
      filters: {
        ...state.filters,
        metals: [...state.filters.metals, metal],
      },
    })),

  removeMetalFilter: (metal) =>
    set((state) => ({
      filters: {
        ...state.filters,
        metals: state.filters.metals.filter((m) => m !== metal),
      },
    })),

  setStyleFilter: (styles) =>
    set((state) => ({
      filters: { ...state.filters, styles },
    })),

  addStyleFilter: (style) =>
    set((state) => ({
      filters: {
        ...state.filters,
        styles: [...state.filters.styles, style],
      },
    })),

  removeStyleFilter: (style) =>
    set((state) => ({
      filters: {
        ...state.filters,
        styles: state.filters.styles.filter((s) => s !== style),
      },
    })),

  setPriceRangeFilter: (priceRange) =>
    set((state) => ({
      filters: { ...state.filters, priceRange },
    })),

  setBirthstoneMonthFilter: (birthstoneMonths) =>
    set((state) => ({
      filters: { ...state.filters, birthstoneMonths },
    })),

  addBirthstoneMonthFilter: (month) =>
    set((state) => ({
      filters: {
        ...state.filters,
        birthstoneMonths: [...state.filters.birthstoneMonths, month],
      },
    })),

  removeBirthstoneMonthFilter: (month) =>
    set((state) => ({
      filters: {
        ...state.filters,
        birthstoneMonths: state.filters.birthstoneMonths.filter((m) => m !== month),
      },
    })),

  clearAllFilters: () =>
    set({
      filters: {
        metals: [],
        styles: [],
        priceRange: null,
        birthstoneMonths: [],
      },
    }),

  setSortBy: (sortBy) => set({ sortBy }),

  toggleDeliveryDate: () =>
    set((state) => ({ showDeliveryDate: !state.showDeliveryDate })),

  setMaxDeliveryDays: (days) => set({ maxDeliveryDays: days }),
});

