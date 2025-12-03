// contact section

import { useSelector, useDispatch } from 'react-redux';
import { 
  nextStep,           // Passer à l'étape suivante
  prevStep,           // Revenir en arrière
  updateFormData,     // Mettre à jour les champs du formulaire
  submitForm,         // Soumettre le formulaire
  resetForm           // Réinitialiser après envoi
} from '../../store/slices/contactSlice';
import Button from '../../components/Button/Button';
import styles from './Contact.module.scss';

function Contact() {  
  const dispatch = useDispatch();
  
  const { 
    currentStep,      
    formData,         
    validationErrors, 
    isSubmitting,     
    submitSuccess     
  } = useSelector((state) => state.contact);
  
  const handleInputChange = (field, value) => {    
    dispatch(updateFormData({ 
      [field]: value
    }));
  };
  
  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        errors.name = 'Le nom est requis';
      }
      if (!formData.email.trim()) {
        errors.email = 'L\'email est requis';
      } 
      else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email invalide';
      }
      if (!formData.subject.trim()) {
        errors.subject = 'Le sujet est requis';
      }
    }

    if (step === 2) {
      if (!formData.message.trim()) {
        errors.message = 'Le message est requis';
      } 
      else if (formData.message.trim().length < 10) {
        errors.message = 'Le message doit faire au moins 10 caractères';
      }
    }
    return Object.keys(errors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      dispatch(nextStep());
    } else {
      alert('Veuillez remplir tous les champs correctement');
    }
  };
  
  const handlePrev = () => {
    dispatch(prevStep());
  };
  
  const handleSubmit = () => {
    dispatch(submitForm());
    setTimeout(() => {
      console.log('Formulaire envoyé :', formData);
      dispatch(nextStep());
    }, 2000);
  };
  
  const handleReset = () => {
    dispatch(resetForm());
  };
  
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Contactez-moi</h2>
          <p className={styles.subtitle}>
            Une question ? Un projet ? N'hésitez pas à me contacter !
          </p>
        </div>
        
        <div className={styles.stepper}>
          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step}
              className={`
                ${styles.step} 
                ${currentStep === step ? styles.active : ''}
                ${currentStep > step ? styles.completed : ''}
              `}
            >
              <div className={styles.stepCircle}>
                {currentStep > step ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step
                )}
              </div>
              
              <div className={styles.stepLabel}>
                {step === 1 && 'Infos'}
                {step === 2 && 'Message'}
                {step === 3 && 'Vérification'}
                {step === 4 && 'Succès'}
              </div>
              
              {step < 4 && <div className={styles.stepLine}></div>}
            </div>
          ))}
        </div>
        
        <div className={styles.form}>
          
          {currentStep === 1 && (
            <div className={styles.formStep}>
              <h3 className={styles.formTitle}>Vos informations</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="name">Nom complet *</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={validationErrors.name ? styles.error : ''}
                />
                {validationErrors.name && (
                  <span className={styles.errorMessage}>{validationErrors.name}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={validationErrors.email ? styles.error : ''}
                />
                {validationErrors.email && (
                  <span className={styles.errorMessage}>{validationErrors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Sujet *</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Objet de votre message"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={validationErrors.subject ? styles.error : ''}
                />
                {validationErrors.subject && (
                  <span className={styles.errorMessage}>{validationErrors.subject}</span>
                )}
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className={styles.formStep}>
              <h3 className={styles.formTitle}>Votre message</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  rows="8"
                  placeholder="Décrivez votre projet ou votre demande..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={validationErrors.message ? styles.error : ''}
                />
                {validationErrors.message && (
                  <span className={styles.errorMessage}>{validationErrors.message}</span>
                )}
                
                <div className={styles.charCount}>
                  {formData.message.length} / 500 caractères
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className={styles.formStep}>
              <h3 className={styles.formTitle}>Vérifiez vos informations</h3>
              
              <div className={styles.summary}>
                <div className={styles.summaryItem}>
                  <strong>Nom :</strong>
                  <span>{formData.name}</span>
                </div>
                <div className={styles.summaryItem}>
                  <strong>Email :</strong>
                  <span>{formData.email}</span>
                </div>
                <div className={styles.summaryItem}>
                  <strong>Sujet :</strong>
                  <span>{formData.subject}</span>
                </div>
                <div className={styles.summaryItem}>
                  <strong>Message :</strong>
                  <span>{formData.message}</span>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className={styles.formStep}>
              <div className={styles.success}>
                <div className={styles.successIcon}>✅</div>
                
                <h3 className={styles.successTitle}>Message envoyé !</h3>
                <p className={styles.successText}>
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
                
                <Button variant="primary" onClick={handleReset}>
                  Envoyer un autre message
                </Button>
              </div>
            </div>
          )}
          
          {currentStep < 4 && (
            <div className={styles.actions}>
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrev}
                  disabled={isSubmitting}
                >
                  Précédent
                </Button>
              )}

              {currentStep < 3 ? (
                <Button 
                  variant="primary" 
                  onClick={handleNext}
                >
                  Suivant
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </Button>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default Contact;