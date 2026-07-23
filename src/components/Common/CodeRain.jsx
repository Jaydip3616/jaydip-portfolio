import { useEffect, useRef, useState } from "react";

const snippets = [
  "import tensorflow as tf",
  "model.fit(X_train, y_train)",
  "SELECT * FROM users WHERE active = 1",
  "docker build -t app .",
  "git push origin main",
  "from sklearn.ensemble import RandomForestClassifier",
  "const App = () => <Component />",
  "pipeline = Pipeline([('scaler', StandardScaler())])",
  "response = openai.ChatCompletion.create()",
  "df.groupby('category').mean()",
  "plt.figure(figsize=(12, 6))",
  "optimizer = Adam(lr=0.001)",
  "kubectl apply -f deploy.yaml",
  "embeddings = model.encode(texts)",
  "accuracy_score(y_test, y_pred)",
  "pd.read_csv('dataset.csv')",
  "torch.nn.Linear(128, 64)",
  "vectorizer = TfidfVectorizer()",
  "CREATE TABLE predictions (",
  "npm install react-icons",
  "def train_model(data):",
  "history = model.fit(epochs=50)",
  "X_train, X_test = train_test_split()",
  "from transformers import AutoModel",
  "cursor.execute(query, params)",
  "app.route('/predict', methods=['POST'])",
  "confusion_matrix(y_true, y_pred)",
  "sns.heatmap(corr, annot=True)",
  "from langchain.llms import OpenAI",
  "st.title('ML Dashboard')",
  "model.compile(loss='binary_crossentropy')",
  "np.random.seed(42)",
  "DROP TABLE IF EXISTS temp;",
  "git checkout -b feature/ml-pipeline",
  "docker-compose up -d",
  "scaler.fit_transform(X_train)",
  "clf = XGBClassifier(n_estimators=100)",
  "tokenizer = AutoTokenizer.from_pretrained()",
  "result = chain.invoke(prompt)",
  "ax.set_xlabel('Predictions')",
  "from fastapi import FastAPI",
  "uvicorn.run(app, host='0.0.0.0')",
  "df.dropna(subset=['target'])",
  "loss: 0.0234 - accuracy: 0.9812",
  ">>> Epoch 48/50 completed",
  "conn = psycopg2.connect(DATABASE_URL)",
  "pca = PCA(n_components=2)",
  "model.save('best_model.h5')",
  "cross_val_score(clf, X, y, cv=5)",
  "spark.read.parquet('data/')",
];

function CodeRain({ theme: _theme }) {
  const containerRef = useRef(null);
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 6 : 12;

    const generated = Array.from({ length: count }, (_, i) => {
      const shuffled = [...snippets].sort(() => Math.random() - 0.5);
      const lines = shuffled.slice(0, 8 + Math.floor(Math.random() * 6));
      return {
        id: i,
        left: `${4 + (i * (92 / count)) + (Math.random() - 0.5) * 3}%`,
        duration: `${14 + Math.random() * 12}s`,
        delay: `${-Math.random() * 18}s`,
        opacity: isMobile ? 0.12 + Math.random() * 0.06 : 0.15 + Math.random() * 0.08,
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
            <span key={i} className={`code-line ${i === 0 ? "code-line-glow" : ""}`}>
              {line}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CodeRain;
