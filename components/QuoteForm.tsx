'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonPremium } from './ButtonPremium';
import { CardPremium } from './CardPremium';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const quoteSchema = z.object({
  firstName: z.string().min(2, { message: 'Prénom requis' }),
  lastName: z.string().min(2, { message: 'Nom requis' }),
  email: z.string().email({ message: 'Email invalide' }),
  phone: z.string().min(10, { message: 'Téléphone requis' }),
  eventType: z.string().min(1, { message: 'Sélectionnez un type' }),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  budget: z.string().optional(),
  location: z.string().optional(),
  services: z.array(z.string()).optional(),
  message: z.string().min(10, { message: 'Dites-nous en un peu plus (min 10 caract.)' }),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export const QuoteForm = () => {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      services: [],
    }
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const message = `*Nouvelle demande de devis :*
- *Nom* : ${data.firstName} ${data.lastName}
- *Email* : ${data.email}
- *Téléphone* : ${data.phone}
- *Type d'événement* : ${data.eventType}${data.eventDate ? `\n- *Date* : ${data.eventDate}` : ''}

- *Message* :
${data.message}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/237682651971?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CardPremium className="p-8 md:p-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Prénom */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-gold)]">Prénom</label>
            <input 
              {...register('firstName')}
              className={`w-full bg-transparent border-b ${errors.firstName ? 'border-red-500' : 'border-[var(--border)]'} py-3 focus:border-[var(--accent-gold)] outline-none transition-colors font-light text-lg`}
              placeholder="Jean"
            />
            {errors.firstName && <p className="text-red-500 text-[10px] mt-1 italic">{errors.firstName.message}</p>}
          </div>

          {/* Nom */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-gold)]">Nom</label>
            <input 
              {...register('lastName')}
              className={`w-full bg-transparent border-b ${errors.lastName ? 'border-red-500' : 'border-[var(--border)]'} py-3 focus:border-[var(--accent-gold)] outline-none transition-colors font-light text-lg`}
              placeholder="Dupont"
            />
            {errors.lastName && <p className="text-red-500 text-[10px] mt-1 italic">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-gold)]">Email</label>
            <input 
              {...register('email')}
              className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-[var(--border)]'} py-3 focus:border-[var(--accent-gold)] outline-none transition-colors font-light text-lg`}
              placeholder="jean.dupont@email.com"
            />
            {errors.email && <p className="text-red-500 text-[10px] mt-1 italic">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-gold)]">Téléphone</label>
            <input 
              {...register('phone')}
              className={`w-full bg-transparent border-b ${errors.phone ? 'border-red-500' : 'border-[var(--border)]'} py-3 focus:border-[var(--accent-gold)] outline-none transition-colors font-light text-lg`}
              placeholder="06 12 34 56 78"
            />
            {errors.phone && <p className="text-red-500 text-[10px] mt-1 italic">{errors.phone.message}</p>}
          </div>

          {/* Type d'événement */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-gold)]">Type d'Événement</label>
            <select 
              {...register('eventType')}
              className="w-full bg-transparent border-b border-[var(--border)] py-3 focus:border-[var(--accent-gold)] outline-none transition-colors font-light text-lg appearance-none cursor-pointer"
            >
              <option value="" className="bg-black text-white">Sélectionnez...</option>
              <option value="mariage" className="bg-black text-white">Mariage</option>
              <option value="anniversaire" className="bg-black text-white">Anniversaire</option>
              <option value="corporate" className="bg-black text-white">Soirée Corporate</option>
              <option value="lancement" className="bg-black text-white">Lancement de Produit</option>
              <option value="autre" className="bg-black text-white">Autre</option>
            </select>
          </div>

          {/* Date */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-gold)]">Date souhaitée</label>
            <input 
              type="date"
              {...register('eventDate')}
              className="w-full bg-transparent border-b border-[var(--border)] py-3 focus:border-[var(--accent-gold)] outline-none transition-colors font-light text-lg text-[var(--text-secondary)]"
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-gold)]">Parlez-nous de votre projet</label>
          <textarea 
            {...register('message')}
            rows={4}
            className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-[var(--border)]'} py-3 focus:border-[var(--accent-gold)] outline-none transition-colors resize-none font-light text-lg`}
            placeholder="Détails, envies, besoins spécifiques..."
          />
          {errors.message && <p className="text-red-500 text-[10px] mt-1 italic">{errors.message.message}</p>}
        </div>

        <div className="flex flex-col gap-8 pt-6">
          <ButtonPremium 
            type="submit" 
            variant="gold" 
            className="w-full py-8 text-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-4">
                <Loader2 className="animate-spin" size={24} />
                Envoi en cours...
              </span>
            ) : "Demander mon devis personnalisé"}
          </ButtonPremium>

          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-6 bg-green-500/10 border border-green-500/30 text-green-500 rounded-sm flex items-center gap-4 text-sm"
              >
                <CheckCircle2 size={24} />
                Votre demande a été envoyée avec succès ! Notre équipe vous contactera sous 24h.
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-6 bg-red-500/10 border border-red-500/30 text-red-500 rounded-sm flex items-center gap-4 text-sm"
              >
                <AlertCircle size={24} />
                Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement.
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-[10px] uppercase tracking-[0.4em] text-[var(--text-secondary)] opacity-50 font-bold">
            Réponse garantie sous 24h • Accompagnement sur-mesure
          </p>
        </div>
      </form>
    </CardPremium>
  );
};
