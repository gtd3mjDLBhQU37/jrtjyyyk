// ✅ مشروع موقع خدمة شامل مع لوحة تحكم أدمن + واجهة عربية بتصميم شبه داكن
// التقنية: React + Tailwind CSS + استخدام useState لتجربة مبدئية

import { useState } from 'react';

export default function ServiceWebsite() {
  const [page, setPage] = useState('accountRequest');
  const [accountRequest, setAccountRequest] = useState({ name: '', email: '', reason: '' });
  const [showWelcome, setShowWelcome] = useState(true);
  const [formData, setFormData] = useState({ name: '', age: '', message: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const [posts, setPosts] = useState([
    { id: 1, title: 'أهلاً بكم في موقعنا', content: 'نحن نقدم أفضل الخدمات الرقمية.', likes: 0, comments: [] }
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleAccountChange = (e) => {
    setAccountRequest({ ...accountRequest, [e.target.name]: e.target.value });
  };

  const submitAccountRequest = (e) => {
    e.preventDefault();
    alert('تم إرسال طلب إنشاء الحساب إلى الأدمن');
    setPage('home');
  };

  const handleSkip = () => setShowWelcome(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    alert('تم إرسال البيانات إلى الأدمن بنجاح');
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleComment = (id, comment) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, comments: [...post.comments, comment] } : post
    ));
  };

  const addNewPost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        likes: 0,
        comments: []
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '' });
    }
  };

  const loginAsAdmin = () => {
    const password = prompt('أدخل كلمة مرور الأدمن:');
    if (password === 'admin123') {
      setIsAdmin(true);
      alert('تم تسجيل دخول الأدمن');
    } else {
      alert('كلمة مرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">🌐 موقع الخدمة</h1>
        <button onClick={loginAsAdmin} className="text-sm text-blue-400 underline">تسجيل دخول الأدمن</button>
      </div>

      {page === 'accountRequest' && (
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">طلب إنشاء حساب</h2>
          <form onSubmit={submitAccountRequest} className="space-y-4">
            <input type="text" name="name" placeholder="الاسم الكامل" value={accountRequest.name} onChange={handleAccountChange} className="w-full p-2 rounded bg-gray-700 text-white" required />
            <input type="email" name="email" placeholder="البريد الإلكتروني" value={accountRequest.email} onChange={handleAccountChange} className="w-full p-2 rounded bg-gray-700 text-white" required />
            <textarea name="reason" placeholder="سبب طلب الحساب" value={accountRequest.reason} onChange={handleAccountChange} className="w-full p-2 rounded bg-gray-700 text-white" required />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">إرسال الطلب</button>
          </form>
        </div>
      )}

      {page === 'home' && (
        <>
          {showWelcome ? (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-95 flex flex-col items-center justify-center z-50 text-center p-6">
              <h1 className="text-3xl font-bold mb-4">مرحبًا بك في موقعنا!</h1>
              <p className="mb-4">موقعنا يقدّم خدمات مميزة بكل احترافية وسهولة.</p>
              <button onClick={handleSkip} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">تخطي</button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">التقديم على الخدمة</h2>
              <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-4 rounded-xl max-w-md mx-auto">
                <div>
                  <label className="block mb-1">الاسم:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white" required />
                </div>
                <div>
                  <label className="block mb-1">العمر:</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white" />
                </div>
                <div>
                  <label className="block mb-1">رسالتك:</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white" required />
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">إرسال الطلب</button>
              </form>

              {submittedData && (
                <div className="mt-6 bg-gray-800 p-4 rounded-xl max-w-md mx-auto">
                  <h3 className="text-xl font-bold mb-2">📬 تم إرسال البيانات:</h3>
                  <p>الاسم: {submittedData.name}</p>
                  <p>العمر: {submittedData.age}</p>
                  <p>الرسالة: {submittedData.message}</p>
                </div>
              )}

              <div className="mt-10 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">📢 المنشورات</h2>

                {isAdmin && (
                  <form onSubmit={addNewPost} className="bg-gray-800 p-4 rounded-xl mb-6">
                    <h3 className="text-lg font-semibold mb-2">إضافة منشور جديد</h3>
                    <input type="text" placeholder="العنوان" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} className="w-full p-2 rounded bg-gray-700 text-white mb-2" required />
                    <textarea placeholder="المحتوى" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} className="w-full p-2 rounded bg-gray-700 text-white mb-2" required />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">نشر</button>
                  </form>
                )}

                {posts.map(post => (
                  <div key={post.id} className="bg-gray-800 p-4 rounded-xl mb-4">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="mb-2">{post.content}</p>
                    <button onClick={() => handleLike(post.id)} className="bg-blue-500 px-3 py-1 rounded mr-2">إعجاب ({post.likes})</button>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const comment = e.target.elements[`comment-${post.id}`].value;
                      if (comment) handleComment(post.id, comment);
                      e.target.reset();
                    }} className="mt-2">
                      <input name={`comment-${post.id}`} placeholder="اكتب تعليقًا..." className="w-full p-2 mt-1 rounded bg-gray-700 text-white" />
                    </form>
                    <div className="mt-2">
                      {post.comments.map((c, i) => (
                        <p key={i} className="text-sm border-b border-gray-700 py-1">💬 {c}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}