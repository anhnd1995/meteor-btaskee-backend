import React from 'react'

export default function TransactionDetail() {
    return (<div className="transaction">
    {/* Button trigger modal */}
    <a data-toggle="modal" href="#transaction-modal" className="text-primary">See Transaction History</a>
    {/* Modal */}
    <div className="modal fade" id="transaction-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    {/* {renderPopupHeader(type)} */}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    {/* {renderPopupContent(type, current, option)} */}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>

)
}
