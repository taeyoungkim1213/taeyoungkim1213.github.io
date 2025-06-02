---
layout: post
title: 마크다운 문법 정리
date: 2024-07-18 19:31:29 +0900
categories: markdown
tags: [markdown, 문서작성, 마크업]
---

## 마크다운이란?

> 일반 텍스트로 서식이 있는 문서를 작성할 수 있게 해주는 간단한 마크업 언어입니다.  
> 블로그, 깃허브 README, 위키 문서 등에서 널리 사용됩니다.

---

## 주요 문법 정리

### 1. 제목 (Header)

```markdown
# 제목 1
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6
```

렌더링 결과:

# 제목 1  
## 제목 2  
### 제목 3  
#### 제목 4  
##### 제목 5  
###### 제목 6  

---

### 2. 텍스트 스타일 (Text Style)

```markdown
_이탤릭_
*이탤릭*

__두껍게__
**두껍게**

~~취소선~~

<u>밑줄</u>
```

렌더링 결과:

_이탤릭_  
**두껍게**  
~~취소선~~  
<u>밑줄</u>

---

### 3. 목록 (List)

**순서 있는 목록:**

```markdown
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목
```

1. 첫 번째 항목  
2. 두 번째 항목  
3. 세 번째 항목  

**순서 없는 목록:**

```markdown
- 항목 A
- 항목 B
- 항목 C
```

- 항목 A  
- 항목 B  
- 항목 C

**중첩 목록:**

```markdown
1. 메인 항목
    - 서브 항목 1
    - 서브 항목 2

1. 메인 항목
    1. 서브 항목 1
    2. 서브 항목 2
```

---

### 4. 인용문 (Blockquote)

```markdown
> 이것은 인용문입니다.
>> 중첩된 인용문입니다.
```

> 이것은 인용문입니다.  
>> 중첩된 인용문입니다.

---

### 5. 코드 (Code)

**인라인 코드:**

```markdown
`System.out.println("Hello, Markdown!")`
```

`System.out.println("Hello, Markdown!")`

**코드 블럭:**

<pre>
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Markdown!");
    }
}
```
</pre>

---

### 6. 링크 & 이미지

```markdown
[네이버](https://www.naver.com)

![예시 이미지](https://via.placeholder.com/150)
```

[네이버](https://www.naver.com)  
![예시 이미지](https://via.placeholder.com/150)

---

### 7. 체크리스트 (To-do List)

```markdown
- [x] 마크다운 정리하기
- [ ] 포스팅 완료하기
- [ ] 공유하기
```

- [x] 마크다운 정리하기  
- [ ] 포스팅 완료하기  
- [ ] 공유하기

---

### 8. 표 (Table)

```markdown
| 이름 | 나이 | 직업     |
|------|------|----------|
| 철수 | 25   | 개발자   |
| 영희 | 30   | 디자이너 |
```

| 이름 | 나이 | 직업     |
|------|------|----------|
| 철수 | 25   | 개발자   |
| 영희 | 30   | 디자이너 |

---

## 마무리

마크다운은 배우기 쉽고, GitHub, Notion, 블로그, Wiki 등 어디서나 사용할 수 있는 강력한 문서 작성 도구입니다.  
간단한 문법으로 가독성 좋은 문서를 만들 수 있으니 꾸준히 연습해보세요!

👉 참고 링크  
- [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)  
