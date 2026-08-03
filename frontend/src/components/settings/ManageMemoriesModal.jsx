import "./ManageMemoriesModal.css";

import {
  exportMemories,
  backupMemories,
  deleteAllMemories,
} from "../../services/memoryService";

const ManageMemoriesModal = ({ open, onClose }) => {

  if (!open) return null;

  const handleExport = async () => {
    try {
      const data = await exportMemories();

      const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        {
          type: "application/json",
        }
      );

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = "memora_export.json";

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.log(err);
      alert("Failed to export memories.");
    }
  };

  const handleBackup = async () => {
    try {

      const data = await backupMemories();

      const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        {
          type: "application/json",
        }
      );

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = "memora_backup.json";

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.log(err);
      alert("Failed to create backup.");
    }
  };

  const handleDeleteAll = async () => {

    const ok = window.confirm(
      "Delete all memories permanently?"
    );

    if (!ok) return;

    try {

      await deleteAllMemories();

      alert("All memories deleted successfully.");

      onClose();

      window.dispatchEvent(
        new Event("memoryUpdated")
      );

    } catch (err) {

      console.log(err);

      alert("Failed to delete memories.");

    }
  };

  return (

    <div className="modal-overlay">

      <div className="manage-modal">

        <h2>Manage Memories</h2>

        <p>Select an action for your memories.</p>

        <button
          className="manage-btn"
          onClick={handleExport}
        >
          Export Memories
        </button>

        <button
          className="manage-btn"
          onClick={handleBackup}
        >
          Download Backup
        </button>

        <button
          className="manage-btn danger"
          onClick={handleDeleteAll}
        >
          Delete All Memories
        </button>

        <button
    className="manage-close-btn"
    onClick={onClose}
>
    Close
</button>

      </div>

    </div>

  );

};

export default ManageMemoriesModal;