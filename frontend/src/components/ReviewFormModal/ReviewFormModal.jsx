import { useModal } from '../../context/ModalContext/Modal'
import { FaStar } from 'react-icons/fa';
import {useEffect, useState} from 'react'
import './ReviewFormModal.css'

export default function ReviewFormModal ({spotId}){
    const [hoverValue, setHoverValue] = useState(0);
    const [selectedValue, setSelectedValue] = useState(0);
    const [reviewContent, setReviewContent]=useState("")
    const [errors, setErrors] = useState({});

    const handleMouseOver = (value) => {setHoverValue(value);};
    const handleMouseLeave = () => {setHoverValue(0);};
    const handleClick = (value) => {setSelectedValue(value);};

    const { closeModal } = useModal()

    useEffect(()=>{
        const newErrors = {};
		if (reviewContent && reviewContent.length < 10)
			newErrors.review = 'Review must be at least 10 characters long';
		if (hoverValue !==0 && selectedValue < 1 )
			newErrors.stars = 'Stars must be between 1 and 5';

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
    }, [reviewContent,selectedValue])

    
	const handleSubmit = async (e) => {
		e.preventDefault();
		// await dispatch(addAReview({ review, stars }, spotId));
		closeModal();
	};

    return (
    <form className="create-review-form" onSubmit={handleSubmit}>
         <h1 className="review-form-title">How was your stay?</h1>
         <input type='text' 
                className="review-form-input" 
                placeholder='Leave your review here'
                value={reviewContent}
				onChange={(e) => setReviewContent(e.target.value)}
                required>
        </input>
        {errors.review && <p className='error'>{errors.review}</p>}
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
         {errors.stars && <p className='error'>{errors.stars}</p>}
         <button className="review-submit-button" onClick={closeModal} disabled={reviewContent.length<10 || !selectedValue}>Submit Your Review</button>
    </form> 
    )

}