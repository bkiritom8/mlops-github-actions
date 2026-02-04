#!/usr/bin/env python3
"""Script to run the training pipeline."""
import argparse
import sys
from pathlib import Path

# Ensure src is in path for both installed and development mode
_script_dir = Path(__file__).parent.resolve()
_project_root = _script_dir.parent
if str(_project_root) not in sys.path:
    sys.path.insert(0, str(_project_root))

from src.pipelines.training_pipeline import TrainingPipeline  # noqa: E402
from src.utils.metrics_reporter import MetricsReporter  # noqa: E402


def main():
    parser = argparse.ArgumentParser(description="Run MLOps training pipeline")
    parser.add_argument(
        "--dataset",
        type=str,
        default="classification",
        choices=["classification", "iris", "wine"],
        help="Dataset type to use",
    )
    parser.add_argument(
        "--model",
        type=str,
        default="random_forest",
        choices=["random_forest", "gradient_boosting", "logistic_regression", "svm"],
        help="Model type to train",
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default="models/artifacts",
        help="Output directory for artifacts",
    )
    parser.add_argument(
        "--skip-validation",
        action="store_true",
        help="Skip data validation step",
    )
    parser.add_argument(
        "--update-dashboard",
        action="store_true",
        help="Update dashboard data after training",
    )

    args = parser.parse_args()

    # Run pipeline
    pipeline = TrainingPipeline(output_dir=args.output_dir)
    results = pipeline.run(
        dataset_type=args.dataset,
        model_type=args.model,
        run_validation=not args.skip_validation,
    )

    # Update dashboard if requested
    if args.update_dashboard:
        reporter = MetricsReporter()
        metrics = reporter.collect_pipeline_metrics(args.output_dir)
        dashboard_data = reporter.generate_dashboard_data(metrics)
        reporter.save_dashboard_data(dashboard_data)
        print("\nDashboard data updated!")

    # Return exit code based on pipeline status
    if results.get("status") == "completed":
        print("\nPipeline completed successfully!")
        print(f"Run ID: {results['run_id']}")
        return 0
    else:
        print("\nPipeline failed!")
        return 1


if __name__ == "__main__":
    sys.exit(main())
