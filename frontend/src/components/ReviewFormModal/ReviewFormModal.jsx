import { useModal } from '../../context/ModalContext/Modal'
import { FaStar } from 'react-icons/fa';
import {useState} from 'react'
import './ReviewFormModal.css'

export default function ReviewFormModal (){
    const [hoverValue, setHoverValue] = useState(0);
    const [selectedValue, setSelectedValue] = useState(0);
    const [reviewContent, setReviewContent]=useState("")

    const handleMouseOver = (value) => {setHoverValue(value);};
    const handleMouseLeave = () => {setHoverValue(0);};
    const handleClick = (value) => {setSelectedValue(value);};

    const { closeModal } = useModal()
    return (
    <form className="create-review-form" >
         <h1 className="review-form-title">How was your stay?</h1>
         <input type='text' 
                className="review-form-input" 
                placeholder='Leave your review here'
                value={reviewContent}
				onChange={(e) => setReviewContent(e.target.value)}
                required>
        </input>
         <div className='review-star-container'>
            <div className="star-rating">
                    {Array.of(1,2,3,4,5).map((_, index) => {
                        const value = index + 1;
                        return (
                            <FaStar
                            key={index}
                            size={30}
                            className={`star ${value <= (hoverValue || selectedValue) ? 'filled' : 'empty'}`}
                            onMouseOver={() => handleMouseOver(value)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(value)}
                            />
                        );
                    })}
            </div>
            <label><strong> Stars</strong></label>
         </div>
         <button className="review-submit-button" onClick={closeModal} disabled={reviewContent.length<10 || !selectedValue}>Submit Your Review</button>
    </form> 
    )

}