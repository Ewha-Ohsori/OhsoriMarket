> 파이썬 3.7 기준, 1초에 20_000_000(2천만)번의 연산을 수행한다고 가정하고 들어간다. ([출처](이코테))

> 일반적으로 문제를 풀 때의 예시를 몇 가지 소개하겠다. 다음은 모두 시간 제한이 1초인 문제에 대한 예시이다. 
> 
> •N의 범위가 500인 경우: 시간 복잡도가 $O(N^3)$인 알고리즘을 설계하면 문제를 풀 수 있다. 
>
> •N의 범위가 2,000인 경우: 시간 복잡도가 $O(N^2)$인 알고리즘을 설계하면 문제를 풀 수 있다. 
>
> •N의 범위가 100,000인 경우: 시간 복잡도가 $O(NlogN)$인 알고리즘을 설계하면 문제를 풀 수 있다. 
>
> •N의 범위가 10,000,000인 경우: 시간 복잡도가 $O(N)$인 알고리즘을 설계하면 문제를 풀 수 있다.


| Complexity               | 1   | 10      | 100                  |
| ------------------------ | --- | ------- | -------------------- |
| $O(1)$ (상수)            | 1   | 1       | 1                    |
| $O(log n)$ (로그)        | 0   | 2       | 5                    |
| $O(n)$ (선형)            | 1   | 10      | 100                  |
| $O(n \log n)$ (선형로그) | 0   | 20      | 461                  |
| $O(n^2)$ (다차)          | 1   | 100     | 10000                |
| $O(2^n)$ (지수)          | 1   | 1024    | 표현 불가 (약 1.2조) |
| $O(n!)$ (팩토리얼)       | 1   | 3628800 | 표현 불가 (약 9경)   |



## built-in datatype & method

### 0. 유의해야할 주요 함수들의 시간복잡도
|     | Operation    | Example                | Big-O | Notes                                                                                                             |
| --- | ------------ | ---------------------- | ----- | ----------------------------------------------------------------------------------------------------------------- |
| 1   | Sum Iterable | sum([1,2,3])           | O(N)  | 매번 sum을 구하는 대신 누적합 기법 활용([참고](https://school.programmers.co.kr/learn/courses/30/lessons/178870)) |
| 2   | Min/Max      | min([...]), max([...]) | O(N)  |                                                                                                                   |

### 1. 리스트의 메소드 별 시간복잡도

|     | Operation     | Example         | Big-O       | Notes                      |
| --- | ------------- | --------------- | ----------- | -------------------------- |
| 1   | Indexing      | l[i]            | O(1)        | 인덱스로 값 찾기           |
|     | Get Index     | l.index('val')  | **O(N)**    | 값으로 인덱스 찾기         |
| 2   | Store         | l[i] = val      | O(1)        | 인덱스로 데이터 저장       |
| 3   | Length        | len(l)          | O(1)        | 리스트 길이                |
| 4   | Append        | l.append(val)   | O(1)        | 리스트 뒤에 데이터 추가    |
| 5   | Pop           | l.pop()         | O(1)        | 리스트 마지막 데이터 pop   |
| 6   | Clear         | l.clear()       | O(1)        | 빈 리스트로 만듬           |
| 7   | Slice         | l[a:b]          | O(b-a)      | 슬라이싱                   |
| 8   | Extend        | l.extend(l2)    | O(len(l2))  | 리스트 확장                |
| 9   | Construction  | list(...)       | O(len(...)) | 리스트 생성                |
| 10  | check ==, !=  | l1 == l2        | O(N)        |                            |
| 11  | Insert        | l[a:b] = ...    | O(N)        | 데이터 삽입                |
| 12  | Delete        | del l[i]        | O(N)        | 데이터 삭제                |
| 13  | Containment   | x in/not in l   | O(N)        | x값 포함 여부 확인         |
| 14  | Copy          | l.copy()        | O(N)        | 리스트 복제                |
| 15  | Remove        | l.remove(val)   | O(N)        | 리스트에서 val값 제거      |
| 16  | Pop 2         | l.pop(i)        | O(N)        | i번째 인덱스 값 pop        |
| 17  | Extreme value | min(l) / max(l) | O(N)        | 전체 데이터를 체크해야함   |
| 18  | Reverse       | l.reverse()     | O(N)        | 뒤집기                     |
| 19  | Iteration     | for v in l:     | O(N)        |                            |
| 20  | Sort          | l.sort()        | O(N log N)  | 파이썬 기본 정렬(Tim sort) |
| 21  | Multiply      | k*l             | O(k N)      |                            |



### 2. 세트의 메소드별 시간복잡도

|     | Operation      | Example        | Big-O            | Notes                   |
| --- | -------------- | -------------- | ---------------- | ----------------------- |
| 1   | Add            | s.add(val)     | O(1)             | 집합 요소 추가          |
| 2   | Containment    | x in/not in s  | O(1)             | 포함 여부 확인          |
| 3   | Remove         | s.remove(val)  | O(1)             | 요소 제거(없으면 에러)  |
| 4   | Discard        | s.discard(val) | O(1)             | 요소 제거(없어도 에러x) |
| 5   | Pop            | s.pop()        | O(1)             | 랜덤하게 하나 pop       |
| 6   | Clear          | s.clear()      | O(1)             |                         |
| 7   | Construction   | set(...)       | O(len(...))      | 길이만큼                |
| 8   | check ==, !=   | s != t         | O(len(s))        |                         |
| 9   | <= or <        | s <= t         | O(len(s))        | 부분집합 여부           |
| 10  | Union          | s, t           | O(len(s)+len(t)) | 합집합                  |
| 11  | Intersection   | s & t          | O(len(s)+len(t)) | 교집합                  |
| 12  | Difference     | s - t          | O(len(s)+len(t)) | 차집합                  |
| 13  | Symmetric Diff | s ^ t          | O(len(s)+len(t)) | 여집합                  |
| 14  | Iteration      | for v in s:    | O(N)             | 전체 요소 순회          |
| 15  | Copy           | s.copy()       | O(N)             |                         |



### 3. 딕셔너리의 메소드별 시간복잡도

|     | Operation      | Example     | Big-O       | Notes                       |
| --- | -------------- | ----------- | ----------- | --------------------------- |
| 1   | Store          | d[k] = v    | O(1)        | 집합 요소 추가              |
| 2   | Length         | len(d)      | O(1)        |                             |
| 3   | Delete         | del d[k]    | O(1)        | 해당 key 제거               |
| 4   | get/setdefault | d.get(k)    | O(1)        | key에 따른 value 확인       |
| 5   | Pop            | d.pop(k)    | O(1)        | pop                         |
| 6   | Pop item       | d.popitem() | O(1)        | 랜덤 데이터(key:value) pop  |
| 7   | Clear          | d.clear()   | O(1)        |                             |
| 8   | View           | d.keys()    | O(1)        | key 전체 확인               |
| 9   | Values         | d.values()  | O(1)        | value 전체 확인             |
| 10  | Construction   | dict(...)   | O(len(...)) | (key, value) tuple 갯수만큼 |
| 11  | Iteration      | for k in d: | O(N)        | 딕셔너리 전체 순회          |


## 주요 라이브러리별 시간복잡도
- `itertools.permutations(n, r)`: $O(n!)$
- `collections.Counter()`: 카운터 객체를 만드는 데 $O(n)$, 이후 하나씩 꺼낼 때는 $O(1)$ [(출처)](https://hyp.is/J2kzrhafEe-rHafkhA1NCA/stackoverflow.com/questions/42461840/what-is-the-time-complexity-of-collections-counter-in-python)
- 