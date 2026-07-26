import "./CreateCollectionModal.css";

import { useState } from "react";

const CreateCollectionModal = ({
    open,
    onClose,
    onCreate
}) => {

    const [name,setName]=useState("");

    if(!open) return null;

    return(

        <div className="modal-overlay">

            <div className="modal-box">

                <h2>Create Collection</h2>

                <input

                    placeholder="Collection name"

                    value={name}

                    onChange={(e)=>setName(e.target.value)}

                />

                <div className="modal-actions">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="create-btn"
                        onClick={()=>{

                            onCreate(name);

                            setName("");

                        }}
                    >
                        Create
                    </button>

                </div>

            </div>

        </div>

    );

};

export default CreateCollectionModal;