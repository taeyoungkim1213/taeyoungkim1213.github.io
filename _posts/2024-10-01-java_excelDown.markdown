---
layout: post
title: Java Spring에서 엑셀 다운로드 (실전 과제 제출 데이터 예제)
date: 2024-10-02 12:00:00 +0900
categories: java
tags: [excel, poi, spring, 엑셀다운로드]
---

## 1. 개요

이번 포스팅에서는 실제 내가 담당한 프로젝트 중  
"**6개월 동안 제출된 과제의 제출 내용을 엑셀로 다운받는 기능**"을 `Apache POI`로 구현한 내용을 공유합니다.

> 📌 특징  
- 동적으로 컬럼 수가 달라지는 구조 (질문 수에 따라)  
- 다대다 구조 응답 처리 (학생 제출 vs 문항 리스트)  
- `XSSFWorkbook`을 이용한 `.xlsx` 다운로드  
- 실무에서 바로 가져다 쓸 수 있는 로직 포함

---

## 2. 사용 기술 및 주요 구성

- **Spring MVC** 기반
- **Apache POI 5.x**
- 과제 제출 정보, 응답 내용, 표절율, 점수, 제출일 등 포함
- 학생 이름은 개인 또는 그룹 단위로 구성

---

## 3. 컨트롤러 메소드 요약

```java
@RequestMapping(value="/classroom/homework/submitHomeworkListExcel.do")
public void selectAllResultExcel(@ModelAttribute("searchVO") HomeworkVO searchVO,
                                 @RequestParam(value = "homeworkId", required = false) String homeworkId,
                                 HttpServletResponse response) throws Exception {
```

- `searchVO`: 과제 검색 조건 (페이징 포함)
- `homeworkId`: 선택된 과제 ID
- `response`: 다운로드용 스트림 응답

---

## 4. 데이터 처리 구조

- `submitHomeworkList(...)` → 제출한 과제 목록 조회
- `submitHomeworkInfo(...)` → 제출 문항별 응답 정보 가져오기
- `homeworkGroupSubmitMberList(...)` → 그룹 멤버 조회

```java
Set<String> questionSet = new LinkedHashSet<>(); // 질문들
Map<String, List<String>> responsesMap = new HashMap<>(); // 응답 내용
Map<String, String> studentMap = new HashMap<>(); // 제출자 이름
```

---

## 5. 엑셀 구조 설정

### ✅ 시트 & 스타일 생성

```java
Workbook workbook = new XSSFWorkbook();
Sheet sheet = workbook.createSheet("과제 제출보기");

CellStyle headerStyle = workbook.createCellStyle();
Font headerFont = workbook.createFont();
headerFont.setBold(true);
headerStyle.setFont(headerFont);
headerStyle.setAlignment(HorizontalAlignment.CENTER);
```

---

### ✅ 헤더 구성 (동적 질문 포함)

```java
Row headerRow = sheet.createRow(0);
int colIndex = 0;

headerRow.createCell(colIndex++).setCellValue("번호");
headerRow.createCell(colIndex++).setCellValue("과목");
headerRow.createCell(colIndex++).setCellValue("과제제목");
headerRow.createCell(colIndex++).setCellValue("학생명");
headerRow.createCell(colIndex++).setCellValue("제출내용");

// 질문 수만큼 컬럼이 동적으로 생성됨
for (String question : questionSet) {
    headerRow.createCell(colIndex++).setCellValue(question);
}

headerRow.createCell(colIndex++).setCellValue("표절율");
headerRow.createCell(colIndex++).setCellValue("점수");
headerRow.createCell(colIndex++).setCellValue("제출일");
headerRow.createCell(colIndex++).setCellValue("수정일");
```

---

### ✅ 행 데이터 입력

```java
for (HomeworkVO homework : homeworkList) {
    Row row = sheet.createRow(rowNum++);
    int cellNum = 0;

    row.createCell(cellNum++).setCellValue(rowNum - 1); // 번호
    row.createCell(cellNum++).setCellValue(homework.getSbjctNm()); // 과목
    row.createCell(cellNum++).setCellValue(homework.getHomeworkNm()); // 과제제목
    row.createCell(cellNum++).setCellValue(studentMap.getOrDefault(homework.getHomeworkSbmsnId(), "")); // 학생명

    // 제출내용
    List<HomeworkVO> detailList = (List<HomeworkVO>) homeworkService.submitHomeworkInfo(homework).get("submitInfo");
    String lastContent = detailList.isEmpty() ? "" : detailList.get(detailList.size() - 1).getSbmsnCn();
    row.createCell(cellNum++).setCellValue(lastContent);

    // 응답 내용
    List<String> responses = responsesMap.getOrDefault(homework.getHomeworkSbmsnId(), Collections.emptyList());
    for (String rspns : responses) {
        row.createCell(cellNum++).setCellValue(rspns);
    }

    // 표절율, 점수
    row.createCell(cellNum++).setCellValue(homework.getPlgrsmRt() != null ? homework.getPlgrsmRt() : 0);
    if (Integer.valueOf(100).equals(homework.getGrdngCrtr())) {
        row.createCell(cellNum++).setCellValue(homework.getScr() != null ? homework.getScr() : 0);
    } else {
        row.createCell(cellNum++).setCellValue("미채점 과제");
    }

    // 제출일, 수정일
    row.createCell(cellNum++).setCellValue(sdf.format(homework.getFrstRegDt()));
    row.createCell(cellNum++).setCellValue(sdf.format(homework.getLastMdfcnDt()));
}
```

---

## 6. 파일 다운로드 처리

```java
String fileName = "과제제출.xlsx";
response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
response.setHeader("Content-Disposition", "attachment; filename=\"" + URLEncoder.encode(fileName, "UTF-8") + "\"");

workbook.write(response.getOutputStream());
workbook.close();
```

---

## 7. 결과 화면

> ✅ 요청 시 자동으로 엑셀 파일이 다운로드되며, 질문 수와 제출 내용에 따라 컬럼이 동적으로 생성됩니다.

![엑셀 테스트 결과](/public/img/java/과제엑셀다운로드.png)


---
 
## 📌 참고 포인트

- `XSSFWorkbook`은 `.xlsx`, `HSSFWorkbook`은 `.xls` 형식  
- 파일명이 한글일 경우 반드시 `URLEncoder.encode(...)` 적용  
- `LinkedHashSet`으로 컬럼 순서를 유지함

---

감사합니다!

