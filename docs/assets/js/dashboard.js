// MLOps Dashboard JavaScript

// Dashboard data management
class MLOpsDashboard {
    constructor() {
        this.data = null;
        this.init();
    }

    async init() {
        await this.loadData();
        this.updateUI();
        this.setupNavigation();
        this.animateOnScroll();
    }

    async loadData() {
        try {
            // Try to load dashboard data from JSON file
            const response = await fetch('assets/dashboard_data.json');
            if (response.ok) {
                this.data = await response.json();
                console.log('Dashboard data loaded:', this.data);
            } else {
                console.log('No dashboard data found, using demo data');
                this.data = this.getDemoData();
            }
        } catch (error) {
            console.log('Error loading data, using demo data:', error);
            this.data = this.getDemoData();
        }
    }

    getDemoData() {
        // Demo data for initial display
        return {
            generated_at: new Date().toISOString(),
            project: {
                name: "MLOps GitHub Actions",
                version: "1.0.0"
            },
            pipeline: {
                total_runs: 12,
                latest_run: {
                    run_id: "20240115_143022",
                    status: "completed",
                    timestamp: new Date().toISOString(),
                    accuracy: 0.92,
                    f1_score: 0.91,
                    roc_auc: 0.96,
                    precision: 0.93,
                    recall: 0.90
                },
                runs: [
                    { run_id: "20240115_143022", status: "completed", accuracy: 0.92, f1_score: 0.91 },
                    { run_id: "20240114_100511", status: "completed", accuracy: 0.90, f1_score: 0.89 },
                    { run_id: "20240113_085033", status: "completed", accuracy: 0.88, f1_score: 0.87 }
                ]
            },
            features: {
                data_validation: true,
                automated_training: true,
                model_evaluation: true,
                experiment_tracking: true,
                ci_cd: true,
                model_serving: true,
                monitoring: true
            }
        };
    }

    updateUI() {
        if (!this.data) return;

        const pipeline = this.data.pipeline || {};
        const latest = pipeline.latest_run || {};

        // Update badges
        this.updateElement('pipeline-status', `Pipeline: ${latest.status || 'Ready'}`);
        this.updateElement('accuracy-badge', `Accuracy: ${this.formatPercent(latest.accuracy)}`);
        this.updateElement('last-updated', `Updated: ${this.formatDate(this.data.generated_at)}`);

        // Update stats
        this.updateElement('total-runs', pipeline.total_runs || 0);
        this.updateElement('current-accuracy', this.formatPercent(latest.accuracy));
        this.updateElement('f1-score', this.formatPercent(latest.f1_score));
        this.updateElement('roc-auc', latest.roc_auc ? latest.roc_auc.toFixed(2) : '--');

        // Update metric bars
        this.updateMetricBar('accuracy', latest.accuracy);
        this.updateMetricBar('precision', latest.precision);
        this.updateMetricBar('recall', latest.recall);
        this.updateMetricBar('f1', latest.f1_score);
        this.updateMetricBar('roc', latest.roc_auc);

        // Update run details
        this.updateElement('run-id', latest.run_id || '--');
        this.updateElement('run-status', latest.status || '--');
        this.updateElement('run-timestamp', this.formatDate(latest.timestamp));

        // Update status badge color
        const statusElement = document.getElementById('run-status');
        if (statusElement && latest.status === 'completed') {
            statusElement.style.background = 'rgba(34, 197, 94, 0.2)';
            statusElement.style.color = '#22c55e';
        }
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    updateMetricBar(name, value) {
        const bar = document.getElementById(`${name}-bar`);
        const valueElement = document.getElementById(`${name}-value`);

        if (bar && value !== undefined && value !== null) {
            const percent = (value * 100).toFixed(1);
            setTimeout(() => {
                bar.style.width = `${percent}%`;
            }, 100);

            if (valueElement) {
                valueElement.textContent = `${percent}%`;
            }
        }
    }

    formatPercent(value) {
        if (value === undefined || value === null) return '--%';
        return `${(value * 100).toFixed(1)}%`;
    }

    formatDate(dateString) {
        if (!dateString) return '--';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    }

    setupNavigation() {
        // Smooth scroll for nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.stat-card, .stage-card, .feature-card, .workflow-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }
}

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#22c55e';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MLOpsDashboard();
});

// Refresh data periodically (every 5 minutes)
setInterval(() => {
    new MLOpsDashboard();
}, 300000);
