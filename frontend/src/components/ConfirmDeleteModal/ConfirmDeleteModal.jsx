import "./ConfirmDeleteModal.css"

function deleteSpotProcess(){
    return (
        <div className="delete-modal-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button className="delete-yes">Yes (Delete Spot)</button>
            <button className="delete-no">No (Keep Spot)</button>
        </div>
    )
}

function deleteReviewProcess(){
    return (
        <div className="delete-modal-container">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        <button className="delete-yes">Yes (Delete Review)</button>
        <button className="delete-no">No (Keep Review)</button>
    </div>
    )
}


export default  function ConfirmDeleteModal({itemToDelete}) {
    let response;
    itemToDelete==="SPOT" ? response = deleteSpotProcess()
    : response=deleteReviewProcess();
    return response;
}