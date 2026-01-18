import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserType = 'particulier' | 'createur' | 'professionnel';
export type AccountSubType = 'mineur' | 'adulte';
export type PlanType = 'essentiel' | 'basic' | 'gold' | 'infinity' | 'pro' | 'pro-plus';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  name: string;
  type: UserType;
  subType?: AccountSubType;
  verified: boolean;
  verificationStatus: VerificationStatus;
  plan: PlanType;
  avatar?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface CheckInLimits {
  daily: number;
  weekly: number;
  lastCheckIn?: string;
  weekStart?: string;
}

export interface ModuleState {
  feed: boolean;
  dating: boolean;
  events: boolean;
  checkin: boolean;
  messages: boolean;
  shop: boolean;
  wallet: boolean;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  modules: ModuleState;
  checkInLimits: CheckInLimits;
  cart: string[];
  tchilCoins: number;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  updatePlan: (plan: PlanType) => void;
  updateVerification: (verified: boolean, status: VerificationStatus) => void;
  toggleModule: (module: keyof ModuleState) => void;
  setModules: (modules: Partial<ModuleState>) => void;
  addCheckIn: () => boolean;
  resetCheckInLimits: () => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateTchilCoins: (amount: number) => void;
}

const defaultModules: ModuleState = {
  feed: true,
  dating: true,
  events: true,
  checkin: true,
  messages: true,
  shop: true,
  wallet: true,
};

const defaultCheckInLimits: CheckInLimits = {
  daily: 0,
  weekly: 0,
  lastCheckIn: undefined,
  weekStart: undefined,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      modules: defaultModules,
      checkInLimits: defaultCheckInLimits,
      cart: [],
      tchilCoins: 0,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      login: (user) => set({ 
        user, 
        isAuthenticated: true,
        // Réinitialiser les limites de check-in au login
        checkInLimits: defaultCheckInLimits,
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        cart: [],
      }),
      
      updatePlan: (plan) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, plan } });
        }
      },
      
      updateVerification: (verified, status) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, verified, verificationStatus: status } });
        }
      },
      
      toggleModule: (module) => {
        set((state) => ({
          modules: { ...state.modules, [module]: !state.modules[module] },
        }));
      },
      
      setModules: (modules) => {
        set((state) => ({
          modules: { ...state.modules, ...modules },
        }));
      },
      
      addCheckIn: () => {
        const limits = get().checkInLimits;
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        const weekStart = limits.weekStart || today;
        const weekStartDate = new Date(weekStart);
        const daysDiff = Math.floor((now.getTime() - weekStartDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // Reset si nouvelle semaine
        if (daysDiff >= 7) {
          set({
            checkInLimits: {
              daily: 1,
              weekly: 1,
              lastCheckIn: today,
              weekStart: today,
            },
          });
          return true;
        }
        
        // Reset si nouveau jour
        if (limits.lastCheckIn !== today) {
          const newDaily = 1;
          const newWeekly = limits.weekly + 1;
          
          if (newDaily > 3 || newWeekly > 10) {
            return false;
          }
          
          set({
            checkInLimits: {
              daily: newDaily,
              weekly: newWeekly,
              lastCheckIn: today,
              weekStart: limits.weekStart || today,
            },
          });
          return true;
        }
        
        // Même jour
        const newDaily = limits.daily + 1;
        const newWeekly = limits.weekly;
        
        if (newDaily > 3 || newWeekly > 10) {
          return false;
        }
        
        set({
          checkInLimits: {
            ...limits,
            daily: newDaily,
            lastCheckIn: today,
          },
        });
        return true;
      },
      
      resetCheckInLimits: () => {
        set({ checkInLimits: defaultCheckInLimits });
      },
      
      addToCart: (productId) => {
        set((state) => ({
          cart: [...state.cart, productId],
        }));
      },
      
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((id) => id !== productId),
        }));
      },
      
      clearCart: () => {
        set({ cart: [] });
      },
      
      updateTchilCoins: (amount) => {
        set({ tchilCoins: amount });
      },
    }),
    {
      name: 'tchil-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
