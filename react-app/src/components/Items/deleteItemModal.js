import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAnItemThunk } from "../../store/restaurant";

const DeleteModal = ({ id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const onDelete = async (e) => {
    e.preventDefault(e);
    dispatch(deleteAnItemThunk(id));
    closeModal();
  };

  return (
    <div>
      <h2>Delete Item</h2>
      <h4>Are you sure you want to delete this item?</h4>
      <button onClick={onDelete}>Yes (Delete Item)</button>
      <button onClick={closeModal}>No (Keep Item)</button>
    </div>
  );
};

export default DeleteModal;
