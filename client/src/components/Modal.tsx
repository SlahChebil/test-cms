import React, { useEffect, useState } from "react";

// Modal Component
interface IData {
  id : number,
  wordFirstLang: string,
  sentenceFirstLang: string,
  wordSecondLang: string,
  sentenceSecondLang: string,
};
const Modal = ({
  isOpen,
  onClose,
  rowData,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  rowData: IData; 
  onSave: (updatedData: IData) => void;
}) => {
  const [updatedData, setUpdatedData] = useState(rowData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };
  
  useEffect(() => {
    console.log("rowData",updatedData)
  },[updatedData, rowData])

  const handleSubmit = () => {
    onSave(updatedData); // Pass the updated data to parent component
    onClose(); // Close modal
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h3>Edit Row with the id {updatedData?.id}</h3>
          <label>
            Word (First Language):
            <input
              type="text"
              name="wordFirstLang"
              value={updatedData?.wordFirstLang}
              onChange={handleChange}
            />
          </label>
          <label>
            Sentence (First Language):
            <input
              type="text"
              name="sentenceFirstLang"
              value={updatedData?.sentenceFirstLang}
              onChange={handleChange}
            />
          </label>
          <label>
            Word (Second Language):
            <input
              type="text"
              name="wordSecondLang"
              value={updatedData?.wordSecondLang}
              onChange={handleChange}
            />
          </label>
          <label>
            Sentence (Second Language):
            <input
              type="text"
              name="sentenceSecondLang"
              value={updatedData?.sentenceSecondLang}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    )
  );
};

export default Modal;
