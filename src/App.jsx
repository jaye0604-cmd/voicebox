import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import WritePage from './pages/WritePage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'
import { supabase } from './lib/supabaseClient.js'

export default function App() {
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

  async function addPost({ title, content, category }) {
    const { data, error } = await supabase
      .from('posts')
      .insert({ title, content, category, author: '익명' })
      .select()
      .single()

    if (error) throw error

    setPosts((prev) => [data, ...prev])
    return data.id
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage posts={posts} />} />
          <Route path="/write" element={<WritePage onAddPost={addPost} />} />
          <Route path="/posts/:id" element={<PostDetailPage posts={posts} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
