---
layout: post
title: Java Quartz 스케줄러 적용해보기
date: 2024-09-28 19:31:29 +0900
categories: java
tags: [java, quartz, scheduler, spring]
---

## 1. 도입

오늘 프로젝트에서 **가입한 지 6개월이 지난 비회원의 전화번호를 자동으로 삭제해달라**는 요청이 있었습니다.  
이 작업을 **Quartz Scheduler**를 이용해 주기적으로 처리해보겠습니다.

---

## 2. Quartz란?

Quartz는 Java 기반의 **오픈소스 스케줄러 라이브러리**로, 다중 스레드 기반으로 동작하며 `ThreadPool`을 사용합니다.

### 주요 인터페이스

1. **Scheduler**: 스케줄러와 상호작용하는 핵심 API  
2. **Job**: 실제 작업을 수행하는 클래스  
3. **JobDetail**: Job 인스턴스를 정의  
4. **Trigger**: 작업 실행 시점과 주기를 정의  
5. **JobBuilder**: JobDetail 인스턴스 생성  
6. **TriggerBuilder**: Trigger 인스턴스 생성

---

## 3. Quartz Dependency 추가

**Maven 의존성 설정:**

```xml
<dependency>
    <groupId>org.quartz-scheduler</groupId>
    <artifactId>quartz</artifactId>
    <version>2.1.7</version>
    <exclusions>
        <exclusion>
            <artifactId>slf4j-api</artifactId>
            <groupId>org.slf4j</groupId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.quartz-scheduler</groupId>
    <artifactId>quartz-jobs</artifactId>
    <version>2.2.1</version>
</dependency>
```

---

## 4. XML 설정 (Spring 설정 방식)

```xml
<bean id="deleteOldMembersJob" class="org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean">
    <property name="targetObject" ref="memberService" />
    <property name="targetMethod" value="deleteOldMembers" />
    <property name="concurrent" value="false" />
</bean>

<bean id="deleteOldMembersTrigger" class="org.springframework.scheduling.quartz.CronTriggerFactoryBean">
    <property name="jobDetail" ref="deleteOldMembersJob" />
    <property name="cronExpression" value="0 0 0 * * ?" />
</bean>
```

### ✅ 코드 설명 요약

- `targetObject`: 실제 로직을 수행할 Bean 지정 (`memberService`)
- `targetMethod`: 실행할 메서드 이름 (`deleteOldMembers`)
- `concurrent`: `false`일 경우, 이전 작업이 끝나기 전에는 중복 실행되지 않음
- `cronExpression`: Cron 표현식으로 실행 주기 지정 (여기선 매일 00시 실행)

> 🔗 [Cron 표현식 생성기](https://crontab.guru/)

---

## 5. 서비스 구현

```java
@Service("memberService")
public class UserScheduling {

    @Resource(name = "ordrManageService")
    private OrdrManageService ordrManageService;

    private static final Logger LOGGER = LoggerFactory.getLogger(OrdrManageService.class);

    public void deleteOldMembers() throws Exception {
        try {
            ordrManageService.deleteOldMember();
        } catch (Exception e) {
            LOGGER.error("Member Scheduler ERROR: " + e.getMessage());
        }
    }
}
```

---

## 6. SQL 쿼리

```xml
<update id="deleteOldMember">
    UPDATE comtnordr
    SET ORDR_RQSTR_TELNO = NULL,
        CREDT_ID = NULL
    WHERE FRST_REGISTER_PNTTM < DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 6 MONTH), '%Y%m%d');
</update>
```

📌 위 SQL은 **6개월 이상된 비회원의 전화번호 및 신용정보 키를 NULL로 변경**합니다.

---

## 7. 테스트 방법

### ⏱ Cron 주기 수정: 매 1초마다 실행

```xml
<!-- 원래: 매일 00시 -->
<property name="cronExpression" value="0 0 0 * * ?" />

<!-- 테스트용: 매 1초마다 -->
<property name="cronExpression" value="* * * * * ?" />
```

### 🧪 테스트 코드 작성

```java
public void deleteOldMembers() throws Exception {
    try {
        LOGGER.info("test");
        // ordrManageService.deleteOldMember();
    } catch (Exception e) {
        LOGGER.error("Member Scheduler ERROR: " + e.getMessage());
    }
}
```

---

## 8. 실행 결과

> **매 1초마다 "test" 로그가 출력되면 스케줄러가 잘 동작 중입니다!**

![테스트 실행 결과](/public/img/quartz/테스트실행.png)

---

## 마무리

- Quartz를 활용하면 특정 주기마다 자동 작업을 쉽게 설정할 수 있습니다.
- 실무에서도 회원 데이터 정리, 정기 메일 발송, 로그 정리 등에 매우 유용하게 쓰입니다.


감사합니다!
