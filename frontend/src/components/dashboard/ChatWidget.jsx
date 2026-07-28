import "./ChatWidget.css";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

import assistant from "../../assets/ai/assistant.png";
import { askAI } from "../../services/chatService";

const ChatWidget = () => {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {

    if (!question.trim()) return;

    setLoading(true);

    try {

      const data = await askAI(question);

      setAnswer(
        data.answer ||
        data.response ||
        data.message ||
        "No response."
      );

    } catch (err) {

      console.log(err);

      setAnswer(
        err?.response?.data?.detail ||
        err?.message ||
        "Unable to contact AI."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <motion.div
      className="chat-widget"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .5 }}
    >

      <div className="chat-header">

        <img
          src={assistant}
          alt="Assistant"
        />

        <h3>AI Assistant</h3>

      </div>

      <textarea
        placeholder="Ask anything about your memories..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={handleAsk}>

        <Send size={18} />

        Ask AI

      </button>

      {loading && (

        <div className="loading">
          Thinking...
        </div>

      )}

      {answer && (

        <div className="chat-answer">
          {answer}
        </div>

      )}

    </motion.div>

  );

};

export default ChatWidget;