import json
import os
import sys
import codecs

path = sys.argv[1]
file_names = os.listdir(path)

with codecs.open(sys.argv[2], "w", "utf-8") as output_file:
    files_content = []
    for file_name in file_names:
        with codecs.open(path + file_name, "r", "utf-8") as file:
            files_content.append(
                {
                    "fileName": file_name,
                    "content": file.read()
                }
            )
    
    output_file.write(json.dumps(files_content, ensure_ascii = False))

