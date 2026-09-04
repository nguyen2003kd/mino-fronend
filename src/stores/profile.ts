// Core
import { isUndefined } from 'lodash-es'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
// App
import { createStorage } from '@/utils/storage'

// Types
export interface Permission {
  id: string
  permission_id: string
  permission: {
    id: string
    name: string
    code: string
  }
}

// States
export interface States {
  id: string | null
  account_id: string | null
  email: string | null
  role_id: string | null
  role_name: string | null
  role_code: string | null
  status: string | null
  created_at: string | null
  updated_at: string | null
  user_permisions: Permission[] | null
  avatar_url: string | null
  full_name: string | null
  phone: string | null
  date_of_birth: string | null
  gender: string | null
  address: string | null
  notes: string | null
  parent_full_name: string | null
  parent_phone: string | null
  parent_email: string | null
  parent_relationship: string | null
  identity_card: string | null
  department_id: string | null
  department_name: string | null
  school_id: string | null
  mentor_id: string | null
  mentor_full_name: string | null
  contract_url: string | null
  kid_profile_picker_requested: boolean
}

// Actions
interface SetStoreActionValues {
  id?: States['id']
  account_id?: States['account_id']
  email?: States['email']
  role_id?: States['role_id']
  role_name?: States['role_name']
  role_code?: States['role_code']
  status?: States['status']
  created_at?: States['created_at']
  updated_at?: States['updated_at']
  user_permisions?: States['user_permisions']
  avatar_url?: States['avatar_url']
  full_name?: States['full_name']
  phone?: States['phone']
  date_of_birth?: States['date_of_birth']
  gender?: States['gender']
  address?: States['address']
  notes?: States['notes']
  parent_full_name?: States['parent_full_name']
  parent_phone?: States['parent_phone']
  parent_email?: States['parent_email']
  parent_relationship?: States['parent_relationship']
  identity_card?: States['identity_card']
  department_id?: States['department_id']
  department_name?: States['department_name']
  school_id?: States['school_id']
  mentor_id?: States['mentor_id']
  mentor_full_name?: States['mentor_full_name']
  contract_url?: States['contract_url']
  kid_profile_picker_requested?: States['kid_profile_picker_requested']
}

interface Actions {
  setStore: (values: SetStoreActionValues) => void
  resetStore: () => void
}

// Store
export type ProfileStore = States & Actions

export const profileStoreName = 'profile-store'

// Constants
export const INITIAL_STATES: States = {
  id: null,
  account_id: null,
  email: null,
  role_id: null,
  role_name: null,
  role_code: null,
  status: null,
  created_at: null,
  updated_at: null,
  user_permisions: null,
  avatar_url: null,
  full_name: null,
  phone: null,
  date_of_birth: null,
  gender: null,
  address: null,
  notes: null,
  parent_full_name: null,
  parent_phone: null,
  parent_email: null,
  parent_relationship: null,
  identity_card: null,
  department_id: null,
  department_name: null,
  school_id: null,
  mentor_id: null,
  mentor_full_name: null,
  contract_url: null,
  kid_profile_picker_requested: false
}

// Define store
const profileStore: StateCreator<ProfileStore> = (set) => ({
  // States
  ...INITIAL_STATES,

  // Actions
  setStore: ({
    id,
    account_id,
    email,
    role_id,
    role_name,
    role_code,
    status,
    created_at,
    updated_at,
    user_permisions,
    avatar_url,
    full_name,
    phone,
    date_of_birth,
    gender,
    address,
    notes,
    parent_full_name,
    parent_phone,
    parent_email,
    parent_relationship,
    identity_card,
    department_id,
    department_name,
    school_id,
    mentor_id,
    mentor_full_name,
    contract_url,
    kid_profile_picker_requested
  }) =>
    set((state) => {
      return {
        id: isUndefined(id) ? state.id : id,
        account_id: isUndefined(account_id) ? state.account_id : account_id,
        email: isUndefined(email) ? state.email : email,
        role_id: isUndefined(role_id) ? state.role_id : role_id,
        role_name: isUndefined(role_name) ? state.role_name : role_name,
        role_code: isUndefined(role_code) ? state.role_code : role_code,
        status: isUndefined(status) ? state.status : status,
        created_at: isUndefined(created_at) ? state.created_at : created_at,
        updated_at: isUndefined(updated_at) ? state.updated_at : updated_at,
        user_permisions: isUndefined(user_permisions) ? state.user_permisions : user_permisions,
        avatar_url: isUndefined(avatar_url) ? state.avatar_url : avatar_url,
        full_name: isUndefined(full_name) ? state.full_name : full_name,
        phone: isUndefined(phone) ? state.phone : phone,
        date_of_birth: isUndefined(date_of_birth) ? state.date_of_birth : date_of_birth,
        gender: isUndefined(gender) ? state.gender : gender,
        address: isUndefined(address) ? state.address : address,
        notes: isUndefined(notes) ? state.notes : notes,
        parent_full_name: isUndefined(parent_full_name) ? state.parent_full_name : parent_full_name,
        parent_phone: isUndefined(parent_phone) ? state.parent_phone : parent_phone,
        parent_email: isUndefined(parent_email) ? state.parent_email : parent_email,
        parent_relationship: isUndefined(parent_relationship) ? state.parent_relationship : parent_relationship,
        identity_card: isUndefined(identity_card) ? state.identity_card : identity_card,
        department_id: isUndefined(department_id) ? state.department_id : department_id,
        department_name: isUndefined(department_name) ? state.department_name : department_name,
        school_id: isUndefined(school_id) ? state.school_id : school_id,
        mentor_id: isUndefined(mentor_id) ? state.mentor_id : mentor_id,
        mentor_full_name: isUndefined(mentor_full_name) ? state.mentor_full_name : mentor_full_name,
        contract_url: isUndefined(contract_url) ? state.contract_url : contract_url,
        kid_profile_picker_requested: isUndefined(kid_profile_picker_requested) ? state.kid_profile_picker_requested : kid_profile_picker_requested
      }
    }),
  resetStore: () => set({ ...INITIAL_STATES })
})

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(profileStore, {
      name: profileStoreName,
      storage: createStorage<States>()
    })
  )
)

export default useProfileStore
