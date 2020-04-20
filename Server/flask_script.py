from flask import Flask
from flask import request
from flask import send_file
from flask import make_response
from functions import prepare_logs_into_zip, clear_directory , WORKING_DIRECTORY


app = Flask(__name__)

@app.route('/give_me',methods=['POST'])
def give_me():

	data = request.get_json(force=True)
	zip_file_full_path = prepare_logs_into_zip(data)

	zip_file_response = send_file(zip_file_full_path, attachment_filename="test.zip")
	clear_directory(WORKING_DIRECTORY)

	response = make_response(zip_file_response)
	header = response.headers
	header['Access-Control-Allow-Origin'] = '*'
	return response
if __name__ == '__main__':
	app.run()