import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { useToast } from './ToastContext.jsx'

const AuthContext = createContext(null)
const OAUTH_PENDING_KEY = 'voicebox_oauth_pending'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)

      if (event === 'SIGNED_IN' && sessionStorage.getItem(OAUTH_PENDING_KEY)) {
        sessionStorage.removeItem(OAUTH_PENDING_KEY)
        const signedInUser = session.user
        const isNewUser =
          Math.abs(new Date(signedInUser.last_sign_in_at) - new Date(signedInUser.created_at)) <
          5000
        showToast(isNewUser ? '가입을 마쳤습니다. 환영해요!' : '로그인되었습니다.')
      }
    })

    return () => subscription.unsubscribe()
  }, [showToast])

  async function signInWithGoogle() {
    sessionStorage.setItem(OAUTH_PENDING_KEY, '1')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) {
      sessionStorage.removeItem(OAUTH_PENDING_KEY)
      throw error
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
