import "./PrivacyModal.css";
import {
  Shield,
  Lock,
  Database,
  Eye,
} from "lucide-react";

const PrivacyModal = ({ open, onClose }) => {

  if (!open) return null;

  return (
    <div className="modal-overlay">

      <div className="privacy-modal">

        <h2>Privacy & Security</h2>

        <div className="privacy-item">
          <Shield size={22} />
          <div>
            <h4>Secure Authentication</h4>
            <p>Your account is protected using JWT authentication.</p>
          </div>
        </div>

        <div className="privacy-item">
          <Lock size={22} />
          <div>
            <h4>Password Encryption</h4>
            <p>Passwords are securely hashed before being stored.</p>
          </div>
        </div>

        <div className="privacy-item">
          <Database size={22} />
          <div>
            <h4>Private Memory Storage</h4>
            <p>Your memories belong only to your account.</p>
          </div>
        </div>

        <div className="privacy-item">
          <Eye size={22} />
          <div>
            <h4>No Third-Party Sharing</h4>
            <p>Your personal information is never shared.</p>
          </div>
        </div>

        <button
    className="privacy-close-btn"
    onClick={onClose}
>
    Close
</button>

      </div>

    </div>
  );
};

export default PrivacyModal;