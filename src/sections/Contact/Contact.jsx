// Contact section
import { useState } from 'react';
import FormModal from '../../components/FormModal/FormModal';
import styles from './Contact.module.scss';

function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        
        <h2 className={styles.title}>[ Contactez-moi ]</h2>
        
        <button 
          className={styles.openButton}
          onClick={handleOpenModal}
        >
          Parlons de votre projet
        </button>

        <p className={styles.email}>
          lewis.bock@gmail.com
        </p>

      </div>

      {/* Modal de contact avec formulaire stepper */}
      <FormModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

export default Contact;
