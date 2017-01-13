"""
GET STDOUT FROM OTHER PYTHON SCRIPT
"""

import subprocess
from subprocess import PIPE, STDOUT

player_pipe = subprocess.Popen(["source\call.py", 'arg1'], stdin=PIPE,
	stdout=PIPE, stderr=STDOUT, shell=True)

#grep_stdout = open_process.communicate()
#print("get", grep_stdout)

player_pipe.stdin.write("Send Msg\n")
get_stdout = player_pipe.stdout.readline()
print("[Get Msg]" + get_stdout)

player_pipe.kill()
player_pipe.wait()