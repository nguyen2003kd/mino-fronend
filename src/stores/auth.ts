// Core
import { isUndefined } from 'lodash-es'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// App
import { createStorage } from '../utils/storage'

// Types
// States
export interface States {
  isSignedIn: boolean
  access_token: string | null
  refresh_token: string | null
  access_token_expires_at: Date | null
  storedUsername: string | null
  storedPassword: string | null
  refresh_token_expires_at: Date | null
  _hasHydrated: boolean
}

// Actions
interface SetStoreActionValues {
  isSignedIn?: States['isSignedIn']
  access_token?: States['access_token']
  refresh_token?: States['refresh_token']
  access_token_expires_at?: States['access_token_expires_at'] | null
  refresh_token_expires_at?: States['refresh_token_expires_at'] | null
  storedUsername?: States['storedUsername']
  storedPassword?: States['storedPassword']
}

interface Actions {
  setStore: (values: SetStoreActionValues) => void
  resetStore: () => void
  setHasHydrated: () => void
}

// Store
type Store = States & Actions

export const authStoreName = 'mino-store'

// Constants
const INITIAL_STATES: States = {
  isSignedIn: false,
  access_token: null,
  refresh_token: null,
  access_token_expires_at: null,
  refresh_token_expires_at: null,
  storedUsername: null,
  storedPassword: null,
  _hasHydrated: false
}

// Define store
const authStore: StateCreator<Store> = (set) => ({
  // States
  ...INITIAL_STATES,

  // Methods
  setStore: ({ isSignedIn, access_token, refresh_token, access_token_expires_at, refresh_token_expires_at, storedUsername, storedPassword }) =>
    set((state) => ({
      isSignedIn: isUndefined(isSignedIn) ? state.isSignedIn : isSignedIn,
      access_token: isUndefined(access_token) ? state.access_token : access_token,
      refresh_token: isUndefined(refresh_token) ? state.refresh_token : refresh_token,
      access_token_expires_at: isUndefined(access_token_expires_at) ? state.access_token_expires_at : access_token_expires_at,
      refresh_token_expires_at: isUndefined(refresh_token_expires_at) ? state.refresh_token_expires_at : refresh_token_expires_at,
      storedUsername: isUndefined(storedUsername) ? state.storedUsername : storedUsername,
      storedPassword: isUndefined(storedPassword) ? state.storedPassword : storedPassword
    })),
  resetStore: () =>
    set({ isSignedIn: INITIAL_STATES.isSignedIn, access_token: INITIAL_STATES.access_token, refresh_token: INITIAL_STATES.refresh_token, access_token_expires_at: INITIAL_STATES.access_token_expires_at, refresh_token_expires_at: INITIAL_STATES.refresh_token_expires_at }),
  setHasHydrated: () => set({ _hasHydrated: true })
})

const useAuthStore = create<Store>()(
  devtools(
    persist(authStore, {
      name: authStoreName,
      storage: createStorage<States>(),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated()
      }
    })
  )
)

export default useAuthStore
