import "./ConfirmDeleteModal.css"

function deleteSpotProcess(onConfirm, onCancel){
    return (
        <div className="delete-modal-container" data-testid='delete-spot-modal'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button className="delete-yes" onClick={onConfirm} data-testid='confirm-delete-spot-button'>Yes (Delete Spot)</button>
            <button className="delete-no" onClick={onCancel} data-testid='cancel-delete-spot-button'>No (Keep Spot)</button>
        </div>
    )
}

function deleteReviewProcess(onConfirm, onCancel){
    return (
        <div className="delete-modal-container" data-testid='delete-review-modal'>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        <button className="delete-yes" onClick={onConfirm} data-testid='confirm-delete-review-button'>Yes (Delete Review)</button>
        <button className="delete-no" onClick={onCancel} data-testid='cancel-delete-review-button'>No (Keep Review)</button>
    </div>
    )
}


export default  function ConfirmDeleteModal({itemToDelete,onConfirm, onCancel}) {
    let response;
    itemToDelete==="SPOT" ? response = deleteSpotProcess( onConfirm, onCancel )
    : response=deleteReviewProcess( onConfirm, onCancel );
    return response;
}