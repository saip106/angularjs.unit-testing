# Instructions to setup dev environment

on a windows machine

* Make sure NodeJS is installed (to test try node -v from command line)
* npm should get installed with NodeJS (quick check to verify is to try npm -v from command line)
* If not installed install the following 
	* grunt-cli
    * bower
    * yo


# Troubleshooting issues with dev environment setup

* Delete content for global npm folder (typically something like this C:\Users\gudigundlas\AppData\Roaming\npm)
* npm cache clean
* Get latest (I updated packages.json yesterday)
* Delete the node_modules folder from the project root
* npm install -g grunt-cli (this can be run from anywhere)
* npm install (this needs to be run from project root !!! it looks for packages.json)
* grunt --force (From project root folder. There might be some warnings but the command should complete without errors)
* This should put a dist folder in the root project path
