from setuptools import setup, find_packages

setup(
    name="mlops-github-actions",
    version="1.0.0",
    description="End-to-end MLOps demonstration with GitHub Actions",
    author="MLOps Team",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    python_requires=">=3.9",
    install_requires=[
        "numpy>=1.24.0",
        "pandas>=2.0.0",
        "scikit-learn>=1.3.0",
        "joblib>=1.3.0",
        "pyyaml>=6.0.0",
        "mlflow>=2.8.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.4.0",
            "pytest-cov>=4.1.0",
            "black>=23.0.0",
            "flake8>=6.1.0",
        ],
    },
)
