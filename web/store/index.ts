import create from 'zustand'

interface AppState {
  gradients: [] | UIG.Gradient[],
  setGradients: (gs: UIG.Gradient[]) => void,

  activeIndex: number
  setActiveIndex: (i: number) => void,

  activeGradient: null | UIG.Gradient,
  setActiveGradient: (g: UIG.Gradient) => void,

  nextGradient: () => void,
  prevGradient: () => void,

  isDisplayShowing: boolean,
  toggleDisplay: () => void
}


const log = (config: any) => (set: any, get: any, api: any) => config((args: any) => {
  console.log("  applying", args)
  set(args)
  console.log("  new state", get())
}, get, api)

const useStore = create<AppState>(set => ({
  gradients: [],
  setGradients: (gs) => set(state => ({ gradients: gs })),

  activeIndex: 0,
  activeGradient: null,
  setActiveGradient: (g) => set(state => ({ activeGradient: g })),
  setActiveIndex: (i) => set(state => ({ activeIndex: i })),

  nextGradient: () => set(s => {
    const logicalNext = s.activeIndex + 1
    const safeNext = (logicalNext > s.gradients.length - 1) ? 0 : logicalNext

    return {
      activeIndex: safeNext,
      activeGradient: s.gradients[safeNext]
    }
  }),

  prevGradient: () => set(s => {
    const logicalPrev = s.activeIndex - 1
    const safePrev = (logicalPrev < 0) ? s.gradients.length - 1 : logicalPrev

    return {
      activeIndex: safePrev,
      activeGradient: s.gradients[safePrev]
    }
  }),

  isDisplayShowing: true,
  toggleDisplay: () => set(state => ({
    isDisplayShowing: !state.isDisplayShowing
  }))
}))

export default useStore