import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export interface User {
  id: number
  username: string
  email: string
  github_username: string | null
  github_avatar_url: string | null
}

export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  open_issues: number
  default_branch: string | null
  html_url: string
}

export interface DashboardStats {
  total_repos: number
  total_stars: number
  total_forks: number
  total_issues: number
  languages: Record<string, number>
}

export const authApi = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post<User>('/auth/register', data),
  login: (email: string, password: string) => {
    const form = new URLSearchParams()
    form.append('username', email)
    form.append('password', password)
    return api.post<{ access_token: string; token_type: string }>('/auth/login', form, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
  },
  me: () => api.get<User>('/users/me'),
}

export const githubApi = {
  connect: () => api.get<{ url: string }>('/github/connect'),
}

export const repoApi = {
  list: () => api.get<Repository[]>('/repositories'),
  stats: () => api.get<DashboardStats>('/repositories/stats'),
  sync: () => api.post<{ message: string; synced: string[]; updated: string[]; total: number }>('/repositories/sync'),
}
