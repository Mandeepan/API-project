import { useModal } from '../../context/ModalContext/Modal'
import { FaStar } from 'react-icons/fa';
import {useEffect, useState} from 'react'
import './ReviewFormModal.css';
import { createReviewThunk } from '../../store/reviews';
import { useDispatch } from 'react-redux';

export default function ReviewFormModal ({spotId}){
    const dispatch =useDispatch();
    const [hoverValue, setHoverValue] = useState(0);
    const [selectedValue, setSelectedValue] = useState(0); // star selected value
    const [reviewContent, setReviewContent]=useState("")
    const [errors, setErrors] = useState({});

    const handleMouseOver = (value) => {setHoverValue(value);};
    const handleMouseLeave = () => {setHoverValue(0);};
    const handleClick = (value) => {setSelectedValue(value);};

    const { closeModal } = useModal()

    useEffect(()=>{
        const newErrors = {};
		if (reviewContent.length>0 && reviewContent.length < 10) {
            newErrors.review = 'Review must be at least 10 characters long'
        }
		if (hoverValue !==0 && selectedValue < 1 ) {
			newErrors.stars = 'Stars must be between 1 and 5';
        }
        setErrors(newErrors);
    }, [reviewContent,selectedValue,hoverValue])

    
	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(createReviewThunk({review: reviewContent,stars:selectedValue }, spotId));
		closeModal();
	};

    return (
    <form className="create-review-form" onSubmit={handleSubmit} data-testid='review-modal'>
         <h1 className="review-form-title">How was your stay?</h1>
         <input type='text' 
                className="review-form-input" 
                placeholder='Leave your review here...'
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
                            data-testid='review-star-clickable'
                            onClick={() => handleClick(value)}
                            />
                        );
                    })}
            </div>
            <label><strong> Stars</strong></label>
         </div>
         {errors.stars && <p className='error'>{errors.stars}</p>}
         <button type="submit" className="review-submit-button" disabled={reviewContent.length<10 || !selectedValue}>Submit Your Review</button>
    </form> 
    )

}