import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextStep,
  prevStep,
  updateFormData,
  submitForm,
  resetForm,
} from '../../store/slices/contactSlice';
import styles from './FormModal.module.scss';

function FormModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    currentStep,
    formData,
    isSubmitting,
    // submitSuccess removed - not used
  } = useSelector((state) => state.contact);

  // Define functions BEFORE useEffect
  const handleInputChange = (field, value) => {
    dispatch(updateFormData({ [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.lastName?.trim()) {
        newErrors.lastName = 'Le nom est requis';
      }
      if (!formData.firstName?.trim()) {
        newErrors.firstName = 'Le prénom est requis';
      }
      if (!formData.email?.trim()) {
        newErrors.email = 'L\'email est requis';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
      if (!formData.subject?.trim()) {
        newErrors.subject = 'Le sujet est requis';
      }
    }

    if (step === 2) {
      if (!formData.message?.trim()) {
        newErrors.message = 'Le message est requis';
      } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Le message doit faire au moins 10 caractères';
      }
    }

    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    dispatch(nextStep());
  };

  const handlePrev = () => {
    setErrors({});
    dispatch(prevStep());
  };

  const handleSubmit = async () => {
    dispatch(submitForm());
    
    try {
      // Integrate EmailJS
      const emailjs = (await import('@emailjs/browser')).default;
      const { EMAILJS_CONFIG } = await import('../../config/emailjs');

      const templateParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company || 'Non renseignée',
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('Email envoyé avec succès !');
      dispatch(nextStep());
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
      // Reset submitting state if needed
    }
  };

  const handleConfirmClose = useCallback(() => {
    setShowCloseConfirm(false);
    dispatch(resetForm());
    onClose();
  }, [dispatch, onClose]);

  const handleCancelClose = useCallback(() => {
    setShowCloseConfirm(false);
  }, []);

  const handleCloseAttempt = useCallback(() => {
    // Si on est à l'étape 4 (succès), fermer directement
    if (currentStep === 4) {
      handleConfirmClose();
      return;
    }
    
    // Sinon, demander confirmation
    setShowCloseConfirm(true);
  }, [currentStep, handleConfirmClose]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseAttempt();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleCloseAttempt]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalOverlay} onClick={handleCloseAttempt}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          
          {/* Close button */}
          <button 
            className={styles.closeButton} 
            onClick={handleCloseAttempt}
            aria-label="Fermer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Stepper */}
          <div className={styles.stepper}>
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className={styles.stepItem}>
                <div
                  className={`
                    ${styles.stepCircle}
                    ${currentStep === step ? styles.active : ''}
                    ${currentStep > step ? styles.completed : ''}
                  `}
                >
                  {currentStep > step ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <div className={styles.stepLabel}>
                  {step === 1 && 'Informations'}
                  {step === 2 && 'Message'}
                  {step === 3 && 'Vérification'}
                  {step === 4 && 'Confirmé'}
                </div>
                {step < 4 && <div className={styles.stepLine} />}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <div className={styles.formContent}>
            
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Vos informations</h3>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Nom *</label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName || ''}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={errors.lastName ? styles.errorInput : ''}
                    />
                    {errors.lastName && (
                      <span className={styles.errorMessage}>{errors.lastName}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">Prénom *</label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName || ''}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={errors.firstName ? styles.errorInput : ''}
                    />
                    {errors.firstName && (
                      <span className={styles.errorMessage}>{errors.firstName}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? styles.errorInput : ''}
                  />
                  {errors.email && (
                    <span className={styles.errorMessage}>{errors.email}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="company">Entreprise (facultatif)</label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Votre entreprise"
                    value={formData.company || ''}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Sujet *</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Objet de votre message"
                    value={formData.subject || ''}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={errors.subject ? styles.errorInput : ''}
                  />
                  {errors.subject && (
                    <span className={styles.errorMessage}>{errors.subject}</span>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Message */}
            {currentStep === 2 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Votre message</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    rows="10"
                    placeholder="Décrivez votre projet ou votre demande..."
                    value={formData.message || ''}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    maxLength={1000}
                    className={errors.message ? styles.errorInput : ''}
                  />
                  {errors.message && (
                    <span className={styles.errorMessage}>{errors.message}</span>
                  )}
                  <div className={styles.charCount}>
                    {(formData.message || '').length} / 1000 caractères
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Verification */}
            {currentStep === 3 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Vérifiez vos informations</h3>

                <div className={styles.summary}>
                  <div className={styles.summaryItem}>
                    <strong>Nom :</strong>
                    <span>{formData.lastName} {formData.firstName}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <strong>Email :</strong>
                    <span>{formData.email}</span>
                  </div>
                  {formData.company && (
                    <div className={styles.summaryItem}>
                      <strong>Entreprise :</strong>
                      <span>{formData.company}</span>
                    </div>
                  )}
                  <div className={styles.summaryItem}>
                    <strong>Sujet :</strong>
                    <span>{formData.subject}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <strong>Message :</strong>
                    <p>{formData.message}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {currentStep === 4 && (
              <div className={styles.formStep}>
                <div className={styles.success}>
                  <div className={styles.successIcon}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Message envoyé !</h3>
                  <p className={styles.successText}>
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                  <button 
                    className={styles.primaryButton}
                    onClick={handleConfirmClose}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className={styles.actions}>
              {currentStep > 1 && (
                <button
                  className={styles.secondaryButton}
                  onClick={handlePrev}
                  disabled={isSubmitting}
                >
                  Précédent
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  className={styles.primaryButton}
                  onClick={handleNext}
                >
                  Suivant
                </button>
              ) : (
                <button
                  className={styles.primaryButton}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Close Confirmation Dialog */}
      {showCloseConfirm && (
        <div className={styles.confirmOverlay} onClick={handleCancelClose}>
          <div className={styles.confirmDialog} onClick={(e) => e.stopPropagation()}>
            <h3>Êtes-vous sûr ?</h3>
            <p>Votre message ne sera pas sauvegardé.</p>
            <div className={styles.confirmActions}>
              <button className={styles.secondaryButton} onClick={handleCancelClose}>
                Annuler
              </button>
              <button className={styles.dangerButton} onClick={handleConfirmClose}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FormModal;
