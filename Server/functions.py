import zipfile
import os
import shutil
from time import time

WORKING_DIRECTORY = 'C:\\tmp\\'

def clear_directory(directory):
	for filename in os.listdir(directory):
	    file_path = os.path.join(directory, filename)
	    try:
	        if os.path.isfile(file_path) or os.path.islink(file_path):
	            os.unlink(file_path)
	        elif os.path.isdir(file_path):
	            shutil.rmtree(file_path)
	    except Exception as e:
	        print('Failed to delete %s. Reason: %s' % (file_path, e))

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))
            
def prepare_logs_into_zip(data):

	temp_run_dir = "run-" + str(int(time()*1000))
	os.mkdir(WORKING_DIRECTORY + temp_run_dir)
	for id in data["ids"]:
		print data
		temp_id_dir = WORKING_DIRECTORY + temp_run_dir + "\\" + id["id"]
		os.mkdir(temp_id_dir)
		# Throw the id to your code and put the reaults in the above directory

	zipf = zipfile.ZipFile(WORKING_DIRECTORY + temp_run_dir + "\\" + 'test.zip', 'w', zipfile.ZIP_DEFLATED)
	zipdir(temp_run_dir, zipf)
	zipf.close()
	return WORKING_DIRECTORY + temp_run_dir + "\\" + 'test.zip'
