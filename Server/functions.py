def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))
            
def prepare_logs(data):
	temp_run_dir = WORKING_DIRECTORY + "run-"+str(time.time())
	os.mkdir(temp_run_dir)
	for id in data["ids"]:
		temp_id_dir = WORKING_DIRECTORY+temp_dir+"\""+id
		os.mkdir(temp_id_dir)
		# Throw the id to your code and put the reaults in the above directory
		pass