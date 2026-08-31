import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, CheckCircle, ThumbsUp, X } from 'lucide-react';
import { REVIEWS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Review } from '../types';
import { validateCustomerName, cleanRawText, securityRateLimiter } from '../utils/security';

export const ReviewsSection: React.FC = () => {
  const { showToast } = useCart();
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [dish, setDish] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-Spam Rate Limit: max 2 reviews per minute
    if (!securityRateLimiter.isAllowed('submit_review', 2, 60000)) {
      const cooldown = securityRateLimiter.getRemainingCooldownSeconds('submit_review', 60000);
      showToast(`Зачекайте ${cooldown} сек перед публікацією наступного відгуку`, undefined, 'error');
      return;
    }

    const nameValidation = validateCustomerName(name);
    if (!nameValidation.isValid) {
      showToast(nameValidation.error || 'Вкажіть коректне ім\'я', undefined, 'error');
      return;
    }

    const sanitizedComment = cleanRawText(comment, 400);
    if (!sanitizedComment || sanitizedComment.length < 5) {
      showToast('Відгук повинен містити щонайменше 5 символів', undefined, 'error');
      return;
    }

    const sanitizedDish = cleanRawText(dish, 60);

    const newRev: Review = {
      id: Date.now(),
      author: nameValidation.sanitized,
      rating: Math.max(1, Math.min(5, Math.floor(rating))),
      date: 'Щойно',
      dish: sanitizedDish || 'Сет від Шефа',
      comment: sanitizedComment
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsModalOpen(false);
    setName('');
    setDish('');
    setComment('');
    showToast('Дякуємо за ваш відгук! ❤️', undefined, 'success');
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#0A0A0F] border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Overall Score */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Репутація & Довіра</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Відгуки наших гостей
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 font-light">
              Понад 850 задоволених клієнтів в Овідіополі та регіоні
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="apple-card p-5 sm:p-6 rounded-3xl flex items-center gap-6 shrink-0 shadow-xl">
            <div className="text-center pr-6 border-r border-white/10">
              <div className="font-display font-black text-3xl sm:text-4xl text-white">
                4.97
              </div>
              <div className="flex items-center justify-center gap-1 my-1 text-amber-400">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-[11px] text-zinc-400">850+ оцінок</div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-zinc-400 w-24">Свіжість риби:</span>
                <span className="font-bold text-emerald-400">5.0 / 5.0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-zinc-400 w-24">Смак страв:</span>
                <span className="font-bold text-amber-400">5.0 / 5.0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-zinc-400 w-24">Швидкість:</span>
                <span className="font-bold text-white">4.9 / 5.0</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl apple-button-primary text-white text-xs font-bold shrink-0 ml-2"
            >
              <Plus className="w-4 h-4" />
              <span>Залишити відгук</span>
            </motion.button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="apple-card p-5 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-crab-600 to-amber-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      {rev.author[0]}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1">
                        <span>{rev.author}</span>
                        <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                      </div>
                      <div className="text-[10px] text-zinc-400">{rev.date}</div>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-amber-400 mb-2">
                  Замовлено: {rev.dish}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Рекомендує Crab Club</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Leave Review Button */}
        <div className="text-center mt-8 lg:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-2xl apple-button-primary text-white text-xs font-bold inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Залишити свій відгук</span>
          </motion.button>
        </div>

      </div>

      {/* Leave Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative w-full max-w-md bg-[#13131D] border border-white/[0.12] rounded-3xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">Залишити відгук</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 mb-4 font-light">Поділіться враженнями від замовлення в Crab Club</p>

              <form onSubmit={handleAddReview} className="space-y-3">
                <div>
                  <label className="text-xs text-zinc-300 font-medium">Ваше ім'я:</label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Наприклад: Олена або Михайло"
                    className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300 font-medium">Яку страву замовляли?</label>
                  <input
                    type="text"
                    maxLength={60}
                    value={dish}
                    onChange={(e) => setDish(e.target.value)}
                    placeholder="Наприклад: Сет Філадельфія Мікс або Піца Пепероні"
                    className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300 font-medium">Ваша оцінка:</label>
                  <div className="flex gap-2 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <motion.button
                        key={s}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setRating(s)}
                        className={`p-2 rounded-2xl border ${
                          rating >= s ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-sm' : 'bg-white/5 border-white/10 text-zinc-500'
                        }`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-300 font-medium">Ваш коментар:</label>
                  <textarea
                    rows={3}
                    required
                    maxLength={400}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Опишіть ваші враження від свіжості риби, смаку, сервісу та швидкості кур'єрської доставки..."
                    className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 rounded-2xl apple-button-secondary text-zinc-300 text-xs font-semibold"
                  >
                    Скасувати
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="flex-1 py-2.5 rounded-2xl apple-button-primary text-white text-xs font-bold"
                  >
                    Опублікувати
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
