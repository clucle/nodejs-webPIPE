"""
GET STDOUT FROM OTHER PYTHON SCRIPT
"""

import subprocess
from subprocess import PIPE, STDOUT

open_process = subprocess.Popen(["source\call.py", 'arg1'], stdout=PIPE, stderr=STDOUT, shell=True)
grep_stdout = open_process.communicate()

print("get", grep_stdout)
