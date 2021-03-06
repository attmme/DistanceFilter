# Distance Filter
This software takes all the customers from input file (data/customers.txt), filters them within 100km, sorts using their id and saves them in output file (data/output.txt).

It's necessary to have curl installed to install last node version, node to run the program and jest to run the tests.<br/> 
Here is a short guide to install everything on debian and windows.

<br/> 

## Linux Installation

1. First, we will install curl.
    ```
    $ sudo apt install curl
    ```

2. Then, we will install the last node version.
    ```
    $ sudo apt update
    $ curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
    $ sudo apt install -y nodejs
    ```

    Now we should have the correct node version (v14.16.0 or higher).
    ```
    $ node -v
    ```

3. To to install jest, we will move into the main folder and type the next code in the terminal.
    ```
    $ npm install
    ```
<br/>

## Windows installation

1. First, we will install node from here https://nodejs.org/es/download/ or using this [direct link](https://nodejs.org/dist/v14.16.0/node-v14.16.0-x86.msi).

    Now we should have the correct node version (v14.16.0 or higher).
    ```
    > node -v
    ```

3. To to install jest, we will move into the main folder and type the next code in the terminal.
    ```
    > npm install
    ```
<br/> 

## Running main program

For linux and windows, those steps are exactly the same. <br/><br/>
To execute the program, we will move into the main folder and type the next code in the terminal.

    $ node main.js

If everything went well, we will see the following message.
    
    File created successfully at data/output.txt
    
<br/> 

## Running tests

To run all tests localted in 'tests' folder, we will stay in the main folder and type the next code in the terminal.
    
    $ npm test
    
If everything went correctly, we will see the following message.

    PASS  tests/customers.test.js
    PASS  tests/harvesine.test.js

    Test Suites: 2 passed, 2 total
    Tests:       16 passed, 16 total
