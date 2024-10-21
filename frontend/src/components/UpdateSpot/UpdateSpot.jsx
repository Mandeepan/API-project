import './UpdateSpot.css'

// export default function UpdateSpot(){
//     return <h1>UPDATE PAGE</h1>
// }


import { useDispatch, useSelector  } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import { useState , useEffect} from 'react';
import { updateSpotThunk , addSpotImageThunk, getSpotDetailThunk } from "../../store/spots";
import PageNotFound from "../PageNotFound";

export default function UpdateSpot(){
    const dispatch =useDispatch();
    const navigate =useNavigate();
    const { spotId } = useParams();
    const spotDetail = useSelector((state) => state.spots.spotDetailState[spotId]);
    const [errors,setErrors]=useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        country: '',
        address: '',
        city: '',
        state: '',
        description: '',
        title: '',
        price: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
    });
    
    useEffect(() => {
		dispatch(getSpotDetailThunk(spotId));
	}, [dispatch,spotId]);
    
    console.log("=========SPOT DETAIL==========")
    console.log(spotDetail)
    
    useEffect(() => {
        if (spotDetail){
            const defaultUrl ="/images/sampleSpotImage.png"; 
            let currentSpotImages = {
                image1:defaultUrl,
                image2:'',
                image3:'',
                image4:'',
                image5:'',
            };
            if (spotDetail.SpotImages) {
                let indexOfNonPreviewImage=2;
                spotDetail.SpotImages.forEach(eachImage => {
                    if (eachImage.preview){
                        currentSpotImages.image1=eachImage.url
                    } else{
                        currentSpotImages[`image${indexOfNonPreviewImage.toString()}`] =eachImage.url;
                        indexOfNonPreviewImage++;
                    }
                })
            }


            setFormData({
                country: spotDetail.country,
                address: spotDetail.address,
                city: spotDetail.city,
                state: spotDetail.state,
                description: spotDetail.description,
                title: spotDetail.name,
                price: spotDetail.price,
                ...currentSpotImages
            });
        } 
    },[spotDetail])
        

    const handleChange = (e) => {
        if (e.target.name ==='price') {
            setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
        } else{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
		
	};

	useEffect(() => {
		const newErrors = {};
		if (!formData.country) newErrors.country = 'Country is required';
		if (!formData.address) newErrors.address = 'Street Address is required';
		if (!formData.city) newErrors.city = 'City is required';
		if (!formData.state) newErrors.state = 'State is required';
		if (formData.description.length < 30)
			newErrors.description = 'Description needs 30 or more characters';
		if (!formData.title) newErrors.title= 'Name is required';
		if (!formData.price) newErrors.price = 'Price per night is required';
		if (!formData.image1) newErrors.image1 = 'Preview Image URL is required';
		setErrors(newErrors);
	}, [formData]);


    const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmitted(true);

        const newSpot = {
			country: formData.country,
			address: formData.address,
			city: formData.city,
			state: formData.state,
			description: formData.description,
			name: formData.title,
			price: formData.price,
            lat:'0.0000000',
            lng:'0.0000000', // placeholder : as this function will be developed after basic functions completed.
		};

        const newSpotResponse = await dispatch(updateSpotThunk(spotId,newSpot));


        //if backend process failed, return a 404 Page Not Found page
        if (newSpotResponse.message) {
            return <>
                <PageNotFound />
                <p>Failed to fetch from API due to</p>
                <p>{newSpotResponse.message}</p>
            </>
        }

        // update the image to the backend ReviewImage table
        if (newSpotResponse) {
			const images = [
				{ url: formData.image1, preview: true },
				{ url: formData.image2, preview: false },
				{ url: formData.image3, preview: false },
				{ url: formData.image4, preview: false },
				{ url: formData.image5, preview: false },
			].filter((image) => image.url);

			await Promise.all(
				images.map((image) => dispatch(addSpotImageThunk(newSpotResponse.id, image)))
			);

			navigate(`/spots/${newSpotResponse.id}`)
		}

        
    }

   

    return (
        <form className="create-spot-form-container" action='POST' onSubmit={handleSubmit}>
            <h1 className="form-title">Update your Spot</h1>
            {/* section 1 spot info */}
            <div className="section">
                <div className="section-header">
                    <h3>Where&apos;s your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                </div>
                <label>
                    Country
                    <input type='text' name='country' placeholder="Country" value={formData.country} onChange={handleChange}>
                    </input>
                    {hasSubmitted && errors.country && (<p className='error'>{errors.country}</p>)}
                </label>
                <label>
                    Street Address
                    <input type='text'  name='address' placeholder="Address" value={formData.address} onChange={handleChange}>
                    </input>
                    {hasSubmitted && errors.address && (<p className='error'>{errors.address}</p>)}
                </label>
                <div className="row-constrainer">
                    <label>
                        City
                        <input type='text' name='city' placeholder="City" value={formData.city} onChange={handleChange}>
                        </input>
                        {hasSubmitted && errors.city && (<p className='error'>{errors.city}</p>)}
                    </label>
                    <h4>,</h4>
                    <label>
                        State
                        <input type='text' name='state'  placeholder="State" value={formData.state} onChange={handleChange}>
                        </input>
                        {hasSubmitted && errors.state && (<p className='error'>{errors.state}</p>)}
                    </label>
                </div>
            </div>
            {/* section 2 spot description */}
            <div className="section">
                <div className="section-header">
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                </div>
                <label>
                    <input type='text' name='description'  placeholder="Please write at least 30 characters" className="description-input" value={formData.description} onChange={handleChange}>
                    </input>
                    {hasSubmitted && errors.description && (<p className='error'>{errors.description}</p>)}
                </label>
            </div>
            {/* section 3 spot name */}
            <div className="section">
                <div className="section-header">
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                </div>
                <label>
                    <input type='text' name='title' placeholder="Name of your spot" value={formData.title} onChange={handleChange}>
                    </input>
                    {hasSubmitted && errors.title && (<p className='error'>{errors.title}</p>)}
                </label>
            </div>
            {/* section 4 spot price */}
            <div className="section">
                <div className="section-header">
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                </div>
                <div className="price-row">
                    <label>$</label>
                    <input type='text' name='price'  placeholder="Price per night (USD)" value={formData.price} onChange={handleChange}>
                    </input>
                </div>
                {hasSubmitted && errors.price && (<p className='error'>{errors.price}</p>)}
            </div>
            {/* section 5 spot photos */}
            <div className="section">
                <div className="section-header">
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                </div>
                <div className="photo-container">
                    <input type='url'  name='image1' placeholder="Preview Image URL" value={formData.image1} onChange={handleChange}></input>
                    {hasSubmitted && errors.image1 && (<p className='error'>{errors.image1}</p>)}
                    <input type='url'  name='image2' placeholder="Image URL" value={formData.image2} onChange={handleChange}></input>
                    <input type='url'  name='image3' placeholder="Image URL" value={formData.image3} onChange={handleChange}></input>
                    <input type='url'  name='image4' placeholder="Image URL" value={formData.image4} onChange={handleChange}></input>
                    <input type='url'  name='image5' placeholder="Image URL" value={formData.image5} onChange={handleChange}></input>
                </div>
            </div>
            {/* submit button */}
            <button type="submit" className="create-spot-submit-button" >Update your Spot</button>
        </form>
    )
}

