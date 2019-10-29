[http://marklodato.github.io/visual-git-guide/index-ko.html](http://marklodato.github.io/visual-git-guide/index-ko.html)

# Git structure
1. Working Directory
- 사용자의 워킹 디렉토리

2. Stage(index)
- Git 프로그램이 파일 변화를 관리하는 단계
- git add files 명령어로 Stage 영역으로 복사한다.

3. .git directory(repository)
- Git 프로그램이 파일 변화를 기록하는 단계
- git commit 명령은 Stage 영역의 현재 Snapshot을 커밋으로 저장한다.
- git reset --files 명령은 마지막 커밋에서 Stage 영역으로 files 파일들을 복사한다.

# Why Git?

## Delta vs Snapshot

1. Delta
- 


working directory (untracking area)

staging area (tracking area)

.git directory (repository)


[troubleshooting]

*windows terminal 한글 UNICODE로 표출된 문제 

set LC_ALL=ko_KR.UTF-8
*/
*git status 한글 깨짐 문제
>git config --global edit
[core] quotepath = false
OR
>git config --global core.quotepath false


[Command]
0. config --global [user.name || user.email] , --list

1. init - initialize or reinitialize empty local git repository

2. clone - initialize local repository from remote repository 

3. status

4. add [filename] - make untracked file to tracked file

5. rm (-rf) : make tracked file to untracked file

6. commit -m [message]

7. diff : show changes

8. push origin(remote branch) master(local branch)
9. pull origin(remote branch) master(local branch)

(실수로 커밋했을 때.)
10. reset HEAD~1 : (HEAD : current version에서 1개 버전 뒤로 되돌림) (commit 기록까지 지워버림)
- working directory에는 변경이 없음. (commit만 취소)
 - commit log를 남기려면, github에 push 후 reset하자.
- 3가지 모드

1) 
2)
3)

11. reflog : ??