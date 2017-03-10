import subprocess

while True:
    try:
        print subprocess.check_output(['python', 'scrapper.py'])
    except KeyboardInterrupt:
        print "error"
