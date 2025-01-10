# MLOps GitHub Actions

End-to-end Machine Learning Operations (MLOps) pipeline with automated CI/CD, model training, evaluation, and deployment using GitHub Actions.

**[View Live Dashboard](https://bkiritom8.github.io/mlops-github-actions/)**

## Features

- **Automated ML Pipeline**: Complete data processing, training, and evaluation pipeline
- **CI/CD Integration**: Automated testing, linting, and deployment with GitHub Actions
- **Multiple Model Support**: Random Forest, Gradient Boosting, Logistic Regression, SVM
- **Data Validation**: Schema validation, quality checks, and distribution analysis
- **Experiment Tracking**: Metrics logging, artifact versioning, and run comparison
- **Model Serving**: Production-ready inference pipeline with batch and real-time predictions
- **Monitoring**: Continuous model health checks and performance monitoring
- **Interactive Dashboard**: GitHub Pages hosted dashboard showing real-time metrics

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/bkiritom8/mlops-github-actions.git
cd mlops-github-actions

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
pip install -e .
```

### Run Training Pipeline

```bash
# Run with default settings (classification dataset, random forest)
python scripts/run_training.py

# Run with specific configuration
python scripts/run_training.py --dataset iris --model gradient_boosting

# Run and update dashboard
python scripts/run_training.py --update-dashboard
```

### Run Tests

```bash
# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ --cov=src --cov-report=html
```

## Project Structure

```
mlops-github-actions/
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI pipeline (testing, linting)
│       ├── train.yml           # ML training pipeline
│       ├── deploy-pages.yml    # GitHub Pages deployment
│       └── model-monitoring.yml # Model monitoring
├── src/
│   ├── data/
│   │   ├── loader.py          # Data loading utilities
│   │   ├── preprocessor.py    # Data preprocessing
│   │   └── validator.py       # Data validation
│   ├── models/
│   │   ├── trainer.py         # Model training
│   │   └── evaluator.py       # Model evaluation
│   ├── pipelines/
│   │   ├── training_pipeline.py   # End-to-end training
│   │   └── inference_pipeline.py  # Production inference
│   └── utils/
│       └── metrics_reporter.py    # Dashboard data generation
├── docs/                      # GitHub Pages website
│   ├── index.html
│   └── assets/
├── tests/                     # Test suite
├── scripts/                   # Utility scripts
├── configs/                   # Configuration files
├── data/                      # Data directory
└── models/                    # Model artifacts
```

## GitHub Actions Workflows

### CI Pipeline (`ci.yml`)
- Runs on push to main/develop branches and pull requests
- Multi-Python version testing (3.9, 3.10, 3.11)
- Code quality checks (flake8, black)
- Test coverage reporting

### Training Pipeline (`train.yml`)
- Manual trigger with configurable dataset and model type
- Scheduled training (weekly on Sundays)
- Automatic dashboard data update
- Model artifact storage

### Deploy Pages (`deploy-pages.yml`)
- Automatic deployment on changes to docs/
- Triggers after training pipeline completion
- Updates live dashboard with latest metrics

### Model Monitoring (`model-monitoring.yml`)
- Daily health checks
- Performance threshold monitoring
- Model age tracking
- Alerting on degradation

## Usage Examples

### Python API

```python
from src.pipelines.training_pipeline import TrainingPipeline

# Run training pipeline
pipeline = TrainingPipeline()
results = pipeline.run(
    dataset_type="classification",
    model_type="random_forest",
)

print(f"Accuracy: {results['evaluation_metrics']['accuracy']:.4f}")
```

### Inference

```python
from src.pipelines.inference_pipeline import InferencePipeline

# Load trained model
pipeline = InferencePipeline(
    model_path="models/artifacts/model_20240115.joblib",
    preprocessor_path="models/artifacts/preprocessor_20240115.joblib"
)

# Make predictions
result = pipeline.predict({
    "feature_0": 1.5,
    "feature_1": -0.3,
    # ... more features
})

print(f"Prediction: {result['predictions']}")
```

### Trigger Training via GitHub Actions

1. Go to **Actions** tab in the repository
2. Select **ML Training Pipeline** workflow
3. Click **Run workflow**
4. Select dataset type and model type
5. Click **Run workflow** button

## Supported Models

| Model | Description |
|-------|-------------|
| `random_forest` | Random Forest Classifier |
| `gradient_boosting` | Gradient Boosting Classifier |
| `logistic_regression` | Logistic Regression |
| `svm` | Support Vector Machine |

## Supported Datasets

| Dataset | Description |
|---------|-------------|
| `classification` | Synthetic binary classification (1000 samples, 20 features) |
| `iris` | Iris flower dataset (150 samples, 4 features, 3 classes) |
| `wine` | Wine recognition dataset (178 samples, 13 features, 3 classes) |

## Metrics Tracked

- **Accuracy**: Overall prediction accuracy
- **Precision**: Positive predictive value
- **Recall**: Sensitivity/True positive rate
- **F1 Score**: Harmonic mean of precision and recall
- **ROC AUC**: Area under the ROC curve
- **Confusion Matrix**: Detailed classification breakdown

## Configuration

Edit `configs/config.yaml` to customize:

```yaml
data:
  train_split: 0.8
  validation_split: 0.1
  test_split: 0.1

model:
  type: "random_forest"
  hyperparameters:
    n_estimators: 100
    max_depth: 10

evaluation:
  metrics:
    - accuracy
    - precision
    - recall
    - f1_score
    - roc_auc
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Technologies

- **Python 3.9+**
- **scikit-learn** - Machine learning
- **pandas** - Data manipulation
- **NumPy** - Numerical computing
- **pytest** - Testing
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Dashboard hosting
