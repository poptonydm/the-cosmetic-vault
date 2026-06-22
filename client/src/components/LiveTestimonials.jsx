import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Send } from 'lucide-react';

const defaultReviews = [
  { id: 1, name: 'Ama K.', text: 'Best silk press in Accra! The Luxe & Glow team is amazing and booking was so easy.', rating: 5, date: '2 days ago' },
  { id: 2, name: 'Efua M.', text: 'My pedicure lasted 3 weeks. Products are top tier. Will definitely be back!', rating: 5, date: '1 week ago' },
  { id: 3, name: 'Kojo B.', text: 'Finally a salon that respects my time. In and out, looking fresh.', rating: 5, date: '3 days ago' }
];

export default function LiveTestimonials() {
  const [reviews, setReviews] = useState(defaultReviews);
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const next = () => setCurrent(prev => (prev + 1) % reviews.length);
  const prev = () => setCurrent(prev => (prev - 1 + reviews.length) % reviews.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
     ...form,
      date: 'Just now'
    };
    setReviews([newReview,...reviews]);
    setForm({ name: '', text: '', rating: 5 });
    setShowForm(false);
    setCurrent(0);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Client Love</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-rose-500 font-semibold hover:underline"
        >
          {showForm? 'Cancel' : 'Leave a Review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm mb-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <select
              value={form.rating}
              onChange={e => setForm({...form, rating: Number(e.target.value)})}
              className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
            </select>
          </div>
          <textarea
            placeholder="Share your experience at The Luxe & Glow..."
            value={form.text}
            onChange={e => setForm({...form, text: e.target.value})}
            rows="3"
            className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
          <button type="submit" className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition flex items-center gap-2">
            Post Review <Send className="h-4 w-4" />
          </button>
        </form>
      )}

      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-8 md:p-12">
        <div className="flex gap-1 mb-4 justify-center">
          {[...Array(reviews[current].rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-xl text-neutral-700 dark:text-neutral-300 text-center mb-6 italic">
          "{reviews[current].text}"
        </p>
        <div className="text-center">
          <p className="font-semibold text-neutral-900 dark:text-white">{reviews[current].name}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{reviews[current].date}</p>
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === current? 'bg-rose-500 w-6' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
