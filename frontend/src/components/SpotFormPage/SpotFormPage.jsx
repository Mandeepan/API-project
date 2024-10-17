import "./SpotFormPage.css";

export default function SpotFormPage(){
    return (
        <div className="create-spot-form-container">
            <h1 className="form-title">Create a New Spot</h1>
            {/* section 1 spot info */}
            <div className="section">
                <div className="section-header">
                    <h3>Where&apos;s your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                </div>
                <label>
                    Country
                    <input type='text' placeholder="Country">
                    </input>
                </label>
                <label>
                    Street Address
                    <input type='text' placeholder="Address">
                    </input>
                </label>
                <div className="row-constrainer">
                    <label>
                        City
                        <input type='text' placeholder="City">
                        </input>
                    </label>
                    <h4> , </h4>
                    <label>
                        State
                        <input type='text' placeholder="State">
                        </input>
                    </label>
                </div>
                <div className="row-constrainer">
                    <label>
                        Latitude
                        <input type='text' placeholder="Latitude">
                        </input>
                    </label>
                    <h4> , </h4>
                    <label>
                        Longitude
                        <input type='text' placeholder="Longitude">
                        </input>
                    </label>
                </div>
            </div>
            {/* section 2 spot description */}
            <div className="section">
                <div className="section-header">
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                </div>
                <label>
                    <input type='text' placeholder="Please write at least 30 characters" className="description-input">
                    </input>
                </label>
            </div>
            {/* section 3 spot name */}
            <div className="section">
                <div className="section-header">
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                </div>
                <label>
                    <input type='text' placeholder="Name of your spot">
                    </input>
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
                    <input type='text' placeholder="Price per night (USD)">
                    </input>
                </div>
            </div>
            {/* section 5 spot photos */}
            <div className="section">
                <div className="section-header">
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                </div>
                <div className="photo-container">
                    <input type='text' placeholder="Preview Image URL"></input>
                    <input type='text' placeholder="Image URL"></input>
                    <input type='text' placeholder="Image URL"></input>
                    <input type='text' placeholder="Image URL"></input>
                    <input type='text' placeholder="Image URL"></input>
                </div>
            </div>
            {/* submit button */}
            <button type="submit" className="create-spot-submit-button">Create Spot</button>
        </div>
    )
}