import { useEffect, useRef, useState } from "react";

const codeSnippets = [
  "import tensorflow as tf",
  "model.fit(X_train, y_train)",
  "from sklearn.ensemble import RandomForestClassifier",
  "pipeline = Pipeline([('scaler', StandardScaler())])",
  "optimizer = Adam(lr=0.001)",
  "torch.nn.Linear(128, 64)",
  "model.compile(loss='binary_crossentropy')",
  "cross_val_score(clf, X, y, cv=5)",
  "from transformers import AutoModel",
  "tokenizer = AutoTokenizer.from_pretrained()",
  "embeddings = model.encode(texts)",
  "result = chain.invoke(prompt)",
  "from langchain.llms import OpenAI",
  "response = openai.ChatCompletion.create()",
  "clf = XGBClassifier(n_estimators=100)",
  "history = model.fit(epochs=50)",
  "model.save('best_model.h5')",
  "pca = PCA(n_components=2)",
  "vectorizer = TfidfVectorizer()",
  "scaler.fit_transform(X_train)",
];

const sqlSnippets = [
  "SELECT * FROM users WHERE active = 1",
  "CREATE TABLE predictions (",
  "DROP TABLE IF EXISTS temp;",
  "INSERT INTO metrics VALUES (...)",
  "JOIN models ON m.id = p.model_id",
  "GROUP BY category HAVING count > 5",
  "UPDATE dashboard SET status = 'live'",
  "SELECT AVG(accuracy) FROM experiments",
  "WHERE prediction_score > 0.85",
  "ORDER BY created_at DESC LIMIT 100",
];

const aiTerms = [
  "◆ Neural Network Layer: Dense(256)",
  "◇ Accuracy: 97.8% | F1: 0.94",
  "▸ Training: Epoch 48/50",
  "◈ Loss: 0.0234 ↓ converging",
  "◉ GPU: CUDA 12.1 active",
  "▹ Batch size: 32 | LR: 1e-4",
  "◆ Transformer: 12 heads, 768 dim",
  "◇ Recall: 0.96 | Precision: 0.93",
  "▸ Dataset: 150,000 samples loaded",
  "◈ Feature importance: top 12 selected",
  "◉ Model: RandomForest → 94.2%",
  "▹ Hyperparameter tuning: complete",
];

const workflowSnippets = [
  "→ Data Ingestion → Cleaning → EDA",
  "→ Feature Engineering → Selection",
  "→ Model Training → Evaluation",
  "→ Deploy → Monitor → Retrain",
  "docker build -t ml-api .",
  "kubectl apply -f deploy.yaml",
  "git push origin main",
  "uvicorn.run(app, host='0.0.0.0')",
  "app.route('/predict', methods=['POST'])",
  "from fastapi import FastAPI",
  "streamlit run dashboard.py",
  "mlflow.log_metric('accuracy', 0.95)",
];

const dashboardMetrics = [
  "┌─ Revenue Prediction ─────┐",
  "│ ▲ +23% MoM Growth        │",
  "│ Users: 12.4K active      │",
  "│ Churn Risk: 4.2% ↓       │",
  "└──────────────────────────┘",
  "┌─ Model Performance ──────┐",
  "│ AUC-ROC: 0.967           │",
  "│ Inference: 12ms/req      │",
  "│ Uptime: 99.97%           │",
  "└──────────────────────────┘",
  "KPI ▸ CAC: $24 | LTV: $380",
  "Pipeline: 3 models active",
  "API calls: 1.2M this week",
  "Data freshness: 4 min ago",
];

const allSnippets = [
  ...codeSnippets,
  ...sqlSnippets,
  ...aiTerms,
  ...workflowSnippets,
  ...dashboardMetrics,
];

function CodeRain({ theme: _theme }) {
  const containerRef = useRef(null);
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 6 : 14;

    const generated = Array.from({ length: count }, (_, i) => {
      const shuffled = [...allSnippets].sort(() => Math.random() - 0.5);
      const lines = shuffled.slice(0, 10 + Math.floor(Math.random() * 6));
      return {
        id: i,
        left: `${3 + (i * (94 / count)) + (Math.random() - 0.5) * 2}%`,
        duration: `${16 + Math.random() * 14}s`,
        delay: `${-Math.random() * 20}s`,
        opacity: isMobile ? 0.08 + Math.random() * 0.05 : 0.1 + Math.random() * 0.07,
        lines,
      };
    });

    setStreams(generated);
  }, []);

  if (streams.length === 0) return null;

  return (
    <div className="code-rain" ref={containerRef} aria-hidden="true">
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="code-stream"
          style={{
            left: stream.left,
            animationDuration: stream.duration,
            animationDelay: stream.delay,
            opacity: stream.opacity,
          }}
        >
          {stream.lines.map((line, i) => (
            <span
              key={i}
              className={`code-line ${i === 0 ? "code-line-glow" : ""} ${line.startsWith("◆") || line.startsWith("◇") || line.startsWith("▸") || line.startsWith("◈") || line.startsWith("◉") || line.startsWith("▹") ? "code-line-metric" : ""} ${line.startsWith("┌") || line.startsWith("│") || line.startsWith("└") ? "code-line-box" : ""} ${line.startsWith("→") ? "code-line-flow" : ""}`}
            >
              {line}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CodeRain;
