export interface User {
  id: string
  phone: string
  nickname: string
  avatar?: string
  deposit_balance: number
  charity_points: number
  execution_score: number
  created_at: string
}

export interface Step {
  id: string
  task_id: string
  order: number
  title: string
  description: string
  deposit_amount: number
  time_limit_minutes: number
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  content?: string
  completed_at?: string
}

export interface Task {
  id: string
  user_id: string
  title: string
  type: 'writing' | 'learning' | 'other'
  total_deposit: number
  status: 'active' | 'completed' | 'failed'
  start_time: string
  end_time: string
  steps: Step[]
  created_at: string
}

export interface CharityPool {
  id: string
  total_amount: number
  monthly_goal: number
  monthly_donated: number
}

export interface DepositRecord {
  id: string
  user_id: string
  task_id?: string
  step_id?: string
  amount: number
  type: 'lock' | 'unlock' | 'forfeit'
  created_at: string
}