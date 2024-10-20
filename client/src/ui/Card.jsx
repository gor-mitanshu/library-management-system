import { faPencilAlt, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({
     title,
     editMode,
     addBtn,
     addBtnTitle,
     handleEditClick,
     handleCancelClick,
     children,
     handleAdd
}) => {
     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-2">{ title }</h5>
                    { editMode !== undefined ? (
                         editMode ? (
                              <button
                                   className="btn btn-link edit-button"
                                   onClick={ handleCancelClick }
                                   type="button"
                              >
                                   <FontAwesomeIcon icon={ faTimes } size="lg" color="#ec5d5d" />
                              </button>
                         ) : (
                              <button
                                   type="button"
                                   className="btn btn-link edit-button"
                                   onClick={ handleEditClick }
                              >
                                   <FontAwesomeIcon
                                        icon={ faPencilAlt }
                                        size="lg"
                                        color="rgb(25, 113, 114)"
                                   />
                              </button>
                         )
                    ) : null }
                    { addBtn ? (
                         <button className="btn btn-outline-primary" onClick={ handleAdd }>
                              <FontAwesomeIcon icon={ faPlus } /> { addBtnTitle }
                         </button>
                    ) : null }
               </div>
               <div className="card-body">{ children }</div>
          </div>
     );
};

export default Card;