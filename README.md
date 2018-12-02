# Command line utility
1. Build command line utility `join` in NodeJs from this list - `https://en.wikipedia.org/wiki/Join_(Unix)`
2. Clone repository
3. Open terminal and go the directory where reposiotry is cloned.
4. Run `npm install`
3. Run `npm install -g` to link the script to location on our path, this will allow us to use `joins` like other shell commands.
4. Start using following commands on terminal- 

```
Test case: Common strings exist, no options passed in

$ joins one.txt two.txt
Blue Purple Green!
Blue Purple Yellow Brown!
```

```
Test case: Common strings do not exist

$ joins oneNoJoinCase.txt twoNoJoinCase.txt
Nothing could be joined
```

```
Test case: Common strings do not exist, but options are passed in

$ joins -2 2 oneJoinCaseFlag.txt twoJoinCaseFlag.txt
Blue Purple dark Green!
Blue Purple light Yellow Brown!
```

```
Test case: Wrong options are passed in

$ joins -2 one.txt two.txt
Position to read should be an integer after -2
```

```
Test case: Correct options are passed in

$ joins -1 1 -2 1 one.txt two.txt
Blue Purple Green!
Blue Purple Yellow Brown!
```



