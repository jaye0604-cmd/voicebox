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

  async function addPost({ title, content, category, photoFile }) {
    let photo_url = null

    if (photoFile) {
      const ext = photoFile.name.split('.').pop()
      const filePath = `${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('post-photos')
        .upload(filePath, photoFile)
      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from('post-photos').getPublicUrl(filePath)
      photo_url = publicUrl
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({ title, content, category, author: '익명', photo_url })
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
