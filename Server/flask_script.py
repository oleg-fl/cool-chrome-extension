from flask import Flask
from flask import request

WORKING_DIRECTORY = 'C:\\tmp\\'

app = Flask(__name__)

@app.route('/give_me',methods=['POST'])
def give_me():
	data = request.get_json(force=True)
	zip_file_full_path = prepare_logs_into_zip(data)

	return send_file(zip_file_full_path, "test.zip")

if __name__ == '__main__':
	app.run()