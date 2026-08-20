import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import WritePage from './pages/WritePage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'
import { initialPosts, STATUS, formatToday } from './data/posts.js'

export default function App() {
  const [posts, setPosts] = useState(initialPosts)

  function addPost({ title, content, category, photo }) {
    const newPost = {
      id: Date.now(),
      title,
      content,
      category,
      photo,
      status: STATUS.RECEIVED,
      author: '익명',
      date: formatToday(),
    }
    setPosts((prev) => [newPost, ...prev])
    return newPost.id
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
