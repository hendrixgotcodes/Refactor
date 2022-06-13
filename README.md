# **REFACTOR**

<img src="./logo.png" align="right"
     alt="Nano ID logo by Anton Lovchikov" width="94"  height="94">

A light weight CLI tool designed to make developers more robust in refactoring large codebase.

- Change extensions of multiple files with just one command
- Rename multiple files much more faster than the traditional way
- Rename multiple directories

*Refactor is in it's early stages. Your contributions and suggestions are more than welcome 😎*

## Installation
### Using npm
To install this CLI using npm run; 
>npm install refactor -g

This will install the CLI and make it globally available.

## Commands
There are currently two main commands. One comes with several options which enables you two perform more sophisticated tasks.

| Command | Description                    |
| ------- | -------------------------------|
| about   | Prints general info about the CLI unto the console |
| rename  | This one does the magic. It takes in different arguments depending on the sort of operation you want to perform |
| help    | Use this command whenever you forget the two other commands |


## Usage

### about
You can use the about command as so;
> refactor about

This general info about the CLI unto the console.

### rename
The rename command takes the following form.
> refactor rename --[arg1] --[arg2] --[etc]

The arguments are as followed
- --path: The path to the directory of operation. This argument is always demanded. <br/> 
Example usage: <br/>
`refactor rename --path="."` <br/>
type: *string*  | required: *true*
<br/><br/>

- --file: Consider this argument as toggler. Set it to true if you want to perform the operation on files, false if directories.<br/>
Example usage: <br/>
`refactor rename --path="." --file=true` <br/>
type: *string*  | required: *true*
<br/><br/>


- fromExt: The file extension you want to change. Used alongside --toExt argument. <br/>
Example usage: <br/>
`refactor rename --path="." --file=true --fromExt="js" --toExt="ts"` <br/>
type: *string*  | required: *if *--file* is set to true*
<br/><br/>

- toExt: The final extension you want for your files. Used alongside --fromExt argument. <br/>
Example usage: <br/>
`refactor rename --path="." --file=true --fromExt="js" --toExt="ts"` <br/>
type: *string*  | required: *if *--file* is set to true*
<br/><br/>

- exclude: Use this argument incase you have some files you want to exclude from the operation.<br/>
Example usage: <br/>
`refactor rename --path="." --file=true --fromExt="js" --toExt="ts" --exclude="a.js, b.js, c.js"` <br/>


