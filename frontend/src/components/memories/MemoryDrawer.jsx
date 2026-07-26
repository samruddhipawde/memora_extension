import "./MemoryDrawer.css";
import { X } from "lucide-react";

const MemoryDrawer = ({ open, memory, onClose }) => {

  if (!open || !memory) return null;

  return (

    <div className="drawer-overlay">

      <div className="drawer">

        <div className="drawer-header">

          <h2>{memory.title}</h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>

        </div>

        <div className="drawer-body">

          <h4>AI Summary</h4>

          <p>{memory.ai_summary || "No summary available."}</p>

          <h4>Content</h4>

          <p>{memory.content || "No content."}</p>

          <h4>Website</h4>

          <a
            href={memory.url}
            target="_blank"
            rel="noreferrer"
          >
            {memory.url}
          </a>

          <h4>Domain</h4>

          <p>{memory.domain}</p>

          <h4>Reading Time</h4>

          <p>{memory.reading_time} min</p>

          <h4>Visits</h4>

          <p>{memory.visit_count}</p>

        </div>

      </div>

    </div>

  );

};

export default MemoryDrawer;