import json
import os
import sys

path = sys.argv[1]
file_names = os.listdir(path)

with open(sys.argv[2], 'w') as output_file:
    files_content = []
    for file_name in file_names:
        with open(path + file_name, 'r') as file:
            files_content.append(
                {
                    'fileName': file_name,
                    'content': file.read()
                }
            )
    
    output_file.write(json.dumps(files_content, ensure_ascii = False))

