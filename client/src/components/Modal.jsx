import React, {useState} from "react";
import styles from './styles/Modal.module.css';
import perrito from "./images/perrito.jpg";

export default function Modal (){
    const [modal, setModal] = useState(false);
    
    const toggleModal = () => {
        setModal(!modal)
    }
    return (
        <>
        {modal && ( <div className={styles.modal_container}>
                      <div className={styles.overlay}>
                          <div className={styles.content}>
                          <button  className={styles.close} onClick={toggleModal}>x</button>
                            <img src={perrito} alt="" />
                            <div className={styles.modal_textos}>
                                <h2>Your dog was created successfully!</h2>
                                <p>Now go check out your dog at the home page.</p>

                            </div>
                            </div>
                      </div>
                      </div>  )}
        </>
    )
}