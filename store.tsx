import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { User, Task, CharityPool, DepositRecord } from './types'

interface AppState {
  user: User | null
  tasks: Task[]
  charityPool: CharityPool
  depositRecords: DepositRecord[]
  isLoading: boolean
}

type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'SET_CHARITY_POOL'; payload: CharityPool }
  | { type: 'SET_DEPOSIT_RECORDS'; payload: DepositRecord[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_CHARITY_POOL'; payload: Partial<CharityPool> }

const initialState: AppState = {
  user: null,
  tasks: [],
  charityPool: { id: '1', total_amount: 12850, monthly_goal: 50000, monthly_donated: 12850 },
  depositRecords: [],
  isLoading: true,
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_TASKS':
      return { ...state, tasks: action.payload }
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t)
      }
    case 'SET_CHARITY_POOL':
      return { ...state, charityPool: action.payload }
    case 'UPDATE_CHARITY_POOL':
      return { ...state, charityPool: { ...state.charityPool, ...action.payload } }
    case 'SET_DEPOSIT_RECORDS':
      return { ...state, depositRecords: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) })
    }

    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      dispatch({ type: 'SET_TASKS', payload: JSON.parse(savedTasks) })
    }

    dispatch({ type: 'SET_LOADING', payload: false })
  }, [])

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  }, [state.user])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  }, [state.tasks])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}