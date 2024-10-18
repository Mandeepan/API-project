import { useModal } from '../../context/ModalContext/Modal';

export default function ReviewFormModal (){
    const { closeModal } = useModal();
    return (
    <form className="create-review-form" onClick={closeModal}>

         <h1>Review Form Modal</h1>
         <button> CLOSE THE MODEL</button>
    
    </form> 
    )
   
};