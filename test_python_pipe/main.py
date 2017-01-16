"""
GET STDOUT FROM OTHER PYTHON SCRIPT
"""

import subprocess
from subprocess import PIPE, STDOUT

# "-u" not to buffer the output of python
player_pipe = subprocess.Popen(["source\call.py", "-u", 'arg1'], stdin=PIPE,
	stdout=PIPE, stderr=STDOUT, shell=True)

player_pipe2 = subprocess.Popen(["source\call2.py", "-u", 'arg1'], stdin=PIPE,
	stdout=PIPE, stderr=STDOUT, shell=True)


#grep_stdout = open_process.communicate()
#print("get", grep_stdout)

player_pipe.stdin.write("Send Msg\n")
get_stdout = player_pipe.stdout.readline()
print("[Get Msg]" + get_stdout)


player_pipe.stdin.write("Send Msg2\n")
get_stdout = player_pipe.stdout.readline()
print("[Get Msg]" + get_stdout)

player_pipe2.stdin.write("Send Msg\n")
get_stdout = player_pipe2.stdout.readline()
print("[Get Msg]" + get_stdout)


player_pipe2.stdin.write("Send Msg2\n")
get_stdout = player_pipe2.stdout.readline()
print("[Get Msg]" + get_stdout)



player_pipe.kill()
player_pipe.wait()

player_pipe2.kill()
player_pipe2.wait()