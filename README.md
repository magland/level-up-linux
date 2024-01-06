# Level-up Linux!

Welcome to level-up linux where you can learn crucial Linux skills by solving challenges and collecting tokens.

Prerequisites:
- We assume you have access to a Linux system and know how to open a terminal.
- We assume you have access to the internet and ChatGPT, and that you are open to using them to learn about Linux.

## Challenge A762: Create a text file

For some background, ask ChatGPT some basics about files
- I'm new to Linux. Explain what a text file is.
- I'm new to Linux. Explain how I can create a new file from the terminal.

**NOW THE CHALLENGE**: Create a text file named first.txt that contains the text "Good morning!" (Hint: you can use the echo command to create a file with the text "Good morning!" in it. Make sure you get the capitalization and punctuation correct.)

Now to get credit for your work, copy-paste the following command into your terminal to get the redeemable token:

```bash
shasum first.txt | awk '{print $1}'
```

Copy the output of that command and submit it to [level-up-linux](https://magland.github.io/level-up-linux/).

Additional exploration:
```bash
# View the file and its info (permissions, size, etc.)
ls -l
# View the contents of the file
cat first.txt
```

## Challenge A821: Edit a text file

For some background, ask ChatGPT some basics about editing files
- I'm new to Linux. I'd like to edit text files in the terminal.

If you decide to go with nano, you may need to ask ChatGPT how to install it if it's not already installed.

If you're not familiar with this, you may need to ask ChatGPT how to open the file, how to edit the file, and how to save the file.

**NOW THE CHALLENGE**: Edit the file first.txt so that it contains the text "Good afternoon!"

Now to get credit for your work, copy-paste the following command into your terminal to get the redeemable token:

```bash
shasum first.txt | awk '{print $1}'
```

Submit to [level-up-linux](https://magland.github.io/level-up-linux/).

Additional exploration:
```bash
# View the file and its info (permissions, size, etc.)
ls -l
# View the contents of the file
cat first.txt
```

## Challenge A285: Create a directory

For some background, ask ChatGPT some basics about directories
- I'm new to Linux am 7 years old. Explain what a directory is.
- I'm new to Linux. Explain how I can create a new directory from the terminal.

**NOW THE CHALLENGE**: Create a directory named mydir and create a file named second.txt inside of it. The file should contain the text "Good evening!" (Hint: you can use the mkdir command to create a directory, and you can use the echo command to create a file with the text "Good evening!" in it. You'll need to consult with ChatGPT on how to get that file inside the new directory.)

Now to get credit for your work, copy-paste the following command into your terminal to get the redeemable token:

```bash
shasum mydir/second.txt | awk '{print $1}'
```

Submit to [level-up-linux](https://magland.github.io/level-up-linux/).

Additional exploration:
```bash
# View the directory and its contents
ls -l mydir
# View the contents of the file
cat mydir/second.txt
```

## Challenge A942: Download and unpack a gzipped tar file

Often, you'll need to download a file from the internet and unpack it. While you can do this with a GUI, sometimes that is not an option (for example, if you're using a remote server). It can also be more efficient to do this from the terminal. So, let's get started!

Prerequisites: ask the internet how you would get curl installed on your system (if it's not already installed)

For some background, ask ChatGPT some basics about gzipped tarballs
- I'm new to Linux and 4 years old. Explain what a gzipped tarball is.
- I'm new to Linux. Explain how I can download a file from the terminal using curl.
- I'm new to Linux. Explain how I can unpack/extract a gzipped tarball from the terminal.

CHALLENGE: The following .tar.gz file has a bunch of files in it. Extract it inside your current directory

```bash
https://cran.r-project.org/src/contrib/1.8.0/Recommended/lattice_0.8-3.tar.gz
```

You should now have a directory named lattice. Inside that directory, there is a file named data/barley.R. The answer code is the output of the following command:

```bash
shasum lattice/data/barley.R
```

To redeem your level-up-linux token, submit your answer to [level-up-linux](https://level-up-linux.vercel.app/).

Additional exploration:
```bash
# View the directory and its contents
ls -l lattice
ls -l lattice/data
```

## Challenge A742: Rename a file or directory

Some background: ask ChatGPT about renaming files and directories
- I'm new to Linux. Explain how I can rename a file or directory from the terminal.

**CHALLENGE**: In the last example, we created a directory named lattice. Let's rename it to lattice2.

Then the token is the output of the following command:

```bash
shasum lattice2/data/singer.R | awk '{print $1}'
```

To redeem your level-up-linux token, submit your answer to [level-up-linux](https://level-up-linux.vercel.app/).

## Challenge A454: Copy a file

Some background: ask ChatGPT about copying files
- I'm new to Linux. Explain how I can copy a file from the terminal.

**CHALLENGE**: In the last example, we created a directory named lattice2. Let's copy the file lattice2/data/ethanol.R to the current directory and name it the_ethanol_file.R.

The token is the output of the following command:

```bash
shasum the_ethanol_file.R | awk '{print $1}'
```

To redeem your level-up-linux token, submit your answer to [level-up-linux](https://level-up-linux.vercel.app/).


## Challenge A635: Environment variables

For some background, ask ChatGPT some basics about environment variables
- I'm new to Linux and 9 years old. Explain environment variables and why they are useful.
- I'm new to Linux. Explain how I can set an environment variable from the terminal.
- I'm new to Linux. Explain about using the "export" command to set an environment variable.

CHALLENGE: Set up five environment variables FIRST_PLACE_TEAM, SECOND_PLACE_TEAM, THIRD_PLACE_TEAM, FOURTH_PLACE_TEAM, and FIFTH_PLACE_TEAM. Their values should be the strings "The Red Sox", "The Yankees", "The Blue Jays", "The Orioles", and "The Rays", respectively. (Hint: you can use the export command to set environment variables).

Then the token is the output of the following command:

```bash
echo -n "The first place team is $FIRST_PLACE_TEAM, the second place team is $SECOND_PLACE_TEAM, the third place team is $THIRD_PLACE_TEAM, the fourth place team is $FOURTH_PLACE_TEAM, and the fifth place team is $FIFTH_PLACE_TEAM." | shasum | awk '{print $1}'
```




