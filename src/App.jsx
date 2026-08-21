import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import WritePage from './pages/WritePage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'
import AuthGatePage from './pages/AuthGatePage.jsx'
import MyPage from './pages/MyPage.jsx'
import { supabase } from './lib/supabaseClient.js'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

function AppRoutes() {
  const { user, loading } = useAuth()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to load posts:', error)
        return
      }
      setPosts(data)
    }

    loadPosts()
  }, [])

  async function addPost({ title, content, category, photoFile }) {
    let photo_url = null

    if (photoFile) {
      const ext = photoFile.name.split('.').pop()
      const filePath = `${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, photoFile)
      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from('photos').getPublicUrl(filePath)
      photo_url = publicUrl
    }

    const author = user.user_metadata?.full_name || user.user_metadata?.name || '익명'

    const { data, error } = await supabase
      .from('posts')
      .insert({ title, content, category, author, author_id: user.id, photo_url })
      .select()
      .single()

    if (error) throw error

    setPosts((prev) => [data, ...prev])
    return data.id
  }

  function guard(element) {
    if (loading) return null
    return user ? element : <Navigate to="/login" replace />
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage posts={posts} />} />
        <Route path="/write" element={guard(<WritePage onAddPost={addPost} />)} />
        <Route path="/posts/:id" element={<PostDetailPage posts={posts} />} />
        <Route path="/login" element={<AuthGatePage mode="login" />} />
        <Route path="/signup" element={<AuthGatePage mode="signup" />} />
        <Route path="/mypage" element={guard(<MyPage />)} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  )
}
