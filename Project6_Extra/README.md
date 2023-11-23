# Machine learning system for Risk Assessment

This is a Machine Learning Model Risk Scoring and Monitoring project. The problem is to create, deploy, and monitor a risk assessment ML model that will estimate the attrition risk of each of the company's clients. Also setting up processes to re-train, re-deploy, monitor and report on the ML model.

## Prerequisites
- Python 3 required
- Virtualenv recommended

## Dependencies
This project dependencies is available in the ```requirements.txt``` file.

## Installation
Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the dependencies from the ```requirements.txt```. Its recommended to install it in a separate [virtual environment](https://virtualenv.pypa.io/en/latest/).

```bash
pip3 install -r requirements.txt
```

## Project Structure
```bash
📦Dynamic-Risk-Assessment-System
 ┣
 ┣ 📂data
 ┃ ┣ 📂ingesteddata                 # Contains csv and metadata of the ingested data
 ┃ ┃ ┣ 📜finaldata.csv
 ┃ ┃ ┗ 📜ingestedfiles.txt
 ┃ ┣ 📂practicedata                 # Data used for practice mode initially
 ┃ ┃ ┣ 📜dataset1.csv
 ┃ ┃ ┗ 📜dataset2.csv
 ┃ ┣ 📂sourcedata                   # Data used for production mode
 ┃ ┃ ┣ 📜dataset3.csv
 ┃ ┃ ┗ 📜dataset4.csv
 ┃ ┗ 📂testdata                     # Test data
 ┃ ┃ ┗ 📜testdata.csv
 ┣ 📂model
 ┃ ┣ 📂models                       # Models pickle, score, and reports for production mode
 ┃ ┃ ┣ 📜apireturns.txt
 ┃ ┃ ┣ 📜confusionmatrix.png
 ┃ ┃ ┣ 📜latestscore.txt
 ┃ ┃ ┣ 📜summary_report.pdf
 ┃ ┃ ┗ 📜trainedmodel.pkl
 ┃ ┣ 📂practicemodels               # Models pickle, score, and reports for practice mode
 ┃ ┃ ┣ 📜apireturns.txt
 ┃ ┃ ┣ 📜confusionmatrix.png
 ┃ ┃ ┣ 📜latestscore.txt
 ┃ ┃ ┣ 📜summary_report.pdf
 ┃ ┃ ┗ 📜trainedmodel.pkl
 ┃ ┗ 📂production_deployment        # Deployed models and model metadata needed
 ┃ ┃ ┣ 📜ingestedfiles.txt
 ┃ ┃ ┣ 📜latestscore.txt
 ┃ ┃ ┗ 📜trainedmodel.pkl
 ┣ 📂src
 ┃ ┣ 📜apicalls.py                  # Runs app endpoints
 ┃ ┣ 📜app.py                       # Flask app
 ┃ ┣ 📜config.py                    # Config file for the project which depends on config.json
 ┃ ┣ 📜deployment.py                # Model deployment script
 ┃ ┣ 📜diagnostics.py               # Model diagnostics script
 ┃ ┣ 📜fullprocess.py               # Process automation
 ┃ ┣ 📜ingestion.py                 # Data ingestion script
 ┃ ┣ 📜pretty_confusion_matrix.py   # Plots confusion matrix
 ┃ ┣ 📜reporting.py                 # Generates confusion matrix and PDF report
 ┃ ┣ 📜scoring.py                   # Scores trained model
 ┃ ┣ 📜training.py                  # Model training
 ┃ ┗ 📜wsgi.py
 ┣ 📜config.json                    # Config json file
 ┣ 📜cronjob.txt                    # Holds cronjob created for automation
 ┣ 📜README.md
 ┗ 📜requirements.txt               # Projects required dependencies
```

## Steps Overview
1. **Data ingestion:** Automatically check if new data that can be used for model training. Compile all training data to a training dataset and save it to folder. 
2. **Training, scoring, and deploying:** Write scripts that train an ML model that predicts attrition risk, and score the model. Saves the model and the scoring metrics.
3. **Diagnostics:** Determine and save summary statistics related to a dataset. Time the performance of some functions. Check for dependency changes and package updates.
4. **Reporting:** Automatically generate plots and PDF document that report on model metrics and diagnostics. Provide an API endpoint that can return model predictions and metrics.
5. **Process Automation:** Create a script and cron job that automatically run all previous steps at regular intervals.

<img src="images/fullprocess.jpg" width=550 height=300>

## Usage

### 0- Run Flask App in separate terminal, run the rest of the steps in another terminal
```python
python3 app.py
```

### 1- Edit config.json file to use practice data

```bash
"input_folder_path": "practicedata",
"output_folder_path": "ingesteddata", 
"test_data_path": "testdata", 
"output_model_path": "practicemodels", 
"prod_deployment_path": "production_deployment"
```

### 2- Run data ingestion
```python
cd src
python3 ingestion.py
```
Artifacts output:
```
data/ingesteddata/finaldata.csv
data/ingesteddata/ingestedfiles.txt
```

### 3- Model training
```python
python3 training.py
```
Artifacts output:
```
models/practicemodels/trainedmodel.pkl
```

###  4- Model scoring 
```python
python3 scoring.py
```
Artifacts output: 
```
models/practicemodels/latestscore.txt
``` 

### 5- Model deployment
```python
python3 deployment.py
```
Artifacts output:
```
model/prod_deployment_path/ingestedfiles.txt
model/prod_deployment_path/trainedmodel.pkl
model/prod_deployment_path/latestscore.txt
``` 

### 6- Run diagnostics
```python
python3 diagnostics.py
```

### 7- Run reporting
```python
python3 reporting.py
```
Artifacts output:
```
models/practicemodels/confusionmatrix.png
models/practicemodels/summary_report.pdf
```

### 8- Run API endpoints
```python
python3 apicalls.py
```
Artifacts output:
```
models/practicemodels/apireturns.txt
```

### 9- Edit config.json file to use production data

```bash
"input_folder_path": "sourcedata",
"output_folder_path": "ingesteddata", 
"test_data_path": "testdata", 
"output_model_path": "models", 
"prod_deployment_path": "production_deployment"
```

### 10- Full process automation
```python
python3 fullprocess.py
```
### 11- Cron job

Start cron service
```bash
sudo service cron start
```

Edit crontab file
```bash
sudo crontab -e
```
   - Select **option 3** to edit file using vim text editor
   - Press **i** to insert a cron job
   - Write the cron job in ```cronjob.txt``` which runs ```fullprocces.py``` every 10 mins
   - Save after editing, press **esc key**, then type **:wq** and press enter
  
View crontab file
```bash
sudo crontab -l
```

