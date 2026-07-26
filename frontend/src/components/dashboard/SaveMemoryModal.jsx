import "./SaveMemoryModal.css";

import { useState } from "react";
import { X, Globe, FileText, Link2 } from "lucide-react";
import toast from "react-hot-toast";

import { saveMemory } from "../../services/memoryService";

const SaveMemoryModal = ({ open, onClose, onSaved }) => {

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSave = async () => {

    if (!title.trim() || !url.trim() || !content.trim()) {

      toast.error("Please fill all fields");

      return;

    }

    try {

      setLoading(true);

      await saveMemory({

        title,

        url,

        favicon: `https://www.google.com/s2/favicons?domain=${url}`,

        raw_content: content,

      });

      toast.success("🎉 Memory Saved Successfully");

      setTitle("");
      setUrl("");
      setContent("");

      onSaved?.();

      onClose();

    } catch (err) {

      console.error(err);

      toast.error("Failed to save memory");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="save-modal-overlay">

      <div className="save-modal">

        <button

          className="close-btn"

          onClick={onClose}

        >

          <X size={20}/>

        </button>

        <h2>

          Save New Memory

        </h2>

        <p>

          Store knowledge directly into your AI Memory.

        </p>

        <div className="input-group">

          <FileText size={18}/>

          <input

            placeholder="Memory Title"

            value={title}

            onChange={(e)=>setTitle(e.target.value)}

          />

        </div>

        <div className="input-group">

          <Link2 size={18}/>

          <input

            placeholder="https://example.com"

            value={url}

            onChange={(e)=>setUrl(e.target.value)}

          />

        </div>

        <div className="input-group textarea">

          <Globe size={18}/>

          <textarea

            rows="8"

            placeholder="Paste article, notes or any content..."

            value={content}

            onChange={(e)=>setContent(e.target.value)}

          />

        </div>

        <div className="modal-actions">

          <button

            className="cancel-btn"

            onClick={onClose}

          >

            Cancel

          </button>

          <button

            className="save-btn-modal"

            disabled={loading}

            onClick={handleSave}

          >

            {

              loading

              ?

              "Saving..."

              :

              "Save Memory"

            }

          </button>

        </div>

      </div>

    </div>

  );

};

export default SaveMemoryModal;